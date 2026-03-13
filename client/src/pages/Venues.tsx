import { useEffect, useState } from 'react';
import { getVenues, getVenueById } from '../api/api';
import SectionHeader from '../components/SectionHeader';
import { MapPin, Users, Info, Building, ShieldAlert, Navigation, ChevronRight, Fullscreen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Venues = () => {
    const [venues, setVenues] = useState<any[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVenues().then(data => {
            setVenues(data);
            if (data.length > 0) {
                handleSelectVenue(data[0].id);
            } else {
                setLoading(false);
            }
        });
    }, []);

    const handleSelectVenue = (id: string) => {
        getVenueById(id).then(data => {
            setSelectedVenue(data);
            setLoading(false);
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wef-blue"></div>
        </div>
    );

    return (
        <div className="bg-wef-gray min-h-screen pb-24 pt-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <SectionHeader title="Davos Ecosystem" subtitle="Navigating key pavilions and meeting centers" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 bg-white border border-wef-border shadow-sm rounded-sm">

                    {/* Left Panel - Venue List */}
                    <div className="lg:col-span-1 border-r border-wef-border relative">
                        <div className="p-6 border-b border-wef-border sticky top-0 bg-white z-10 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-wef-dark uppercase tracking-widest flex items-center gap-2">
                                <Building size={18} className="text-wef-blue" />
                                Interactive Zones
                            </h3>
                            <span className="text-[10px] bg-wef-gray px-2 py-0.5 rounded-sm font-bold">{venues.length} Total</span>
                        </div>
                        <div className="relative h-[800px] overflow-y-auto hide-scrollbar divide-y divide-wef-border">
                            {venues.map((venue, idx) => (
                                <button
                                    key={venue.id}
                                    onClick={() => handleSelectVenue(venue.id)}
                                    className={`w-full text-left p-6 transition-all duration-300 group flex items-start gap-4 ${selectedVenue?.id === venue.id
                                        ? 'bg-wef-dark text-white shadow-inner'
                                        : 'bg-white hover:bg-wef-gray text-wef-dark'
                                        }`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${selectedVenue?.id === venue.id ? 'bg-wef-blue text-white' : 'bg-white text-gray-500 border border-wef-border'}`}>
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <div className="flex-grow pr-2">
                                        <h4 className={`text-lg font-bold mb-1 leading-snug group-hover:text-wef-blue transition-colors ${selectedVenue?.id === venue.id ? 'text-white group-hover:text-white' : 'text-wef-dark'}`}>
                                            {venue.name}
                                        </h4>
                                        <p className={`text-[10px] font-mono uppercase tracking-widest ${selectedVenue?.id === venue.id ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <MapPin size={10} className="inline mr-1 -mt-0.5"/> 
                                            {venue.address}
                                        </p>
                                    </div>
                                    <div className={`transition-transform duration-300 ${selectedVenue?.id === venue.id ? 'text-white' : 'text-gray-300 group-hover:text-wef-blue'}`}>
                                        <ChevronRight size={20} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel - Dynamic Map and Intel */}
                    <div className="lg:col-span-2 relative h-[800px] flex flex-col bg-white">
                        {selectedVenue ? (
                            <>
                                {/* Global Map Layer */}
                                <div className="h-2/5 shrink-0 relative bg-wef-dark border-b border-wef-border group">
                                     <iframe
                                        title="map"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(selectedVenue.coordinates.split(',')[1]) - 0.005},${parseFloat(selectedVenue.coordinates.split(',')[0]) - 0.005},${parseFloat(selectedVenue.coordinates.split(',')[1]) + 0.005},${parseFloat(selectedVenue.coordinates.split(',')[0]) + 0.005}&layer=mapnik&marker=${selectedVenue.coordinates}`}
                                        className="absolute inset-0 grayscale group-hover:grayscale-0 transition duration-1000 opacity-60 mix-blend-screen"
                                    ></iframe>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
                                    <div className="absolute bottom-6 left-8 right-8 z-10 text-white flex justify-between items-end">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-1 drop-shadow-md">{selectedVenue.name}</h2>
                                            <p className="flex items-center gap-1 text-sm font-bold tracking-widest uppercase text-gray-300 drop-shadow-md">
                                                <Globe size={14} className="text-wef-blue"/> Davos Zone {selectedVenue.id.slice(0,1).toUpperCase() || 'A'}
                                            </p>
                                        </div>
                                        <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
                                            <span className="bg-white text-wef-dark px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm border border-gray-300">
                                                <Navigation size={12} className="inline mr-1 text-wef-blue"/> Active Zone
                                            </span>
                                        </div>
                                    </div>
                                    <button className="absolute top-4 right-4 bg-black/50 text-white p-2 border border-white/20 shadow-lg hover:bg-wef-blue transition-colors backdrop-blur-sm z-10" title="Expand GIS Mode">
                                        <Fullscreen size={16} />
                                    </button>
                                </div>

                                {/* Logistics Panel below Map */}
                                <div className="flex-grow overflow-y-auto p-8 bg-wef-gray">
                                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-wef-border">
                                        <p className="text-gray-700 leading-relaxed font-serif text-lg max-w-xl">
                                            {selectedVenue.description}
                                        </p>
                                        <div className="shrink-0 flex flex-col gap-3 min-w-[200px]">
                                             <div className="bg-white p-3 border border-wef-border flex justify-between items-center shadow-sm">
                                                 <span className="text-[10px] uppercase font-bold text-gray-400">Security Clearance</span>
                                                 <span className="text-xs font-bold text-wef-dark flex items-center gap-1"><ShieldAlert size={12} className="text-red-500"/> {selectedVenue.access_type}</span>
                                             </div>
                                             <div className="bg-white p-3 border border-wef-border flex justify-between items-center shadow-sm">
                                                 <span className="text-[10px] uppercase font-bold text-gray-400">Max Capacity</span>
                                                 <span className="text-xs font-bold text-wef-dark flex items-center gap-1"><Users size={12} className="text-wef-blue"/> {selectedVenue.capacity}</span>
                                             </div>
                                        </div>
                                    </div>

                                    {/* Action Connect to Venue Detail */}
                                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                                         <Link to={`/venues/${selectedVenue.id}`} className="flex-1 bg-wef-blue text-white p-4 rounded-sm shadow-md hover:bg-blue-800 transition-colors flex justify-between items-center group">
                                             <div>
                                                 <span className="block text-[10px] uppercase font-bold tracking-widest text-blue-200 mb-1">Deep Link</span>
                                                 <span className="font-bold text-lg">Detailed Venue Profile</span>
                                             </div>
                                             <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform"/>
                                         </Link>
                                         <div className="flex-1 bg-white border border-wef-border p-4 rounded-sm flex justify-between items-center group cursor-pointer hover:border-wef-blue transition-colors">
                                            <div>
                                                 <span className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Sessions Alert</span>
                                                 <span className="font-bold text-lg text-wef-dark group-hover:text-wef-blue transition-colors">
                                                     {selectedVenue.events?.length || 0} Scheduled Events
                                                 </span>
                                             </div>
                                             <Info size={24} className="text-wef-blue"/>
                                         </div>
                                    </div>
                                    
                                    {/* Preview Schedule */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm border-b border-wef-border pb-2 uppercase tracking-widest font-bold text-wef-dark">Immediate Schedule Radar</h3>
                                        {selectedVenue.events && selectedVenue.events.length > 0 ? (
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                 {selectedVenue.events.slice(0,4).map((evt: any) => (
                                                      <Link to={`/events/${evt.id}`} key={evt.id} className="bg-white border border-wef-border p-4 hover:border-wef-blue hover:shadow-sm transition-all flex flex-col justify-between h-full group">
                                                           <div className="flex items-center gap-2 mb-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-wef-blue animate-pulse mx-0.5"></span>
                                                                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{evt.date} • {evt.start_time}</span>
                                                           </div>
                                                           <h4 className="font-bold text-md leading-tight group-hover:text-wef-blue transition-colors line-clamp-2">{evt.title}</h4>
                                                      </Link>
                                                 ))}
                                             </div>
                                        ) : (
                                            <div className="bg-white p-6 border border-dashed border-wef-border text-center">
                                                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">No Activity Detected</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center font-mono text-gray-400 bg-wef-gray">
                                Select a zone to load intelligence mapping.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Venues;
