import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, Filter, CheckCircle2, Navigation, Building, ArrowRight } from 'lucide-react';

export const mockHotels = [
    {
        id: "h1",
        name: "Steigenberger Grandhotel Belvédère",
        stars: 5,
        distance: "0.2 km from Congress Centre",
        price: "CHF 1,800",
        rating: 9.2,
        reviews: 428,
        image_url: "https://images.unsplash.com/photo-1551882547-ff40c0d12c56?auto=format&fit=crop&q=80&w=800",
        description: "The historic centrepiece of the Annual Meeting. Features high-security protocols and hosts major bilateral meetings.",
        tags: ["Official HQ", "High Security Zone", "VIP Lounge"],
        available: false
    },
    {
        id: "h2",
        name: "AlpenGold Hotel Davos",
        stars: 5,
        distance: "2.5 km from Congress Centre",
        price: "CHF 1,500",
        rating: 9.0,
        reviews: 350,
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
        description: "Distinctive golden architecture nestled in the Alps. Offers exclusive delegation housing with private helicopter pad access.",
        tags: ["Helipad Access", "Delegation Housing", "Spa"],
        available: true
    },
    {
        id: "h3",
        name: "Hotel Seehof Davos",
        stars: 5,
        distance: "0.8 km from Congress Centre",
        price: "CHF 1,200",
        rating: 8.9,
        reviews: 512,
        image_url: "https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=800",
        description: "Located directly next to the Parsennbahn. Frequent choice for corporate houses and media organizations.",
        tags: ["Corporate Houses", "Media Center", "Fine Dining"],
        available: true
    },
    {
        id: "h4",
        name: "Hard Rock Hotel Davos",
        stars: 4,
        distance: "0.4 km from Congress Centre",
        price: "CHF 850",
        rating: 8.7,
        reviews: 620,
        image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
        description: "Modern, vibrant atmosphere. Popular for evening networking, side events, and startup gatherings.",
        tags: ["Networking Hub", "Rooftop Bar", "Central"],
        available: true
    },
    {
        id: "h5",
        name: "Grischa - DAS Hotel Davos",
        stars: 4,
        distance: "0.3 km from Congress Centre",
        price: "CHF 950",
        rating: 9.1,
        reviews: 380,
        image_url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800",
        description: "Premium boutique hotel facing the Davos Platz station. Hosts multiple private corporate dining events.",
        tags: ["Boutique", "Private Dining", "Transit Hub"],
        available: false
    }
];

