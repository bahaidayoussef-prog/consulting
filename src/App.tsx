import './index.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
const HomePage = lazy(() => import('./pages/HomePage'))
const ConseilPage = lazy(() => import('./pages/ConseilPage'))
const PrestationsPage = lazy(() => import('./pages/PrestationsPage'))
import ServicesRedirect from './components/ServicesRedirect'
const ReferencesPage = lazy(() => import('./pages/ReferencesPage'))
const FormationPage = lazy(() => import('./pages/FormationPage'))
const FormationRLPage = lazy(() => import('./pages/FormationRLPage'))
const FormationVillePage = lazy(() => import('./pages/FormationVillePage'))
const FormationProgrammePage = lazy(() => import('./pages/FormationProgrammePage'))
const AProposPage = lazy(() => import('./pages/AProposPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ConfidentialitePage = lazy(() => import('./pages/ConfidentialitePage'))
const DimensionnementEntrepotPage = lazy(() => import('./pages/DimensionnementEntrepotPage'))
const ProductiviteEnginsPage = lazy(() => import('./pages/ProductiviteEnginsPage'))
const CoutGlobalEntrepotPage = lazy(() => import('./pages/CoutGlobalEntrepotPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const DemoWmsPage = lazy(() => import('./pages/DemoWmsPage'))
const DemoTmsPage = lazy(() => import('./pages/DemoTmsPage'))
const DemoApsPage = lazy(() => import('./pages/DemoApsPage'))
const CarrierePage = lazy(() => import('./pages/CarrierePage'))
const DirecteurLogistiqueMiTempsPage = lazy(() => import('./pages/DirecteurLogistiqueMiTempsPage'))
const DirecteurAchatsMiTempsPage = lazy(() => import('./pages/DirecteurAchatsMiTempsPage'))
const DirectionSCTempsPartagePage = lazy(() => import('./pages/DirectionSCTempsPartagePage'))
const DscVsRecrutementCdiPage = lazy(() => import('./pages/DscVsRecrutementCdiPage'))
const SystemeLandingPage = lazy(() => import('./pages/SystemeLandingPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="page-loading" role="status">Chargement…</div>}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/conseil" element={<PageTransition><ConseilPage /></PageTransition>} />
        <Route path="/conseil-wms" element={<PageTransition><SystemeLandingPage solution="wms" /></PageTransition>} />
        <Route path="/conseil-tms" element={<PageTransition><SystemeLandingPage solution="tms" /></PageTransition>} />
        <Route path="/gestion-inventaires-ims" element={<PageTransition><SystemeLandingPage solution="ims" /></PageTransition>} />
        <Route path="/control-tower" element={<PageTransition><SystemeLandingPage solution="controlTower" /></PageTransition>} />
        <Route path="/prestations" element={<PageTransition><PrestationsPage /></PageTransition>} />
        <Route path="/services" element={<ServicesRedirect />} />
        <Route path="/references" element={<PageTransition><ReferencesPage /></PageTransition>} />
        <Route path="/formation" element={<PageTransition><FormationPage /></PageTransition>} />
        {/* Le canon (sitemap.xml, llms.txt, liens internes) utilise l'URL avec
            slash final ; on enregistre les deux formes pour ne rien casser. */}
        <Route path="/formation-rl" element={<PageTransition><FormationRLPage /></PageTransition>} />
        <Route path="/formation-rl/" element={<PageTransition><FormationRLPage /></PageTransition>} />
        <Route path="/formation-logistique-:ville" element={<PageTransition><FormationVillePage /></PageTransition>} />
        <Route path="/formation/:programme" element={<PageTransition><FormationProgrammePage /></PageTransition>} />
        <Route path="/a-propos" element={<PageTransition><AProposPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/confidentialite" element={<PageTransition><ConfidentialitePage /></PageTransition>} />
        <Route path="/outils/dimensionnement-entrepot" element={<PageTransition><DimensionnementEntrepotPage /></PageTransition>} />
        <Route path="/outils/productivite-engins-main-doeuvre" element={<PageTransition><ProductiviteEnginsPage /></PageTransition>} />
        <Route path="/outils/cout-global-entrepot" element={<PageTransition><CoutGlobalEntrepotPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="/demo/wms" element={<PageTransition><DemoWmsPage /></PageTransition>} />
        <Route path="/demo/tms" element={<PageTransition><DemoTmsPage /></PageTransition>} />
        <Route path="/demo/aps" element={<PageTransition><DemoApsPage /></PageTransition>} />
        <Route path="/carriere" element={<PageTransition><CarrierePage /></PageTransition>} />
        <Route path="/directeur-logistique-mi-temps" element={<PageTransition><DirecteurLogistiqueMiTempsPage /></PageTransition>} />
        <Route path="/directeur-achats-mi-temps" element={<PageTransition><DirecteurAchatsMiTempsPage /></PageTransition>} />
        <Route path="/direction-supply-chain-temps-partage" element={<PageTransition><DirectionSCTempsPartagePage /></PageTransition>} />
        <Route path="/dsc-vs-recrutement-cdi" element={<PageTransition><DscVsRecrutementCdiPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  )
}
