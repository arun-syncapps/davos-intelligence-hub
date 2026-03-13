import { Filter, Calendar, MapPin, Users, Globe } from 'lucide-react';

const mockSideEvents = [
    {
        id: "se-1",
        title: "Global AI Ethics Roundtable",
        host: "Tech Policy Institute",
        date: "Jan 16, 2026",
        time: "14:00 - 16:30",
        venue: "Hotel Seehof, Promenade 159",
        capacity: 120,
        type: "Roundtable",
        industry: "Technology",
        invitation: "Invite-Only",
        image_url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "se-2",
        title: "Sustainable Finance Mixer",
        host: "Global Green Fund",
        date: "Jan 17, 2026",
        time: "18:00 - 21:00",
        venue: "Hard Rock Hotel Rooftop",
        capacity: 250,
        type: "Networking reception",
        industry: "Finance",
        invitation: "Open Registration",
        image_url: "https://images.unsplash.com/photo-1561489413-985b06da5bee?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "se-3",
        title: "Future of Healthcare Panel",
        host: "MedTech Global",
        date: "Jan 15, 2026",
        time: "09:00 - 11:30",
        venue: "House of Switzerland",
        capacity: 300,
        type: "Panel discussion",
        industry: "Healthcare",
        invitation: "Requires Approval",
        image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    }
];

const SideEvents = () => {
    return (
        <div className="bg-wef-gray min-h-screen pt-8 pb-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-wef-dark pb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-wef-dark mb-2 tracking-tight">
                            Side Events Discovery
                        </h1>
                        <p className="text-gray-500 font-serif text-lg max-w-2xl">
                            Global directory of unofficial summit side events. Panel discussions, dinners, and networking across Davos.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white border border-wef-border p-6 rounded-sm text-sm">
                            <h3 className="font-bold text-wef-dark mb-4 uppercase tracking-widest flex items-center gap-2"><Filter size={16}/> Filters</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Search Keyword</label>
                                    <input type="text" placeholder="e.g. AI, Climate..." className="w-full border border-gray-300 px-3 py-2 rounded-sm focus:border-wef-blue outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Event Type</label>
                                    <select className="w-full border border-gray-300 px-3 py-2 rounded-sm outline-none">
                                        <option>All Types</option>
                                        <option>Panel discussions</option>
                                        <option>Roundtables</option>
                                        <option>Networking receptions</option>
                                        <option>Private dinners</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Invitation Status</label>
                                    <select className="w-full border border-gray-300 px-3 py-2 rounded-sm outline-none">
                                        <option>All Access</option>
                                        <option>Open Registration</option>
                                        <option>Requires Approval</option>
                                        <option>Invite-Only</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feed */}
                    <div className="lg:col-span-3 space-y-6">
                        {mockSideEvents.map(event => (
                            <div key={event.id} className="bg-white border border-wef-border flex flex-col md:flex-row hover:border-wef-blue hover:shadow-lg transition-all rounded-sm">
                                <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden shrink-0">
                                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 bg-wef-blue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                                        {event.industry}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-wef-dark leading-tight">{event.title}</h3>
                                            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-sm ${event.invitation === 'Invite-Only' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                                                {event.invitation}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-600 mb-4">{event.host}</p>
                                        <div className="grid grid-cols-2 gap-y-2 text-xs font-bold text-gray-500">
                                            <span className="flex items-center gap-2"><Calendar size={14} className="text-wef-blue"/> {event.date} • {event.time}</span>
                                            <span className="flex items-center gap-2"><MapPin size={14} className="text-wef-blue"/> {event.venue}</span>
                                            <span className="flex items-center gap-2"><Globe size={14} className="text-wef-blue"/> {event.type}</span>
                                            <span className="flex items-center gap-2"><Users size={14} className="text-wef-blue"/> Cap: {event.capacity}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                                        <button className="bg-wef-dark hover:bg-wef-blue text-white text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-sm transition-colors shadow-sm">
                                            {event.invitation === 'Invite-Only' ? 'Request Invite' : 'Register Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideEvents;
