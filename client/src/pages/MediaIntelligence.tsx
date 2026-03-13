import { Radio, TrendingUp, MonitorPlay } from 'lucide-react';

const MediaIntelligence = () => {
    return (
        <div className="bg-white min-h-screen pt-8 pb-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-wef-dark pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm">
                            <Radio size={12} className="animate-pulse" /> Press & Media Kit
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-wef-dark mb-2 tracking-tight">
                            Media Intelligence
                        </h1>
                        <p className="text-gray-500 font-serif text-lg max-w-2xl">
                            Live announcements, interview schedules, and official statements for credentialed journalists.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Live Ticker Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xl font-bold text-wef-dark mb-4 tracking-tight border-b-4 border-wef-dark inline-block pb-1">Live Feed</h3>
                        
                        <div className="border border-wef-border rounded-sm shadow-sm overflow-hidden">
                            <div className="bg-red-50 p-6 border-l-4 border-l-red-600 mb-1">
                                <span className="text-red-600 text-[10px] font-bold uppercase tracking-widest mb-2 block">Breaking Topic • 10m ago</span>
                                <h4 className="text-2xl font-bold text-wef-dark leading-tight mb-2">Central Banks signal cautious optimism on AI-driven productivity gains.</h4>
                                <p className="text-sm font-serif text-gray-700">Statement released from closed-door plenary session in Congress Centre Hall D.</p>
                            </div>

                            <div className="bg-white p-6 border-t border-wef-border">
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Embargo Lifted • 1h ago</span>
                                <h4 className="text-xl font-bold text-wef-dark leading-tight mb-2">Global Clean Energy pact signed by 14 state leaders.</h4>
                                <a href="#" className="text-wef-blue text-xs font-bold uppercase tracking-widest hover:underline">Download Press Kit (PDF)</a>
                            </div>

                            <div className="bg-white p-6 border-t border-wef-border">
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Schedule Update • 2h ago</span>
                                <h4 className="text-xl font-bold text-wef-dark leading-tight mb-2">Press Conference: Sec. General keynote moved to 15:00 CET.</h4>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-wef-dark text-white p-6 shadow-xl rounded-sm">
                            <h3 className="font-bold text-xl mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
                                <MonitorPlay className="text-blue-400"/> Broadcaster Feeds
                            </h3>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><a href="#" className="hover:text-blue-300 transition-colors flex justify-between">Plenary Main Stage <span>SDI/RTMP</span></a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors flex justify-between">Press Room A <span>Audio Only</span></a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors flex justify-between">Media Village <span>Clean Feed</span></a></li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm">
                            <h3 className="font-bold text-lg mb-4 text-wef-dark flex items-center gap-2">
                                <TrendingUp className="text-wef-blue"/> Media Opportunities
                            </h3>
                            <p className="text-sm text-gray-600 font-serif mb-4">Request 1-on-1 interview slots with key delegates presenting today.</p>
                            <button className="w-full bg-white border border-wef-blue text-wef-blue hover:bg-wef-blue hover:text-white font-bold text-xs uppercase tracking-widest py-3 rounded-sm transition-colors">
                                View Interview Roster
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaIntelligence;
