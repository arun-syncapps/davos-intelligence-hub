import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Camera, Speaker, Wrench, Search, ShieldCheck, Navigation, Package, Layers, Filter, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const mockVendors = [
    {
        id: "v-1",
        name: "Swiss Alpine AV",
        category: "AV & Sound",
        clearance: "Red Zone Cleared",
        description: "Official broadcast standard infrastructure. Multi-cam streaming, lavalier mics, and full plenary setups.",
        rating: "4.9",
        projectsCompleted: 142,
        image_url: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800",
        amenities: ["Livestream Ready", "Red Zone Badge", "24/7 Support"]
    },
    {
        id: "v-2",
        name: "Global Stagecraft",
        category: "Stage & Rigging",
        clearance: "Orange Zone Cleared",
        description: "Custom stage fabrication, modular seating, and heavy rigging for massive corporate house takeovers.",
        rating: "4.8",
        projectsCompleted: 85,
        image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
        amenities: ["Modular Stages", "Hydraulic Lifts", "Safety Certified"]
    },
    {
        id: "v-3",
        name: "Zurich Translators",
        category: "Translation Services",
        clearance: "All Zones",
        description: "Top-tier simultaneous interpreters (6 UN languages) + whisper booth rentals.",
        rating: "5.0",
        projectsCompleted: 210,
        image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
        amenities: ["6 Languages", "Whisper Booths", "Digital Headsets"]
    },
    {
        id: "v-4",
        name: "Davos Elite Sec",
        category: "Security & Staffing",
        clearance: "Red Zone Cleared",
        description: "Armed details, access control teams, and polished event hosts/stewards.",
        rating: "4.9",
        projectsCompleted: 400,
        image_url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800",
        amenities: ["Armed Escort", "Asset Protection", "Vetted Teams"]
    },
    {
        id: "v-5",
        name: "Gourmet Graubünden",
        category: "Catering",
        clearance: "Orange Zone Cleared",
        description: "High-end Alpine catering focusing on local organic ingredients and private dinner service.",
        rating: "4.7",
        projectsCompleted: 156,
        image_url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
        amenities: ["Michelin Star Chef", "Organic Sourcing", "Private Dining"]
    }
];

