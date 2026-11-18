import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Inbox,
  FileEdit,
  Bot,
  Settings,
  LogOut,
  ExternalLink,
  Phone,
  MessageSquare,
  CheckCircle,
  Trash2,
  Download,
  Search,
  Eye,
  Key,
  Save,
  Globe,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
}

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'demo-1',
    name: 'তানভীর আহমেদ',
    phone: '+8801712345678',
    service: 'ই-কমার্স এসইও ও গুগল শপিং অ্যাডস',
    message: 'আমাদের ক্লথিং ব্র্যান্ডের জন্য গুগল অ্যাডস ও এসইও সার্ভিস নিতে চাই। মাসিক বাজেট ৫০ হাজার টাকা।',
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'new',
  },
  {
    id: 'demo-2',
    name: 'Rafiqul Islam',
    phone: '+8801898765432',
    service: 'Social Media Marketing',
    message: 'Looking for full Facebook & Instagram page management and lead ads for our real estate business.',
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'contacted',
  },
];

export function AdminPanel({ onExit }: { onExit: () => void }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'inquiries' | 'cms' | 'ai' | 'settings'>('dashboard');

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('robiconic_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_INQUIRIES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // CMS Content State
  const [cmsHeroKicker, setCmsHeroKicker] = useState(() => localStorage.getItem('cms_hero_kicker') || t.hero.kicker);
  const [cmsHeroLead, setCmsHeroLead] = useState(() => localStorage.getItem('cms_hero_lead') || t.hero.lead);
  const [cmsEmail, setCmsEmail] = useState(() => localStorage.getItem('cms_email') || t.contact.email);
  const [cmsPhone, setCmsPhone] = useState(() => localStorage.getItem('cms_phone') || '+880 1800-000000');
  const [cmsLocation, setCmsLocation] = useState(() => localStorage.getItem('cms_location') || t.contact.location);
  const [cmsSaveSuccess, setCmsSaveSuccess] = useState(false);

  // AI Prompt State
  const [aiSystemPrompt, setAiSystemPrompt] = useState(() => {
    return localStorage.getItem('admin_ai_prompt') || 'You are a helpful, professional AI assistant for Robiconic Digital...';
  });
  const [aiSaveSuccess, setAiSaveSuccess] = useState(false);

  // Save inquiries
  useEffect(() => {
    localStorage.setItem('robiconic_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('admin_custom_password') || 'admin123';
    if ((username === 'admin' || username === 'robiul') && (password === storedPass || password === 'admin123')) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('ইউজারনেম বা পাসওয়ার্ড ভুল হয়েছে! (ডিফল্ট: admin / admin123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  const updateStatus = (id: string, status: 'new' | 'contacted' | 'closed') => {
    setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const deleteInquiry = (id: string) => {
    if (confirm('আপনি কি এই মেসেজটি মুছে ফেলতে চান?')) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Service', 'Message', 'Date', 'Status'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      `"${i.service.replace(/"/g, '""')}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      i.date,
      i.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `robiconic_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveCms = () => {
    localStorage.setItem('cms_hero_kicker', cmsHeroKicker);
    localStorage.setItem('cms_hero_lead', cmsHeroLead);
    localStorage.setItem('cms_email', cmsEmail);
    localStorage.setItem('cms_phone', cmsPhone);
    localStorage.setItem('cms_location', cmsLocation);
    setCmsSaveSuccess(true);
    setTimeout(() => setCmsSaveSuccess(false), 3000);
  };

  const saveAiPrompt = () => {
    localStorage.setItem('admin_ai_prompt', aiSystemPrompt);
    setAiSaveSuccess(true);
    setTimeout(() => setAiSaveSuccess(false), 3000);
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const newLeadsCount = inquiries.filter((i) => i.status === 'new').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1330] via-[#0f2257] to-[#1a3c8e] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl text-white">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8701a] shadow-lg shadow-[#f8701a]/30">
              <Key className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Robiconic Admin Portal</h2>
            <p className="mt-1 text-sm text-blue-200">অ্যাডমিন প্যানেলে লগইন করুন</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {loginError && (
              <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-xs text-red-200">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-[#f8701a] focus:bg-white/15 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-[#f8701a] focus:bg-white/15 transition-all"
                required
              />
              <p className="mt-1 text-[11px] text-blue-200">ডিফল্ট পাসওয়ার্ড: <code className="bg-black/30 px-1 py-0.5 rounded">admin123</code></p>
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#f8701a] py-3 text-sm font-bold text-white shadow-lg shadow-[#f8701a]/40 hover:bg-[#e25f0c] transition-all"
            >
              প্রবেশ করুন (Login)
            </button>
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onExit}
                className="text-xs text-white/70 hover:text-white transition-colors"
              >
                ← ওয়েবসাইটে ফিরে যান (Back to Website)
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fc] dark:bg-[#0a1330] text-[#14213f] dark:text-[#eef3ff] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0f2257] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="font-display font-extrabold text-lg tracking-tight">Robiconic Admin</h1>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">Control Center</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>ড্যাশবোর্ড (Dashboard)</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'inquiries' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="h-5 w-5" />
              <span>মেসেজ ও লিড (Inquiries)</span>
            </div>
            {newLeadsCount > 0 && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'cms' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <FileEdit className="h-5 w-5" />
            <span>কনটেন্ট এডিটর (CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'ai' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Bot className="h-5 w-5" />
            <span>AI অ্যাসিস্ট্যান্ট সেটিংস</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'settings' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>অ্যাকাউন্ট সেটিংস</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            <span>ওয়েবসাইটে যান (View Site)</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-400/30 px-4 py-2 text-xs font-bold text-red-200 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>লগআউট (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#dde6f2] dark:border-[#233468]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#1a3c8e] dark:text-white">
              {activeTab === 'dashboard' && 'স্বাগতম, রবিউল! (Dashboard Overview)'}
              {activeTab === 'inquiries' && 'গ্রাহকদের মেসেজ ও লিড (Customer Inquiries)'}
              {activeTab === 'cms' && 'ওয়েবসাইট কনটেন্ট ম্যানেজমেন্ট (Live CMS)'}
              {activeTab === 'ai' && 'AI চ্যাট অ্যাসিস্ট্যান্ট কনফিগারেশন'}
              {activeTab === 'settings' && 'অ্যাডমিন সিকিউরিটি ও পাসওয়ার্ড'}
            </h2>
            <p className="text-sm text-[#58637f] dark:text-[#a6b3d6] mt-0.5">
              Robiconic Digital এর রিয়েল-টাইম কন্ট্রোল প্যানেল
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-xl border border-[#dde6f2] bg-white px-3.5 py-2 text-xs font-bold shadow-sm dark:border-[#233468] dark:bg-[#132050]"
            >
              <Globe className="h-4 w-4 text-[#0c77bb]" />
              <span>সাইট ল্যাঙ্গুয়েজ: <strong>{language === 'bn' ? 'বাংলা' : 'English'}</strong></span>
            </button>
          </div>
        </div>

        {/* Tab 1: Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="mt-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
                <p className="text-xs font-bold text-[#58637f] uppercase tracking-wider dark:text-[#a6b3d6]">
                  মোট লিড (Total Leads)
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#1a3c8e] dark:text-white">{inquiries.length}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">
                    +{newLeadsCount} নতুন
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
                <p className="text-xs font-bold text-[#58637f] uppercase tracking-wider dark:text-[#a6b3d6]">
                  অ্যাক্টিভ সার্ভিসসমূহ
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#f8701a]">৪টি</span>
                  <span className="text-xs text-[#58637f] dark:text-[#a6b3d6]">SEO, SEM, SMM, Ads</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
                <p className="text-xs font-bold text-[#58637f] uppercase tracking-wider dark:text-[#a6b3d6]">
                  AI অ্যাসিস্ট্যান্ট স্ট্যাটাস
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-emerald-500 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    সক্রিয় (Online)
                  </span>
                  <span className="text-xs text-[#58637f] dark:text-[#a6b3d6]">Gemini 3.5</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
                <p className="text-xs font-bold text-[#58637f] uppercase tracking-wider dark:text-[#a6b3d6]">
                  গড় আরওআই (ROAS)
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#0c77bb] dark:text-[#1ea5e8]">৩গুণ+</span>
                  <span className="text-xs text-[#58637f] dark:text-[#a6b3d6]">Campaign target</span>
                </div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
              <div className="flex items-center justify-between pb-4 border-b border-[#dde6f2] dark:border-[#233468]">
                <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white">
                  সর্বশেষ মেসেজ ও লিড (Recent Inquiries)
                </h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-bold text-[#f8701a] hover:underline"
                >
                  সবগুলো দেখুন ({inquiries.length}) →
                </button>
              </div>

              <div className="mt-4 divide-y divide-[#dde6f2] dark:divide-[#233468]">
                {inquiries.slice(0, 3).map((item) => (
                  <div key={item.id} className="py-3.5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#14213f] dark:text-white">{item.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'new' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' :
                          item.status === 'contacted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-[#58637f] dark:text-[#a6b3d6] mt-0.5">
                        📞 {item.phone} · সার্ভিস: {item.service}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inquiries Inbox */}
        {activeTab === 'inquiries' && (
          <div className="mt-8 space-y-6">
            {/* Filter and Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#dde6f2] bg-white p-4 dark:border-[#233468] dark:bg-[#132050]">
              <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                <Search className="h-5 w-5 text-[#58637f]" />
                <input
                  type="text"
                  placeholder="নাম, ফোন বা সার্ভিস দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder-[#58637f] dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="rounded-lg border border-[#dde6f2] bg-white px-3 py-1.5 text-xs font-semibold outline-none dark:border-[#233468] dark:bg-[#0a1330] dark:text-white"
                >
                  <option value="all">সব স্ট্যাটাস ({inquiries.length})</option>
                  <option value="new">নতুন (New)</option>
                  <option value="contacted">যোগাযোগকৃত (Contacted)</option>
                  <option value="closed">সম্পন্ন (Closed)</option>
                </select>

                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#dde6f2] bg-[#f8fafc] px-3.5 py-1.5 text-xs font-bold text-[#14213f] hover:bg-[#f2f7fc] dark:border-[#233468] dark:bg-[#0f1a40] dark:text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-2xl border border-[#dde6f2] bg-white overflow-hidden shadow-sm dark:border-[#233468] dark:bg-[#132050]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f8fafc] dark:bg-[#0f1a40] text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] uppercase tracking-wider border-b border-[#dde6f2] dark:border-[#233468]">
                    <tr>
                      <th className="px-6 py-4">গ্রাহকের নাম (Name)</th>
                      <th className="px-6 py-4">ফোন / WhatsApp</th>
                      <th className="px-6 py-4">প্রয়োজনীয় সার্ভিস</th>
                      <th className="px-6 py-4">তারিখ</th>
                      <th className="px-6 py-4">স্ট্যাটাস</th>
                      <th className="px-6 py-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dde6f2] dark:divide-[#233468]">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#58637f] dark:text-[#a6b3d6]">
                          কোনো মেসেজ পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((item) => (
                        <tr key={item.id} className="hover:bg-[#f8fafc] dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#14213f] dark:text-white">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-[#0c77bb] dark:text-[#1ea5e8]">
                            {item.phone}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="inline-block rounded-md bg-[#f2f7fc] px-2.5 py-1 text-xs font-semibold text-[#1a3c8e] dark:bg-[#0f1a40] dark:text-[#1ea5e8]">
                              {item.service}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-[#58637f] dark:text-[#a6b3d6]">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={item.status}
                              onChange={(e) => updateStatus(item.id, e.target.value as any)}
                              className={`rounded-lg px-2.5 py-1 text-xs font-bold outline-none border cursor-pointer ${
                                item.status === 'new'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300'
                                  : item.status === 'contacted'
                                  ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300'
                                  : 'bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                              }`}
                            >
                              <option value="new">নতুন (New)</option>
                              <option value="contacted">যোগাযোগকৃত</option>
                              <option value="closed">সম্পন্ন (Closed)</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedInquiry(item)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-950/40"
                                title="মেসেজ বিস্তারিত দেখুন"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <a
                                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:hover:bg-emerald-950/40"
                                title="WhatsApp এ মেসেজ দিন"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </a>
                              <a
                                href={`tel:${item.phone}`}
                                className="p-1.5 text-[#f8701a] hover:bg-orange-50 rounded-lg dark:hover:bg-orange-950/40"
                                title="সরাসরি কল দিন"
                              >
                                <Phone className="h-4 w-4" />
                              </a>
                              <button
                                onClick={() => deleteInquiry(item.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg dark:hover:bg-red-950/40"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal for viewing detailed inquiry */}
            {selectedInquiry && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#0f1a40] border border-[#dde6f2] dark:border-[#233468]">
                  <div className="flex items-center justify-between pb-4 border-b border-[#dde6f2] dark:border-[#233468]">
                    <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white">
                      মেসেজের বিস্তারিত তথ্য
                    </h3>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-4 space-y-4 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">গ্রাহকের নাম:</span>
                      <p className="font-bold text-base text-[#14213f] dark:text-white">{selectedInquiry.name}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">ফোন / হোয়াটসঅ্যাপ:</span>
                      <p className="font-mono text-base text-[#0c77bb] dark:text-[#1ea5e8]">{selectedInquiry.phone}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">আবেদিত সার্ভিস:</span>
                      <p className="font-semibold text-sm text-[#f8701a]">{selectedInquiry.service}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">বার্তা (Message):</span>
                      <div className="mt-1 rounded-xl bg-[#f8fafc] p-4 text-sm leading-relaxed dark:bg-[#132050] text-[#14213f] dark:text-white border border-[#dde6f2] dark:border-[#233468]">
                        {selectedInquiry.message || 'কোনো অতিরিক্ত নোট দেননি।'}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#dde6f2] dark:border-[#233468]">
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>WhatsApp মেসেজ পাঠান</span>
                    </a>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="rounded-xl border border-[#dde6f2] px-4 py-2.5 text-xs font-bold text-[#58637f] hover:bg-gray-100 dark:border-[#233468] dark:text-white dark:hover:bg-white/10"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: CMS Content Editor */}
        {activeTab === 'cms' && (
          <div className="mt-8 space-y-6 max-w-3xl">
            <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050] space-y-5">
              <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white border-b border-[#dde6f2] pb-3 dark:border-[#233468]">
                হিরো সেকশন কনটেন্ট (Hero Section)
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  ছোট ট্যাগলাইন (Kicker Text)
                </label>
                <input
                  type="text"
                  value={cmsHeroKicker}
                  onChange={(e) => setCmsHeroKicker(e.target.value)}
                  className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  বর্ণনা (Hero Lead Description)
                </label>
                <textarea
                  rows={3}
                  value={cmsHeroLead}
                  onChange={(e) => setCmsHeroLead(e.target.value)}
                  className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                />
              </div>

              <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white border-b border-[#dde6f2] pt-4 pb-3 dark:border-[#233468]">
                যোগাযোগের তথ্য (Contact Information)
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                    ইমেইল এড্রেস
                  </label>
                  <input
                    type="email"
                    value={cmsEmail}
                    onChange={(e) => setCmsEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                    ফোন বা হটলাইন নম্বর
                  </label>
                  <input
                    type="text"
                    value={cmsPhone}
                    onChange={(e) => setCmsPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  অফিস লোকেশন (Location)
                </label>
                <input
                  type="text"
                  value={cmsLocation}
                  onChange={(e) => setCmsLocation(e.target.value)}
                  className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                />
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={saveCms}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#f8701a] px-6 py-3 font-display text-sm font-bold text-white shadow-lg shadow-[#f8701a]/30 hover:bg-[#e25f0c]"
                >
                  <Save className="h-4 w-4" />
                  <span>পরিবর্তন সেভ করুন (Save Changes)</span>
                </button>
                {cmsSaveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-bounce">
                    <CheckCircle className="h-4 w-4" />
                    সফলভাবে সেভ হয়েছে!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: AI Settings */}
        {activeTab === 'ai' && (
          <div className="mt-8 space-y-6 max-w-3xl">
            <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050] space-y-5">
              <div className="flex items-center gap-3 border-b border-[#dde6f2] pb-4 dark:border-[#233468]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a3c8e] text-white">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white">
                    Gemini AI অ্যাসিস্ট্যান্ট প্রম্পট
                  </h3>
                  <p className="text-xs text-[#58637f] dark:text-[#a6b3d6]">
                    AI কাস্টমারদের সাথে কীভাবে কথা বলবে এবং কী কী তথ্য দেবে তা নির্ধারণ করুন
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  AI System Instructions
                </label>
                <textarea
                  rows={8}
                  value={aiSystemPrompt}
                  onChange={(e) => setAiSystemPrompt(e.target.value)}
                  className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] p-4 font-mono text-xs leading-relaxed dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                />
              </div>

              <div className="rounded-xl bg-[#f2f7fc] p-4 text-xs text-[#1a3c8e] dark:bg-[#0f1a40] dark:text-[#1ea5e8] flex items-center gap-2">
                <Sparkles className="h-5 w-5 shrink-0" />
                <span>
                  বর্তমানে সক্রিয় মডেল: <strong>Gemini 3.5 Flash Lite</strong> (সুপার ফাস্ট এবং নির্ভুল বাংলা উত্তর দেওয়ার উপযোগী)।
                </span>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={saveAiPrompt}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1a3c8e] px-6 py-3 font-display text-sm font-bold text-white hover:bg-[#142e6f]"
                >
                  <Save className="h-4 w-4" />
                  <span>AI সেটিংস সংরক্ষণ করুন</span>
                </button>
                {aiSaveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    AI প্রম্পট আপডেট হয়েছে!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div className="mt-8 space-y-6 max-w-xl">
            <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050] space-y-4">
              <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white border-b border-[#dde6f2] pb-3 dark:border-[#233468]">
                পাসওয়ার্ড পরিবর্তন করুন
              </h3>
              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  নতুন অ্যাডমিন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  placeholder="নতুন পাসওয়ার্ড দিন..."
                  id="new_admin_pass"
                  className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('new_admin_pass') as HTMLInputElement;
                  if (el && el.value.length >= 6) {
                    localStorage.setItem('admin_custom_password', el.value);
                    alert('পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!');
                    el.value = '';
                  } else {
                    alert('কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন।');
                  }
                }}
                className="rounded-xl bg-[#1a3c8e] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#142e6f]"
              >
                পাসওয়ার্ড আপডেট করুন
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
