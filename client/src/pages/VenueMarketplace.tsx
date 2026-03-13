import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Users, Video, ShieldAlert, Sliders, LayoutDashboard, CheckCircle2, ArrowRight } from 'lucide-react';

export const mockMarketplaceVenues = [
    {
        id: "vm-1",
        name: "Parsenn Panorama Chalet",
        type: "Private chalet",
        address: "Promenade 114, Davos Dorf",
        capacity: "50-120",
        distance: "1.2 km",
        security: "Orange Zone",
        price: "CHF 15,000 / day",
        eventsSupported: ["Private dinners", "Roundtables", "Networking receptions"],
        amenities: ["Floor plans available", "High Security", "Catering Kitchen", "Helipad access"],
        av: true,
        image_url: "https://images.unsplash.com/photo-1518733057094-9585314f69f0?auto=format&fit=crop&q=80&w=800",
        rating: 4.9
    },
    {
        id: "vm-2",
        name: "Davos Platz Congress Hall B",
        type: "Conference hall",
        address: "Talstrasse 49, Davos Platz",
        capacity: "300-500",
        distance: "0.1 km",
        security: "Red Zone (Badge Required)",
        price: "CHF 35,000 / day",
        eventsSupported: ["Panel discussions", "Press briefings", "Startup showcases"],
        amenities: ["3D Virtual Tour", "Translation Booths", "Media Rigging", "Green Room"],
        av: true,
        image_url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
        rating: 5.0
    },
    {
        id: "vm-3",
        name: "The Belvedere Grand Room",
        type: "Hotel",
        address: "Promenade 89, Davos Platz",
        capacity: "100-250",
        distance: "0.3 km",
        security: "Red Zone (Badge Required)",
        price: "CHF 25,000 / day",
        eventsSupported: ["Networking receptions", "Investor meetings", "Private dinners"],
        amenities: ["Michelin Catering", "Valet", "VIP Entrances"],
        av: true,
        image_url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
        rating: 4.8
    },
    {
        id: "vm-4",
        name: "Alpine Pop-up Pavilion",
        type: "Pop-up venue",
        address: "Kurpark, Davos Platz",
        capacity: "200-400",
        distance: "0.5 km",
        security: "Yellow Zone",
        price: "CHF 12,000 / day",
        eventsSupported: ["Startup showcases", "Networking receptions"],
        amenities: ["Modular Floor Plan", "Branding Wrapped", "Fast WiFi", "Public Access"],
        av: false,
        image_url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
        rating: 4.5
    },
    {
        id: "vm-5",
        name: "Villa Dischma Estate",
        type: "Private villa",
        address: "Dischmastrasse 22, Davos Dorf",
        capacity: "20-50",
        distance: "2.1 km",
        security: "Unrestricted",
        price: "CHF 8,000 / day",
        eventsSupported: ["Private dinners", "Investor meetings", "Roundtables"],
        amenities: ["Complete Privacy", "Private Chef", "Wine Cellar", "Chauffeur Parking"],
        av: true,
        image_url: "https://images.unsplash.com/photo-1552554699-db015ebd335d?auto=format&fit=crop&q=80&w=800",
        rating: 4.7
    }
];

