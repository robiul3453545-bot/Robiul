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

const ADMIN_TEXTS = {
  bn: {
    portalTitle: 'রবিকনিক অ্যাডমিন পোর্টাল',
    portalSubtitle: 'অ্যাডমিন প্যানেলে লগইন করুন',
    usernameLabel: 'ইউজারনেম (Username)',
    passwordLabel: 'পাসওয়ার্ড (Password)',
    defaultPassHint: 'ডিফল্ট পাসওয়ার্ড:',
    loginBtn: 'প্রবেশ করুন (Login)',
    backToSite: '← ওয়েবসাইটে ফিরে যান',
    loginError: 'ইউজারনেম বা পাসওয়ার্ড ভুল হয়েছে! (ডিফল্ট: admin / admin123)',
    controlCenter: 'কন্ট্রোল সেন্টার',
    tabDashboard: 'ড্যাশবোর্ড',
    tabInquiries: 'মেসেজ ও লিড',
    tabCms: 'কনটেন্ট এডিটর (CMS)',
    tabAi: 'AI অ্যাসিস্ট্যান্ট',
    tabSettings: 'অ্যাকাউন্ট সেটিংস',
    viewSite: 'ওয়েবসাইটে যান',
    logout: 'লগআউট',
    welcomeHeader: 'স্বাগতম, রবিউল!',
    welcomeSub: 'Robiconic Digital এর রিয়েল-টাইম কন্ট্রোল প্যানেল',
    langLabel: 'ভাষা:',
    kpiTotalLeads: 'মোট লিড (Total Leads)',
    kpiNewBadge: 'নতুন',
    kpiServices: 'অ্যাক্টিভ সার্ভিসসমূহ',
    kpiAiStatus: 'AI অ্যাসিস্ট্যান্ট স্ট্যাটাস',
    kpiAiOnline: 'সক্রিয় (Online)',
    kpiRoas: 'গড় আরওআই (ROAS)',
    recentLeadsTitle: 'সর্বশেষ মেসেজ ও লিড',
    viewAllBtn: 'সবগুলো দেখুন',
    searchPlaceholder: 'নাম, ফোন বা সার্ভিস দিয়ে খুঁজুন...',
    allStatus: 'সব স্ট্যাটাস',
    statusNew: 'নতুন (New)',
    statusContacted: 'যোগাযোগকৃত',
    statusClosed: 'সম্পন্ন (Closed)',
    exportCsv: 'Export CSV',
    colName: 'গ্রাহকের নাম',
    colPhone: 'ফোন / WhatsApp',
    colService: 'প্রয়োজনীয় সার্ভিস',
    colDate: 'তারিখ',
    colStatus: 'স্ট্যাটাস',
    colActions: 'অ্যাকশন',
    noInquiries: 'কোনো মেসেজ পাওয়া যায়নি।',
    modalTitle: 'মেসেজের বিস্তারিত তথ্য',
    modalCustomer: 'গ্রাহকের নাম:',
    modalPhone: 'ফোন / হোয়াটসঅ্যাপ:',
    modalService: 'আবেদিত সার্ভিস:',
    modalMessage: 'বার্তা (Message):',
    modalNoNote: 'কোনো অতিরিক্ত নোট দেননি।',
    modalSendWa: 'WhatsApp মেসেজ পাঠান',
    modalClose: 'বন্ধ করুন',
    deleteConfirm: 'আপনি কি এই মেসেজটি মুছে ফেলতে চান?',
    cmsHeroTitle: 'হিরো সেকশন কনটেন্ট (Hero Section)',
    cmsKickerLabel: 'ছোট ট্যাগলাইন (Kicker Text)',
    cmsLeadLabel: 'বর্ণনা (Hero Lead Description)',
    cmsContactTitle: 'যোগাযোগের তথ্য (Contact Information)',
    cmsEmailLabel: 'ইমেইল এড্রেস',
    cmsPhoneLabel: 'ফোন বা হটলাইন নম্বর',
    cmsLocationLabel: 'অফিস লোকেশন (Location)',
    cmsSaveBtn: 'পরিবর্তন সেভ করুন',
    cmsSaveSuccess: 'সফলভাবে সেভ হয়েছে!',
    aiTitle: 'Gemini AI অ্যাসিস্ট্যান্ট প্রম্পট',
    aiSubtitle: 'AI কাস্টমারদের সাথে কীভাবে কথা বলবে এবং কী কী তথ্য দেবে তা নির্ধারণ করুন',
    aiPromptLabel: 'AI সিস্টেম ইন্সট্রাকশন (System Instructions)',
    aiModelNote: 'বর্তমানে সক্রিয় মডেল: Gemini 3.5 Flash Lite (সুপার ফাস্ট এবং নির্ভুল বাংলা ও ইংরেজি উত্তর দেয়)।',
    aiSaveBtn: 'AI সেটিংস সংরক্ষণ করুন',
    aiSaveSuccess: 'AI প্রম্পট আপডেট হয়েছে!',
    settingsPassTitle: 'পাসওয়ার্ড পরিবর্তন করুন',
    settingsNewPass: 'নতুন অ্যাডমিন পাসওয়ার্ড',
    settingsNewPassPlaceholder: 'নতুন পাসওয়ার্ড দিন...',
    settingsUpdateBtn: 'পাসওয়ার্ড আপডেট করুন',
    settingsPassUpdated: 'পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!',
    settingsPassMin: 'কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন।',
  },
  en: {
    portalTitle: 'Robiconic Admin Portal',
    portalSubtitle: 'Sign in to Admin Dashboard',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    defaultPassHint: 'Default Password:',
    loginBtn: 'Sign In (Login)',
    backToSite: '← Back to Website',
    loginError: 'Incorrect username or password! (Default: admin / admin123)',
    controlCenter: 'Control Center',
    tabDashboard: 'Dashboard',
    tabInquiries: 'Inquiries & Leads',
    tabCms: 'Content Editor (CMS)',
    tabAi: 'AI Assistant',
    tabSettings: 'Account Settings',
    viewSite: 'View Live Site',
    logout: 'Logout',
    welcomeHeader: 'Welcome, Robiul!',
    welcomeSub: 'Robiconic Digital Real-time Control Center',
    langLabel: 'Language:',
    kpiTotalLeads: 'Total Leads',
    kpiNewBadge: 'New',
    kpiServices: 'Active Services',
    kpiAiStatus: 'AI Assistant Status',
    kpiAiOnline: 'Online (Active)',
    kpiRoas: 'Average ROAS',
    recentLeadsTitle: 'Recent Inquiries & Leads',
    viewAllBtn: 'View All',
    searchPlaceholder: 'Search by name, phone, or service...',
    allStatus: 'All Statuses',
    statusNew: 'New',
    statusContacted: 'Contacted',
    statusClosed: 'Closed',
    exportCsv: 'Export CSV',
    colName: 'Customer Name',
    colPhone: 'Phone / WhatsApp',
    colService: 'Requested Service',
    colDate: 'Date',
    colStatus: 'Status',
    colActions: 'Actions',
    noInquiries: 'No inquiries found.',
    modalTitle: 'Inquiry Details',
    modalCustomer: 'Customer Name:',
    modalPhone: 'Phone / WhatsApp:',
    modalService: 'Requested Service:',
    modalMessage: 'Message Content:',
    modalNoNote: 'No additional message provided.',
    modalSendWa: 'Send WhatsApp Message',
    modalClose: 'Close',
    deleteConfirm: 'Are you sure you want to delete this inquiry?',
    cmsHeroTitle: 'Hero Section Content',
    cmsKickerLabel: 'Kicker / Top Tagline',
    cmsLeadLabel: 'Hero Lead Description',
    cmsContactTitle: 'Contact Information',
    cmsEmailLabel: 'Email Address',
    cmsPhoneLabel: 'Phone / Hotline Number',
    cmsLocationLabel: 'Office Location',
    cmsSaveBtn: 'Save Changes',
    cmsSaveSuccess: 'Changes saved successfully!',
    aiTitle: 'Gemini AI Assistant Configuration',
    aiSubtitle: 'Define how the AI answers customer questions and services offered',
    aiPromptLabel: 'AI System Instructions',
    aiModelNote: 'Currently Active Model: Gemini 3.5 Flash Lite (Fast & accurate for Bengali and English responses).',
    aiSaveBtn: 'Save AI Settings',
    aiSaveSuccess: 'AI Prompt updated successfully!',
    settingsPassTitle: 'Change Password',
    settingsNewPass: 'New Admin Password',
    settingsNewPassPlaceholder: 'Enter new password...',
    settingsUpdateBtn: 'Update Password',
    settingsPassUpdated: 'Password updated successfully!',
    settingsPassMin: 'Password must be at least 6 characters long.',
  },
};

