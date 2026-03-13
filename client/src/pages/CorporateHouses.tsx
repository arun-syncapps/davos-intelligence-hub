import { MapPin, Calendar } from 'lucide-react';

const mockHouses = [
    {
        id: "ch-1",
        name: "Salesforce House",
        host: "Salesforce",
        venue: "Promenade 73",
        description: "Explore the future of AI + Data + CRM. Join us for daily panels, networking, and exclusive evening receptions.",
        image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "ch-2",
        name: "House of Switzerland",
        host: "Presence Switzerland",
        venue: "Ice Hockey Stadium",
        description: "The official hub of the Swiss delegation. Showcasing Swiss innovation, sustainability, and technological excellence.",
        image_url: "https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "ch-3",
        name: "Meta House",
        host: "Meta Insights",
        venue: "Promenade 115",
        description: "Experience the next evolution of social connection and mixed reality. Programming running fully from Monday to Thursday.",
        image_url: "https://images.unsplash.com/photo-1552554699-db015ebd335d?auto=format&fit=crop&q=80&w=800"
    }
];

const CorporateHouses = () => {
    return (
        <div className="bg-white min-h-screen pt-8 pb-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-wef-dark pb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-wef-dark mb-2 tracking-tight">
                            Corporate Houses Directory
                        </h1>
                        <p className="text-gray-500 font-serif text-lg max-w-2xl">
                            Temporary branded venues installed across the Promenade hosting specialized programming.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockHouses.map(house => (
                        <div key={house.id} className="border border-wef-border rounded-sm overflow-hidden hover:shadow-xl hover:border-wef-blue transition-all group">
                            <div className="h-48 relative">
                                <img src={house.image_url} alt={house.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white text-xl font-bold tracking-tight">{house.name}</h3>
                                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">{house.host}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm font-bold text-gray-600 flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                                    <MapPin size={16} className="text-wef-blue"/> {house.venue}
                                </p>
                                <p className="text-sm text-gray-700 font-serif line-clamp-3 mb-6">
                                    {house.description}
                                </p>
                                <button className="w-full border border-gray-300 hover:border-wef-blue hover:bg-wef-gray text-wef-dark text-xs font-bold uppercase tracking-widest py-3 rounded-sm transition-colors flex justify-center items-center gap-2">
                                    <Calendar size={14}/> View House Schedule
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CorporateHouses;
