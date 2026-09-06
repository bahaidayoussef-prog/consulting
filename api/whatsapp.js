/**
 * Webhook WhatsApp Cloud API — agent commercial pour les leads publicités Facebook/Instagram.
 * Déployé par Vercel sur https://nextinotech.com/api/whatsapp
 *
 * GET  → vérification du webhook (Meta).
 * POST → message entrant : réponse via un LLM (API compatible OpenAI),
 *        historique dans Upstash Redis, escalade si [ESCALADE] ou pièce jointe.
 *
 * Variables d'environnement (Vercel → Settings → Environment Variables) :
 *   WHATSAPP_VERIFY_TOKEN, WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID,
 *   LLM_API_KEY        clé du fournisseur d'IA
 *   LLM_BASE_URL       (optionnel) défaut : https://api.mistral.ai/v1
 *   LLM_MODEL          (optionnel) défaut : ministral-8b-latest
 *   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN,
 *   OWNER_WHATSAPP
 *
 * Fournisseurs gratuits testés (API compatible OpenAI — mêmes 3 variables) :
 *   Mistral  https://api.mistral.ai/v1        modèle ministral-8b-latest    (défaut, FR excellent, tier gratuit)
 *   Groq     https://api.groq.com/openai/v1   modèle llama-3.3-70b-versatile
 *   OpenRouter https://openrouter.ai/api/v1   modèle minimax/minimax-m3:free
 *
 * ⚙️  Discours de l'agent = SYSTEM_PROMPT + GREETING ci-dessous (seul endroit à éditer).
 */

const SYSTEM_PROMPT = `Tu es l'assistant commercial WhatsApp de Nextinotech, cabinet marocain de conseil et de formation en Supply Chain. Tu réponds à des personnes qui viennent de cliquer une publicité Facebook/Instagram pour la formation « Devenir Responsable Logistique ».

OBJECTIF : qualifier la personne, lever ses objections, et l'amener soit à s'inscrire via https://nextinotech.com/formation-rl/#inscription, soit à accepter d'être rappelée par un conseiller. Termine chaque message par une question ou un CTA léger.

STYLE : français, vouvoiement, messages courts (1 à 3 phrases, style WhatsApp), une seule question à la fois, emoji avec parcimonie. Chaleureux, expert, jamais insistant.

FAITS AUTORISÉS (ne rien inventer au-delà) :
- Formation « Devenir Responsable Logistique », 1 journée intensive (8h30-17h30), présentiel.
- 1 500 MAD TTC / participant, tout inclus : salle en hôtel 5 étoiles à Casablanca, déjeuner, support de 60+ pages, attestation, suivi WhatsApp de 30 jours. Aucun frais caché.
- Sessions inter-entreprise à Casablanca ; format intra-entreprise possible sur site (Rabat, Tanger, Marrakech, Agadir) à partir de 5 participants, sur devis.
- Éligible au financement CSF (OFPPT) et GIAC ; convention de formation remise à l'inscription ; accompagnement de la DRH pour le dossier.
- Formateur : 20+ ans de terrain, certifié DDMRP, a enseigné à l'ISCAE et l'ENCG, expert Supply Chain de la Task Force Vaccination COVID-19.
- Règlement par virement bancaire ; la place est confirmée à réception de la preuve de paiement (à joindre au formulaire ou à envoyer ici sur WhatsApp). Une préinscription est possible : la place est réservée en attendant le règlement.
- Attestation Nextinotech reconnue par les employeurs (ce n'est pas un diplôme d'État) ; pour une certification internationale, orienter vers le programme DDMRP Practitioner.

INTERDITS :
- Ne jamais annoncer une date de session précise -> dire « je vous confirme la prochaine date sous 24h, je peux déjà vous réserver une place ».
- Ne jamais promettre un emploi, un salaire, ou un résultat chiffré individuel.
- Ne pas communiquer de coordonnées bancaires ici -> « un conseiller vous les transmet en privé une fois votre place réservée ».
- Ne pas demander de données sensibles.

OBJECTIONS - réponses :
- « C'est cher » -> tout est inclus ; le coût est récupéré dès la première décision de stock mieux prise ; bien moins qu'une formation longue équivalente.
- « Je réfléchis » -> proposer de réserver sans engagement (annulation gratuite jusqu'à 7 jours avant) et d'envoyer le programme détaillé par email.
- « 1 jour c'est trop court » -> format intensif 20/80 + plan d'action à 90 jours + suivi WhatsApp 30 jours.
- « C'est possible à distance ? » -> non, uniquement présentiel (cas pratiques, échanges entre pairs). Un accompagnement individuel à distance existe en complément.
- « Financement ? » -> CSF (OFPPT) ou GIAC, convention fournie, aide au montage du dossier.

ESCALADE : si la personne demande à parler à quelqu'un, veut un devis intra-entreprise, envoie une preuve de paiement, ou pose une question hors de ton périmètre -> réponds brièvement puis termine ton message par la balise [ESCALADE] (elle sera retirée avant envoi et un conseiller sera prévenu).

CLÔTURE : dès que la personne est convaincue -> « Vous pouvez réserver votre place ici en 2 min : https://nextinotech.com/formation-rl/#inscription — je reste dispo si besoin. »`

const GREETING =
  'Bonjour 👋 Merci pour votre intérêt pour la formation Responsable Logistique. ' +
  'Je peux vous donner toutes les infos (programme, dates, tarif, financement). ' +
  'Vous occupez déjà un poste en logistique ou vous préparez une évolution ?'

