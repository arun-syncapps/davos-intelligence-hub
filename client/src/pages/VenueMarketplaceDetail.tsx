import { useParams, Link } from 'react-router-dom';
import { mockMarketplaceVenues } from './VenueMarketplace';
import { MapPin, Users, ShieldAlert, CheckCircle2, ArrowLeft, Video, Building, Share, Settings2, FileText, Calendar as CalendarIcon } from 'lucide-react';

const VenueMarketplaceDetail = () => {
    const { id } = useParams();
    const venue = mockMarketplaceVenues.find(v => v.id === id);

    if (!venue) return <div className="py-32 text-center text-gray-500 font-mono">B2B Venue not found in registry.</div>;

    const floorPlans = [
        { name: "Ground Floor Panel Setup", capacity: "300 theater / 150 banquet", file: "PDF Layout" },
        { name: "Upper Level Networking", capacity: "200 standing", file: "AutoCAD File" },
    ];

    return (
        <div className="bg-wef-gray min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/marketplace/venues" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-wef-blue mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Venue Marketplace
                </Link>

                {/* Top Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="bg-wef-dark text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">Official Listing</span>
                             <span className="text-[12px] font-bold text-wef-dark tracking-widest uppercase border border-gray-300 px-2 py-0.5 rounded-sm bg-white">
                                 {venue.type}
                             </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-wef-dark tracking-tight">{venue.name}</h1>
                        <p className="flex items-center gap-2 text-wef-blue font-bold text-sm mt-2">
                             <MapPin size={16}/> {venue.address} • <span className="text-gray-500 font-normal">{venue.distance} from Congress</span>
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-4 border border-wef-border rounded-sm shadow-sm md:flex-col md:items-end md:ml-auto shrink-0 w-full md:w-auto">
                         <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Leasing Base Rate</div>
                         <div className="text-2xl font-bold text-wef-dark tracking-tight">{venue.price}</div>
                         <button className="hidden md:flex text-gray-400 hover:text-wef-blue transition-colors mt-2"><Share size={18}/></button>
                    </div>
                </div>

                {/* Hero Media Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-10 h-[400px] sm:h-[500px] rounded-sm overflow-hidden border border-wef-border">
                    <div className="lg:col-span-3 h-full relative group">
                        <img src={venue.image_url} alt={venue.name} className="w-full h-full object-cover group-hover:opacity-95 transition-opacity" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm flex items-center gap-2 shadow-lg">
                            <Video size={16}/> Start 3D Virtual Tour
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/95 text-wef-dark text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-lg hover:bg-wef-blue hover:text-white transition-colors cursor-pointer">
                            View Full Gallery (32)
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-col gap-2 h-full">
                        <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=400" alt="Room 1" className="w-full h-1/2 object-cover hover:opacity-95 transition-opacity" />
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" alt="Room 2" className="w-full h-1/2 object-cover hover:opacity-95 transition-opacity" />
                    </div>
                </div>

                {/* Layout System */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Panel: Deep Dive Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Capabilities */}
                        <div className="bg-white border border-wef-border p-8 rounded-sm">
                            <h2 className="text-xl font-bold text-wef-dark tracking-tight mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                                <Settings2 className="text-wef-blue"/> Supported Event Formats
                            </h2>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {venue.eventsSupported.map((format, idx) => (
                                    <div key={idx} className="bg-blue-50 border border-blue-100 px-4 py-2 text-wef-blue font-bold text-sm tracking-widest rounded-sm flex items-center gap-2">
                                        <CheckCircle2 size={16}/> {format}
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-700 font-serif leading-relaxed">
                                Officially cleared to host high-tier networking and broadcasting events. Modular setup allows transitioning from plenary sessions to private banquets within 4 hours.
                            </p>
                        </div>

                        {/* Capacity & Specs */}
                        <div className="bg-white border border-wef-border p-8 rounded-sm">
                            <h2 className="text-xl font-bold text-wef-dark tracking-tight mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                                <Building className="text-wef-blue"/> Technical Specifications
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Max Capacity</div>
                                    <div className="text-xl font-bold text-wef-dark flex items-center gap-2"><Users size={18} className="text-wef-blue"/> {venue.capacity}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Security Zone</div>
                                    <div className="text-sm font-bold text-wef-dark flex items-center gap-2 leading-tight">
                                        <ShieldAlert size={16} className={venue.security.includes("Red") ? "text-red-500" : "text-yellow-500"}/> 
                                        {venue.security}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">AV Infrastructure</div>
                                    <div className="text-sm font-bold text-wef-dark">{venue.av ? 'Fully Integrated AV & Comms' : 'Bring Your Own Tech'}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Logistics / Loading</div>
                                    <div className="text-sm font-bold text-wef-dark">Rear Bay, 24/7 Access</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 grid md:grid-cols-2 gap-4">
                                {venue.amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                        <div className="w-2 h-2 rounded-full bg-wef-blue"></div> {amenity}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floor Plans Database */}
                        <div className="bg-white border border-wef-border p-8 rounded-sm">
                             <h2 className="text-xl font-bold text-wef-dark tracking-tight mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                                <FileText className="text-wef-blue"/> Floor Plans & Schematics
                            </h2>
                            <div className="space-y-4">
                                {floorPlans.map((plan, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 border border-gray-200 hover:border-wef-blue hover:bg-wef-gray transition-colors rounded-sm group cursor-pointer">
                                        <div>
                                            <h4 className="font-bold text-wef-dark group-hover:text-wef-blue transition-colors">{plan.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Capacity Docs: {plan.capacity}</p>
                                        </div>
                                        <div className="text-xs bg-wef-dark text-white px-3 py-1 font-bold uppercase tracking-widest rounded-sm border border-gray-400 shadow-sm leading-none flex items-center gap-2">
                                            Download {plan.file}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Panel: Procurement Engine */}
                    <div className="lg:col-span-1 space-y-6 lg:pl-4">
                        
                        {/* Interactive Booking Module */}
                        <div className="bg-[#103070] shadow-xl rounded-sm p-6 sticky top-24 border border-[#1b3d8c]">
                            <h3 className="text-white font-bold text-xl mb-4 border-b border-white/20 pb-3 flex items-center gap-2">
                                <CalendarIcon className="text-blue-300"/> Booking Engine
                            </h3>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-[10px] text-blue-200 uppercase font-bold tracking-widest block mb-1">Select Lease Dates</label>
                                    <select className="w-full bg-white/10 text-white border border-white/20 px-3 py-2 rounded-sm text-sm font-bold focus:outline-none focus:border-white">
                                        <option className="text-wef-dark">Jan 12 - Jan 14 (Full Buyout)</option>
                                        <option className="text-wef-dark">Jan 15 (Single Day)</option>
                                        <option className="text-wef-dark">Jan 16 (Single Day)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] text-blue-200 uppercase font-bold tracking-widest block mb-1">Target Event Format</label>
                                    <select className="w-full bg-white/10 text-white border border-white/20 px-3 py-2 rounded-sm text-sm font-bold focus:outline-none focus:border-white">
                                        {venue.eventsSupported.map((opt, i) => <option key={i} className="text-wef-dark">{opt}</option>)}
                                        <option className="text-wef-dark">Other Configuration</option>
                                    </select>
                                </div>
                            </div>

                            <button className="w-full bg-white hover:bg-blue-50 text-wef-blue font-bold text-sm tracking-widest uppercase py-3 rounded-sm shadow-lg transition-transform hover:-translate-y-0.5">
                                Request Procurement
                            </button>
                            
                            <p className="text-center text-[10px] text-blue-200 mt-4 uppercase tracking-widest">
                                Standard SLAs apply. Review takes 48hrs.
                            </p>

                            <div className="mt-8 pt-4 border-t border-white/20">
                                <button className="w-full border border-blue-400 hover:bg-white/10 text-white font-bold text-xs tracking-widest uppercase py-2 rounded-sm transition-colors">
                                    Message Venue Rep
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueMarketplaceDetail;
