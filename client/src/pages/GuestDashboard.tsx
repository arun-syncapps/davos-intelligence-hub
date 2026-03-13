import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserRegistrations, getUserProfile, updateUserProfile } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { User, Ticket, Calendar, CheckCircle, XCircle, Clock, ArrowRight, Edit3, MapPin, Briefcase, X, Save, Image as ImageIcon } from 'lucide-react';

const statusIcon = (status: string) => {
    if (status === 'confirmed') return <CheckCircle size={16} className="text-green-500" />;
    if (status === 'rejected') return <XCircle size={16} className="text-red-400" />;
    return <Clock size={16} className="text-yellow-500" />;
};

const GuestDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'pending' | 'rejected'>('all');
    const [isEditing, setIsEditing] = useState(false);
    
    // Edit Form State
    const [editForm, setEditForm] = useState({
        headline: '',
        about: '',
        location: '',
        industry: '',
        company: '',
        job_title: '',
        avatar_url: '',
        background_image_url: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        Promise.all([
            getUserRegistrations(),
            getUserProfile()
        ]).then(([regs, prof]) => {
            setRegistrations(regs);
            setProfile(prof);
            setEditForm({
                headline: prof.headline || '',
                about: prof.about || '',
                location: prof.location || '',
                industry: prof.industry || '',
                company: prof.company || '',
                job_title: prof.job_title || '',
                avatar_url: prof.avatar_url || '',
                background_image_url: prof.background_image_url || ''
            });
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [user, navigate]);

    const handleSaveProfile = async () => {
        try {
            await updateUserProfile(editForm);
            setProfile({ ...profile, ...editForm });
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to update profile', err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing && profile) {
            setEditForm({
                headline: profile.headline || '',
                about: profile.about || '',
                location: profile.location || '',
                industry: profile.industry || '',
                company: profile.company || '',
                job_title: profile.job_title || '',
                avatar_url: profile.avatar_url || '',
                background_image_url: profile.background_image_url || ''
            });
        }
    };

    const filtered = activeTab === 'all' ? registrations : registrations.filter(r => r.status === activeTab);

    if (!user || loading) return (
         <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
         </div>
    );

    return (
        <div className="pb-24 pt-8 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Profile Column */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* LinkedIn-Style Banner Card */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm overflow-hidden relative">
                        {/* Background Banner */}
                        <div className="h-48 md:h-64 w-full bg-wef-dark relative">
                            {(profile?.background_image_url || '').length > 0 ? (
                                <img src={profile.background_image_url} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-r from-wef-dark via-wef-blue to-teal-500 opacity-80" />
                            )}
                            <button onClick={toggleEdit} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition-colors text-white">
                                 <Edit3 size={20} />
                            </button>
                        </div>
                        
                        {/* Avatar & Basic Info */}
                        <div className="px-8 pb-8 flex flex-col items-center sm:items-start text-center sm:text-left relative -mt-20 sm:-mt-24">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white p-1 border-4 border-white shadow-xl mb-4 relative z-10 overflow-hidden">
                                 {profile?.avatar_url ? (
                                     <img src={profile.avatar_url} alt={user.name} className="w-full h-full object-cover rounded-full" />
                                 ) : (
                                     <div className="w-full h-full bg-wef-dark rounded-full flex items-center justify-center text-white">
                                         <User size={64} />
                                     </div>
                                 )}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-between w-full items-center sm:items-start gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-wef-dark">{user.name}</h1>
                                    <p className="text-lg text-gray-700 mt-1 max-w-xl">{profile?.headline || 'Add a professional headline'}</p>
                                    
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-gray-500">
                                        {profile?.location && (
                                            <span className="flex items-center gap-1"><MapPin size={16} /> {profile.location}</span>
                                        )}
                                        {profile?.company && (
                                            <span className="flex items-center gap-1"><Briefcase size={16} /> {profile.job_title} at {profile.company}</span>
                                        )}
                                        <span className="bg-wef-blue text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Link to="/" className="bg-wef-blue hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full transition-colors shadow-md transition-transform hover:scale-105">
                                        Browse Events
                                    </Link>
                                    <button onClick={toggleEdit} className="border border-wef-blue text-wef-blue hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition-colors">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-wef-dark">About</h2>
                            <button onClick={toggleEdit} className="text-gray-400 hover:text-wef-blue transition-colors">
                                <Edit3 size={20} />
                            </button>
                        </div>
                        {profile?.about ? (
                            <p className="text-gray-700 font-light leading-relaxed whitespace-pre-wrap">{profile.about}</p>
                        ) : (
                            <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-wef-border rounded-sm">
                                <p className="text-gray-500 mb-4 text-center max-w-sm">Share brief details about your professional background, goals, and what you're looking for at Davos.</p>
                                <button onClick={toggleEdit} className="text-wef-blue font-medium hover:underline">Add About Summary</button>
                            </div>
                        )}
                    </div>

                    {/* Registrations / My Event Tickets */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm overflow-hidden">
                        <div className="border-b border-wef-border bg-wef-gray/50 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-wef-dark">
                                <Ticket size={24} className="text-wef-blue" /> My RSVPs
                            </h2>
                            <div className="flex gap-2">
                                {(['all', 'confirmed', 'pending', 'rejected'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-all rounded-full ${activeTab === tab ? 'bg-wef-dark text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-8">
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center py-12 gap-4">
                                    <div className="w-20 h-20 bg-wef-gray rounded-full flex items-center justify-center">
                                       <Calendar size={32} className="text-gray-300" />
                                    </div>
                                    <p className="text-gray-500">No events found in this category.</p>
                                    <Link to="/" className="text-wef-blue font-medium hover:underline flex items-center gap-2">
                                        Explore Davos Schedule <ArrowRight size={16} />
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filtered.map((reg: any) => (
                                        <div
                                            key={reg.id}
                                            className="group relative border border-wef-border bg-white hover:border-wef-blue/30 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="h-32 w-full overflow-hidden relative">
                                                {reg.image_url ? (
                                                    <img src={reg.image_url} alt={reg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-wef-blue to-teal-500" />
                                                )}
                                                <div className="absolute top-3 right-3">
                                                    <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full backdrop-blur-md bg-white/90 shadow-sm ${
                                                        reg.status === 'confirmed' ? 'text-green-700' : reg.status === 'rejected' ? 'text-red-600' : 'text-yellow-700'
                                                    }`}>
                                                        {statusIcon(reg.status)} {reg.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-xl group-hover:text-wef-blue transition-colors mb-2 line-clamp-1">{reg.title}</h3>
                                                <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                                                    <Calendar size={14} className="text-gray-400" /> 
                                                    {format(new Date(reg.date), 'MMM d')} · {reg.start_time}
                                                </p>
                                                <Link to={`/events/${reg.event_id || reg.id}`} className="text-wef-blue font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    View Details <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Analytics & Networking */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Analytics Dashboard mini */}
                    <div className="bg-white border border-wef-border shadow-sm rounded-sm p-6">
                         <h3 className="text-lg font-bold text-wef-dark mb-6">Your Analytics</h3>
                         <div className="space-y-6">
                             <div className="flex justify-between items-center pb-4 border-b border-wef-border">
                                 <div>
                                     <p className="text-3xl font-bold text-wef-dark">{profile?.profile_views?.length || 14}</p>
                                     <p className="text-sm text-gray-500 font-medium">Profile views</p>
                                     <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">↑ 12% vs last week</p>
                                 </div>
                                 <div className="w-12 h-12 bg-blue-50 text-wef-blue rounded-full flex items-center justify-center">
                                      <User size={20} />
                                 </div>
                             </div>
                             <div className="flex justify-between items-center pb-4 border-b border-wef-border">
                                 <div>
                                     <p className="text-3xl font-bold text-wef-dark">{filtered.filter((r:any)=>r.status==='confirmed').length}</p>
                                     <p className="text-sm text-gray-500 font-medium">Confirmed Events</p>
                                     <div className="w-full bg-wef-gray rounded-full h-1.5 mt-2">
                                         <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                     </div>
                                 </div>
                                 <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                                      <CheckCircle size={20} />
                                 </div>
                             </div>
                             <div className="flex justify-between items-center">
                                 <div>
                                     <p className="text-3xl font-bold text-wef-dark">{profile?.connections?.length || 0}</p>
                                     <p className="text-sm text-gray-500 font-medium">Network Connections</p>
                                     <p className="text-xs text-wef-blue mt-1 flex items-center gap-1 font-medium">Top 5% engaged</p>
                                 </div>
                                 <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                                      <Briefcase size={20} />
                                 </div>
                             </div>
                         </div>
                    </div>

                    {/* How It Works box */}
                    <div className="bg-gradient-to-br from-wef-dark to-slate-800 rounded-sm p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <h3 className="text-lg font-bold mb-3 relative z-10">Make the Most of Davos</h3>
                        <p className="text-sm font-light text-gray-300 leading-relaxed mb-4 relative z-10">
                            Enhance your profile to increase your visibility. Attendees with complete profiles receive 3x more event acceptances.
                        </p>
                        <button onClick={toggleEdit} className="w-full bg-white text-wef-dark font-medium py-2 rounded-md hover:bg-wef-gray transition-colors relative z-10">
                            Complete Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal (Glassmorphism overlay) */}
            {isEditing && (
                <div 
                    className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto"
                >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-8 transform transition-transform"
                        >
                            <div className="flex justify-between items-center px-6 py-4 border-b border-wef-border bg-wef-gray">
                                <h2 className="text-xl font-bold text-wef-dark">Edit Introduction</h2>
                                <button onClick={toggleEdit} className="text-gray-400 hover:text-gray-600 bg-white p-1 rounded-full shadow-sm">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-8 overflow-y-auto max-h-[70vh]">
                                <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-wef-border">
                                    Update your professional information. Note: Name and Email are managed in account settings.
                                </p>
                                
                                <div className="space-y-10">
                                    {/* Section: Professional Identity */}
                                    <section>
                                        <h3 className="text-lg font-bold text-wef-dark mb-4 flex items-center gap-2">
                                            <Briefcase size={18} className="text-wef-blue" />
                                            Professional Identity
                                        </h3>
                                        <div className="space-y-5 bg-wef-gray p-6 rounded-sm border border-wef-border">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Headline *</label>
                                                <p className="text-xs text-gray-500 mb-2">A brief description of your current role or expertise, visible at the top of your profile.</p>
                                                <input type="text" name="headline" value={editForm.headline} onChange={handleInputChange} className="w-full border border-wef-border rounded-sm px-4 py-2.5 text-wef-dark shadow-sm focus:ring-2 focus:ring-wef-blue focus:border-wef-blue outline-none transition-all" placeholder="E.g. Director General at Global Corp" />
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Current Company</label>
                                                    <input type="text" name="company" value={editForm.company} onChange={handleInputChange} className="w-full border border-wef-border rounded-sm px-4 py-2.5 text-wef-dark shadow-sm focus:ring-2 focus:ring-wef-blue outline-none transition-all" placeholder="Global Corp" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                                                    <input type="text" name="job_title" value={editForm.job_title} onChange={handleInputChange} className="w-full border border-wef-border rounded-sm px-4 py-2.5 text-wef-dark shadow-sm focus:ring-2 focus:ring-wef-blue outline-none transition-all" placeholder="Director General" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section: Location & Industry */}
                                    <section>
                                        <h3 className="text-lg font-bold text-wef-dark mb-4 flex items-center gap-2">
                                            <MapPin size={18} className="text-wef-blue" />
                                            Location & Industry
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-wef-gray p-6 rounded-sm border border-wef-border">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                                                <input type="text" name="location" value={editForm.location} onChange={handleInputChange} className="w-full border border-wef-border rounded-sm px-4 py-2.5 text-wef-dark shadow-sm focus:ring-2 focus:ring-wef-blue outline-none transition-all" placeholder="Geneva, Switzerland" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Industry</label>
                                                <input type="text" name="industry" value={editForm.industry} onChange={handleInputChange} className="w-full border border-wef-border rounded-sm px-4 py-2.5 text-wef-dark shadow-sm focus:ring-2 focus:ring-wef-blue outline-none transition-all" placeholder="Technology, Finance, etc." />
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section: Detailed About */}
                                    <section>
                                        <h3 className="text-lg font-bold text-wef-dark mb-4 flex items-center gap-2">
                                            <User size={18} className="text-wef-blue" />
                                            About You
                                        </h3>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Provide a comprehensive summary of your background, achievements, and what brings you to Davos.</p>
                                            <textarea name="about" value={editForm.about} onChange={handleInputChange} rows={5} className="w-full border border-wef-border rounded-sm px-4 py-3 text-wef-dark shadow-sm focus:ring-2 focus:ring-wef-blue outline-none resize-y transition-all" placeholder="Summarize your experience and goals..." />
                                        </div>
                                    </section>
                                    
                                    {/* Section: Media & Appearance */}
                                    <section>
                                        <h3 className="text-lg font-bold text-wef-dark mb-4 flex items-center gap-2">
                                            <ImageIcon size={18} className="text-wef-blue" />
                                            Media & Appearance
                                        </h3>
                                        <div className="bg-wef-gray p-6 rounded-sm border border-wef-border space-y-5">
                                             <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Avatar URL</label>
                                                <p className="text-xs text-gray-500 mb-2">High-resolution square image for your profile picture.</p>
                                                <input type="text" name="avatar_url" value={editForm.avatar_url} onChange={handleInputChange} className="w-full border border-wef-border rounded-sm px-4 py-2.5 text-wef-dark text-sm shadow-sm focus:ring-2 focus:ring-wef-blue outline-none transition-all" placeholder="https://..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Background Banner URL</label>
                                                <p className="text-xs text-gray-500 mb-2">Landscape image to appear at the top of your profile (recommended: 1584x396px).</p>
                                                <input type="text" name="background_image_url" value={editForm.background_image_url} onChange={handleInputChange} className="w-full border border-wef-border rounded-sm px-4 py-2.5 text-wef-dark text-sm shadow-sm focus:ring-2 focus:ring-wef-blue outline-none transition-all" placeholder="https://..." />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            
                            <div className="px-6 py-5 border-t border-wef-border bg-wef-gray flex justify-end gap-3 rounded-b-2xl">
                                <button onClick={toggleEdit} className="px-5 py-2.5 border border-gray-300 rounded-sm text-gray-700 bg-white hover:bg-wef-gray font-bold transition-colors shadow-sm">
                                    Cancel
                                </button>
                                <button onClick={handleSaveProfile} className="px-6 py-2.5 bg-wef-blue text-white rounded-sm hover:bg-blue-800 font-bold transition-colors flex items-center gap-2 shadow-sm">
                                    <Save size={18} /> Save Complete Profile
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default GuestDashboard;
