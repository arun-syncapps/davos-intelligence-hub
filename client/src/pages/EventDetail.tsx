import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Building, ArrowLeft, Users, Tag, ExternalLink } from 'lucide-react';
import { getEventById } from '../api/api';
import RegistrationModal from '../components/RegistrationModal';

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (id) {
            getEventById(id).then(data => {
                setEvent(data);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">Loading Intelligence...</div>;
    if (!event) return <div className="min-h-screen flex text-center justify-center font-mono py-20">Event not found.</div>;

    return (
        <div className="pb-24 pt-8">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-wef-dark hover:text-wef-blue mb-8 transition-colors">
                    <ArrowLeft size={14} /> Back to Events
                </Link>

                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block bg-blue-100 text-wef-blue text-xs font-bold px-3 py-1 rounded-full">
                            {event.category}
                        </span>
                        <span className="inline-block bg-wef-gray text-gray-700 border text-xs font-medium px-3 py-1 rounded-full">
                            {event.type}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-wef-dark tracking-tight mb-6">
                        {event.title}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
                    {/* Left Layout */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full aspect-video object-cover mb-8 rounded-sm shadow-sm border border-wef-border"
                            />
                            <h3 className="text-2xl font-bold mb-4">About This Session</h3>
                            <p className="text-lg text-gray-700 leading-relaxed font-light">
                                {event.description}
                            </p>
                        </div>

                        {event.speakers && event.speakers.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Users size={20} className="text-wef-blue" /> Distinguished Speakers
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {event.speakers.map((speaker: any) => (
                                        <Link to={`/speakers/${speaker.id}`} key={speaker.id} className="group flex gap-4 items-center bg-white border border-wef-border p-4 hover:border-wef-blue hover:shadow-md transition-all">
                                            <img src={speaker.image_url} alt={speaker.name} className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-110" />
                                            <div>
                                                <h4 className="font-bold text-lg group-hover:text-wef-blue transition-colors">{speaker.name}</h4>
                                                <p className="text-[10px] uppercase tracking-widest text-wef-blue font-bold font-mono">{speaker.title}</p>
                                                <span className="text-[10px] font-mono text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View Profile →</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Venue Section */}
                        {event.venue && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin size={20} className="text-wef-blue" /> Venue
                                </h3>
                                <Link to={`/venues/${event.venue.id}`} className="group flex flex-col md:flex-row items-stretch border border-wef-border hover:border-wef-blue hover:shadow-lg transition-all overflow-hidden">
                                    <img src={event.venue.image_url} alt={event.venue.name} className="w-full md:w-48 h-48 object-cover" />
                                    <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                                        <div>
                                            <h4 className="font-bold text-xl group-hover:text-wef-blue transition-colors mb-2">{event.venue.name}</h4>
                                            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">{event.venue.address}</p>
                                            <p className="text-sm text-gray-600 mt-3 line-clamp-2">{event.venue.description}</p>
                                        </div>
                                        <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-wef-blue mt-4">Explore Venue →</span>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Organization Section */}
                        {event.organization && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Building size={20} className="text-wef-blue" /> Hosted By
                                </h3>
                                <Link to={`/organizations/${event.organization.id}`} className="group flex items-center gap-6 border border-wef-border hover:border-wef-blue p-6 bg-white hover:shadow-md transition-all">
                                    <img src={event.organization.logo_url} alt={event.organization.name} className="w-20 h-20 object-contain" />
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono block mb-1">{event.organization.type}</span>
                                        <h4 className="font-bold text-xl group-hover:text-wef-blue transition-colors">{event.organization.name}</h4>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{event.organization.description}</p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Sticky Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white border-2 border-wef-dark p-8 shadow-2xl">
                            <h3 className="text-xl font-bold mb-6 border-b border-wef-border pb-4">Event Details</h3>

                            <div className="space-y-6 font-mono text-sm">
                                <div className="flex items-start gap-4">
                                    <Calendar className="text-wef-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Date</p>
                                        <p className="text-wef-dark font-medium">{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="text-wef-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Time</p>
                                        <p className="text-wef-dark font-medium">{event.start_time} – {event.end_time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="text-wef-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Venue</p>
                                        <Link to={`/venues/${event.venue?.id}`} className="text-wef-blue hover:text-wef-dark font-medium transition-colors">
                                            {event.venue?.name}
                                        </Link>
                                        <p className="text-gray-500 mt-1 text-xs">{event.venue?.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Building className="text-wef-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Hosted By</p>
                                        <Link to={`/organizations/${event.organization?.id}`} className="text-wef-blue hover:text-wef-dark font-medium transition-colors">
                                            {event.organization?.name}
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Tag className="text-wef-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Format</p>
                                        <p className="text-wef-dark font-medium">{event.type}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full mt-10 bg-wef-blue hover:bg-wef-dark text-white py-4 text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 transform hover:scale-[1.02]"
                            >
                                Register Attendance
                            </button>

                            {event.registration_link && (
                                <a
                                    href={event.registration_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full mt-3 border border-wef-border hover:border-wef-blue text-wef-dark py-3 text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                    Official Site <ExternalLink size={12} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && <RegistrationModal eventId={event.id} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default EventDetail;
