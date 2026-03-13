import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Menu, User, ArrowRightFromLine, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-wef-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                
                {/* Left side: Menu and Search */}
                <div className="flex items-center gap-4 flex-1">
                    <button 
                        onClick={toggleMenu}
                        className="text-wef-dark hover:text-wef-blue transition-colors flex items-center justify-center p-1 rounded hover:bg-wef-gray"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <button className="text-wef-dark hover:text-wef-blue transition-colors hidden sm:flex items-center justify-center p-1 rounded hover:bg-wef-gray">
                        <Search size={22} />
                    </button>
                </div>

                {/* Center: WEF Logo */}
                <div className="flex-1 flex justify-center items-center">
                    <Link to="/" onClick={closeMenu} className="flex flex-col items-center justify-center text-center leading-none text-wef-dark font-sans group">
                        <span className="text-[10px] tracking-widest font-semibold uppercase">World</span>
                        <span className="text-[10px] tracking-widest font-semibold uppercase">Economic</span>
                        <span className="text-[10px] tracking-widest font-semibold uppercase">Forum</span>
                    </Link>
                </div>

                {/* Right side: Nav Items & Auth */}
                <div className="flex items-center justify-end gap-4 h-full flex-1">
                    
                    {/* User Specific Nav */}
                    <div className="flex items-center h-full pt-1">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-6">
                                {user?.role === 'host' && (
                                    <Link to="/host" className="text-[13px] font-semibold text-wef-dark hover:text-wef-blue hidden lg:block transition-colors">Host Dashboard</Link>
                                )}
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="text-[13px] font-semibold text-wef-dark hover:text-wef-blue hidden lg:block transition-colors">Admin Panel</Link>
                                )}
                                {user?.role === 'guest' && (
                                    <Link to="/profile" className="text-[13px] font-semibold text-wef-dark hover:text-wef-blue hidden lg:block transition-colors">My Tickets</Link>
                                )}
                                <div className="relative flex flex-col items-center justify-center cursor-pointer group h-full">
                                    <div className="h-8 w-8 rounded-full bg-wef-gray border border-wef-border flex items-center justify-center overflow-hidden text-wef-blue group-hover:bg-blue-50 transition-colors">
                                        <User size={18} />
                                    </div>
                                    
                                    {/* Simple Dropdown Menu */}
                                    <div className="absolute top-12 right-0 w-48 bg-white border border-wef-border rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col pt-2 pb-2">
                                        <div className="px-4 py-2 border-b border-wef-border">
                                            <p className="text-sm font-semibold text-wef-dark truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                        </div>
                                        <Link to="/profile" className="px-4 py-2 text-sm text-gray-600 hover:bg-wef-gray hover:text-wef-blue transition-colors">View Profile</Link>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 text-sm text-gray-600 hover:bg-wef-gray hover:text-wef-blue transition-colors text-left flex items-center gap-2"
                                        >
                                            <ArrowRightFromLine size={16}/> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="bg-wef-blue hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-colors border border-wef-blue shadow-sm">
                                    Join us
                                </Link>
                                <Link to="/login" className="bg-white hover:bg-wef-gray text-wef-blue text-[13px] font-semibold px-5 py-2 rounded-full transition-colors border border-wef-blue hidden sm:block">
                                    Sign in
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Information Architecture Super Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white border-b border-wef-border shadow-2xl min-h-[calc(100vh-64px)] h-auto pb-24 overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="mb-10 pb-4 border-b border-wef-border flex justify-between items-end">
                            <div>
                                <h2 className="text-3xl font-bold text-wef-dark tracking-tight">Davos Companion Directory</h2>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Comprehensive Operations System IA</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
                            {/* 2. Home Section */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Home & Pulse</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors">Platform Home</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Latest Updates</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">WEF Week Quick Guide</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Featured Events</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Popular Dining Spots</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Important Alerts</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Weather & Conditions</Link></li>
                                </ul>
                            </div>

                            {/* 3. Annual Meeting Section */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Annual Meeting</h3>
                                <ul className="space-y-2">
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">About the Annual Meeting</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Meeting Theme</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Key Speakers</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Participant Categories</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Security Zones Explained</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">WEF History Timeline</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">How Davos Works During WEF</Link></li>
                                </ul>
                            </div>

                            {/* 5. Events & Agenda */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Events & Agenda</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/calendar" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors">Master Event Calendar</Link></li>
                                    <li><Link to="/calendar" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Daily Agenda</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Industry Events</Link></li>
                                    <li><Link to="/side-events" onClick={closeMenu} className="text-sm tracking-tight font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Side Events & Public Events</Link></li>
                                    <li><Link to="/side-events" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Invite-Only Events</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Startup & Investor Events</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Event Search & Submit</Link></li>
                                </ul>
                            </div>

                            {/* 6. Venues & Map */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Venues & Map</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/venues" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors">All Venues & Map</Link></li>
                                    <li><Link to="/venues" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Congress Centre</Link></li>
                                    <li><Link to="/corporate-houses" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Corporate & Country Houses</Link></li>
                                    <li><Link to="/venues" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Interactive Davos Map</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Walking & Shuttle Routes</Link></li>
                                </ul>
                            </div>

                            {/* 7 & 8. Logistics */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Logistics & Living</h3>
                                <ul className="space-y-2">
                                    <li><Link to="#" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors">Restaurants & Dining</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Fine Dining & Business Lunch</Link></li>
                                    <li><Link to="/hotels" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Hotels & Accommodation</Link></li>
                                    <li><Link to="/hotels" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Luxury Hotels & Chalets</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Travel & Transport</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Helicopters, Cabs, Trains</Link></li>
                                </ul>
                            </div>

                            {/* 10. Networking & Lounges */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Networking Systems</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/community" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors">Attendee Directory</Link></li>
                                    <li><Link to="/organizations" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Company Directory</Link></li>
                                    <li><Link to="/networking" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Meeting Scheduler</Link></li>
                                    <li><Link to="/networking" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">AI Meeting Match</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Lounges & Corporate Houses</Link></li>
                                    <li><Link to="/corporate-houses" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Partner & Invite-Only Lounges</Link></li>
                                </ul>
                            </div>

                            {/* 12, 13, 14. Support & City */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Support & City Intel</h3>
                                <ul className="space-y-2">
                                    <li><Link to="#" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors">Emergency & Safety</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Security Zones & Clinics</Link></li>
                                    <li><Link to="/concierge" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Executive Concierge</Link></li>
                                    <li><Link to="/concierge" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">VIP Booking & Assistants</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">Davos City Guide</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Shopping, Skiing, Culture</Link></li>
                                </ul>
                            </div>

                            {/* 15, 17. Media & Business */}
                             <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Business & Operations</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/marketplace/hub" onClick={closeMenu} className="text-sm font-bold text-wef-blue hover:text-blue-700 transition-colors">B2B Solutions Hub</Link></li>
                                    <li><Link to="/marketplace/venues" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Venue Procurement</Link></li>
                                    <li><Link to="/marketplace/vendors" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Supplier Directory</Link></li>
                                    <li><Link to="/media" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors mt-2 block">Media Intelligence Hub</Link></li>
                                    <li><Link to="/media" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Press Releases & Streams</Link></li>
                                </ul>
                            </div>
                            
                            {/* 16, 18. System */}
                            <div>
                                <h3 className="text-sm font-bold text-wef-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-wef-border pb-2">Account & System</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/profile" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors">User Dashboard</Link></li>
                                    <li><Link to="/marketplace/hub" onClick={closeMenu} className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">B2B Hub & Portal</Link></li>
                                    <li><Link to="/marketplace/supplier-portal" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors pl-4 border-l border-gray-100">Supplier Command Center</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">My Bookings & Meetings</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Saved Places & Events</Link></li>
                                    <li><Link to="/admin" onClick={closeMenu} className="text-sm font-bold text-wef-dark hover:text-wef-blue transition-colors mt-2 block">System Administration</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">About Companion App Platform</Link></li>
                                    <li><Link to="#" onClick={closeMenu} className="text-sm text-gray-600 hover:text-wef-blue transition-colors">Data & Privacy Policy</Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