export function AdminPanel({ onExit }: { onExit: () => void }) {
  const { language, toggleLanguage, t } = useLanguage();
  const at = ADMIN_TEXTS[language];

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

  // Keep CMS state updated when language switches
  useEffect(() => {
    if (!localStorage.getItem('cms_hero_kicker')) setCmsHeroKicker(t.hero.kicker);
    if (!localStorage.getItem('cms_hero_lead')) setCmsHeroLead(t.hero.lead);
    if (!localStorage.getItem('cms_location')) setCmsLocation(t.contact.location);
  }, [language, t]);

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
      setLoginError(at.loginError);
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
    if (confirm(at.deleteConfirm)) {
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
      <div className="min-h-screen bg-gradient-to-br from-[#0a1330] via-[#0f2257] to-[#1a3c8e] flex items-center justify-center p-4 relative">
        {/* Language switch on login screen */}
        <div className="absolute top-6 right-6">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md hover:bg-white/20 transition-all"
          >
            <Globe className="h-4 w-4 text-[#1ea5e8]" />
            <span className={language === 'bn' ? 'font-extrabold text-[#f8701a]' : 'opacity-70'}>বাংলা</span>
            <span className="opacity-40">/</span>
            <span className={language === 'en' ? 'font-extrabold text-[#f8701a]' : 'opacity-70'}>EN</span>
          </button>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl text-white">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8701a] shadow-lg shadow-[#f8701a]/30">
              <Key className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight">{at.portalTitle}</h2>
            <p className="mt-1 text-sm text-blue-200">{at.portalSubtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {loginError && (
              <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-xs text-red-200">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1.5">
                {at.usernameLabel}
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
                {at.passwordLabel}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-[#f8701a] focus:bg-white/15 transition-all"
                required
              />
              <p className="mt-1 text-[11px] text-blue-200">{at.defaultPassHint} <code className="bg-black/30 px-1 py-0.5 rounded">admin123</code></p>
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#f8701a] py-3 text-sm font-bold text-white shadow-lg shadow-[#f8701a]/40 hover:bg-[#e25f0c] transition-all"
            >
              {at.loginBtn}
            </button>
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onExit}
                className="text-xs text-white/70 hover:text-white transition-colors"
              >
                {at.backToSite}
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
            <p className="text-xs text-blue-200 mt-0.5">{at.controlCenter}</p>
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
            <span>{at.tabDashboard}</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'inquiries' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="h-5 w-5" />
              <span>{at.tabInquiries}</span>
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
            <span>{at.tabCms}</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'ai' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Bot className="h-5 w-5" />
            <span>{at.tabAi}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'settings' ? 'bg-[#f8701a] text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>{at.tabSettings}</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            <span>{at.viewSite}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-400/30 px-4 py-2 text-xs font-bold text-red-200 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>{at.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#dde6f2] dark:border-[#233468]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#1a3c8e] dark:text-white">
              {activeTab === 'dashboard' && at.welcomeHeader}
              {activeTab === 'inquiries' && at.tabInquiries}
              {activeTab === 'cms' && at.tabCms}
              {activeTab === 'ai' && at.tabAi}
              {activeTab === 'settings' && at.tabSettings}
            </h2>
            <p className="text-sm text-[#58637f] dark:text-[#a6b3d6] mt-0.5">
              {at.welcomeSub}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-xl border border-[#dde6f2] bg-white px-3.5 py-2 text-xs font-bold shadow-sm hover:border-[#f8701a] transition-all dark:border-[#233468] dark:bg-[#132050]"
              title="Switch Language / ভাষা পরিবর্তন করুন"
            >
              <Globe className="h-4 w-4 text-[#0c77bb] dark:text-[#1ea5e8]" />
              <span>{at.langLabel} <strong className="text-[#f8701a]">{language === 'bn' ? 'বাংলা' : 'English'}</strong></span>
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
                  {at.kpiTotalLeads}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#1a3c8e] dark:text-white">{inquiries.length}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">
                    +{newLeadsCount} {at.kpiNewBadge}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
                <p className="text-xs font-bold text-[#58637f] uppercase tracking-wider dark:text-[#a6b3d6]">
                  {at.kpiServices}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#f8701a]">4</span>
                  <span className="text-xs text-[#58637f] dark:text-[#a6b3d6]">SEO, SEM, SMM, Ads</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
                <p className="text-xs font-bold text-[#58637f] uppercase tracking-wider dark:text-[#a6b3d6]">
                  {at.kpiAiStatus}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-emerald-500 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    {at.kpiAiOnline}
                  </span>
                  <span className="text-xs text-[#58637f] dark:text-[#a6b3d6]">Gemini 3.5</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
                <p className="text-xs font-bold text-[#58637f] uppercase tracking-wider dark:text-[#a6b3d6]">
                  {at.kpiRoas}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-[#0c77bb] dark:text-[#1ea5e8]">3x+</span>
                  <span className="text-xs text-[#58637f] dark:text-[#a6b3d6]">Target ROI</span>
                </div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="rounded-2xl border border-[#dde6f2] bg-white p-6 shadow-sm dark:border-[#233468] dark:bg-[#132050]">
              <div className="flex items-center justify-between pb-4 border-b border-[#dde6f2] dark:border-[#233468]">
                <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white">
                  {at.recentLeadsTitle}
                </h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-bold text-[#f8701a] hover:underline"
                >
                  {at.viewAllBtn} ({inquiries.length}) →
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
                        📞 {item.phone} · {item.service}
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
                  placeholder={at.searchPlaceholder}
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
                  <option value="all">{at.allStatus} ({inquiries.length})</option>
                  <option value="new">{at.statusNew}</option>
                  <option value="contacted">{at.statusContacted}</option>
                  <option value="closed">{at.statusClosed}</option>
                </select>

                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#dde6f2] bg-[#f8fafc] px-3.5 py-1.5 text-xs font-bold text-[#14213f] hover:bg-[#f2f7fc] dark:border-[#233468] dark:bg-[#0f1a40] dark:text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{at.exportCsv}</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-2xl border border-[#dde6f2] bg-white overflow-hidden shadow-sm dark:border-[#233468] dark:bg-[#132050]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f8fafc] dark:bg-[#0f1a40] text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] uppercase tracking-wider border-b border-[#dde6f2] dark:border-[#233468]">
                    <tr>
                      <th className="px-6 py-4">{at.colName}</th>
                      <th className="px-6 py-4">{at.colPhone}</th>
                      <th className="px-6 py-4">{at.colService}</th>
                      <th className="px-6 py-4">{at.colDate}</th>
                      <th className="px-6 py-4">{at.colStatus}</th>
                      <th className="px-6 py-4 text-right">{at.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dde6f2] dark:divide-[#233468]">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#58637f] dark:text-[#a6b3d6]">
                          {at.noInquiries}
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
                              <option value="new">{at.statusNew}</option>
                              <option value="contacted">{at.statusContacted}</option>
                              <option value="closed">{at.statusClosed}</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedInquiry(item)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-950/40"
                                title={at.modalTitle}
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <a
                                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:hover:bg-emerald-950/40"
                                title="WhatsApp"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </a>
                              <a
                                href={`tel:${item.phone}`}
                                className="p-1.5 text-[#f8701a] hover:bg-orange-50 rounded-lg dark:hover:bg-orange-950/40"
                                title="Call"
                              >
                                <Phone className="h-4 w-4" />
                              </a>
                              <button
                                onClick={() => deleteInquiry(item.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg dark:hover:bg-red-950/40"
                                title="Delete"
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
                      {at.modalTitle}
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
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">{at.modalCustomer}</span>
                      <p className="font-bold text-base text-[#14213f] dark:text-white">{selectedInquiry.name}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">{at.modalPhone}</span>
                      <p className="font-mono text-base text-[#0c77bb] dark:text-[#1ea5e8]">{selectedInquiry.phone}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">{at.modalService}</span>
                      <p className="font-semibold text-sm text-[#f8701a]">{selectedInquiry.service}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#58637f] dark:text-[#a6b3d6]">{at.modalMessage}</span>
                      <div className="mt-1 rounded-xl bg-[#f8fafc] p-4 text-sm leading-relaxed dark:bg-[#132050] text-[#14213f] dark:text-white border border-[#dde6f2] dark:border-[#233468]">
                        {selectedInquiry.message || at.modalNoNote}
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
                      <span>{at.modalSendWa}</span>
                    </a>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="rounded-xl border border-[#dde6f2] px-4 py-2.5 text-xs font-bold text-[#58637f] hover:bg-gray-100 dark:border-[#233468] dark:text-white dark:hover:bg-white/10"
                    >
                      {at.modalClose}
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
                {at.cmsHeroTitle}
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  {at.cmsKickerLabel}
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
                  {at.cmsLeadLabel}
                </label>
                <textarea
                  rows={3}
                  value={cmsHeroLead}
                  onChange={(e) => setCmsHeroLead(e.target.value)}
                  className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                />
              </div>

              <h3 className="font-display font-bold text-lg text-[#14213f] dark:text-white border-b border-[#dde6f2] pt-4 pb-3 dark:border-[#233468]">
                {at.cmsContactTitle}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                    {at.cmsEmailLabel}
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
                    {at.cmsPhoneLabel}
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
                  {at.cmsLocationLabel}
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
                  <span>{at.cmsSaveBtn}</span>
                </button>
                {cmsSaveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-bounce">
                    <CheckCircle className="h-4 w-4" />
                    {at.cmsSaveSuccess}
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
                    {at.aiTitle}
                  </h3>
                  <p className="text-xs text-[#58637f] dark:text-[#a6b3d6]">
                    {at.aiSubtitle}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  {at.aiPromptLabel}
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
                <span>{at.aiModelNote}</span>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={saveAiPrompt}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1a3c8e] px-6 py-3 font-display text-sm font-bold text-white hover:bg-[#142e6f]"
                >
                  <Save className="h-4 w-4" />
                  <span>{at.aiSaveBtn}</span>
                </button>
                {aiSaveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    {at.aiSaveSuccess}
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
                {at.settingsPassTitle}
              </h3>
              <div>
                <label className="block text-xs font-bold text-[#58637f] dark:text-[#a6b3d6] mb-1.5 uppercase">
                  {at.settingsNewPass}
                </label>
                <input
                  type="password"
                  placeholder={at.settingsNewPassPlaceholder}
                  id="new_admin_pass"
                  className="w-full rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-4 py-2.5 text-sm dark:border-[#233468] dark:bg-[#0a1330] dark:text-white outline-none focus:border-[#f8701a]"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('new_admin_pass') as HTMLInputElement;
                  if (el && el.value.length >= 6) {
                    localStorage.setItem('admin_custom_password', el.value);
                    alert(at.settingsPassUpdated);
                    el.value = '';
                  } else {
                    alert(at.settingsPassMin);
                  }
                }}
                className="rounded-xl bg-[#1a3c8e] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#142e6f]"
              >
                {at.settingsUpdateBtn}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
