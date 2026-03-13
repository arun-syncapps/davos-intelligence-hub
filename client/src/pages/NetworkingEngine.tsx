import { Zap, Calendar, Target, CheckCircle2 } from 'lucide-react';

const mockRecommendations = [
    { type: "Meeting", matchScore: 94, name: "Dr. Elena Rostov", title: "Chief AI Scientist, QuantumCorp", reason: "Shared interest in Ethical AI regulation" },
    { type: "Event", matchScore: 88, name: "Regulating Autonomous Systems", title: "Panel Discussion", reason: "Matches your requested 'AI Policy' Track" },
    { type: "Company", matchScore: 85, name: "EcoData Systems", title: "Series B Greentech", reason: "Actively seeking Seed-to-Series B investors (Your profile)" }
];

const NetworkingEngine = () => {
    return (
        <div className="bg-[#f0f4f8] min-h-screen pt-8 pb-24 px-4 sm:px-6 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-wef-blue text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-md shadow-blue-200">
                        <Zap size={14} className="fill-yellow-400 text-yellow-400"/> AI Engine Active
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-wef-dark mb-4 tracking-tight">AI Networking & Scheduler</h1>
                    <p className="text-gray-600 font-serif text-lg max-w-2xl mx-auto">
                        Input your WEF parameters. Our system correlates thousands of attendee profiles and events to recommend your highest-value engagements.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Input Console */}
                    <div className="lg:col-span-1 bg-white border border-wef-border p-8 rounded-sm shadow-sm space-y-6">
                        <h3 className="font-bold text-wef-dark border-b border-gray-100 pb-3 flex items-center gap-2">
                            <Target className="text-wef-blue"/> Alignment Parameters
                        </h3>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Primary Objective</label>
                            <select className="w-full border border-gray-300 px-3 py-2 text-sm rounded-sm font-bold text-wef-dark shadow-sm">
                                <option>Finding Investment (Seed/A)</option>
                                <option>Policy & Advocacy</option>
                                <option>Executive Hiring</option>
                                <option>Media Coverage</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Target Industries</label>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-50 border border-blue-200 text-wef-blue px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1"><CheckCircle2 size={10}/> AI/ML</span>
                                <span className="bg-blue-50 border border-blue-200 text-wef-blue px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1"><CheckCircle2 size={10}/> CleanTech</span>
                                <span className="border border-gray-300 text-gray-400 px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">+ Add</span>
                            </div>
                        </div>
                        <button className="w-full bg-wef-dark hover:bg-wef-blue text-white py-3 font-bold uppercase tracking-widest text-xs rounded-sm transition-colors shadow-md flex justify-center items-center gap-2">
                            <Zap size={14}/> Run Correlation
                        </button>
                    </div>

                    {/* Results Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">
                            <span>Top Algorithmic Matches</span>
                            <span className="text-wef-blue">Refreshed just now</span>
                        </div>
                        
                        <div className="grid gap-4">
                            {mockRecommendations.map((rec, i) => (
                                <div key={i} className="bg-white border-l-4 border-l-wef-blue border-y border-r border-y-wef-border border-r-wef-border p-6 rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 group">
                                    <div className="flex items-start gap-4">
                                        <div className="hidden sm:flex w-16 h-16 rounded-full bg-wef-gray border-2 border-wef-blue items-center justify-center shrink-0 shadow-inner">
                                            <span className="text-wef-blue font-bold text-lg">{rec.matchScore}%</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                                    {rec.type} Match
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-bold text-wef-dark group-hover:text-wef-blue transition-colors leading-tight">{rec.name}</h4>
                                            <p className="text-sm font-bold text-gray-500">{rec.title}</p>
                                            <p className="text-xs text-gray-400 font-serif mt-2 italic border-l-2 border-gray-200 pl-2">
                                                "{rec.reason}"
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                        <button className="w-full bg-white border border-wef-blue text-wef-blue hover:bg-wef-blue hover:text-white px-4 py-2 font-bold text-xs uppercase tracking-widest rounded-sm transition-colors flex justify-center items-center gap-2">
                                            <Calendar size={14}/> Propose Match
                                        </button>
                                        <button className="w-full border border-gray-300 text-gray-500 hover:text-wef-dark hover:border-gray-400 px-4 py-2 font-bold text-xs shadow-sm uppercase tracking-widest rounded-sm transition-colors">
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkingEngine;
