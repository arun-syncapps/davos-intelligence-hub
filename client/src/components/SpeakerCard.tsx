import { Link } from 'react-router-dom';

const SpeakerCard = ({ speaker }: { speaker: any }) => {
    return (
        <Link to={`/speakers/${speaker.id}`}>
            <div
                className="flex flex-col cursor-pointer group hover:-translate-y-1 transition-transform"
            >
                <div className="w-full aspect-square overflow-hidden mb-4 bg-wef-gray">
                    <img
                        src={speaker.image_url}
                        alt={speaker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                    />
                </div>
                <h4 className="text-xl font-bold text-wef-dark group-hover:text-wef-blue transition-colors line-clamp-1">{speaker.name}</h4>
                <p className="text-sm font-semibold text-gray-600 mt-1 line-clamp-1">{speaker.title}</p>
                {speaker.organization_name && (
                    <p className="text-xs font-semibold text-wef-blue mt-1 uppercase tracking-wider line-clamp-1">{speaker.organization_name}</p>
                )}
            </div>
        </Link>
    );
};

export default SpeakerCard;
