import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  MessageSquare, 
  Bell,
  Plus,
  ArrowUpRight,
  Clock,
  Briefcase
} from 'lucide-react';

const SupplierPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Active Quotes', value: '12', icon: FileText, color: 'text-blue-600' },
    { label: 'RFQ Leads', value: '28', icon: Zap, color: 'text-amber-600' },
    { label: 'Contract Value', value: 'CHF 420K', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Service Rating', value: '4.9/5.0', icon: ShieldCheck, color: 'text-purple-600' },
  ];

  const recentLeads = [
    { id: 1, company: 'Google Cloud Davos', project: 'Main Promenade House AV', budget: 'CHF 85,000', status: 'Pending' },
    { id: 2, company: 'JP Morgan Chase', project: 'Executive Dinner Security', budget: 'CHF 12,000', status: 'In Review' },
    { id: 3, company: 'Presence Switzerland', project: 'Ice Stadium Staging', budget: 'CHF 150,000', status: 'Active' },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Side Navigation */}
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-wef-dark text-white flex flex-col shrink-0">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold tracking-tight">Supplier portal</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Davos Enterprise Core</p>
          </div>
          <nav className="flex-grow p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-wef-blue text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <LayoutDashboard size={18}/> Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Package size={18}/> My Services
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <FileText size={18}/> Quotes & RFQs
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <MessageSquare size={18}/> Messages <span className="ml-auto bg-red-600 text-[10px] px-1.5 py-0.5 rounded-full">3</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Users size={18}/> Staffing
            </button>
          </nav>
          <div className="p-6 border-t border-white/10 text-xs text-gray-500 font-bold uppercase tracking-widest">
            Licensed Supplier #8821
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto p-8">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-wef-dark tracking-tight">Supplier Command Center</h1>
              <p className="text-gray-500 font-serif">Welcome back, Swiss Alpine AV Production Team.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-wef-blue relative">
                <Bell size={20}/>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-wef-blue border-2 border-white shadow-sm flex items-center justify-center font-bold text-white">SA</div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 border border-wef-border rounded-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-sm bg-gray-50 ${stat.color}`}>
                    <stat.icon size={24} className={stat.color}/>
                  </div>
                  <span className="text-green-600 text-xs font-bold">+12%</span>
                </div>
                <div className="text-2xl font-bold text-wef-dark mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lead Management */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-wef-border rounded-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-wef-dark flex items-center gap-2">
                    <Briefcase size={18} className="text-wef-blue"/> Active RFP Opportunities
                  </h3>
                  <button className="text-xs font-bold text-wef-blue hover:underline uppercase tracking-widest">View All Leads</button>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentLeads.map(lead => (
                    <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-wef-dark group-hover:text-wef-blue transition-colors">{lead.company}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${lead.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 font-serif">{lead.project}</p>
                        <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Clock size={12}/> 2h remaining</span>
                          <span className="flex items-center gap-1 font-bold text-wef-blue">{lead.budget}</span>
                        </div>
                      </div>
                      <button className="border border-gray-200 p-2 rounded-sm group-hover:bg-wef-blue group-hover:text-white group-hover:border-wef-blue transition-all">
                        <ArrowUpRight size={18}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-wef-dark text-white p-6 rounded-sm shadow-xl">
                <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-3">Operational Flow</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-sm group">
                    <div className="flex items-center gap-3">
                      <Plus size={20} className="text-wef-blue"/>
                      <span className="text-sm font-bold">New Catalog Entry</span>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white transition-colors"/>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-sm group">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={20} className="text-wef-blue"/>
                      <span className="text-sm font-bold">Badge Clearance Link</span>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white transition-colors"/>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-sm group">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={20} className="text-wef-blue"/>
                      <span className="text-sm font-bold">Invoice & Payments</span>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white transition-colors"/>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-wef-border p-6 rounded-sm shadow-sm">
                <h3 className="font-bold text-wef-dark mb-4 border-b border-gray-100 pb-2">Supplier Registry</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Verified Partner Status</p>
                   </div>
                   <p className="text-xs text-gray-500 font-serif">Your enterprise credentials expire in 312 days. Renew now for premium placement in the Marketplace.</p>
                   <button className="w-full py-2 bg-wef-gray hover:bg-gray-200 text-wef-dark text-[10px] font-bold uppercase tracking-widest rounded-sm transition-colors border border-gray-300">
                     Update Credentials
                   </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Internal dummy component for icon list
const Zap = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export default SupplierPortal;
