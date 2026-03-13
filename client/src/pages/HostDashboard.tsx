import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHostEvents, getEventAttendees, createHostEvent, updateAttendeeStatus, deleteHostEvent, updateHostEvent } from '../api/api';
import { Trash2, Edit2, Save, X, Users, MapPin, Search } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const HostDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [attendees, setAttendees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // New Event Form State
    const [showCreate, setShowCreate] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [venueId, setVenueId] = useState('venue-ai-house');

    // Edit Event State
    const [editEventId, setEditEventId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ title: '', date: '', start_time: '', end_time: '' });

    // Search Attendees
    const [searchAttendee, setSearchAttendee] = useState('');

    useEffect(() => {
        if (!user || (user.role !== 'host' && user.role !== 'admin')) {
            navigate('/login');
        } else {
            loadEvents();
        }
    }, [user, navigate]);

    const loadEvents = async () => {
        setLoading(true);
        const data = await getHostEvents();
        setEvents(data);
        setLoading(false);
    };

    const loadAttendees = async (eventId: string) => {
        setSelectedEventId(eventId);
        const data = await getEventAttendees(eventId);
        setAttendees(data);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        await createHostEvent({
            title,
            description: 'Host created event',
            date,
            start_time: startTime,
            end_time: endTime,
            venue_id: venueId,
            organization_id: 'org-swiss',
            category: 'Networking',
            type: 'Reception',
            image_url: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&q=80&w=800'
        });
        setShowCreate(false);
        loadEvents();
    };

    const handleStatus = async (attendeeId: string, status: string) => {
        if (!selectedEventId) return;
        await updateAttendeeStatus(selectedEventId, attendeeId, status);
        loadAttendees(selectedEventId);
    };

    const handleDeleteEvent = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this event? This action will cancel all registrations.')) {
            await deleteHostEvent(id);
            if (selectedEventId === id) setSelectedEventId(null);
            loadEvents();
        }
    };

    const handleEditEventClick = (evt: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditEventId(evt.id);
        setEditForm({ title: evt.title, date: evt.date, start_time: evt.start_time, end_time: evt.end_time });
    };

    const handleSaveEvent = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        await updateHostEvent(id, editForm);
        setEditEventId(null);
        loadEvents();
    };

    const filteredAttendees = attendees.filter(a =>
        a.user_name.toLowerCase().includes(searchAttendee.toLowerCase()) ||
        a.user_email.toLowerCase().includes(searchAttendee.toLowerCase())
    );

    if (loading) return <div className="py-20 text-center font-mono">Loading Dashboard...</div>;

    return (
        <div className="pb-24 pt-10 px-4 sm:px-6 max-w-7xl mx-auto">
            <SectionHeader title="Host Dashboard" subtitle="Manage Your Events & Guests" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border border-wef-border p-6 rounded-sm shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Total Events</p>
                    <h2 className="text-3xl font-bold text-wef-dark">{events.length}</h2>
                    <p className="text-xs text-green-600 mt-2 font-medium">↑ Active schedule</p>
                </div>
                <div className="bg-white border border-wef-border p-6 rounded-sm shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Total Registrations</p>
                    <h2 className="text-3xl font-bold text-wef-blue">{attendees.length || '--'}</h2>
                    <p className="text-xs text-gray-400 mt-2">Across selected events</p>
                </div>
                <div className="bg-white border border-wef-border p-6 rounded-sm shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Avg Engagement</p>
                    <h2 className="text-3xl font-bold text-purple-600">85%</h2>
                    <p className="text-xs text-gray-400 mt-2">Acceptance rate</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6 border-b border-wef-border pb-4">
                <h3 className="text-2xl font-bold text-wef-dark">Event Administration</h3>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className={`font-medium py-2 px-6 rounded-full transition-colors shadow-sm ${showCreate ? 'bg-white border border-wef-border text-gray-700 hover:bg-wef-gray' : 'bg-wef-blue hover:bg-blue-800 text-white'}`}
                >
                    {showCreate ? 'Cancel' : 'Create New Event'}
                </button>
            </div>

            {showCreate && (
                <form onSubmit={handleCreate} className="mb-10 p-8 bg-wef-gray border border-wef-border rounded-2xl shadow-sm flex flex-col gap-6">
                    <div className="border-b border-wef-border pb-4 mb-2">
                        <h4 className="font-bold text-xl text-wef-dark">Schedule New Session</h4>
                        <p className="text-sm text-gray-500 mt-1">Provide detailed logistical and content information to attract attendees.</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Session Title *</label>
                            <input
                                required placeholder="E.g. The Future of AI in Healthcare" value={title} onChange={e => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-sm py-2.5 px-4 text-wef-dark outline-none focus:ring-2 focus:ring-wef-blue focus:border-wef-blue transition-all"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-sm border border-wef-border">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date *</label>
                                <input
                                    required type="date" value={date} onChange={e => setDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-sm py-2.5 px-4 text-wef-dark outline-none focus:ring-2 focus:ring-wef-blue transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start Time *</label>
                                    <input
                                        required type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                                        className="w-full border border-gray-300 rounded-sm py-2.5 px-4 text-wef-dark outline-none focus:ring-2 focus:ring-wef-blue transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">End Time *</label>
                                    <input
                                        required type="time" value={endTime} onChange={e => setEndTime(e.target.value)}
                                        className="w-full border border-gray-300 rounded-sm py-2.5 px-4 text-wef-dark outline-none focus:ring-2 focus:ring-wef-blue transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Assigned Venue ID *</label>
                            <p className="text-xs text-gray-500 mb-2">Use the system-registered venue identifier.</p>
                            <input
                                required placeholder="E.g. venue-ai-house" value={venueId} onChange={e => setVenueId(e.target.value)}
                                className="w-full md:w-1/2 border border-gray-300 rounded-sm py-2.5 px-4 text-wef-dark outline-none focus:ring-2 focus:ring-wef-blue transition-all font-mono text-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end border-t border-wef-border pt-6 mt-2 gap-3">
                        <button type="button" onClick={() => setShowCreate(false)} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-sm font-bold hover:bg-wef-gray transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-wef-blue hover:bg-blue-800 text-white py-2.5 px-8 rounded-sm font-bold transition-colors shadow-md">
                            Publish to Programme
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2">
                    {events.map((evt: any) => (
                        <div
                            key={evt.id}
                            onClick={() => { if (!editEventId) loadAttendees(evt.id) }}
                            className={`p-5 border rounded-sm mb-3 transition-all group ${selectedEventId === evt.id ? 'bg-blue-50 border-wef-blue shadow-sm' : 'bg-white border-wef-border hover:border-gray-300 cursor-pointer'}`}
                        >
                            {editEventId === evt.id ? (
                                <div className="flex flex-col gap-3 text-wef-dark" onClick={e => e.stopPropagation()}>
                                    <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="border border-wef-blue px-2 py-1 outline-none text-sm font-bold w-full" placeholder="Title" />
                                    <input type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} className="border border-wef-blue px-2 py-1 outline-none text-xs w-full" />
                                    <div className="flex gap-2">
                                        <input type="time" value={editForm.start_time} onChange={e => setEditForm({ ...editForm, start_time: e.target.value })} className="border border-wef-blue px-2 py-1 outline-none text-xs w-full" />
                                        <input type="time" value={editForm.end_time} onChange={e => setEditForm({ ...editForm, end_time: e.target.value })} className="border border-wef-blue px-2 py-1 outline-none text-xs w-full" />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={(e) => handleSaveEvent(evt.id, e)} className="text-green-600 bg-green-50 p-1 border border-green-200"><Save size={16} /></button>
                                        <button onClick={(e) => { e.stopPropagation(); setEditEventId(null); }} className="text-gray-500 bg-wef-gray p-1 border border-wef-border"><X size={16} /></button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg pr-4 leading-tight">{evt.title}</h4>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={(e) => handleEditEventClick(evt, e)} className={`p-1 rounded ${selectedEventId === evt.id ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-wef-gray text-gray-500'}`}><Edit2 size={16} /></button>
                                            <button onClick={(e) => handleDeleteEvent(evt.id, e)} className="p-1 rounded text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <div className={`text-xs font-mono uppercase tracking-widest mt-4 flex items-center gap-2 ${selectedEventId === evt.id ? 'opacity-90 text-gray-300' : 'opacity-70 text-gray-600'}`}>
                                        <MapPin size={12} /> {format(new Date(evt.date), 'MMM d, yy')} • {evt.start_time}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {events.length === 0 && (
                        <div className="text-center p-8 border border-dashed border-gray-300 bg-wef-gray">
                            <p className="font-mono text-gray-500 text-sm">No events found.</p>
                            <button onClick={() => setShowCreate(true)} className="mt-4 text-[10px] font-bold uppercase tracking-widest text-wef-blue hover:underline">Create your first event</button>
                        </div>
                    )}
                </div>

                <div className="md:col-span-2">
                    {selectedEventId ? (
                        <div className="bg-white border border-wef-border flex flex-col h-full min-h-[500px]">
                            <div className="p-6 border-b border-wef-border flex justify-between items-center bg-wef-gray">
                                <div>
                                    <h3 className="text-2xl font-bold flex items-center gap-3">
                                        <Users className="text-wef-blue" size={24} /> Guest Management
                                    </h3>
                                    <p className="text-xs font-mono text-gray-500 mt-2 uppercase tracking-widest">
                                        {attendees.length} Total Registrations
                                    </p>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search guests..."
                                        value={searchAttendee}
                                        onChange={e => setSearchAttendee(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-wef-border text-xs font-mono outline-none focus:border-wef-blue w-64 bg-white shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="overflow-y-auto flex-grow p-0">
                                <table className="w-full text-left font-mono text-sm">
                                    <thead className="bg-white sticky top-0 z-10 shadow-sm">
                                        <tr className="border-b-2 border-wef-dark">
                                            <th className="py-4 font-bold text-[10px] uppercase tracking-widest">Name</th>
                                            <th className="py-4 font-bold text-[10px] uppercase tracking-widest">Email</th>
                                            <th className="py-4 font-bold text-[10px] uppercase tracking-widest">Status</th>
                                            <th className="py-4 font-bold text-[10px] uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAttendees.map((attendee: any) => (
                                            <tr key={attendee.id} className="border-b border-wef-border hover:bg-wef-gray transition-colors">
                                                <td className="py-4 px-6 font-medium">{attendee.user_name}</td>
                                                <td className="py-4 px-6 text-gray-500">{attendee.user_email}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold border ${attendee.status === 'confirmed' ? 'bg-green-50 text-green-800 border-green-200' :
                                                        attendee.status === 'rejected' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                                                        }`}>
                                                        {attendee.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right flex justify-end gap-3">
                                                    {attendee.status !== 'confirmed' && (
                                                        <button onClick={() => handleStatus(attendee.id, 'confirmed')} className="text-[10px] uppercase tracking-widest font-bold text-green-600 hover:text-green-800 border border-transparent hover:border-green-200 px-2 py-1 transition-colors">
                                                            Approve
                                                        </button>
                                                    )}
                                                    {attendee.status !== 'rejected' && (
                                                        <button onClick={() => handleStatus(attendee.id, 'rejected')} className="text-[10px] uppercase tracking-widest font-bold text-red-600 hover:text-red-800 border border-transparent hover:border-red-200 px-2 py-1 transition-colors">
                                                            Reject
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredAttendees.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-12 text-center text-gray-400">
                                                    <Users size={32} className="mx-auto mb-3 opacity-20" />
                                                    No attendees match your search.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border border-wef-border p-8 text-center text-gray-400 font-mono flex flex-col items-center justify-center min-h-[500px]">
                            <Users size={48} className="mb-4 opacity-20" />
                            Select an event to view and manage its guest list.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HostDashboard;