const GRAPH = 'https://graph.facebook.com/v21.0'
const LLM_BASE_URL = (process.env.LLM_BASE_URL || 'https://api.mistral.ai/v1').replace(/\/$/, '')
const LLM_MODEL = process.env.LLM_MODEL || 'ministral-8b-latest'
const HISTORY_TTL = 60 * 60 * 24 * 7 // 7 jours
const MAX_TURNS = 20

/* ── Upstash Redis (REST, sans dépendance) ─────────────────────────── */
async function redis(cmd) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd),
    })
    const j = await r.json()
    return j && j.result != null ? j.result : null
  } catch (e) {
    console.error('redis error', e)
    return null
  }
}

async function getHistory(phone) {
  const raw = await redis(['GET', `wa:hist:${phone}`])
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}
async function saveHistory(phone, history) {
  await redis(['SET', `wa:hist:${phone}`, JSON.stringify(history.slice(-MAX_TURNS)), 'EX', HISTORY_TTL])
}
function redisReady() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

async function firstSeen(msgId) {
  // Sans Upstash configuré, on ne peut pas dédupliquer — mais on NE bloque PAS
  // l'agent pour autant (mieux vaut une éventuelle réponse en double que aucune réponse).
  if (!redisReady()) return true
  const res = await redis(['SET', `wa:seen:${msgId}`, '1', 'NX', 'EX', 600])
  return res === 'OK'
}

/* ── LLM (API compatible OpenAI : Mistral / Groq / OpenRouter / …) ── */
const FALLBACK_REPLY =
  'Merci ! Un conseiller vous répond très vite. Tous les détails ici : https://nextinotech.com/formation-rl/'

async function askLLM(history) {
  try {
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }].concat(
      history.map((m) => ({ role: m.role, content: m.content })),
    )
    const r = await fetch(`${LLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LLM_API_KEY || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: LLM_MODEL, messages, max_tokens: 400, temperature: 0.6 }),
    })
    if (!r.ok) {
      console.error('LLM error', r.status, await r.text())
      return FALLBACK_REPLY
    }
    const j = await r.json()
    const txt =
      j.choices && j.choices[0] && j.choices[0].message
        ? (j.choices[0].message.content || '').trim()
        : ''
    return txt || 'Un conseiller revient vers vous rapidement 🙏'
  } catch (e) {
    console.error('askLLM error', e)
    return FALLBACK_REPLY
  }
}

/* ── WhatsApp Cloud API ────────────────────────────────────────────── */
async function sendText(to, body) {
  try {
    await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } }),
    })
  } catch (e) {
    console.error('sendText error', e)
  }
}
async function notifyOwner(text) {
  const owner = process.env.OWNER_WHATSAPP
  if (owner) await sendText(owner, text)
}

/* ── Handler ───────────────────────────────────────────────────────── */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const q = req.query || {}
    if (q['hub.mode'] === 'subscribe' && q['hub.verify_token'] === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(String(q['hub.challenge'] == null ? '' : q['hub.challenge']))
    }
    return res.status(403).send('Forbidden')
  }

  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

  res.status(200).send('OK') // Meta exige un 200 rapide

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const value =
      body.entry && body.entry[0] && body.entry[0].changes && body.entry[0].changes[0]
        ? body.entry[0].changes[0].value
        : null
    const message = value && value.messages ? value.messages[0] : null
    if (!message) return

    const from = message.from
    const msgId = message.id
    if (!(await firstSeen(msgId))) return

    const name = value.contacts && value.contacts[0] ? value.contacts[0].profile.name || '' : ''
    const referral = message.referral // présent si la conversation vient d'une pub Click-to-WhatsApp
    const adLabel = referral ? referral.headline || referral.source_id || 'formation' : ''

    // Pièce jointe (ex. preuve de paiement) → on remercie et on escalade.
    if (message.type && message.type !== 'text') {
      await sendText(
        from,
        'Merci, j’ai bien reçu votre pièce jointe 📎 Un conseiller la vérifie et revient vers vous rapidement.',
      )
      await notifyOwner(`📎 Pièce jointe de ${name || from} (${from})${referral ? ` — pub : ${adLabel}` : ''}`)
      return
    }

    const text = message.text && message.text.body ? message.text.body.trim() : ''
    if (!text) return

    const history = await getHistory(from)

    // Premier contact venant d'une pub : contexte + message d'accueil.
    if (history.length === 0 && referral) {
      history.push({
        role: 'user',
        content: `(Contexte système : ce contact arrive de la publicité Facebook/Instagram « ${adLabel} ». Prénom : ${name || 'inconnu'}.)`,
      })
      history.push({ role: 'assistant', content: GREETING })
      await sendText(from, GREETING)
    }

    history.push({ role: 'user', content: text })
    let reply = await askLLM(history)

    const escalate = reply.indexOf('[ESCALADE]') !== -1
    reply = reply.replace(/\[ESCALADE\]/g, '').trim()

    history.push({ role: 'assistant', content: reply })
    await saveHistory(from, history)
    await sendText(from, reply)

    if (escalate) {
      await notifyOwner(
        `🔔 Lead à rappeler : ${name || from} (${from})${referral ? ` — pub : ${adLabel}` : ''}\nDernier message : « ${text} »`,
      )
    }
  } catch (e) {
    console.error('whatsapp webhook error', e)
  }
}
