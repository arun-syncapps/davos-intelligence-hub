import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVenueById } from '../api/api';
import { MapPin, Users, Ticket, Calendar, Clock, Navigation, ShieldAlert, Building, Compass, Fullscreen, ExternalLink, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const VenueDetail = () => {
    const { id } = useParams();
    const [venue, setVenue] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getVenueById(id).then(data => {
                setVenue(data);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
        </div>
    );
    if (!venue) return <div className="py-20 text-center font-mono text-gray-500">Venue not found.</div>;

    // Advanced Mock Features for Venue Logistics
    const logistics = {
        securityLevel: venue.access_type.includes('Badge') ? 'High (X-Ray Screening)' : 'Standard (ID Check)',
        entryGate: venue.id.includes('congress') ? 'Gate A & B' : 'Main Promenade Entrance',
        transit: ['Shuttle Route 1', 'Walkable from Congress Centre (5 mins)'],
        amenities: ['High-Speed WiFi', 'Translation Services (6 Languages)', 'Media Briefing Room', 'VIP Lounge']
    };

    return (
        <div className="bg-wef-gray min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/venues" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-wef-blue mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to City Map
                </Link>

                {/* Top Banner / Hero */}
                <div className="bg-wef-dark text-white rounded-sm shadow-sm overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 z-0">
                        <img src={venue.image_url} alt={venue.name} className="w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/80 to-transparent"></div>
                    </div>
                    
                    <div className="p-8 lg:p-12 relative z-10 flex flex-col items-center justify-end min-h-[400px] text-center">
                        <span className="inline-block bg-white/10 border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm mb-4 backdrop-blur-sm">
                            Official Davos Venue
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl">{venue.name}</h1>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold tracking-widest uppercase text-gray-300">
                            <span className="flex items-center gap-2"><MapPin size={16} className="text-wef-blue"/> {venue.address}</span>
                            <span className="flex items-center gap-2"><Users size={16} className="text-wef-blue"/> Cap: {venue.capacity}</span>
                            <span className="flex items-center gap-2"><Ticket size={16} className="text-wef-blue"/> {venue.access_type}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Logistics & Map */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Map View */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm overflow-hidden">
                            <div className="bg-wef-gray h-64 relative overflow-hidden group">
                                <iframe
                                    title="map"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(venue.coordinates.split(',')[1]) - 0.005},${parseFloat(venue.coordinates.split(',')[0]) - 0.005},${parseFloat(venue.coordinates.split(',')[1]) + 0.005},${parseFloat(venue.coordinates.split(',')[0]) + 0.005}&layer=mapnik&marker=${venue.coordinates}`}
                                    className="absolute inset-0 grayscale group-hover:grayscale-0 transition duration-700"
                                ></iframe>
                                <button className="absolute bottom-4 right-4 bg-wef-dark text-white p-2 rounded-sm shadow-lg hover:bg-wef-blue transition-colors backdrop-blur-sm z-10" title="Full Screen Map">
                                    <Fullscreen size={18} />
                                </button>
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-wef-dark mb-4 flex items-center gap-2">
                                    <Navigation size={16} className="text-wef-blue" /> Directions & Routing
                                </h3>
                                <p className="text-gray-600 font-mono text-sm mb-4 bg-wef-gray p-3 border border-dashed border-wef-border">
                                    {venue.address}
                                </p>
                                <button className="w-full bg-white border border-wef-border hover:border-wef-blue hover:text-wef-blue text-wef-dark font-bold py-2.5 rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                    <Compass size={16} /> Open in Maps
                                </button>
                            </div>
                        </div>

                        {/* Operational Logistics */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-wef-dark mb-4 border-b border-wef-border pb-2 flex items-center gap-2">
                                <ShieldAlert size={16} className="text-wef-blue" /> Access & Security
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Security Clearance</p>
                                    <p className="text-sm font-bold text-wef-dark mt-1">{logistics.securityLevel}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Designated Entry</p>
                                    <p className="text-sm font-bold text-wef-dark mt-1">{logistics.entryGate}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Transit Lines</p>
                                    <ul className="text-sm font-bold text-wef-dark mt-1 list-disc pl-4 space-y-1">
                                        {logistics.transit.map((t, idx) => <li key={idx}>{t}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Venue Details & Complete Schedule */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Venue Description */}
                        <div className="bg-white border border-wef-border shadow-sm rounded-sm p-8">
                            <h2 className="text-xl font-bold text-wef-dark mb-6 flex items-center gap-3 border-b border-wef-border pb-3">
                                <Building className="text-wef-blue" />
                                Facility Overview
                            </h2>
                            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed font-serif text-lg">
                                <p className="whitespace-pre-line mb-6">{venue.description}</p>
                                <p>
                                    As a core pavilion in the Davos ecosystem, this facility is equipped to handle high-level bilateral meetings, public plenaries, and press conferences. Its central location allows for seamless transitions between major programme sessions.
                                </p>
                            </div>
                            
                            {/* Amenities Chips */}
                            <div className="mt-8 pt-6 border-t border-wef-border flex flex-wrap gap-2">
                                {logistics.amenities.map((amenity, idx) => (
                                    <span key={idx} className="bg-wef-gray text-wef-dark px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest shadow-sm border border-wef-border">
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Full Event Schedule Lineup */}
                        <div className="bg-wef-dark text-white shadow-sm rounded-sm p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-wef-blue/10 rounded-full blur-3xl"></div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-white/20 pb-3 relative z-10">
                                <Calendar className="text-blue-400" />
                                Master Schedule
                            </h2>
                            
                            {venue.events && venue.events.length > 0 ? (
                                <div className="space-y-4 relative z-10">
                                    {venue.events.map((evt: any) => (
                                        <Link to={`/events/${evt.id}`} key={evt.id} className="group bg-white/5 border border-white/10 p-5 rounded-sm hover:bg-white/10 hover:border-wef-blue transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-blue-900/50 text-blue-200 border border-blue-800 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
                                                        {evt.type || 'Session'}
                                                    </span>
                                                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold flex items-center gap-1">
                                                        <Clock size={12}/> {format(new Date(evt.date), 'MMM d, yyyy')} • {evt.start_time} - {evt.end_time}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors leading-tight">
                                                    {evt.title}
                                                </h4>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <button className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">
                                                    Access Details <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white/5 border border-dashed border-white/10 relative z-10">
                                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">No Scheduled Sessions</p>
                                    <p className="text-sm text-gray-500">The master schedule for this venue is currently empty.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueDetail;
