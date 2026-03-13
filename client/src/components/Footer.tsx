import { Globe, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-wef-dark text-white pt-20 pb-12 border-t-4 border-wef-blue mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Top Section - Primary Navigation IA mapping */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 mb-20">
                    
                    {/* Annual Meeting */}
                    <div>
                        <h3 className="text-wef-blue font-bold text-xs uppercase tracking-widest mb-6">Annual Meeting</h3>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link to="#" className="hover:text-white transition-colors">Meeting Overview</Link></li>
                            <li><Link to="/calendar" className="hover:text-white transition-colors">Master Agenda</Link></li>
                            <li><Link to="/speakers" className="hover:text-white transition-colors">Key Speakers</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Delegate Guide</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Security Zones</Link></li>
                        </ul>
                    </div>

                    {/* Infrastructure */}
                    <div>
                        <h3 className="text-wef-blue font-bold text-xs uppercase tracking-widest mb-6">Venues & Map</h3>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link to="/venues" className="hover:text-white transition-colors">Interactive Geospatial Map</Link></li>
                            <li><Link to="/venues" className="hover:text-white transition-colors">Congress Centre Alpha</Link></li>
                            <li><Link to="/corporate-houses" className="hover:text-white transition-colors">Corporate Houses & Pavilions</Link></li>
                            <li><Link to="/venues" className="hover:text-white transition-colors">Walking & Shuttle Routes</Link></li>
                        </ul>
                    </div>

                    {/* City & Living */}
                    <div>
                        <h3 className="text-wef-blue font-bold text-xs uppercase tracking-widest mb-6">City & Lifestyle</h3>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link to="#" className="hover:text-white transition-colors">Davos City Guide</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Restaurants & Dining</Link></li>
                            <li><Link to="/hotels" className="hover:text-white transition-colors">Hotels & Chalets</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Travel & Transport</Link></li>
                        </ul>
                    </div>

                    {/* Ecosystem */}
                    <div>
                        <h3 className="text-wef-blue font-bold text-xs uppercase tracking-widest mb-6">Networking Hub</h3>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link to="/community" className="hover:text-white transition-colors">Member Directory</Link></li>
                            <li><Link to="/organizations" className="hover:text-white transition-colors">Partner Organizations</Link></li>
                            <li><Link to="/corporate-houses" className="hover:text-white transition-colors">Partner Lounges</Link></li>
                            <li><Link to="/networking" className="hover:text-white transition-colors">AI Matchmaking Engine</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-wef-blue font-bold text-xs uppercase tracking-widest mb-6">Priority Support</h3>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link to="#" className="hover:text-white transition-colors">Emergency Protocol</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Secured Clinics</Link></li>
                            <li><Link to="/concierge" className="hover:text-white transition-colors">Executive Concierge</Link></li>
                            <li><Link to="/concierge" className="hover:text-white transition-colors">VIP Transport Detail</Link></li>
                        </ul>
                    </div>

                    {/* Corporate */}
                    <div>
                        <h3 className="text-wef-blue font-bold text-xs uppercase tracking-widest mb-6">Operations & B2B</h3>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link to="/marketplace/hub" className="text-white font-bold hover:text-wef-blue transition-colors">B2B Solutions Hub</Link></li>
                            <li><Link to="/marketplace/venues" className="hover:text-white transition-colors">Venue Procurement</Link></li>
                            <li><Link to="/marketplace/vendors" className="hover:text-white transition-colors">Supplier Marketplace</Link></li>
                            <li><Link to="/marketplace/supplier-portal" className="hover:text-white transition-colors">Supplier Command Center</Link></li>
                            <li><Link to="/media" className="hover:text-white transition-colors">Media Intelligence</Link></li>
                            <li><Link to="/profile" className="hover:text-white transition-colors font-bold text-wef-blue mt-4 flex items-center gap-1">Delegate Dashboard <ArrowRight size={12}/></Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section - Legal, Langs, Socials */}
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end border-t border-white/20 pt-10 gap-8">
                    
                    {/* Brand & Copyright */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Link to="/" className="flex flex-col items-center lg:items-start leading-none text-white font-sans group mb-6">
                            <span className="text-[12px] tracking-widest font-bold uppercase">World</span>
                            <span className="text-[12px] tracking-widest font-bold uppercase">Economic</span>
                            <span className="text-[12px] tracking-widest font-bold uppercase">Forum</span>
                        </Link>
                        <p className="text-xs text-gray-500 font-mono">
                            © 2026 World Economic Forum. All rights reserved. <br/>
                            Davos Companion Intelligence Hub.
                        </p>
                        <div className="flex gap-4 mt-4 text-xs font-bold text-gray-400">
                            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link to="#" className="hover:text-white transition-colors">Data Policy</Link>
                        </div>
                    </div>

                    {/* Languages & Social */}
                    <div className="flex flex-col items-center lg:items-end gap-6">
                        <div className="flex flex-wrap justify-center lg:justify-end gap-3 text-xs font-bold text-gray-400">
                             <span className="text-white bg-white/10 px-2 py-1 rounded-sm">EN</span>
                             <Link to="#" className="hover:text-white transition-colors px-2 py-1">DE</Link>
                             <Link to="#" className="hover:text-white transition-colors px-2 py-1">FR</Link>
                             <Link to="#" className="hover:text-white transition-colors px-2 py-1">ES</Link>
                             <Link to="#" className="hover:text-white transition-colors px-2 py-1">中文</Link>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} fill="currentColor"/></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} fill="currentColor"/></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} fill="currentColor"/></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} fill="currentColor" /></a>
                            <button className="flex items-center justify-center p-2 bg-white/10 hover:bg-wef-blue rounded-sm transition-colors text-white ml-2">
                                <Globe size={18} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
