import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Calendar from './pages/Calendar';
import Speakers from './pages/Speakers';
import Organizations from './pages/Organizations';
import Venues from './pages/Venues';
import AdminDashboard from './pages/AdminDashboard';
import HostDashboard from './pages/HostDashboard';
import GuestDashboard from './pages/GuestDashboard';
import Login from './pages/Login';
import OrganizationDetail from './pages/OrganizationDetail';
import SpeakerDetail from './pages/SpeakerDetail';
import VenueDetail from './pages/VenueDetail';
import Community from './pages/Community';
import MemberProfile from './pages/MemberProfile';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import VenueMarketplace from './pages/VenueMarketplace';
import VenueMarketplaceDetail from './pages/VenueMarketplaceDetail';
import SideEvents from './pages/SideEvents';
import CorporateHouses from './pages/CorporateHouses';
import NetworkingEngine from './pages/NetworkingEngine';
import Concierge from './pages/Concierge';
import MediaIntelligence from './pages/MediaIntelligence';
import VendorMarketplace from './pages/VendorMarketplace';
import SupplierPortal from './pages/SupplierPortal';
import B2BHub from './pages/B2BHub';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/speakers" element={<Speakers />} />
                <Route path="/speakers/:id" element={<SpeakerDetail />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/organizations/:id" element={<OrganizationDetail />} />
                <Route path="/venues" element={<Venues />} />
                <Route path="/venues/:id" element={<VenueDetail />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/host" element={<HostDashboard />} />
                <Route path="/profile" element={<GuestDashboard />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/:id" element={<MemberProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotels/:id" element={<HotelDetail />} />
                <Route path="/marketplace/venues" element={<VenueMarketplace />} />
                <Route path="/marketplace/venues/:id" element={<VenueMarketplaceDetail />} />
                <Route path="/side-events" element={<SideEvents />} />
                <Route path="/corporate-houses" element={<CorporateHouses />} />
                <Route path="/networking" element={<NetworkingEngine />} />
                <Route path="/concierge" element={<Concierge />} />
                <Route path="/marketplace/vendors" element={<VendorMarketplace />} />
                <Route path="/marketplace/supplier-portal" element={<SupplierPortal />} />
                <Route path="/marketplace/hub" element={<B2BHub />} />
                <Route path="/media" element={<MediaIntelligence />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