const VenueMarketplace = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const venueTypes = ['All', 'Private chalet', 'Conference hall', 'Hotel', 'Pop-up venue', 'Private villa', 'Corporate houses', 'Restaurants'];

    const filteredVenues = activeFilter === 'All' 
        ? mockMarketplaceVenues 
        : mockMarketplaceVenues.filter(v => v.type === activeFilter);

    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Sequence */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-wef-dark pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2 py-1 bg-wef-dark text-white text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm">
                            <Building size={12} /> Hosts & Organizers
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-wef-dark mb-2 tracking-tight">
                            Venue Marketplace
                        </h1>
                        <p className="text-gray-500 font-serif text-lg max-w-2xl">
                            Procure, configure, and secure official hosting spaces for the Annual Meeting. From private chalets to Congress Centre halls.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white border border-wef-border text-wef-dark text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:-translate-y-1 transition-transform shadow-sm">
                            List Your Property
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Filters - Enterprise Grade */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Type Filter */}
                        <div className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm">
                            <h3 className="text-sm font-bold text-wef-dark mb-4 uppercase tracking-widest flex items-center gap-2">
                                <LayoutDashboard size={16} className="text-wef-blue"/> Venue Type
                            </h3>
                            <div className="space-y-2">
                                {venueTypes.map(type => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            name="venueType"
                                            className="w-4 h-4 text-wef-blue border-gray-300 focus:ring-wef-blue"
                                            checked={activeFilter === type}
                                            onChange={() => setActiveFilter(type)}
                                        />
                                        <span className={`text-sm ${activeFilter === type ? 'font-bold text-wef-blue' : 'text-gray-600 group-hover:text-wef-blue'}`}>
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Parametric Filters */}
                        <div className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-wef-dark mb-3 uppercase tracking-widest">Capacity</h3>
                                <input type="range" className="w-full accent-wef-blue mb-2" />
                                <div className="flex justify-between text-xs text-gray-500 font-bold">
                                    <span>10 pax</span>
                                    <span>1000+ pax</span>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-bold text-wef-dark mb-3 uppercase tracking-widest">Security Clearance</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 text-wef-blue" defaultChecked/><span className="text-sm text-gray-700">Red Zone (Badge Reqd)</span></label>
                                    <label className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 text-wef-blue"/><span className="text-sm text-gray-700">Orange Zone</span></label>
                                    <label className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 text-wef-blue"/><span className="text-sm text-gray-700">Unrestricted</span></label>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-wef-dark mb-3 uppercase tracking-widest">Tech & AV</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 text-wef-blue" defaultChecked/><span className="text-sm text-gray-700">Integrated AV System</span></label>
                                    <label className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 text-wef-blue"/><span className="text-sm text-gray-700">Livestream Ready</span></label>
                                    <label className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 text-wef-blue"/><span className="text-sm text-gray-700">Translation Booths</span></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Directory */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{filteredVenues.length} available properties</span>
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wef-dark border border-gray-300 px-3 py-1.5 rounded-sm hover:border-wef-blue">
                                <Sliders size={14}/> Sort: Relevance
                            </button>
                        </div>

                        <div className="space-y-6">
                            {filteredVenues.map(venue => (
                                <div key={venue.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-lg hover:border-wef-blue transition-all group">
                                    {/* Media */}
                                    <div className="w-full md:w-72 h-48 md:h-auto relative overflow-hidden shrink-0 cursor-pointer">
                                        <img src={venue.image_url} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 left-2 bg-wef-blue text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-md">
                                            {venue.type}
                                        </div>
                                        {venue.amenities.includes("3D Virtual Tour") && (
                                            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                                                <Video size={12}/> 3D Tour
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Intelligence */}
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <Link to={`/marketplace/venues/${venue.id}`}>
                                                    <h3 className="text-2xl font-bold text-wef-dark group-hover:text-wef-blue transition-colors leading-tight">{venue.name}</h3>
                                                </Link>
                                                <div className="text-right shrink-0 ml-4 hidden sm:block">
                                                    <div className="text-lg font-bold text-wef-dark">{venue.price}</div>
                                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">Base Rate</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-gray-600 mb-4">
                                                <span className="flex items-center gap-1"><MapPin size={14} className="text-wef-blue" /> {venue.distance} to Congress</span>
                                                <span className="flex items-center gap-1"><Users size={14} className="text-wef-blue" /> {venue.capacity} Pax</span>
                                                <span className="flex items-center gap-1"><ShieldAlert size={14} className="text-red-500" /> {venue.security}</span>
                                            </div>

                                            <p className="text-sm font-bold text-gray-500 mb-2">Ideal for:</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {venue.eventsSupported.map((evt, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-wef-dark px-2 py-1 text-[10px] uppercase font-bold tracking-widest border border-gray-200 rounded-sm">
                                                        {evt}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex flex-wrap gap-3">
                                                 {venue.amenities.slice(0,2).map((amenity, idx) => (
                                                     <span key={idx} className="flex items-center gap-1 text-xs font-bold text-green-700">
                                                         <CheckCircle2 size={12} className="text-green-500"/> {amenity}
                                                     </span>
                                                 ))}
                                            </div>
                                            <Link to={`/marketplace/venues/${venue.id}`} className="w-full sm:w-auto bg-wef-dark hover:bg-wef-blue text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                                                Request Booking <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueMarketplace;
