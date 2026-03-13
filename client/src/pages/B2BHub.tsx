import { Link } from 'react-router-dom';
import { 
    Briefcase, Building, ShieldCheck, Truck, 
    Headphones, BarChart3, Users, ArrowRight,
    Search, LayoutGrid, ClipboardCheck,
    Megaphone, Zap, Settings
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const B2BHub = () => {
    const categories = [
        { name: "AV & Sound", icon: Headphones, count: 12, path: "/marketplace/vendors?category=av" },
        { name: "Catering", icon: LayoutGrid, count: 8, path: "/marketplace/vendors?category=catering" },
        { name: "Security", icon: ShieldCheck, count: 15, path: "/marketplace/vendors?category=security" },
        { name: "Logistics", icon: Truck, count: 6, path: "/marketplace/vendors?category=logistics" },
        { name: "Production", icon: Zap, count: 10, path: "/marketplace/vendors?category=production" },
        { name: "Staffing", icon: Users, count: 20, path: "/marketplace/vendors?category=staffing" }
    ];

    const hostWorkflows = [
        {
            title: "Plan Your Event",
            description: "Find and secure the perfect venue. Access floor plans, 3D tours, and technical specs.",
            link: "/marketplace/venues",
            linkText: "Browse Venues",
            icon: Building,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Procure Suppliers",
            description: "Connect with WEF-authorized vendors for AV, catering, and institutional production.",
            link: "/marketplace/vendors",
            linkText: "Vendor Marketplace",
            icon: Briefcase,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Manage Operations",
            description: "Dedicated dashboard for event hosts to manage guest lists, RSVPs, and security clearance.",
            link: "/host",
            linkText: "Host Dashboard",
            icon: Settings,
            color: "text-teal-600",
            bg: "bg-teal-50"
        }
    ];

    return (
        <div className="bg-[#f0f4f8] min-h-screen pt-8 pb-24 px-4 sm:px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Institutional Header */}
                <div className="mb-12 border-b-2 border-wef-dark pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="max-w-3xl">
                            <SectionHeader 
                                title="B2B Solutions & Operations" 
                                subtitle="The official gateway for event hosts, suppliers, and institutional partners." 
                            />
                        </div>
                        <div className="flex gap-4">
                            <Link to="/marketplace/supplier-portal" className="bg-wef-dark text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-sm hover:bg-black transition-all shadow-lg flex items-center gap-2">
                                <ClipboardCheck size={16}/> Supplier Portal
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Event Hosting Workflows */}
                <section className="mb-16">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                        <div className="h-px bg-gray-300 flex-grow"></div>
                        Event Hosting Journey
                        <div className="h-px bg-gray-300 flex-grow"></div>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {hostWorkflows.map((flow, i) => ( flow &&
                            <div key={i} className="bg-white border border-wef-border p-8 rounded-sm hover:shadow-2xl hover:border-wef-blue transition-all group">
                                <div className={`${flow.bg} ${flow.color} w-16 h-16 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <flow.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-wef-dark mb-4">{flow.title}</h3>
                                <p className="text-gray-600 font-serif mb-8">{flow.description}</p>
                                <Link to={flow.link} className="flex items-center gap-2 text-wef-blue font-bold text-xs uppercase tracking-widest hover:underline">
                                    {flow.linkText} <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Supplier Directory Categorized */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1">
                        <div className="bg-wef-dark text-white p-8 rounded-sm sticky top-24">
                            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4 flex items-center gap-2">
                                <Search size={20} className="text-wef-blue"/> Find Suppliers
                            </h3>
                            <p className="text-sm text-gray-400 mb-8 font-serif">
                                Search across our registry of 500+ certified Swiss and international partners.
                            </p>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Company name..." 
                                        className="w-full bg-white/10 border border-white/20 rounded-sm py-3 px-4 text-sm outline-none focus:border-wef-blue transition-all"
                                    />
                                </div>
                                <button className="w-full bg-wef-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-sm transition-colors">
                                    Search Registry
                                </button>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/20">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Quick Stats</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Total Vendors</span>
                                        <span className="font-bold">542</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Red Zone Cleared</span>
                                        <span className="font-bold text-red-400">128</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">SLA Rating</span>
                                        <span className="font-bold text-green-400">4.8/5.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-3xl font-bold text-wef-dark">Supplier Directory</h2>
                            <Link to="/marketplace/vendors" className="text-wef-blue font-bold text-xs uppercase tracking-widest hover:underline">View All &rarr;</Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((cat, i) => (
                                <Link 
                                    to={cat.path} 
                                    key={i} 
                                    className="bg-white border border-wef-border p-6 rounded-sm hover:-translate-y-2 hover:shadow-xl hover:border-wef-blue transition-all group flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-wef-blue group-hover:text-white transition-colors">
                                        <cat.icon size={28} />
                                    </div>
                                    <h4 className="text-lg font-bold text-wef-dark mb-1">{cat.name}</h4>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{cat.count} VERIFIED FIRMS</p>
                                </Link>
                            ))}
                        </div>

                        {/* Operational Services Grid */}
                        <div className="mt-20">
                            <h2 className="text-2xl font-bold text-wef-dark mb-8 border-b-2 border-wef-dark inline-block pb-2">Institutional Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex gap-6 items-start bg-white p-6 border border-wef-border rounded-sm hover:border-wef-blue transition-colors group cursor-pointer">
                                    <div className="bg-red-50 text-red-600 p-4 rounded-sm">
                                        <Megaphone size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-wef-dark mb-2">Media Intelligence</h4>
                                        <p className="text-sm text-gray-600 font-serif mb-4">Access live broadcaster feeds, press kits, and embargoed statements.</p>
                                        <Link to="/media" className="text-xs font-bold text-wef-blue uppercase tracking-widest">Access Media Hub →</Link>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start bg-white p-6 border border-wef-border rounded-sm hover:border-wef-blue transition-colors group cursor-pointer">
                                    <div className="bg-blue-50 text-wef-blue p-4 rounded-sm">
                                        <BarChart3 size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-wef-dark mb-2">Platform Intelligence</h4>
                                        <p className="text-sm text-gray-600 font-serif mb-4">Centralized control for user management, role assignments, and platform health.</p>
                                        <Link to="/admin" className="text-xs font-bold text-wef-blue uppercase tracking-widest">Open Command Center →</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partnership Banner */}
                <section className="mt-24 bg-gradient-to-r from-wef-dark to-[#1a2b4b] text-white p-12 rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-wef-blue/20 rounded-full blur-[100px]"></div>
                    <div className="max-w-4xl relative z-10">
                        <h2 className="text-3xl font-bold mb-6 italic">"Shaping the Future through Operational Excellence"</h2>
                        <p className="text-lg text-gray-300 font-serif mb-8 leading-relaxed">
                            Are you a local Swiss provider or a global production agency looking to support the Annual Meeting? Register your firm to bid for official RFP opportunities.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-white text-wef-dark font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-gray-100 transition-colors">
                                Register as Vendor
                            </button>
                            <button className="bg-transparent border border-white/40 hover:border-white text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-colors">
                                View Open Tenders (24)
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default B2BHub;