const VendorMarketplace = () => {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category');
    
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [clearanceFilter, setClearanceFilter] = useState('All');

    useEffect(() => {
        if (initialCategory) {
            // Map short param to full name
            const map: Record<string, string> = {
                'av': 'AV & Sound',
                'catering': 'Catering',
                'security': 'Security & Staffing',
                'logistics': 'Logistics',
                'production': 'Production',
                'staffing': 'Security & Staffing'
            };
            setSelectedCategory(map[initialCategory] || null);
        }
    }, [initialCategory]);

    const categories = [
        { name: "AV & Sound", icon: Speaker },
        { name: "Stage & Build", icon: Wrench },
        { name: "Production", icon: Camera },
        { name: "Security & Staffing", icon: ShieldCheck },
        { name: "Logistics", icon: Navigation },
        { name: "Catering", icon: Layers }
    ];

    const filteredVendors = mockVendors.filter(v => {
        const matchesCategory = !selectedCategory || v.category === selectedCategory;
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClearance = clearanceFilter === 'All' || v.clearance.includes(clearanceFilter);
        return matchesCategory && matchesSearch && matchesClearance;
    });

    return (
        <div className="bg-[#f8f9fa] min-h-screen pt-8 pb-24 px-4 sm:px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-wef-dark pb-6">
                    <div>
                        <SectionHeader 
                            title="Supply Chain & Vendors" 
                            subtitle="Procure authorized logistics, production, and security teams for your Davos operations." 
                        />
                    </div>
                    <div className="flex gap-4">
                        <Link to="/marketplace/hub" className="bg-white border border-wef-border text-wef-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm hover:-translate-y-1 transition-all shadow-sm flex items-center gap-2">
                             B2B Hub Home
                        </Link>
                        <Link to="/marketplace/vendors/onboard" className="bg-wef-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all shadow-lg flex items-center gap-2">
                            <Package size={16}/> Register as Supplier
                        </Link>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {categories.map((cat) => (
                        <div 
                            key={cat.name}
                            onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                            className={`p-6 border rounded-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                                selectedCategory === cat.name 
                                ? 'bg-wef-dark text-white border-wef-dark shadow-xl scale-105' 
                                : 'bg-white border-wef-border text-gray-400 hover:border-wef-blue hover:text-wef-blue shadow-sm'
                            }`}
                        >
                            <cat.icon size={28} className="mb-3"/>
                            <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white border border-wef-border p-8 rounded-sm shadow-sm">
                            <h3 className="font-bold text-wef-dark mb-6 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-3">
                                <Filter size={16} className="text-wef-blue"/> Search & Filter
                            </h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Quick Search</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="Firm name..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-sm focus:border-wef-blue outline-none transition-colors text-sm" 
                                        />
                                        <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Clearance Level</label>
                                    <select 
                                        value={clearanceFilter}
                                        onChange={(e) => setClearanceFilter(e.target.value)}
                                        className="w-full border border-gray-300 px-3 py-3 rounded-sm outline-none font-bold text-wef-dark text-sm cursor-pointer hover:border-wef-blue transition-colors"
                                    >
                                        <option value="All">All Disclosed</option>
                                        <option value="Red Zone">Red Zone (Congress Core)</option>
                                        <option value="Orange Zone">Orange Zone</option>
                                    </select>
                                </div>
                                
                                <div className="pt-6 border-t border-gray-100">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Market Insight</p>
                                    <div className="bg-blue-50 p-4 rounded-sm border border-blue-100">
                                        <p className="text-xs text-blue-800 font-serif leading-relaxed">
                                            <strong>Pro Tip:</strong> Red Zone cleared vendors are in high demand during Jan 15-20. We recommend booking 45 days in advance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Directory Feed */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex justify-between items-center bg-white border border-wef-border px-6 py-4 rounded-sm shadow-sm">
                             <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                                Showing {filteredVendors.length} Verified Partners {selectedCategory && `in ${selectedCategory}`}
                             </span>
                             {selectedCategory && (
                                 <button 
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-[10px] font-bold text-wef-blue hover:underline uppercase tracking-widest"
                                 >
                                     Clear Category
                                 </button>
                             )}
                        </div>

                        {filteredVendors.length > 0 ? (
                            filteredVendors.map((vendor) => (
                                <div key={vendor.id} className="bg-white border border-wef-border flex flex-col md:flex-row hover:border-wef-blue hover:shadow-2xl transition-all duration-500 rounded-sm group overflow-hidden">
                                    <div className="w-full md:w-80 h-56 md:h-auto relative shrink-0 overflow-hidden">
                                        <img src={vendor.image_url} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex gap-2">
                                                {vendor.amenities.map((a, i) => (
                                                    <span key={i} className="text-[8px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                                        {a}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow justify-between bg-white relative">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-3xl font-bold text-wef-dark leading-tight group-hover:text-wef-blue transition-colors mb-1">{vendor.name}</h3>
                                                    <p className="text-xs font-bold text-wef-blue uppercase tracking-[0.2em]">{vendor.category}</p>
                                                </div>
                                                <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-sm flex items-center gap-2 shadow-sm ${
                                                    vendor.clearance.includes('Red') 
                                                    ? 'bg-red-600 text-white' 
                                                    : vendor.clearance.includes('Orange') 
                                                    ? 'bg-orange-500 text-white' 
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    <ShieldCheck size={14}/> {vendor.clearance}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 font-serif leading-relaxed line-clamp-2 my-6 text-lg">
                                                {vendor.description}
                                            </p>
                                            
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 italic">Rating</span>
                                                    <span className="text-lg font-bold text-wef-dark flex items-center gap-2">
                                                         {vendor.rating} <Star size={16} className="fill-yellow-400 text-yellow-400"/>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 italic">Projects</span>
                                                    <span className="text-lg font-bold text-wef-dark">{vendor.projectsCompleted}+</span>
                                                </div>
                                                <div className="lg:col-span-2 flex flex-col items-end">
                                                     <div className="flex items-center gap-1 text-green-600 text-xs font-bold mb-1">
                                                         <CheckCircle2 size={14}/> Verified Platinum
                                                     </div>
                                                     <div className="text-[10px] text-gray-400">Official WEF Operations Partner</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                                            <Link to={`/marketplace/vendors/${vendor.id}`} className="w-full sm:w-auto text-sm font-bold text-wef-dark uppercase tracking-widest hover:text-wef-blue transition-colors flex items-center gap-2 pb-1 border-b-2 border-transparent hover:border-wef-blue">
                                                Technical Portfolio & Gear <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform"/>
                                            </Link>
                                            <button className="w-full sm:w-auto bg-wef-dark hover:bg-wef-blue text-white px-10 py-4 font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-xl hover:scale-105 active:scale-95">
                                                Request Official Quote
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white border border-dashed border-gray-300 p-20 text-center rounded-sm">
                                <Search size={48} className="mx-auto text-gray-200 mb-6" />
                                <h3 className="text-2xl font-bold text-wef-dark mb-2">No matching vendors found</h3>
                                <p className="text-gray-500 font-serif">Try adjusting your filters or browsing all categories.</p>
                                <button 
                                    onClick={() => {setSelectedCategory(null); setSearchTerm(''); setClearanceFilter('All');}}
                                    className="mt-8 text-wef-blue font-bold text-xs uppercase tracking-widest hover:underline"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        )}
                        
                        {/* Pagination or Load More could go here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorMarketplace;
