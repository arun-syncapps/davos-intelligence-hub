import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { getEvents } from '../api/api';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Tag, Filter, Search, ArrowRight } from 'lucide-react';

const Calendar = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [dates, setDates] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState<string>('All');
    
    // Derived categories from database
    const categories = ['All', ...Array.from(new Set(events.map(e => e.category).filter(Boolean)))];

    useEffect(() => {
        getEvents().then(data => {
            setEvents(data);
            const uniqueDates = Array.from(new Set(data.map((e: any) => e.date))).sort() as string[];
            setDates(uniqueDates);
            if (uniqueDates.length > 0) {
                setSelectedDate(uniqueDates[0]);
            }
            setLoading(false);
        });
    }, []);

    const filteredEvents = events.filter(e => {
        const dateMatch = e.date === selectedDate;
        const categoryMatch = filterCategory === 'All' || e.category === filterCategory;
        return dateMatch && categoryMatch;
    });

    if (loading) return (
        <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Master Header */}
                <div className="mb-12 border-b-2 border-wef-dark pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-wef-dark mb-2 tracking-tight flex items-center gap-3">
                            <CalendarIcon className="text-wef-blue" size={40}/>
                            Official Programme
                        </h1>
                        <p className="text-gray-500 font-serif text-lg">Comprehensive schedule of sessions, panels, and bilateral dialogues.</p>
                    </div>
                    
                    {/* Utility Bar */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:max-w-xs">
                             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                             <input 
                                 type="text" 
                                 placeholder="Search sessions..." 
                                 className="w-full pl-10 pr-4 py-2 bg-wef-gray border border-wef-border text-sm focus:outline-none focus:border-wef-blue transition-colors rounded-sm"
                             />
                        </div>
                        <button className="bg-wef-dark text-white p-2 rounded-sm border border-wef-dark hover:bg-wef-blue hover:border-wef-blue transition-colors shadow-sm flex items-center justify-center">
                            <Filter size={20}/>
                        </button>
                    </div>
                </div>

                {/* Date Navigator Grid */}
                <div className="mb-8">
                     <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                         <Clock size={14}/> Annual Meeting Timeline
                     </p>
                    <div className="flex flex-nowrap overflow-x-auto hide-scrollbar gap-2 pb-4 border-b border-wef-border">
                        {dates.map(date => (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={`flex-shrink-0 flex flex-col items-center justify-center w-32 h-24 border rounded-sm transition-all duration-300 ${selectedDate === date
                                    ? 'bg-wef-blue text-white shadow-md border-wef-blue scale-105 z-10'
                                    : 'bg-wef-gray text-gray-700 border-gray-200 hover:border-wef-blue hover:text-wef-blue'
                                    }`}
                            >
                                <span className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${selectedDate === date ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {format(parseISO(date), 'EEEE')}
                                </span>
                                <span className="text-3xl font-bold leading-none mb-1">
                                    {format(parseISO(date), 'd')}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    {format(parseISO(date), 'MMM, yyyy')}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar Filters */}
                    <div className="lg:col-span-1 border-r border-wef-border pr-8 hidden lg:block sticky top-24 h-max">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-wef-dark mb-4 pb-2 border-b border-wef-border flex items-center gap-2">
                             <Tag size={16} className="text-wef-blue"/> Thematic Tracks
                        </h3>
                        <div className="space-y-2">
                             {categories.map((cat, idx) => (
                                 <button
                                     key={idx}
                                     onClick={() => setFilterCategory(cat as string)}
                                     className={`w-full text-left px-4 py-2 font-bold text-sm rounded-sm transition-all flex items-center justify-between ${filterCategory === cat
                                         ? 'bg-wef-blue text-white shadow-sm'
                                         : 'bg-white border border-wef-border text-gray-600 hover:border-wef-blue'
                                     }`}
                                 >
                                     <span className="truncate">{cat}</span>
                                     {filterCategory === cat && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                 </button>
                             ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-wef-border">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-wef-dark mb-4 flex items-center gap-2">
                                <Users size={16} className="text-wef-blue"/> Session Formats
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="panel" className="w-4 h-4 text-wef-blue border-gray-300 rounded focus:ring-wef-blue"/>
                                    <label htmlFor="panel" className="text-sm font-bold text-gray-700">Plenary Sessions</label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="roundtable" className="w-4 h-4 text-wef-blue border-gray-300 rounded focus:ring-wef-blue"/>
                                    <label htmlFor="roundtable" className="text-sm font-bold text-gray-700">Strategic Roundtables</label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="press" className="w-4 h-4 text-wef-blue border-gray-300 rounded focus:ring-wef-blue"/>
                                    <label htmlFor="press" className="text-sm font-bold text-gray-700">Press Conferences</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Master Timeline View */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-end mb-6 border-b border-wef-border pb-2">
                            <h2 className="text-xl font-bold text-wef-dark">
                                Events for {format(parseISO(selectedDate), 'EEEE, MMMM do, yyyy')}
                            </h2>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-wef-blue bg-blue-50 px-3 py-1 border border-blue-100 rounded-sm">
                                {filteredEvents.length} Sessions Found
                            </span>
                        </div>

                        {filteredEvents.length > 0 ? (
                            <div className="space-y-6 relative before:absolute before:inset-0 before:left-24 before:w-px before:bg-wef-border">
                                {filteredEvents.map((event) => (
                                    <div key={event.id} className="relative flex items-stretch gap-6 group pl-2">
                                        
                                        {/* Time Logic */}
                                        <div className="w-20 shrink-0 text-right pt-2 relative">
                                            <div className="absolute right-[-29px] top-4 w-4 h-4 bg-white border-4 border-wef-blue rounded-full z-10 transition-transform group-hover:scale-125 shadow-sm"></div>
                                            <span className="block text-xl font-bold text-wef-dark leading-none">{event.start_time}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">EST</span>
                                        </div>

                                        {/* Event Deep Card */}
                                        <div className="flex-grow bg-white border border-wef-border p-6 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-wef-blue relative overflow-hidden">
                                            {/* Category Tag Top Right */}
                                            <div className="absolute top-0 right-0 bg-wef-gray border-b border-l border-wef-border px-4 py-1 text-[10px] font-bold tracking-widest uppercase text-gray-500 rounded-bl-sm z-10">
                                                {event.category || 'General'}
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Left Image Thumbnail */}
                                                <div className="w-full md:w-48 h-32 shrink-0 overflow-hidden bg-wef-dark relative rounded-sm">
                                                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                                    <div className="absolute top-2 left-2 bg-wef-blue text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-sm">
                                                        {event.type}
                                                    </div>
                                                </div>

                                                {/* Right Data */}
                                                <div className="flex-grow flex flex-col pt-1">
                                                    <Link to={`/events/${event.id}`} className="block">
                                                        <h3 className="text-2xl font-bold text-wef-dark group-hover:text-wef-blue transition-colors leading-tight mb-2 pr-8">
                                                            {event.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-gray-600 font-serif leading-relaxed line-clamp-2 pr-4 mb-4">
                                                        {event.description}
                                                    </p>

                                                    <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                                            <MapPin size={14} className="text-wef-blue shrink-0"/>
                                                            <span className="truncate" title={event.venue_id}>{event.venue_id}</span>
                                                        </div>
                                                        <div className="flex items-center justify-end">
                                                            <Link to={`/events/${event.id}`} className="text-xs font-bold uppercase tracking-widest text-wef-blue hover:text-blue-800 transition-colors flex items-center gap-1 group-hover:translate-x-1">
                                                                Session Brief <ArrowRight size={14}/>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-wef-gray border border-dashed border-wef-border rounded-sm py-20 flex flex-col items-center justify-center text-center">
                                 <CalendarIcon size={48} className="text-gray-300 mb-4"/>
                                 <h3 className="text-xl font-bold text-wef-dark mb-1">No Sessions Logged</h3>
                                 <p className="text-gray-500 font-mono text-sm max-w-sm">The official programme currently has no active sessions mapped to this specific date or thematic filter.</p>
                                 <button onClick={() => setFilterCategory('All')} className="mt-6 bg-white border border-wef-border text-xs font-bold uppercase tracking-widest text-wef-blue px-6 py-2 rounded-sm hover:border-wef-blue transition-colors shadow-sm">
                                     Clear Filters
                                 </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
