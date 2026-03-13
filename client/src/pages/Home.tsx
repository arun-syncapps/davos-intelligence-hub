import { useEffect, useState } from 'react';
import { getEvents, getSpeakers, getVenues } from '../api/api';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, MapPin, Building, Activity, Clock, Bed } from 'lucide-react';
import { format } from 'date-fns';

const Home = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [speakers, setSpeakers] = useState<any[]>([]);
    const [venues, setVenues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getEvents(), getSpeakers(), getVenues()]).then(([evts, spks, vns]) => {
            setEvents(evts || []);
            setSpeakers(spks || []);
            setVenues(vns || []);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wef-blue"></div></div>;
    }

    // Get today's or upnext events for the schedule preview
    const upcomingEvents = events.slice(0, 4);
    const featuredSpeakers = speakers.slice(0, 4);
    const featuredVenues = venues.slice(0, 3);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#103070] to-wef-blue text-white pt-16 pb-20 lg:pt-24 lg:pb-32 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="flex-1 space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                            <Activity size={14} /> Live Hub
                        </div>
                        <h1 className="text-4xl lg:text-[54px] font-bold leading-[1.1] tracking-tight">
                            Davos Intelligence Hub: Global Events & City Guide
                        </h1>
                        <p className="text-lg text-blue-100 font-light max-w-xl">
                            Your centralized command center for navigating the Annual Meeting. Explore the official programme, discover key venues across Davos, and manage your event schedule.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/calendar" className="inline-flex items-center gap-2 bg-white text-wef-blue hover:bg-gray-100 transition-colors px-6 py-3 rounded-sm text-sm font-bold shadow-lg">
                                Explore Official Programme <ArrowRight size={16} />
                            </Link>
                            <Link to="/venues" className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 transition-colors px-6 py-3 rounded-sm text-sm font-bold border border-white">
                                View City Venues <MapPin size={16} />
                            </Link>
                        </div>
                    </div>
                    {/* Hero Graphic representing scheduling & management */}
                    <div className="flex-1 w-full max-w-[600px] aspect-video bg-white/5 backdrop-blur-sm rounded-sm overflow-hidden relative shadow-2xl border border-white/10 p-6 flex flex-col justify-between">
                        <div className="absolute inset-0 bg-gradient-to-br from-wef-blue/20 to-transparent"></div>
                        <div className="relative z-10 flex justify-between items-center border-b border-white/20 pb-4">
                            <h3 className="text-xl font-bold">Upcoming Agenda</h3>
                            <Link to="/calendar" className="text-xs font-bold uppercase tracking-widest text-blue-200 hover:text-white transition-colors">Full Schedule →</Link>
                        </div>
                        <div className="relative z-10 space-y-3 mt-4 flex-grow">
                            {upcomingEvents.slice(0, 3).map((ev, i) => (
                                <div key={i} className="bg-white/10 border border-white/10 p-4 rounded-sm hover:bg-white/20 transition-colors flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm truncate max-w-[250px]">{ev.title}</p>
                                        <p className="text-xs text-blue-200 mt-1 flex items-center gap-1"><Clock size={10} /> {ev.start_time} - {ev.end_time} • {ev.venue_id}</p>
                                    </div>
                                    <Link to={`/events/${ev.id}`} className="p-2 bg-white/20 rounded-sm hover:bg-white text-white hover:text-wef-blue transition-colors">
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 -mt-12 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <Link to="/calendar" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Calendar className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Programme</h3>
                        <p className="text-xs text-gray-500">Browse the full agenda</p>
                    </Link>
                    <Link to="/speakers" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Users className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Speakers</h3>
                        <p className="text-xs text-gray-500">Distinguished voices</p>
                    </Link>
                    <Link to="/venues" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <MapPin className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Venues</h3>
                        <p className="text-xs text-gray-500">Interactive city map</p>
                    </Link>
                    <Link to="/hotels" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Bed className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Hotels</h3>
                        <p className="text-xs text-gray-500">Official housing details</p>
                    </Link>
                    <Link to="/organizations" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Building className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Ecosystem</h3>
                        <p className="text-xs text-gray-500">Partners and centres</p>
                    </Link>
                    <Link to="/side-events" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Activity className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Side Events</h3>
                        <p className="text-xs text-gray-500">Unofficial directory</p>
                    </Link>
                    <Link to="/corporate-houses" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Building className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Houses</h3>
                        <p className="text-xs text-gray-500">Corporate & country hubs</p>
                    </Link>
                    <Link to="/networking" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Users className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Networking</h3>
                        <p className="text-xs text-gray-500">AI scheduling engine</p>
                    </Link>
                    <Link to="/marketplace/hub" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <Building className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">B2B Hub</h3>
                        <p className="text-xs text-gray-500">Event ops & supply chain</p>
                    </Link>
                    <Link to="/concierge" className="bg-white p-6 shadow-lg border border-wef-border rounded-sm hover:-translate-y-1 hover:border-wef-blue transition-all group">
                        <MapPin className="text-wef-blue mb-4" size={28} />
                        <h3 className="font-bold text-wef-dark text-lg group-hover:text-wef-blue transition-colors leading-tight mb-1">Concierge</h3>
                        <p className="text-xs text-gray-500">Executive transport & safety</p>
                    </Link>
                </div>
            </section>

            {/* Official Programme Overview */}
            <section className="bg-wef-gray py-16 border-y border-wef-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-end mb-10 border-b border-gray-300 pb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-wef-dark mb-2">Event Schedule Overview</h2>
                            <p className="text-gray-600 text-sm">Key upcoming sessions from the official programme.</p>
                        </div>
                        <Link to="/calendar" className="hidden sm:flex items-center gap-2 text-sm font-bold text-wef-blue hover:text-wef-dark transition-colors uppercase tracking-widest">
                            View Calendar <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {upcomingEvents.map((event) => (
                            <Link to={`/events/${event.id}`} key={event.id} className="group bg-white border border-wef-border rounded-sm overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
                                <div className="h-40 bg-gray-100 overflow-hidden relative">
                                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 left-2 bg-wef-blue text-white text-[10px] uppercase font-bold px-2 py-1 tracking-widest shadow-sm">
                                        {format(new Date(event.date), 'MMM d')}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                                        <Clock size={12} /> {event.start_time} - {event.end_time}
                                    </p>
                                    <h3 className="font-bold text-wef-dark text-lg leading-snug mb-3 group-hover:text-wef-blue transition-colors line-clamp-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                                        {event.description}
                                    </p>
                                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-xs text-gray-500 flex items-center gap-1 font-medium truncate max-w-[150px]">
                                            <MapPin size={12} className="text-wef-blue flex-shrink-0" /> {event.venue_id}
                                        </span>
                                        <span className="text-wef-blue group-hover:translate-x-1 transition-transform">
                                            <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Davos City Guide & Venues */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-end mb-10 border-b border-wef-dark pb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-wef-dark mb-2">Davos City & Venues</h2>
                            <p className="text-gray-600 text-sm">Explore key locations, pavilions, and designated entry zones.</p>
                        </div>
                        <Link to="/venues" className="hidden sm:flex items-center gap-2 border border-gray-300 hover:border-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-colors whitespace-nowrap">
                            Interactive Map <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Map Graphic representation */}
                        <div className="lg:col-span-2 bg-wef-gray rounded-sm border border-wef-border overflow-hidden relative min-h-[400px]">
                            {/* Realistic placeholder map for Davos area */}
                            <iframe 
                                title="Davos Map"
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=9.78,46.78,9.85,46.82&layer=mapnik&marker=46.796,9.821"
                            ></iframe>
                            <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-sm border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-wef-dark mb-1 flex items-center gap-2"><MapPin size={16} className="text-wef-blue" /> City Navigation</h3>
                                <p className="text-sm text-gray-600 mb-3">Navigate effectively between Congress Centre, Promenades, and Hotels.</p>
                                <Link to="/venues" className="text-xs font-bold text-wef-blue hover:underline uppercase tracking-widest inline-flex items-center gap-1">Open Detailed Map <ArrowRight size={12}/></Link>
                            </div>
                        </div>

                        {/* Top Venues List */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-wef-dark text-lg border-b border-gray-200 pb-2">Key Locations</h3>
                            {featuredVenues.map((venue) => (
                                <Link to={`/venues/${venue.id}`} key={venue.id} className="block group bg-white border border-wef-border p-4 rounded-sm hover:border-wef-blue hover:shadow-md transition-all">
                                    <h4 className="font-bold text-wef-dark group-hover:text-wef-blue transition-colors text-[15px] mb-1">{venue.name}</h4>
                                    <p className="text-xs text-gray-500 mb-2">{venue.address}</p>
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-sm">{venue.access_type}</span>
                                        <span className="text-wef-blue flex items-center gap-1">Details <ArrowRight size={10} /></span>
                                    </div>
                                </Link>
                            ))}
                            <Link to="/venues" className="block w-full text-center py-3 border border-gray-300 rounded-sm text-sm font-bold text-gray-700 hover:bg-wef-gray hover:text-wef-blue transition-colors mt-2">
                                View all {venues.length} venues
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Speakers Grid */}
            <section className="bg-wef-dark text-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex justify-between items-end mb-10 border-b border-white/20 pb-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Featured Voices</h2>
                            <p className="text-gray-400 text-sm">Global leaders, innovators, and changemakers shaping the agenda.</p>
                        </div>
                        <Link to="/speakers" className="hidden sm:flex items-center gap-2 text-xs font-bold text-white hover:text-blue-300 uppercase tracking-widest transition-colors">
                            All Speakers <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredSpeakers.map((speaker) => (
                           <Link to={`/speakers/${speaker.id}`} key={speaker.id} className="group text-center">
                                <div className="aspect-square bg-white/5 mb-4 overflow-hidden border border-white/10 group-hover:border-wef-blue transition-colors">
                                    <img src={speaker.image_url} alt={speaker.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <h4 className="font-bold text-lg leading-tight mb-1 group-hover:text-blue-300 transition-colors">{speaker.name}</h4>
                                <p className="text-sm text-gray-400 line-clamp-1">{speaker.title}</p>
                           </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
