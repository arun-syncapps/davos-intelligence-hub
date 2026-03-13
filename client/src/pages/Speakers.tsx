import { useEffect, useState } from 'react';
import { getSpeakers } from '../api/api';
import SpeakerCard from '../components/SpeakerCard';
import SectionHeader from '../components/SectionHeader';

const Speakers = () => {
    const [speakers, setSpeakers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSpeakers().then(data => {
            setSpeakers(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-center py-20 font-mono">Loading Distinguished Guests...</div>;

    return (
        <div className="pb-24 pt-8 px-4 sm:px-6 max-w-7xl mx-auto">
            <SectionHeader title="Distinguished Voices" subtitle="Leaders and visionaries sharing insights" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-16">
                {speakers.map(speaker => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
            </div>

            {speakers.length === 0 && (
                <div className="text-center py-20 font-mono text-gray-500">
                    No speakers announced yet.
                </div>
            )}
        </div>
    );
};

export default Speakers;
