import './index.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ReferencesPage from './pages/ReferencesPage'
import FormationPage from './pages/FormationPage'
import AProposPage from './pages/AProposPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import DimensionnementEntrepotPage from './pages/DimensionnementEntrepotPage'
import ProductiviteEnginsPage from './pages/ProductiviteEnginsPage'
import CoutGlobalEntrepotPage from './pages/CoutGlobalEntrepotPage'
import FaqPage from './pages/FaqPage'
import DemoWmsPage from './pages/DemoWmsPage'
import DemoTmsPage from './pages/DemoTmsPage'
import DemoApsPage from './pages/DemoApsPage'

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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/references" element={<PageTransition><ReferencesPage /></PageTransition>} />
        <Route path="/formation" element={<PageTransition><FormationPage /></PageTransition>} />
        <Route path="/a-propos" element={<PageTransition><AProposPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/outils/dimensionnement-entrepot" element={<PageTransition><DimensionnementEntrepotPage /></PageTransition>} />
        <Route path="/outils/productivite-engins-main-doeuvre" element={<PageTransition><ProductiviteEnginsPage /></PageTransition>} />
        <Route path="/outils/cout-global-entrepot" element={<PageTransition><CoutGlobalEntrepotPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="/demo/wms" element={<PageTransition><DemoWmsPage /></PageTransition>} />
        <Route path="/demo/tms" element={<PageTransition><DemoTmsPage /></PageTransition>} />
        <Route path="/demo/aps" element={<PageTransition><DemoApsPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><HomePage /></PageTransition>} />
      </Routes>
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
