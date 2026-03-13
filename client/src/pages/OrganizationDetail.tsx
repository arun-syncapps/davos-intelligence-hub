import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrganizationById } from '../api/api';
import { Globe, ExternalLink, Calendar, Users, Building2, TrendingUp, Target, Activity, FileText, Share2, Mail, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const OrganizationDetail = () => {
    const { id } = useParams();
    const [org, setOrg] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getOrganizationById(id).then(data => {
                setOrg(data);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
        </div>
    );
    if (!org) return <div className="py-20 text-center font-mono text-gray-500">Organization not found.</div>;

    // Advanced Mock Features
    const mockInitiatives = [
        { title: "Global Coalition for Climate Action", status: "Active", impact: "High", year: "2023-2030" },
        { title: "Future of Digital Trust", status: "In Development", impact: "Medium", year: "2025-2027" },
        { title: "Equitable Health Systems Matrix", status: "Active", impact: "High", year: "2024-2028" }
    ];

    const mockStats = [
        { label: "Global Reach", value: "120+ Countries", icon: Globe },
        { label: "Active Projects", value: "45", icon: Target },
        { label: "Partner Network", value: "300+ Orgs", icon: Activity }
    ];

    return (
        <div className="bg-wef-gray min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/organizations" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-wef-blue mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Ecosystem
                </Link>

                {/* Top Banner / Hero */}
                <div className="bg-wef-dark text-white rounded-sm shadow-sm overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600" alt="Background" className="w-full h-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426] via-[#0B1426]/90 to-transparent"></div>
                    </div>
                    
                    <div className="p-8 lg:p-12 relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="w-40 h-40 bg-white border-4 border-white shadow-xl rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                            <img src={org.logo_url} alt={org.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-grow pt-2">
                            <span className="inline-block bg-white/10 border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm mb-3 backdrop-blur-sm">
                                {org.type || 'Platform Partner'}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{org.name}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold tracking-widest uppercase text-gray-300">
                                <span className="flex items-center gap-1"><Building2 size={14}/> Geneva, CH</span>
                                <a href={org.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
                                    <Globe size={14} /> Official Portal <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
                            <button className="bg-wef-blue hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-sm transition-colors shadow-lg flex items-center justify-center gap-2 w-full text-sm">
                                <Mail size={16}/> Contact Secretariat
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-sm transition-colors flex items-center justify-center gap-2 w-full text-sm">
                                <Share2 size={16}/> Share Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Key Metrics */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-wef-dark mb-4 border-b border-wef-border pb-2 flex items-center gap-2">
                                <TrendingUp size={16} className="text-wef-blue" /> Organizational Metrics
                            </h3>
                            <div className="space-y-4">
                                {mockStats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-wef-gray rounded-sm flex items-center justify-center text-wef-blue">
                                            <stat.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</p>
                                            <p className="text-lg font-bold text-wef-dark">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Associated Delegations */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-wef-dark mb-4 border-b border-wef-border pb-2 flex items-center gap-2">
                                <Users size={16} className="text-wef-blue" /> Core Representatives
                            </h3>
                            {org.speakers && org.speakers.length > 0 ? (
                                <div className="space-y-4">
                                    {org.speakers.slice(0, 4).map((spkr: any) => (
                                        <Link to={`/speakers/${spkr.id}`} key={spkr.id} className="group flex gap-3 items-center hover:bg-wef-gray p-2 -mx-2 rounded-sm transition-colors border border-transparent hover:border-wef-border">
                                            <img src={spkr.image_url} alt={spkr.name} className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-wef-blue transition-all" />
                                            <div>
                                                <h4 className="font-bold text-sm text-wef-dark group-hover:text-wef-blue transition-colors line-clamp-1">{spkr.name}</h4>
                                                <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 line-clamp-1">{spkr.title}</p>
                                            </div>
                                        </Link>
                                    ))}
                                    {org.speakers.length > 4 && (
                                        <button className="w-full mt-2 text-xs font-bold uppercase tracking-widest text-wef-blue hover:text-wef-dark transition-colors py-2 bg-blue-50">
                                            View all {org.speakers.length} delegates
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 text-center py-4 bg-wef-gray border border-dashed border-wef-border">No registered delegates.</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Elaborate Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Mandate / About */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                            <h2 className="text-2xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                                <FileText className="text-wef-blue" />
                                Charter & Mandate
                            </h2>
                            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed font-serif text-lg">
                                <p className="whitespace-pre-line mb-6">{org.description}</p>
                                <p>
                                    Recognized as a leading entity in its sector, the organization collaborates extensively with governments, civil society, and the private sector to foster resilient ecosystems. Their commitment aligns closely with the World Economic Forum's central mission to improve the state of the world through sustained multilateralism.
                                </p>
                            </div>
                        </div>

                        {/* Key Initiatives / Projects */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                            <h2 className="text-xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                                <Target className="text-wef-blue" />
                                Strategic Initiatives
                            </h2>
                            <div className="space-y-4">
                                {mockInitiatives.map((init, idx) => (
                                    <div key={idx} className="border border-wef-border p-5 rounded-sm hover:border-wef-blue hover:shadow-md transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-wef-gray cursor-pointer group">
                                        <div>
                                            <h3 className="font-bold text-lg text-wef-dark group-hover:text-wef-blue transition-colors mb-1">{init.title}</h3>
                                            <div className="flex gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-sm">{init.year}</span>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${init.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                                    {init.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Impact Level</span>
                                            <span className="text-wef-blue font-bold">{init.impact}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hosted Sessions & Events */}
                        <div className="bg-wef-dark text-white shadow-sm rounded-sm p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-wef-blue/10 rounded-full blur-3xl"></div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-white/20 pb-3 relative z-10">
                                <Calendar className="text-blue-400" />
                                Official Programme Engagements
                            </h2>
                            {org.events && org.events.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                    {org.events.map((evt: any) => (
                                        <Link to={`/events/${evt.id}`} key={evt.id} className="group bg-white/5 border border-white/10 rounded-sm overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all flex flex-col h-full">
                                            <div className="h-24 bg-black relative overflow-hidden">
                                                <img src={evt.image_url} alt={evt.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                                <div className="absolute top-2 left-2 bg-wef-blue text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 shadow-sm">
                                                    {evt.type}
                                                </div>
                                            </div>
                                            <div className="p-4 flex flex-col flex-grow">
                                                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-2">
                                                    <span>{format(new Date(evt.date), 'MMM d, yyyy')}</span>
                                                    <span className="text-blue-300">Details →</span>
                                                </div>
                                                <h4 className="font-bold text-md leading-snug group-hover:text-blue-300 transition-colors">{evt.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="font-mono text-xs uppercase tracking-widest text-gray-400 p-6 bg-white/5 text-center border border-dashed border-white/10 relative z-10">
                                    No scheduled sessions at this meeting.
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetail;
