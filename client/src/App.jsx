import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
     <Toaster
        position="top-center"
        visibleToasts={1}
        richColors={false}
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#333333',
            border: '1px solid #dddddd',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }}
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
