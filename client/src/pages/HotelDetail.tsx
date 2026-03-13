import { useParams, Link } from 'react-router-dom';
import { mockHotels } from './Hotels';
import { MapPin, Navigation, Star, Wifi, Coffee, Wind, Compass, ShieldAlert, CheckCircle2, Share, Heart, ArrowLeft } from 'lucide-react';

const HotelDetail = () => {
    const { id } = useParams();
    const hotel = mockHotels.find(h => h.id === id);

    if (!hotel) return <div className="py-32 text-center text-gray-500 font-mono">Hotel not found in WEF registry.</div>;

    const rooms = [
        { type: "Executive Suite (WEF Allocation)", price: "CHF 2,500/night", size: "65m²", beds: "1 King", pax: 2, tags: ["Secure Zone Check", "VIP Lounge Access", "Breakfast Included"] },
        { type: "Deluxe Alps View (Standard)", price: "CHF 1,800/night", size: "40m²", beds: "1 King", pax: 2, tags: ["Breakfast Included", "Free Cancellation"] },
        { type: "Delegation Staff Room", price: "CHF 950/night", size: "25m²", beds: "2 Twin", pax: 2, tags: ["Non-Refundable", "Shuttle Pass"] }
    ];

    return (
        <div className="bg-wef-gray min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/hotels" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-wef-blue mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Search Results
                </Link>

                {/* Top Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             {Array.from({length: hotel.stars}).map((_, i) => (
                                 <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                             ))}
                             <span className="bg-gray-200 text-wef-dark px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ml-2 rounded-sm border border-gray-300">Hotel</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-wef-dark tracking-tight">{hotel.name}</h1>
                        <p className="flex items-center gap-2 text-wef-blue font-bold text-sm mt-2">
                             <MapPin size={16}/> {hotel.distance}
                             <a href="#" className="underline text-xs ml-2 text-gray-500">Show strictly on Davos Maps</a>
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                         <div className="flex flex-col items-end pr-4 border-r border-gray-300">
                             <span className="text-sm font-bold text-wef-dark">Superb</span>
                             <span className="text-[10px] text-gray-500 uppercase tracking-widest">{hotel.reviews} reviews</span>
                         </div>
                         <div className="bg-wef-dark text-white text-xl font-bold p-3 rounded-sm rounded-tr-xl flex items-center justify-center">
                             {hotel.rating.toFixed(1)}
                         </div>
                         <button className="p-2 border border-wef-border text-wef-dark hover:text-wef-blue hover:border-wef-blue rounded-full transition-colors ml-4 bg-white"><Heart size={20}/></button>
                         <button className="p-2 border border-wef-border text-wef-dark hover:text-wef-blue hover:border-wef-blue rounded-full transition-colors bg-white"><Share size={20}/></button>
                    </div>
                </div>

                {/* Massive Gallery Format */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-10 h-[400px] sm:h-[500px] rounded-sm overflow-hidden">
                    <div className="lg:col-span-2 h-full">
                        <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity" />
                    </div>
                    <div className="hidden lg:grid grid-rows-2 gap-2 h-full">
                        <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=400" alt="Room" className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity" />
                        <div className="relative group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=400" alt="Lobby" className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-white font-bold text-lg underline">+ 42 Photos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description & Intelligence */}
                        <div className="bg-white border border-wef-border p-8 rounded-sm text-gray-700 leading-relaxed font-serif text-lg">
                            <h2 className="text-xl font-bold text-wef-dark font-sans tracking-tight mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                Accomodation Overview
                            </h2>
                            <p className="mb-4">{hotel.description}</p>
                            <p>This premium property is highly sought after by global leaders and C-level executives. It offers distinct meeting spaces tailored for high-stakes bilateral dialogues away from the busy Congress Centre floor.</p>
                            
                            <h3 className="font-bold text-wef-dark font-sans tracking-tight mb-4 mt-8 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <ShieldAlert size={18} className="text-wef-blue"/> Special WEF Protocols
                            </h3>
                            <ul className="list-disc pl-5 font-sans text-sm space-y-2">
                                <li>Property lies within the <strong className="text-wef-dark">Red Security Zone</strong>. Delegate Badges must be visible at all times.</li>
                                <li>Vehicle checks active at the perimeter 24/7. Only registered "Hotel Badge" vehicles permitted entry.</li>
                                <li>Baggage x-ray screening active in the main lobby starting January 12th.</li>
                            </ul>
                        </div>

                        {/* Top Amenities */}
                        <div className="bg-white border border-wef-border p-8 rounded-sm">
                            <h2 className="text-xl font-bold text-wef-dark font-sans tracking-tight mb-6">Most popular facilities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                <div className="flex flex-col items-center gap-2 text-center group">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-wef-dark group-hover:bg-wef-blue group-hover:text-white transition-colors"><Wifi size={24}/></div>
                                    <span className="text-xs font-bold text-gray-700">Free WiFi (Gigabit)</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center group">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-wef-dark group-hover:bg-wef-blue group-hover:text-white transition-colors"><Coffee size={24}/></div>
                                    <span className="text-xs font-bold text-gray-700">Exceptional Breakfast</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center group">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-wef-dark group-hover:bg-wef-blue group-hover:text-white transition-colors"><Navigation size={24}/></div>
                                    <span className="text-xs font-bold text-gray-700">WEF Shuttle Stop</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center group">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-wef-dark group-hover:bg-wef-blue group-hover:text-white transition-colors"><Wind size={24}/></div>
                                    <span className="text-xs font-bold text-gray-700">Spa & Wellness</span>
                                </div>
                            </div>
                        </div>

                        {/* Room Allocation Table */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm overflow-hidden mt-12" id="availability">
                            <div className="bg-wef-dark p-6 text-white flex justify-between items-center">
                                <h2 className="text-xl font-bold tracking-tight">Availability & Allocation</h2>
                                <span className="bg-blue-900 border border-blue-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">WEF Partner Tool</span>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b-2 border-wef-border text-sm font-bold text-wef-dark uppercase tracking-widest whitespace-nowrap">
                                            <th className="p-4 w-1/3 border-r border-gray-200">Accommodation Type</th>
                                            <th className="p-4 text-center border-r border-gray-200">Occupancy</th>
                                            <th className="p-4 border-r border-gray-200">Your Choices</th>
                                            <th className="p-4 w-1/4">Secure Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {rooms.map((room, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="p-4 align-top border-r border-gray-200">
                                                    <h4 className="font-bold text-wef-blue text-lg underline mb-2 cursor-pointer">{room.type}</h4>
                                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600 mb-3">
                                                         <span>{room.size}</span>
                                                         <span>{room.beds}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {room.tags.map((tag, tIdx) => (
                                                            <span key={tIdx} className="text-[9px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 border border-green-200 rounded-sm flex items-center gap-1">
                                                                <CheckCircle2 size={10}/> {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-top text-center border-r border-gray-200">
                                                    <div className="flex justify-center gap-0.5 text-gray-700">
                                                        {Array.from({length: room.pax}).map((_, p) => <div key={p} className="w-3 h-3 bg-gray-400 rounded-full"></div>)}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-top border-r border-gray-200">
                                                    <ul className="text-xs text-gray-700 space-y-2 mb-4">
                                                        <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-green-500 shrink-0"/> Free cancellation before Dec 1</li>
                                                        <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-green-500 shrink-0"/> No prepayment needed</li>
                                                    </ul>
                                                </td>
                                                <td className="p-4 align-top">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div>
                                                            <div className="text-xl font-bold text-wef-dark tracking-tight">{room.price}</div>
                                                            <div className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest">Includes taxes & fees</div>
                                                        </div>
                                                        <button className="w-full bg-wef-blue hover:bg-blue-800 text-white font-bold text-sm px-4 py-3 rounded-sm shadow-sm transition-all focus:ring-4 focus:ring-blue-200">
                                                            Reserve Allocation
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* Right column Sticky logistics */}
                    <div className="lg:col-span-1 border-l border-gray-100 lg:pl-8 space-y-6">
                        
                        {/* Map Embedded Large */}
                        <div className="bg-white border text-center border-wef-border p-2 rounded-sm relative group overflow-hidden">
                            <iframe 
                                title="Map Local" 
                                className="w-full h-48 block grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" 
                                src="https://www.openstreetmap.org/export/embed.html?bbox=9.78,46.78,9.85,46.82&layer=mapnik&marker=46.796,9.821"
                             ></iframe>
                             <div className="absolute inset-x-2 bottom-2 bg-white/95 p-3 flex flex-col items-center justify-center border border-gray-200 shadow-lg group-hover:-translate-y-1 transition-transform">
                                 <Compass size={24} className="text-wef-blue mb-1"/>
                                 <span className="text-xs font-bold text-wef-dark uppercase tracking-widest leading-tight">Excellent location</span>
                                 <span className="text-[11px] text-gray-500 mt-1">{hotel.distance}</span>
                             </div>
                        </div>

                        {/* Quick Action Widget Booking */}
                        <div className="bg-[#EFFFF8] border border-green-200 p-6 rounded-sm">
                            <h3 className="text-green-800 font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                                <CheckCircle2 size={18}/> Delegations Preferred
                            </h3>
                            <p className="text-sm text-green-900 mb-4">Highly rated by top delegates for networking spaces and deep security.</p>
                            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold text-lg py-3 rounded-sm shadow-sm transition-colors text-center"
                                onClick={() => document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' })}>
                                Reserve Now
                            </button>
                        </div>
                        
                        {/* Summary Props box */}
                        <div className="bg-gray-50 border border-gray-200 rounded-sm p-6 text-sm text-gray-700 space-y-4">
                            <h3 className="font-bold text-wef-dark border-b border-gray-200 pb-2">Property Highlights</h3>
                            <div>
                                <strong className="block text-wef-dark">Breakfast info</strong>
                                <span className="flex items-center gap-2 mt-1"><Coffee size={14} className="text-gray-500"/> Continental, Full English</span>
                            </div>
                            <div>
                                <strong className="block text-wef-dark">Loyalty Points</strong>
                                <span className="flex items-center gap-2 mt-1"><Star size={14} className="text-gray-500"/> Not applicable for WEF block bookings</span>
                            </div>
                            <div>
                                <strong className="block text-wef-dark">Arrival / Departure</strong>
                                <span className="flex items-center gap-2 mt-1">Check-in: 15:00 onwards</span>
                                <span className="flex items-center gap-2 mt-1">Check-out: By 12:00</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetail;
