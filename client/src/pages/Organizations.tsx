import { useEffect, useState } from 'react';
import { getOrganizations } from '../api/api';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';

const Organizations = () => {
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrganizations().then(data => {
            setOrganizations(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-center py-20 font-mono">Loading Ecosystem...</div>;

    const grouped = {
        'National Pavilion': organizations.filter(o => o.type === 'National Pavilion'),
        'Strategic Partner': organizations.filter(o => o.type === 'Strategic Partner'),
        'Media': organizations.filter(o => o.type === 'Media')
    };

    return (
        <div className="pb-24 pt-8 px-4 sm:px-6 max-w-7xl mx-auto">
            <SectionHeader title="Global Ecosystem" subtitle="Partners shaping the future" />

            {Object.entries(grouped).map(([type, orgs]) => (
                <div key={type} className="mb-20">
                    <h3 className="text-2xl font-bold text-wef-dark border-b border-wef-border pb-2 mb-8 tracking-tight">
                        {type}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {orgs.map(org => (
                            <div
                                key={org.id}
                                className="group flex flex-col bg-white border border-wef-border p-8 shadow-sm rounded-sm hover:shadow-md hover:border-wef-blue transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 grayscale group-hover:grayscale-0 transition duration-700 ease-in-out group-hover:scale-105">
                                    <img src={org.logo_url} alt={org.name} className="w-full h-full object-contain" />
                                </div>
                                <h4 className="text-xl font-bold text-wef-dark text-center mb-4">{org.name}</h4>
                                <p className="text-gray-600 text-sm text-center flex-grow mb-6">{org.description}</p>
                                <Link
                                    to={`/organizations/${org.id}`}
                                    className="mt-auto block text-center text-sm font-bold text-wef-blue hover:text-blue-800 transition-colors uppercase tracking-wide"
                                >
                                    Explore Profile &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                    {orgs.length === 0 && (
                        <div className="text-gray-500 font-mono text-sm py-4">
                            No organizations found in this category.
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Organizations;
