import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpeakerById } from '../api/api';
import { Linkedin, Calendar, Building, FileText, PlayCircle, Award, BookOpen, ArrowLeft, Share2, Mail } from 'lucide-react';
import { format } from 'date-fns';

const SpeakerDetail = () => {
    const { id } = useParams();
    const [speaker, setSpeaker] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getSpeakerById(id).then(data => {
                setSpeaker(data);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
        </div>
    );
    if (!speaker) return <div className="py-20 text-center font-mono text-gray-500">Speaker not found.</div>;

    // Mock extended data for WEF depth
    const mockArticles = [
        { title: "The Future of Global Economic Resilience", date: "Jan 12, 2026", publication: "World Economic Forum Agenda" },
        { title: "Navigating AI Governance in the Next Decade", date: "Nov 04, 2025", publication: "Strategic Intelligence" },
        { title: "Sustainable Scaling: A Blueprint for 2030", date: "Sep 22, 2025", publication: "Global Leadership Review" }
    ];

    const mockMedia = [
        { title: "Panel: AI and the Global Workforce", type: "Video", duration: "45 mins", date: "Davos 2025" },
        { title: "Keynote: Building Trust in Data", type: "Podcast", duration: "25 mins", date: "October 2025" }
    ];

    const areasOfExpertise = speaker.category ? [speaker.category, "Global Policy", "Digital Transformation", "Economic Strategy"] : ["Global Economy", "Policy Making", "Innovation"];

    return (
        <div className="bg-white min-h-screen pb-24 pt-8 px-4 sm:px-6 max-w-7xl mx-auto">
            <Link to="/speakers" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-wef-blue mb-8 transition-colors">
                <ArrowLeft size={16} /> Back to Speakers
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card & Sticky Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm overflow-hidden sticky top-24">
                        <div className="h-32 bg-wef-dark relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-wef-blue to-teal-500 opacity-20"></div>
                        </div>
                        <div className="px-6 pb-6 pt-0 relative flex flex-col items-center sm:items-start text-center sm:text-left mt(-16)">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-wef-gray -mt-16 overflow-hidden mb-4 relative z-10">
                                <img src={speaker.image_url} alt={speaker.name} className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-2xl font-bold text-wef-dark mb-1">{speaker.name}</h1>
                            <p className="text-xs font-bold font-mono tracking-widest text-wef-blue uppercase mb-4">{speaker.title}</p>

                            <Link to={`/organizations/${speaker.organization_id}`} className="group flex items-center gap-2 px-4 py-2 bg-wef-gray border border-transparent hover:border-wef-blue hover:text-wef-blue transition-all text-xs font-bold font-mono tracking-widest uppercase mb-6 w-full justify-center sm:justify-start">
                                <Building size={14} className="text-gray-400 group-hover:text-wef-blue" />
                                {speaker.organization_name}
                            </Link>

                            <div className="w-full flex flex-col gap-3">
                                <button className="w-full bg-wef-blue text-white font-bold py-2.5 rounded-sm hover:bg-blue-800 transition-colors shadow-sm flex items-center justify-center gap-2">
                                    <Mail size={16} /> Contact Office
                                </button>
                                <div className="flex gap-2 w-full">
                                    <a href={speaker.linkedin_url || '#'} target="_blank" rel="noreferrer" className="flex-1 bg-wef-gray border border-wef-border text-wef-dark hover:border-wef-blue hover:text-wef-blue font-bold py-2 rounded-sm transition-colors flex items-center justify-center gap-2">
                                        <Linkedin size={16} /> LinkedIn
                                    </a>
                                    <button className="flex-1 bg-wef-gray border border-wef-border text-wef-dark hover:border-wef-blue hover:text-wef-blue font-bold py-2 rounded-sm transition-colors flex items-center justify-center gap-2">
                                        <Share2 size={16} /> Share
                                    </button>
                                </div>
                            </div>
                            
                            {/* Detailed Stats */}
                            <div className="w-full mt-6 pt-6 border-t border-wef-border grid grid-cols-2 gap-4 text-center divide-x divide-wef-border">
                                <div>
                                    <p className="text-2xl font-bold text-wef-dark">{speaker.events?.length || 2}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Davos Sessions</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-wef-dark">{mockArticles.length}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Publications</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Deep Information */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Biography */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                        <h2 className="text-2xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                            <FileText className="text-wef-blue" />
                            Comprehensive Biography
                        </h2>
                        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed font-serif text-lg">
                            <p className="whitespace-pre-line mb-6">{speaker.bio}</p>
                            <p>
                                As a recognized thought leader in {speaker.category || "their respective field"}, {speaker.name.split(' ')[0]} has consistently advocated for sustainable frameworks and resilient global architectures. Their work at {speaker.organization_name} has been pivotal in aligning multi-stakeholder capitalism with modern technological demands.
                            </p>
                            <p>
                                Prior to their current role, they held significant positions in both public and private sectors, uniquely positioning them to bridge the gap between policy making and industrial innovation. They are a frequent contributor to the World Economic Forum's Agenda and serve on multiple steering committees dedicated to the Fourth Industrial Revolution.
                            </p>
                        </div>
                    </div>

                    {/* Areas of Expertise */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                        <h2 className="text-xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                            <Award className="text-wef-blue" />
                            Strategic Capabilities & Expertise
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {areasOfExpertise.map((skill, idx) => (
                                <span key={idx} className="bg-wef-gray border border-wef-border text-wef-dark px-4 py-2 rounded-sm text-sm font-bold tracking-wide">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Works and Publications */}
                    <div className="bg-wef-dark text-white shadow-sm rounded-sm p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-wef-blue/10 rounded-full blur-3xl"></div>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-white/20 pb-3 relative z-10">
                            <BookOpen className="text-blue-400" />
                            Publications & Insights
                        </h2>
                        <div className="space-y-4 relative z-10">
                            {mockArticles.map((article, idx) => (
                                <div key={idx} className="group border border-white/10 p-5 rounded-sm hover:bg-white/5 transition-colors cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    <div>
                                        <h3 className="font-bold text-lg group-hover:text-blue-300 transition-colors mb-1">{article.title}</h3>
                                        <p className="text-xs font-mono uppercase tracking-widest text-gray-400">{article.publication}</p>
                                    </div>
                                    <div className="text-sm font-bold text-gray-300 bg-white/10 px-3 py-1 rounded-sm whitespace-nowrap">
                                        {article.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Speaking Engagements */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                        <h2 className="text-xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                            <Calendar className="text-wef-blue" />
                            Official Davos 2026 Programme
                        </h2>
                        {speaker.events && speaker.events.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {speaker.events.map((evt: any) => (
                                    <Link to={`/events/${evt.id}`} key={evt.id} className="group border border-wef-border rounded-sm hover:border-wef-blue hover:shadow-md transition-all flex flex-col sm:flex-row items-stretch overflow-hidden">
                                        <div className="w-full sm:w-48 bg-wef-gray relative overflow-hidden flex-shrink-0">
                                            <img src={evt.image_url} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0" />
                                        </div>
                                        <div className="p-5 flex flex-col justify-center flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-blue-50 text-wef-blue text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border border-blue-100">{evt.type}</span>
                                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{format(new Date(evt.date), 'MMM d, yyyy')}</span>
                                            </div>
                                            <h4 className="font-bold text-xl text-wef-dark group-hover:text-wef-blue transition-colors line-clamp-2">{evt.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="font-mono text-sm text-gray-500 p-6 bg-wef-gray text-center border border-dashed border-wef-border">No scheduled speaking events for the upcoming meeting.</p>
                        )}
                    </div>

                    {/* Media Appearances */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                        <h2 className="text-xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                            <PlayCircle className="text-wef-blue" />
                            Media & Broadcasts
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mockMedia.map((media, idx) => (
                                <div key={idx} className="border border-wef-border rounded-sm overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                                    <div className="h-32 bg-wef-dark relative flex items-center justify-center">
                                        <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1541872528751-248abdb7eeb8?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
                                        <PlayCircle size={48} className="text-white relative z-10 opacity-80 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                                    </div>
                                    <div className="p-4 bg-white">
                                        <h4 className="font-bold text-sm text-wef-dark mb-1 group-hover:text-wef-blue transition-colors">{media.title}</h4>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{media.type} • {media.duration} • {media.date}</p>
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

export default SpeakerDetail;
