import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationMenu from './components/NavigationMenu';
import ContactInfo  from './components/ContactInfo'




import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import PortfolioPage from './pages/PortfolioPage';
// import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <NavigationMenu />


      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/portfolio" element={<PortfolioPage />} /> */}
        {/* <Route path="/shop" element={<ShopPage />} /> */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <ContactInfo />
    </Router>
  );
}

export default App;
