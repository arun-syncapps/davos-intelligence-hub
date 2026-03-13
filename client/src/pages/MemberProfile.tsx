import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMemberProfile, connectWithUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Briefcase, UserPlus, ArrowLeft, Calendar, FileText, CheckCircle, Mail, Globe, Star, Activity, Users, FileSignature, Bookmark, Clock } from 'lucide-react';

const MemberProfile = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (id) {
            getMemberProfile(id).then(data => {
                setProfile(data);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }
    }, [id, user, navigate]);

    const handleConnect = async () => {
        try {
            await connectWithUser(id as string);
            alert('Connection request sent!');
            setProfile({ ...profile, connectionStatus: 'pending' });
        } catch (err) {
            alert('Failed to send connection request.');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
        </div>
    );

    if (!profile) return (
        <div className="text-center py-32 font-mono text-gray-500">
            Profile not found.
            <br />
            <Link to="/community" className="text-wef-blue hover:underline mt-4 inline-block font-bold">Return to Directory</Link>
        </div>
    );

    // Mock Extended Network Information to match "full features in all possible aspects"
    const mockArticles = [
        { title: "Redefining Stakeholder Capitalism", views: "14.2k", date: "Jan 12, 2026", publication: "WEF Internal Briefing" },
        { title: "Net-Zero Pathways: Industry Specific Solutions", views: "8.5k", date: "Oct 28, 2025", publication: "Energy Transitions" },
        { title: "The Next Era of Globalization", views: "22.1k", date: "Aug 15, 2025", publication: "Global Trade Review" }
    ];

    const expertises = profile.industry ? [profile.industry, "Corporate Strategy", "Global Markets", "Venture Capital"] : ["Strategic Leadership", "Innovation", "Sustainability"];
    const davosHistory = ["Davos 2026", "Davos 2025", "Summer Davos 2024", "Davos 2023"];

    return (
        <div className="bg-wef-gray min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/community" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-wef-blue transition-colors mb-6">
                    <ArrowLeft size={16} /> Back to Directory
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Fixed Bio / Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Identity Card */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm overflow-hidden sticky top-24">
                            {/* Background Banner */}
                            <div className="h-32 bg-wef-dark relative">
                                {profile.background_image_url ? (
                                    <img src={profile.background_image_url} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-r from-wef-dark to-wef-blue opacity-50" />
                                )}
                            </div>
                            
                            {/* Avatar & Basic Info */}
                            <div className="px-6 pb-6 relative -mt-16 flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="w-32 h-32 rounded-full bg-white p-1 border-4 border-white shadow-lg mb-4 relative z-10 overflow-hidden bg-wef-gray">
                                     {profile.avatar_url ? (
                                         <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                                     ) : (
                                         <div className="w-full h-full rounded-full flex items-center justify-center text-gray-400 bg-wef-gray">
                                             <User size={64} />
                                         </div>
                                     )}
                                </div>
                                
                                <h1 className="text-2xl font-bold text-wef-dark mb-1">{profile.name}</h1>
                                <p className="text-[10px] font-bold font-mono tracking-widest text-wef-blue uppercase mb-4 leading-tight">{profile.headline || 'Davos Attendee'}</p>
                                
                                <div className="w-full space-y-3 mt-2 text-xs font-bold text-gray-600">
                                    {profile.company && (
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={14} className="text-gray-400" /> 
                                            <span className="truncate">{profile.job_title ? `${profile.job_title} at ` : ''}{profile.company}</span>
                                        </div>
                                    )}
                                    {profile.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-400" /> 
                                            <span>{profile.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className="text-gray-400" /> 
                                        <span>500+ Top Connections</span>
                                    </div>
                                </div>

                                {/* Connection Actions */}
                                <div className="w-full mt-6 flex flex-col gap-3">
                                    {profile.connectionStatus === 'accepted' ? (
                                         <div className="flex gap-2">
                                            <button className="flex-1 bg-green-50 border border-green-600 text-green-700 font-bold py-2.5 rounded-sm hover:bg-green-100 flex items-center justify-center gap-2 transition-colors">
                                                <CheckCircle size={16} /> Connected
                                            </button>
                                            <button className="bg-wef-blue text-white font-bold px-4 rounded-sm hover:bg-blue-800 flex items-center justify-center transition-colors shadow-sm">
                                                <Mail size={16} />
                                            </button>
                                         </div>
                                    ) : profile.connectionStatus === 'pending' ? (
                                         <button className="w-full bg-yellow-50 border border-yellow-600 text-yellow-700 font-bold py-2.5 rounded-sm cursor-default flex items-center justify-center gap-2">
                                             <Clock size={16} className="animate-pulse" /> Request Pending
                                         </button>
                                    ) : (
                                         <button onClick={handleConnect} className="w-full bg-wef-blue hover:bg-blue-800 text-white font-bold py-2.5 rounded-sm flex items-center justify-center gap-2 shadow-sm transition-colors">
                                             <UserPlus size={16} /> Establish Link
                                         </button>
                                    )}
                                    <button className="w-full bg-white border border-wef-border text-wef-dark hover:border-wef-blue hover:text-wef-blue font-bold py-2 rounded-sm transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                        <Bookmark size={14} /> Bookmark Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Attendance History */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-6">
                             <h3 className="text-sm font-bold tracking-widest uppercase text-wef-dark mb-4 flex items-center gap-2 border-b border-wef-border pb-2">
                                 <Globe size={16} className="text-wef-blue"/> Davos History
                             </h3>
                             <div className="flex flex-wrap gap-2">
                                {davosHistory.map((yr, idx) => (
                                    <span key={idx} className="bg-blue-50 text-wef-blue border border-blue-100 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm">
                                        {yr}
                                    </span>
                                ))}
                             </div>
                        </div>
                    </div>

                    {/* Right Column - Elaborate Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                            <h2 className="text-2xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                                <FileText className="text-wef-blue" size={24}/> Professional Summary
                            </h2>
                            {profile.about ? (
                                <div className="text-gray-700 font-serif text-lg leading-relaxed space-y-4 whitespace-pre-line">
                                    {profile.about}
                                </div>
                            ) : (
                                <p className="text-gray-500 font-mono text-sm text-center py-10 bg-wef-gray border border-dashed border-wef-border rounded-sm">
                                    Detailed summary currently restricted or unavailable.
                                </p>
                            )}
                        </div>

                        {/* Experience Timeline Box */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                             <h3 className="text-xl font-bold text-wef-dark mb-8 flex items-center gap-2 border-b border-wef-border pb-3">
                                 <Briefcase size={20} className="text-wef-blue"/> Career Trajectory
                             </h3>
                             <div className="space-y-8 relative">
                                  {/* Continuous line for timeline */}
                                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200 z-0"></div>

                                  {profile.experiences?.length > 0 ? profile.experiences.map((exp: any, i: number) => (
                                      <div key={exp.id || i} className="relative pl-10 z-10 group">
                                           <div className="absolute w-6 h-6 bg-white border-2 border-wef-blue rounded-full -left-0 top-0 flex items-center justify-center group-hover:bg-wef-blue transition-colors">
                                                <div className="w-2 h-2 bg-wef-blue rounded-full group-hover:bg-white"></div>
                                           </div>
                                           <h4 className="font-bold text-lg text-wef-dark leading-tight group-hover:text-wef-blue transition-colors">{exp.title}</h4>
                                           <p className="font-bold text-gray-500 uppercase tracking-widest text-[10px] my-1">{exp.company}</p>
                                           <p className="text-xs text-wef-blue font-bold tracking-wide flex items-center gap-1 mb-3">
                                               <Calendar size={12}/> {new Date(exp.start_date).getFullYear()} - {exp.current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                           </p>
                                           {exp.description && <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{exp.description}</p>}
                                      </div>
                                  )) : (
                                      <p className="text-sm font-mono text-gray-400 italic pl-8">No formal experience records attached to this profile.</p>
                                  )}
                             </div>
                        </div>

                        {/* Articles Activity Box */}
                        <div className="bg-wef-dark border border-black shadow-sm rounded-sm p-8 relative overflow-hidden text-white">
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-wef-blue opacity-5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                             <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/20 pb-3 relative z-10">
                                 <FileSignature size={20} className="text-blue-400"/> Published Works & Articles
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                {mockArticles.map((art, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-sm hover:border-wef-blue hover:bg-white/10 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-200">{art.publication}</span>
                                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-sm border border-white/10 flex items-center gap-1"><Activity size={10}/> {art.views}</span>
                                        </div>
                                        <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors leading-snug mb-3">{art.title}</h4>
                                        <p className="text-xs text-gray-400 font-mono">{art.date}</p>
                                    </div>
                                ))}
                             </div>
                             <button className="w-full mt-6 py-3 border border-white/20 hover:bg-white/10 hover:border-white font-bold text-sm tracking-widest uppercase text-white transition-all rounded-sm relative z-10">
                                 View All Publications
                             </button>
                        </div>

                        {/* Skills / Expertise */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                             <h3 className="text-xl font-bold text-wef-dark mb-6 flex items-center gap-2 border-b border-wef-border pb-3">
                                 <Star size={20} className="text-wef-blue"/> Expert Competencies
                             </h3>
                             <div className="flex flex-wrap gap-2">
                                {expertises.map((skill, idx) => (
                                    <span key={idx} className="bg-wef-gray border border-wef-border text-wef-dark px-4 py-2 text-sm font-bold tracking-wide shadow-sm hover:border-wef-blue hover:text-wef-blue transition-colors cursor-pointer">
                                        {skill}
                                    </span>
                                ))}
                             </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile;
