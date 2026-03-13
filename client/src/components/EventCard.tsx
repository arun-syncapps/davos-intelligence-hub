import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Clock, ThumbsUp, MessageCircle, Repeat2, Send, Bookmark } from 'lucide-react';

interface EventCardProps {
    event: any;
}

const EventCard = ({ event }: EventCardProps) => {
    return (
        <div className="bg-white rounded-sm border border-wef-border mb-4 overflow-hidden">
            {/* Header (Author/Organization) */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded bg-wef-gray flex-shrink-0 border border-wef-border overflow-hidden">
                        {/* Placeholder for organization logo, or use category initials */}
                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-500 uppercase">
                            {event.category.substring(0, 2)}
                        </div>
                    </div>
                    <div>
                        <Link to={`/events/${event.id}`} className="font-semibold text-wef-dark hover:underline hover:text-wef-blue text-sm">
                            {event.title}
                        </Link>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            {event.category} • {format(new Date(event.date), 'MMM d, yyyy')}
                        </p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {event.start_time} - {event.end_time} • <MapPin size={10} /> Venue {event.venue_id}
                        </p>
                    </div>
                </div>
                <button className="text-wef-blue hover:bg-blue-50 p-2 rounded-full transition-colors flex items-center justify-center group" title="Save Event">
                    <Bookmark size={20} className="group-hover:fill-wef-blue" />
                </button>
            </div>

            {/* Content Body */}
            <div className="px-4 pb-3">
                <p className="text-sm text-gray-700 line-clamp-3 mb-1">
                    {event.description}
                </p>
                {event.description && event.description.length > 100 && (
                    <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">see more</button>
                )}
            </div>

            {/* Media/Image */}
            {event.image_url && (
                <div className="w-full bg-wef-gray border-y border-wef-border">
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full max-h-96 object-cover"
                    />
                </div>
            )}

            {/* Footer Metrics (Dummy Data) */}
            <div className="px-4 py-2 border-b border-wef-border flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <span className="bg-blue-500 rounded-full p-0.5"><ThumbsUp size={10} className="text-white fill-white"/></span>
                    <span>{Math.floor(Math.random() * 200) + 10}</span>
                </div>
                <div className="flex gap-2 hover:underline cursor-pointer">
                    <span>{Math.floor(Math.random() * 50) + 2} comments</span>
                    <span>•</span>
                    <span>{Math.floor(Math.random() * 20) + 1} reposts</span>
                </div>
            </div>

            {/* Interaction Buttons */}
            <div className="px-2 py-1 flex justify-between items-center text-gray-500 font-medium text-xs sm:text-sm">
                <button className="flex items-center justify-center gap-1 md:gap-2 px-3 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors">
                    <ThumbsUp size={18} /> <span className="hidden sm:inline">Like</span>
                </button>
                <button className="flex items-center justify-center gap-1 md:gap-2 px-3 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors">
                    <MessageCircle size={18} /> <span className="hidden sm:inline">Comment</span>
                </button>
                <button className="flex items-center justify-center gap-1 md:gap-2 px-3 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors">
                    <Repeat2 size={18} /> <span className="hidden sm:inline">Repost</span>
                </button>
                <button className="flex items-center justify-center gap-1 md:gap-2 px-3 py-3 w-1/4 rounded hover:bg-wef-gray transition-colors">
                    <Send size={18} /> <span className="hidden sm:inline">Send</span>
                </button>
            </div>
        </div>
    );
};

export default EventCard;
