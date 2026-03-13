import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminStats, getAdminUsers, getAdminEvents, deleteEvent, updateUserRole, deleteAdminUser, updateAdminUser } from '../api/api';
import SectionHeader from '../components/SectionHeader';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Trash2, Edit2, Save, X, Search, TrendingUp, TrendingDown, Activity, Users, Calendar, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // User Edit State
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });

    // Pro Management State
    const [roleFilter, setRoleFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            loadData();
        }
    }, [user, navigate]);

    const loadData = async () => {
        setLoading(true);
        const [statsData, usersData, eventsData] = await Promise.all([
            getAdminStats(),
            getAdminUsers(),
            getAdminEvents()
        ]);
        setStats(statsData);
        setUsers(usersData);
        setEvents(eventsData);
        setLoading(false);
    };

    const handleRoleChange = async (id: string, newRole: string) => {
        await updateUserRole(id, newRole);
        loadData();
    };

    const handleDeleteEvent = async (id: string) => {
        if (confirm('Delete this event?')) {
            await deleteEvent(id);
            loadData();
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (confirm('Are you sure you want to completely erase this user?')) {
            await deleteAdminUser(id);
            loadData();
        }
    };

    const handleEditUserClick = (u: any) => {
        setEditingUserId(u.id);
        setEditForm({ name: u.name, email: u.email });
    };

    const handleSaveUser = async (id: string) => {
        await updateAdminUser(id, editForm.name, editForm.email);
        setEditingUserId(null);
        loadData();
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    const handleExportCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Role'];
        const csvContent = [
            headers.join(','),
            ...filteredUsers.map(u => `"${u.id}","${u.name}","${u.email}","${u.role}"`)
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `davos_system_users_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        link.click();
    };

    if (loading || !stats) return <div className="py-20 text-center font-mono">Loading System Protocols...</div>;

    return (
        <div className="pb-24 pt-8 px-4 sm:px-6 max-w-7xl mx-auto">
            <SectionHeader title="Platform Intelligence" subtitle="Global Command Center" />

            {/* Platform Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Users', value: stats.users, highlight: false, trend: '+12%', up: true, icon: Users },
                    { label: 'Active Events', value: stats.events, highlight: true, trend: '+5%', up: true, icon: Calendar },
                    { label: 'Registered Venues', value: stats.venues, highlight: false, trend: 'Stable', up: null, icon: Activity },
                    { label: 'Event RSVPs', value: stats.registrations, highlight: false, trend: '+28%', up: true, icon: Activity },
                ].map((s, i) => (
                    <div key={i} className={`bg-white border p-6 shadow-sm rounded-sm relative overflow-hidden transition-transform hover:-translate-y-1 ${s.highlight ? 'border-wef-blue border-b-4' : 'border-wef-border'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <p className={`text-sm font-semibold tracking-wide ${s.highlight ? 'text-wef-blue' : 'text-gray-500'}`}>{s.label}</p>
                            <s.icon size={20} className={s.highlight ? 'text-wef-blue' : 'text-gray-400'} />
                        </div>
                        <h2 className="text-4xl font-bold text-wef-dark mb-2">{s.value}</h2>
                        <div className="flex items-center gap-1.5 mt-2">
                            {s.up === true ? <TrendingUp size={14} className="text-green-500"/> : s.up === false ? <TrendingDown size={14} className="text-red-500"/> : null}
                            <span className={`text-xs font-medium ${s.up === true ? 'text-green-600' : s.up === false ? 'text-red-600' : 'text-gray-400'}`}>
                                {s.trend} from last month
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Engagement Metrics Row */}
            <div className="bg-white border border-wef-border shadow-sm rounded-sm p-6 mb-12">
                <h3 className="text-lg font-bold text-wef-dark mb-6 flex items-center gap-2"><Activity size={20} className="text-wef-blue"/> Network Engagement Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                     {[
                        { label: 'Connections Made', value: stats.connections || 0, desc: 'Total networking links formed' },
                        { label: 'Community Posts', value: stats.posts || 0, desc: 'Knowledge shared in network' },
                        { label: 'Profile Views', value: stats.profile_views || 0, desc: 'Global visibility interactions' }
                     ].map((s, i) => (
                        <div key={i} className="px-6 py-4 md:py-0 first:pt-0 first:pl-0 last:pb-0 last:pr-0">
                            <p className="text-sm font-semibold text-gray-500 mb-1">{s.label}</p>
                            <div className="flex items-baseline gap-3 mb-1">
                                <h2 className="text-3xl font-bold text-gray-700">{s.value}</h2>
                            </div>
                            <p className="text-xs text-gray-400">{s.desc}</p>
                        </div>
                     ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Users Control */}
                <div className="lg:col-span-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 border-b border-wef-border pb-4">
                        <h3 className="text-xl font-bold text-wef-dark">User Registry</h3>
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    className="pl-9 pr-3 py-2 border border-wef-border rounded-sm text-sm bg-wef-gray outline-none focus:border-wef-blue focus:ring-1 focus:ring-wef-blue w-full sm:w-64 transition-all"
                                />
                            </div>
                            <div className="relative">
                                <select 
                                    value={roleFilter} 
                                    onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                                    className="border border-wef-border rounded-sm py-2 pl-3 pr-8 text-sm bg-wef-gray outline-none focus:border-wef-blue focus:ring-1 focus:ring-wef-blue appearance-none transition-all cursor-pointer"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="guest">Guests</option>
                                    <option value="host">Hosts</option>
                                    <option value="admin">Admins</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 bg-white border border-wef-border rounded-sm text-sm font-semibold text-gray-700 hover:bg-wef-gray hover:text-wef-blue transition-colors shadow-sm">
                                <Download size={16} /> Export CSV
                            </button>
                        </div>
                    </div>
                    <div className="bg-white border border-wef-border rounded-sm shadow-sm overflow-hidden mb-8">
                        <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-sm">
                            <thead className="bg-wef-gray sticky top-0 z-10">
                                <tr>
                                    <th className="py-3 px-4 font-bold text-[10px] uppercase tracking-widest">User Details</th>
                                    <th className="py-3 px-4 font-bold text-[10px] uppercase tracking-widest w-28">Role</th>
                                    <th className="py-3 px-4 font-bold text-[10px] uppercase tracking-widest text-right w-24">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(u => (
                                    <tr key={u.id} className="border-b border-wef-border hover:bg-wef-gray transition-colors group">
                                        <td className="py-4 px-4">
                                            {editingUserId === u.id ? (
                                                <div className="flex flex-col gap-2">
                                                    <input
                                                        value={editForm.name}
                                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                        className="border border-gray-300 rounded px-3 py-1.5 text-sm font-semibold w-full focus:border-wef-blue focus:ring-1 focus:ring-wef-blue outline-none transition-all"
                                                        placeholder="Full Name"
                                                    />
                                                    <input
                                                        value={editForm.email}
                                                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                                        className="border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-600 w-full focus:border-wef-blue focus:ring-1 focus:ring-wef-blue outline-none transition-all"
                                                        placeholder="Email Address"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-wef-blue flex flex-shrink-0 items-center justify-center font-bold text-xs uppercase">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-wef-dark truncate max-w-[200px]">{u.name}</p>
                                                        <p className="text-gray-500 text-xs truncate max-w-[200px]">{u.email}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="relative">
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                    className={`appearance-none bg-wef-gray border border-wef-border rounded-sm py-1.5 pl-3 pr-8 text-xs font-bold uppercase tracking-wider focus:border-wef-blue focus:ring-1 focus:ring-wef-blue outline-none cursor-pointer w-full transition-all ${u.role === 'admin' ? 'text-purple-700 bg-purple-50 border-purple-200' : u.role === 'host' ? 'text-wef-blue bg-blue-50 border-blue-200' : 'text-gray-600'}`}
                                                    disabled={u.id === user?.id} // Prevent self-demotion
                                                >
                                                    <option value="guest">Guest</option>
                                                    <option value="host">Host</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            {editingUserId === u.id ? (
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleSaveUser(u.id)} className="text-green-600 hover:text-green-800"><Save size={16} /></button>
                                                    <button onClick={() => setEditingUserId(null)} className="text-gray-500 hover:text-gray-700"><X size={16} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEditUserClick(u)} className="text-blue-500 hover:text-blue-700">
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        disabled={u.id === user?.id}
                                                        className={`text-red-500 hover:text-red-700 ${u.id === user?.id ? 'opacity-30 cursor-not-allowed' : ''}`}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No users found matching your criteria.</div>
                        )}
                        </div>
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center bg-white border border-wef-border p-4 rounded-sm shadow-sm mb-12">
                            <span className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-wef-dark">{(currentPage - 1) * usersPerPage + 1}</span> to <span className="font-semibold text-wef-dark">{Math.min(currentPage * usersPerPage, filteredUsers.length)}</span> of <span className="font-semibold text-wef-dark">{filteredUsers.length}</span> entries
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    disabled={currentPage === 1} 
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="p-2 border border-wef-border rounded-md text-gray-600 disabled:opacity-50 hover:bg-wef-gray transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button 
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)} 
                                    className="p-2 border border-wef-border rounded-md text-gray-600 disabled:opacity-50 hover:bg-wef-gray transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-wef-dark mb-4 border-b border-wef-border pb-2 flex items-center gap-2"><Calendar size={20} className="text-wef-blue"/> Central Calendar Control</h3>
                    <div className="bg-white border border-wef-border rounded-sm shadow-sm overflow-hidden mb-8">
                        <table className="w-full text-left font-mono text-sm">
                            <thead className="bg-wef-gray border-b border-wef-border">
                                <tr>
                                    <th className="py-3 px-4 font-bold text-[10px] uppercase tracking-widest">Event Session</th>
                                    <th className="py-3 px-4 font-bold text-[10px] uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(ev => (
                                    <tr key={ev.id} className="border-b border-wef-border hover:bg-wef-gray transition-colors">
                                        <td className="py-3 px-4">
                                            <p className="font-bold text-wef-blue truncate max-w-[200px]">{ev.title}</p>
                                            <p className="text-gray-500 text-xs">{format(new Date(ev.date), 'MMM d, yyyy')} • Host: {ev.host_name}</p>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button
                                                onClick={() => handleDeleteEvent(ev.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 bg-red-50 px-2 py-1 border border-red-200 flex flex-row items-center gap-1"
                                            >
                                                <Trash2 size={12} /> Revoke
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