const Hotels = () => {
    const [search, setSearch] = useState('');
    const [starFilter, setStarFilter] = useState<number | null>(null);

    const filteredHotels = mockHotels.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
        const matchesStars = starFilter ? h.stars === starFilter : true;
        return matchesSearch && matchesStars;
    });

    return (
        <div className="bg-wef-gray min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-wef-dark pb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-wef-dark mb-2 tracking-tight flex items-center gap-3">
                            <Building className="text-wef-blue" size={40}/>
                            Accommodation & Hotels
                        </h1>
                        <p className="text-gray-500 font-serif text-lg">Official delegation housing, luxury chalets, and secure zones.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar Filters (Booking.com style) */}
                    <div className="lg:col-span-1 space-y-6 hidden md:block">
                        {/* Search Box */}
                        <div className="bg-wef-dark p-1 rounded-sm shadow-md">
                            <div className="bg-white p-4">
                                <h3 className="text-sm font-bold text-wef-dark mb-3 uppercase tracking-widest">Search Properties</h3>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                    <input 
                                        type="text" 
                                        placeholder="Hotel name..." 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-wef-border text-sm focus:outline-none focus:border-wef-blue rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Map Snippet */}
                        <div className="bg-white border border-wef-border rounded-sm overflow-hidden relative h-32 flex items-center justify-center cursor-pointer group">
                             <iframe 
                                title="Map" 
                                className="absolute inset-0 w-full h-full grayscale opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" 
                                src="https://www.openstreetmap.org/export/embed.html?bbox=9.78,46.78,9.85,46.82&layer=mapnik&marker=46.796,9.821"
                             ></iframe>
                             <button className="relative z-10 bg-wef-blue text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg group-hover:bg-blue-800 transition-colors">
                                 Show on Map
                             </button>
                        </div>

                        {/* Filters */}
                        <div className="bg-white border border-wef-border rounded-sm px-5 py-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-wef-dark mb-3 uppercase tracking-widest border-b border-wef-border pb-2 flex items-center gap-2">
                                    <Filter size={16} className="text-wef-blue"/> Star Rating
                                </h3>
                                <div className="space-y-2">
                                    {[5, 4, 3].map(stars => (
                                        <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 text-wef-blue border-gray-300 rounded focus:ring-wef-blue"
                                                checked={starFilter === stars}
                                                onChange={() => setStarFilter(starFilter === stars ? null : stars)}
                                            />
                                            <span className="flex items-center text-sm font-bold text-gray-700 group-hover:text-wef-blue transition-colors">
                                                {stars} <Star size={14} className="ml-1 text-yellow-500 fill-yellow-500"/>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-wef-dark mb-3 uppercase tracking-widest border-b border-wef-border pb-2">
                                    WEF Logistics
                                </h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-wef-blue border-gray-300 rounded focus:ring-wef-blue"/>
                                        <span className="text-sm text-gray-700">High Security Perimeter</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-wef-blue border-gray-300 rounded focus:ring-wef-blue"/>
                                        <span className="text-sm text-gray-700">Official Badge Required</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-wef-blue border-gray-300 rounded focus:ring-wef-blue"/>
                                        <span className="text-sm text-gray-700">Helipad Access</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Main Content Listing */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-wef-dark">Davos Properties: {filteredHotels.length} found</h2>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest hidden sm:block">Sort by: Recommended</span>
                        </div>

                        <div className="space-y-4">
                            {filteredHotels.map(hotel => (
                                <div key={hotel.id} className="bg-white border border-wef-border p-4 rounded-sm flex flex-col md:flex-row gap-5 hover:border-wef-blue hover:shadow-lg transition-all group">
                                    {/* Image */}
                                    <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden rounded-sm cursor-pointer">
                                        <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 left-2 flex gap-1">
                                            {Array.from({length: hotel.stars}).map((_, i) => (
                                                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400 drop-shadow-md" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Link to={`/hotels/${hotel.id}`}>
                                                    <h3 className="text-xl md:text-2xl font-bold text-wef-dark group-hover:text-wef-blue transition-colors mb-2 pr-4 leading-tight">
                                                        {hotel.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-xs font-bold uppercase tracking-widest text-wef-blue flex items-center gap-1 mb-3">
                                                    <Navigation size={12}/> {hotel.distance}
                                                </p>
                                                <p className="text-gray-600 text-sm font-serif line-clamp-2 max-w-lg mb-3">
                                                    {hotel.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {hotel.tags.map((tag, i) => (
                                                        <span key={i} className="bg-blue-50 text-wef-blue border border-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Rating Box */}
                                            <div className="hidden sm:flex flex-col items-end shrink-0 pl-4 border-l border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="text-right">
                                                        <div className="text-sm font-bold text-wef-dark">Superb</div>
                                                        <div className="text-[10px] text-gray-500">{hotel.reviews} reviews</div>
                                                    </div>
                                                    <div className="bg-wef-dark text-white font-bold p-2 text-sm rounded-sm rounded-tr-xl">
                                                        {hotel.rating.toFixed(1)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Action Area */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-1 mb-1">
                                                    <CheckCircle2 size={12}/> Official Procurement Channel
                                                </p>
                                                {hotel.available ? (
                                                    <p className="text-sm text-gray-700">Allocation available for <span className="font-bold underline">Delegation Members</span></p>
                                                ) : (
                                                    <p className="text-sm text-red-600 font-bold">Allocations Exhausted for WEF 2026</p>
                                                )}
                                            </div>
                                            
                                            <div className="text-right w-full sm:w-auto">
                                                <div className="mb-2">
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Est. Nightly Rate</span>
                                                    <span className="text-xl font-bold text-wef-dark">{hotel.price}</span>
                                                </div>
                                                <Link to={`/hotels/${hotel.id}`} className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-bold text-sm text-white transition-colors shadow-sm ${hotel.available ? 'bg-wef-blue hover:bg-blue-800' : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'}`}>
                                                    {hotel.available ? 'View Allocations' : 'Join Waitlist'} <ArrowRight size={16}/>
                                                </Link>
                                            </div>
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

export default Hotels;
