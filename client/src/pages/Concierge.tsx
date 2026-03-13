import { Car, Plane, ShieldCheck, Headphones, CalendarClock } from 'lucide-react';

const Concierge = () => {
    return (
        <div className="bg-black min-h-screen text-white pt-8 pb-24 px-4 sm:px-6 border-t-[8px] border-[#c0a060]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-14 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#c0a060] mb-4 tracking-tight">Executive Concierge</h1>
                    <p className="text-gray-400 font-serif text-lg max-w-2xl mx-auto">
                        Premium on-the-ground support ecosystem. Direct booking for secure transport, security details, and VIP restaurant reservations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#111] p-8 border border-[#c0a060]/30 hover:border-[#c0a060] transition-colors group cursor-pointer">
                        <Car size={32} className="text-[#c0a060] mb-6 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Armored Transport</h3>
                        <p className="text-sm text-gray-400 mb-6 font-serif">A/B zone cleared vehicles with vetted local drivers.</p>
                        <button className="text-[#c0a060] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Book Transfer →</button>
                    </div>

                    <div className="bg-[#111] p-8 border border-[#c0a060]/30 hover:border-[#c0a060] transition-colors group cursor-pointer">
                        <Plane size={32} className="text-[#c0a060] mb-6 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Helicopter Transit</h3>
                        <p className="text-sm text-gray-400 mb-6 font-serif">Zurich Airport to Davos Helipad direct. 35 min flight.</p>
                        <button className="text-[#c0a060] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Request Slot →</button>
                    </div>

                    <div className="bg-[#111] p-8 border border-[#c0a060]/30 hover:border-[#c0a060] transition-colors group cursor-pointer">
                        <ShieldCheck size={32} className="text-[#c0a060] mb-6 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Close Protection</h3>
                        <p className="text-sm text-gray-400 mb-6 font-serif">Licensed Swiss security operatives for delegation escorts.</p>
                        <button className="text-[#c0a060] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Hire Detail →</button>
                    </div>

                    <div className="bg-[#111] p-8 border border-[#c0a060]/30 hover:border-[#c0a060] transition-colors group cursor-pointer">
                        <Headphones size={32} className="text-[#c0a060] mb-6 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Simultaneous Translation</h3>
                        <p className="text-sm text-gray-400 mb-6 font-serif">Live translators with equipment for private bilateral meetings.</p>
                        <button className="text-[#c0a060] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">View Roster →</button>
                    </div>

                    <div className="bg-[#111] p-8 border border-[#c0a060]/30 hover:border-[#c0a060] transition-colors group cursor-pointer">
                        <CalendarClock size={32} className="text-[#c0a060] mb-6 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Restaurant Buyouts</h3>
                        <p className="text-sm text-gray-400 mb-6 font-serif">Secure fine-dining tables or complete venue buyouts.</p>
                        <button className="text-[#c0a060] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Secure Table →</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Concierge;
