import { useState } from 'react';
import {
  Save, X, Plus, Trash2, Image as ImageIcon, Video, Music, Link2, Phone,
  MessageCircle, Calendar, Clock, MapPin, Users, BarChart3, Edit3, Eye,
  MousePointerClick, UserCheck, CheckCircle2, TrendingUp, Filter, Copy,
  Archive, AlertTriangle, ChevronRight, Search, Bell, Settings, FileText,
  Smile, Send, ChevronDown, Check, Globe, Target, Zap, PlayCircle,
  PauseCircle, Volume2, VolumeX, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  Sparkles, Layers, Smartphone, Download, ExternalLink, Hash,
  Upload, FileSpreadsheet, Star, ShieldCheck, UserX, UserPlus,
  Bold, Italic, Underline, List, Strikethrough, AlertCircle,
  Wallet, Coins, Briefcase, GripVertical, Code, ImagePlus,
  CircleDollarSign, Percent, Calculator, Building2, Boxes,
  ShieldAlert, ThumbsUp, ThumbsDown, MessageSquare, ClipboardCheck
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, FunnelChart, Funnel,
  LabelList, Legend, ReferenceLine
} from 'recharts';

// ============ Sample data ============
const cityData = [
  { name: 'Москва', views: 98450, clicks: 14820, bookings: 2412, region: 14820, regionName: 'Московская обл.' },
  { name: 'Санкт-Петербург', views: 64230, clicks: 9140, bookings: 1598, region: 7320, regionName: 'Ленинградская обл.' },
  { name: 'Краснодар', views: 38810, clicks: 5690, bookings: 1145, region: 9240, regionName: 'Краснодарский край' },
  { name: 'Екатеринбург', views: 30920, clicks: 4510, bookings: 798, region: 3410, regionName: 'Свердловская обл.' },
  { name: 'Новосибирск', views: 25210, clicks: 3420, bookings: 576, region: 2280, regionName: 'Новосибирская обл.' },
  { name: 'Казань', views: 22890, clicks: 3180, bookings: 564, region: 1490, regionName: 'Татарстан' }
];

const timeSeriesData = [
  { day: 'Пн', views: 32400, clicks: 4580 },
  { day: 'Вт', views: 39100, clicks: 5520 },
  { day: 'Ср', views: 46300, clicks: 6910 },
  { day: 'Чт', views: 54800, clicks: 8180 },
  { day: 'Пт', views: 65200, clicks: 9620 },
  { day: 'Сб', views: 41400, clicks: 5760 },
  { day: 'Вс', views: 35800, clicks: 4680 }
];

const skipRateData = [
  { sec: '0-1с', remaining: 100 },
  { sec: '1-2с', remaining: 92 },
  { sec: '2-3с', remaining: 78 },
  { sec: '3-4с', remaining: 64 },
  { sec: '4-5с', remaining: 51 },
  { sec: '5-6с', remaining: 43 },
  { sec: '6-7с', remaining: 38 },
  { sec: '7с+', remaining: 34 }
];

const storyList = [
  { id: 1, title: 'Срочные смены в Москве — х1.5', status: 'active', views: 64200, ctr: '14.2%', city: 'Москва', cover: 'bg-gradient-to-br from-orange-400 to-rose-500' },
  { id: 2, title: 'Новые правила выплат', status: 'active', views: 98180, ctr: '12.4%', city: 'Все', cover: 'bg-gradient-to-br from-violet-500 to-indigo-600' },
  { id: 3, title: 'Новые объекты в Краснодаре', status: 'scheduled', views: 0, ctr: '—', city: 'Краснодар', cover: 'bg-gradient-to-br from-emerald-400 to-teal-600' },
  { id: 4, title: 'Реферальная программа +2000₽', status: 'active', views: 52410, ctr: '18.7%', city: 'Все', cover: 'bg-gradient-to-br from-amber-400 to-orange-500' },
  { id: 5, title: 'Инструкция по выходу на смену', status: 'archived', views: 168340, ctr: '8.1%', city: 'Все', cover: 'bg-gradient-to-br from-sky-400 to-blue-600' },
  { id: 6, title: 'Промо-кампания для новичков', status: 'draft', views: 0, ctr: '—', city: '—', cover: 'bg-gradient-to-br from-slate-300 to-slate-500' }
];

// Stories ожидающие верификации
const pendingVerification = [
  {
    id: 101,
    title: 'Срочно нужны курьеры в Москве',
    description: 'Сегодня и завтра ставка 2800₽ + 500₽ от РР. Локации: Хамовники, Чертаново, ВДНХ.',
    author: 'Анна Соколова',
    authorRole: 'Маркетолог',
    createdAt: '12.05.2026 09:14',
    cover: 'bg-gradient-to-br from-orange-500 to-red-600',
    hasContact: true, hasCopay: true,
    targetCities: ['Москва'],
    estimatedReach: 24580,
    contentType: 'video',
    contentDuration: 28
  },
  {
    id: 102,
    title: 'Реферальная программа: +2000₽ за друга',
    description: 'Приведи друга — получи 2000₽ после его первой смены. Бонус начисляется автоматически.',
    author: 'Михаил Иванов',
    authorRole: 'Маркетолог',
    createdAt: '12.05.2026 08:45',
    cover: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    hasContact: false, hasCopay: false,
    targetCities: ['Все города'],
    estimatedReach: 142300,
    contentType: 'image',
    contentDuration: null
  },
  {
    id: 103,
    title: 'Новый объект — ВкусВилл Чертаново',
    description: 'Открылся новый дарк-стор. Нужны сборщики заказов. Смены каждый день с 7 утра.',
    author: 'Елена Смирнова',
    authorRole: 'Контент-редактор',
    createdAt: '11.05.2026 18:32',
    cover: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    hasContact: true, hasCopay: false,
    targetCities: ['Москва'],
    estimatedReach: 18450,
    contentType: 'image',
    contentDuration: null
  }
];

// История модерации (одобренные и отклонённые)
const verificationHistory = [
  {
    id: 201,
    title: 'Бонус +1000₽ за 5 смен',
    author: 'Михаил Иванов',
    decision: 'approved',
    moderator: 'Алексей Дроздов',
    decidedAt: '12.05.2026 07:22',
    cover: 'bg-gradient-to-br from-fuchsia-500 to-pink-600'
  },
  {
    id: 202,
    title: 'Скидка в кафе для исполнителей',
    author: 'Анна Соколова',
    decision: 'rejected',
    moderator: 'Алексей Дроздов',
    decidedAt: '11.05.2026 16:45',
    reasons: ['Нерелевантный контент', 'Не одобрена партнёрская интеграция'],
    comment: 'Сначала согласуйте с юристами. Партнёр не подтвердил акцию.',
    cover: 'bg-gradient-to-br from-amber-500 to-orange-500'
  },
  {
    id: 203,
    title: 'Срочные смены — Самокат',
    author: 'Елена Смирнова',
    decision: 'approved',
    moderator: 'Мария Куликова',
    decidedAt: '11.05.2026 12:10',
    cover: 'bg-gradient-to-br from-pink-500 to-rose-600'
  },
  {
    id: 204,
    title: 'Конкурс лучших исполнителей мая',
    author: 'Анна Соколова',
    decision: 'rejected',
    moderator: 'Мария Куликова',
    decidedAt: '11.05.2026 10:30',
    reasons: ['Орфографические ошибки в тексте', 'Низкое качество обложки'],
    comment: 'Перезалейте изображение в высоком разрешении и проверьте текст по описанию.',
    cover: 'bg-gradient-to-br from-violet-500 to-purple-600'
  }
];

const COLORS = ['#1976D2', '#42A5F5', '#7E57C2', '#26A69A', '#EF5350', '#FFA726'];

// ============ Toast (replaces alert) ============
function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
      <CheckCircle2 size={18} className="text-emerald-400" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X size={16} /></button>
    </div>
  );
}

// ============ Phone Preview ============
function PhonePreview({ title, description, links, hasContact, contacts, contentFile, coverColor, reactionsEnabled = true, customReactions = ['❤️','🔥','👍'], hasCopay, copay, isUrgent }) {
  const [previewMode, setPreviewMode] = useState('home'); // 'home' | 'story'

  return (
    <div className="sticky top-6">
      <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
        <Smartphone size={14} /> Предпросмотр у исполнителя
      </div>

      {/* Mode toggle */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg mx-auto mb-3" style={{ width: 240 }}>
        <button
          onClick={() => setPreviewMode('home')}
          className={`flex-1 py-1.5 rounded-md text-[11px] font-semibold transition ${
            previewMode === 'home' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          🏠 Главный экран
        </button>
        <button
          onClick={() => setPreviewMode('story')}
          className={`flex-1 py-1.5 rounded-md text-[11px] font-semibold transition ${
            previewMode === 'story' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          📖 Сторис открыта
        </button>
      </div>

      <div className="mx-auto" style={{ width: 240 }}>
        <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
          <div className="bg-white rounded-[2rem] overflow-hidden relative" style={{ aspectRatio: '9/19' }}>
            {previewMode === 'home' ? (
              <HomeScreenView coverColor={coverColor} isUrgent={isUrgent} title={title} />
            ) : (
              <StoryFullscreenView
                title={title} description={description} links={links}
                hasContact={hasContact} contacts={contacts}
                contentFile={contentFile} coverColor={coverColor}
                reactionsEnabled={reactionsEnabled} customReactions={customReactions}
                hasCopay={hasCopay} copay={copay}
                isUrgent={isUrgent}
              />
            )}
          </div>
        </div>
      </div>

      {/* Simulation controls below preview */}
      <div className="mt-3 space-y-1.5">
        <div className="text-center text-[10px] text-slate-400">
          {previewMode === 'home' ? 'Так выглядит главный экран приложения РР' : 'Так увидит открытую сторис исполнитель'}
        </div>
      </div>

      <style>{`
        @keyframes urgentPulse {
          0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
          70% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  );
}

// ============ Home Screen view (matches real app) ============
function HomeScreenView({ coverColor, isUrgent, title }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pt-2 pb-1 text-slate-700 text-[9px] font-semibold flex-shrink-0">
        <span>11:40</span>
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-16 h-4 bg-black rounded-full" />
        <div className="flex items-center gap-1">
          <span className="opacity-60">📶</span>
          <span className="opacity-60">📡</span>
          <span className="bg-slate-200 px-1 rounded text-[8px]">44</span>
        </div>
      </div>

      {/* Top auth bar */}
      <div className="px-3 py-2 flex items-center justify-between bg-white border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="text-slate-400">👤</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-800">Авторизоваться</span>
          <ChevronRight size={11} className="text-slate-400" />
        </div>
        <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-white text-[9px] font-bold tracking-tighter">РР</div>
      </div>

      {/* Stories section */}
      <div className="px-3 pt-2 pb-1 flex-shrink-0">
        <div className="text-sm font-bold text-slate-900 mb-1.5">Истории</div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {/* Current urgent story */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`relative rounded-full p-[2px] ${isUrgent ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-blue-500'}`}
              style={isUrgent ? { animation: 'urgentPulse 1.5s infinite' } : {}}>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                <div className={`w-full h-full ${coverColor} flex items-center justify-center text-white text-[8px] font-bold text-center px-1 leading-tight`}>
                  {(title || 'СТОРИС').slice(0, 14)}
                </div>
              </div>
              {isUrgent && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Zap size={8} className="text-white" />
                </div>
              )}
            </div>
            <div className="text-[8px] text-slate-700 mt-0.5 w-12 text-center truncate font-semibold">{isUrgent ? '🔥 Срочно' : 'Сейчас'}</div>
          </div>
          {/* Макс */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="rounded-full p-[2px] bg-blue-500">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-blue-600 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">max</span>
              </div>
            </div>
            <div className="text-[8px] text-slate-600 mt-0.5 w-12 text-center truncate">Макс</div>
          </div>
          {/* Viewed */}
          <div className="flex flex-col items-center flex-shrink-0 opacity-50">
            <div className="rounded-full p-[2px] bg-slate-400">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                <div className="w-full h-full bg-gradient-to-br from-slate-500 to-slate-600 grayscale" />
              </div>
            </div>
            <div className="text-[8px] text-slate-500 mt-0.5 w-12 text-center truncate">Рабочие руки</div>
          </div>
          {/* Promo */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="rounded-full p-[2px] bg-blue-500">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-[7px] font-bold text-center leading-tight">2000₽<br/>ЗА ДРУГА</span>
              </div>
            </div>
            <div className="text-[8px] text-slate-600 mt-0.5 w-12 text-center truncate">Реферал</div>
          </div>
          {/* More viewed */}
          <div className="flex flex-col items-center flex-shrink-0 opacity-50">
            <div className="rounded-full p-[2px] bg-slate-400">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-gradient-to-br from-emerald-500 to-teal-600 grayscale" />
            </div>
            <div className="text-[8px] text-slate-500 mt-0.5 w-12 text-center truncate">Важно</div>
          </div>
        </div>
      </div>

      {/* Работа section */}
      <div className="px-3 pt-2 flex-1 overflow-hidden">
        <div className="text-sm font-bold text-slate-900 mb-1.5">Работа</div>
        <div className="space-y-1.5">
          {[
            { icon: '🛒', t: 'Подработка' },
            { icon: '🕐', t: 'Вахта' },
            { icon: '🔨', t: 'Вакансии' },
            { icon: '🎁', t: 'Акции и бонусы' }
          ].map(c => (
            <div key={c.t} className="bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2 flex items-center gap-2">
              <span className="text-base flex-shrink-0">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-slate-800 leading-tight">{c.t}</div>
                <div className="text-[8px] text-slate-500 truncate">Авторизуйтесь для просмотра</div>
              </div>
              <ChevronRight size={11} className="text-slate-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom auth buttons */}
      <div className="px-3 pb-3 pt-2 space-y-1.5 flex-shrink-0">
        <button className="w-full bg-slate-800 text-white py-2 rounded-xl text-[11px] font-bold">Войти</button>
        <button className="w-full bg-emerald-500 text-white py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1">
          ✓ Войти по Сбер ID
        </button>
      </div>
    </div>
  );
}

// ============ Story Fullscreen view ============
function StoryFullscreenView({ title, description, links, hasContact, contacts, contentFile, coverColor, reactionsEnabled, customReactions, hasCopay, copay, isUrgent }) {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 pt-2 text-white text-[10px] font-semibold">
        <span>11:40</span>
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-20 h-5 bg-black rounded-full" />
        <span>●●●●●</span>
      </div>

      {/* Progress bars */}
      <div className="absolute top-7 left-3 right-3 flex gap-1 z-20">
        <div className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-white" /></div>
        <div className="flex-1 h-0.5 bg-white/30 rounded-full" />
        <div className="flex-1 h-0.5 bg-white/30 rounded-full" />
      </div>

      {/* Top header */}
      <div className="absolute top-10 left-3 right-3 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">РР</div>
          <span className="text-white text-xs font-medium">Рабочие руки</span>
          {isUrgent && <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">Срочно</span>}
        </div>
        <X size={16} className="text-white" />
      </div>

      {/* Content background */}
      <div className={`absolute inset-0 ${coverColor || 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700'}`}>
        {isUrgent && (
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.3) 0%, transparent 60%)'
          }} />
        )}
        {contentFile?.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle size={56} className="text-white/80" />
          </div>
        )}
      </div>

      {/* Story body */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
        {title && (
          <div className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-lg">{title}</div>
        )}
        {description && (
          <div className="text-white/90 text-xs leading-snug mb-2 drop-shadow-md line-clamp-3">{description}</div>
        )}

        {hasCopay && (
          <div className="mb-2 bg-black/30 backdrop-blur rounded-lg px-2.5 py-1.5">
            <div className="text-[10px] text-white/70 leading-tight">{copay.text}</div>
            <div className="text-white text-[12px] font-semibold leading-tight">
              {copay.clientRate} ₽ <span className="text-emerald-300 font-bold">+ {copay.bonus} ₽ от РР</span>
            </div>
          </div>
        )}

        <div className="space-y-1.5 mb-2">
          {links.filter(l => l.text).map((l, i) => (
            <div key={i} className="bg-white/95 backdrop-blur rounded-full px-3 py-2 text-[11px] font-semibold text-blue-700 flex items-center justify-between shadow">
              <span className="flex items-center gap-1.5"><Link2 size={11} />{l.text}</span>
              <ChevronRight size={12} />
            </div>
          ))}
        </div>

        {hasContact && contacts.filter(c => c.value).length > 0 && (
          <div className="bg-emerald-500 rounded-full px-3 py-2 text-[11px] font-semibold text-white flex items-center justify-center gap-1.5 shadow-lg">
            <Phone size={11} /> Связаться ({contacts.filter(c => c.value).length})
          </div>
        )}

        {reactionsEnabled && customReactions.length > 0 && (
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex-1 bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-[11px] text-white/70">
              Ответить...
            </div>
            <div className="flex gap-1.5 ml-2">
              {customReactions.map(e => <span key={e} className="text-base">{e}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ Editor Tab ============
function EditorView({ showToast, mode = 'new', templateData = null, onClose }) {
  // mode: 'new' = чистая форма; 'template' = шаблон с автозаполнением часто используемых функций;
  //       'draft' = продолжение последнего сохранённого черновика (рендерится как шаблон).
  const isTemplate = mode === 'template' || mode === 'draft';
  const isDraft = mode === 'draft';
  const t = templateData || {};

  const [title, setTitle] = useState(isTemplate ? (t.title || '') : '');
  const [description, setDescription] = useState(isTemplate ? (t.body || '') : '');
  const [contentFile, setContentFile] = useState(isTemplate ? { name: 'template_cover.mp4', size: '3.1 МБ', type: 'video', duration: 30 } : null);
  const [contentError, setContentError] = useState('');
  const [links, setLinks] = useState(isTemplate ? [
    { text: 'Записаться', url: 'app://shifts/', type: 'internal' }
  ] : []);
  const [hasContact, setHasContact] = useState(isTemplate ? !!t.hasContact : false);
  const [contacts, setContacts] = useState(isTemplate && t.hasContact ? [
    { type: 'call', label: 'Позвонить менеджеру', value: '+7 (495) 123-45-67' }
  ] : [
    { type: 'call', label: 'Позвонить менеджеру', value: '' }
  ]);
  const [hasCopay, setHasCopay] = useState(isTemplate ? !!t.hasCopay : false);
  const [copay, setCopay] = useState({ clientRate: 2500, bonus: 500, text: 'Доплата сразу на карту' });
  // Реакции — частая фича, по умолчанию on в шаблоне
  const [reactionsEnabled, setReactionsEnabled] = useState(isTemplate);
  const [customReactions, setCustomReactions] = useState(['❤️', '🔥', '👍']);
  const [isUrgent, setIsUrgent] = useState(isTemplate && (t.cat === 'urgent'));
  const [targetCities, setTargetCities] = useState(isTemplate ? ['Москва'] : []);
  const [groupParentCity, setGroupParentCity] = useState(true);
  const [targetCategory, setTargetCategory] = useState('Все категории');
  const [targetPartners, setTargetPartners] = useState(isTemplate ? ['p1'] : []);
  const [targetSubPartner, setTargetSubPartner] = useState('Все объекты');
  const [quickSegment, setQuickSegment] = useState(null);
  // Период для фильтра "Был в приложении"
  const [wasInAppPeriod, setWasInAppPeriod] = useState('7d');
  const [targetMode, setTargetMode] = useState('filters');
  const [uploadedFile, setUploadedFile] = useState(null);
  // Профессия
  const [profession, setProfession] = useState('Любая');
  // Расширенные фильтры из ERP — теперь не отдельным блоком, а в общем потоке настроек.
  // Фильтр по рекрутеру удалён согласно требованию.
  const [extFilters, setExtFilters] = useState({
    citizenship: 'any',
    gender: 'any',
    ageFrom: 18,
    ageTo: 65,
    metroStation: '',
    documentType: 'any',
    samozanyatStatus: 'active',
    completedFrom: 0,
    completedTo: 3000,
    completedPeriod: 'all',
    minRating: 0,
    paymentBan: 'any',
    blacklistedClient: '',
    operator: 'any',
    online: false,
    notBanned: true,
    vahta: false,
    unpaidFineLastMonth: false,
    paymentDataVerified: 'any'
  });
  const [autoDeactivate, setAutoDeactivate] = useState(isTemplate);
  const [autoDeactivateDate, setAutoDeactivateDate] = useState('2026-05-09T22:00');
  const [autoDeactivateOnBrokenLink, setAutoDeactivateOnBrokenLink] = useState(isTemplate);
  const [abTest, setAbTest] = useState(false);
  const [abVariant, setAbVariant] = useState('A');
  const [coverColor, setCoverColor] = useState(isTemplate && t.cover ? t.cover : 'bg-gradient-to-br from-orange-400 via-red-500 to-rose-600');
  const [coverColorB, setCoverColorB] = useState('bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiTarget, setEmojiTarget] = useState(null); // 'title' | 'description'

  const allCities = ['Москва', 'Санкт-Петербург', 'Краснодар', 'Екатеринбург', 'Новосибирск', 'Казань'];
  const cityChildren = {
    'Москва': 'Московская обл.',
    'Санкт-Петербург': 'Ленинградская обл.',
    'Краснодар': 'Краснодарский край',
    'Екатеринбург': 'Свердловская обл.',
    'Новосибирск': 'Новосибирская обл.',
    'Казань': 'Татарстан'
  };
  const categories = ['Все категории', 'Склад', 'Курьеры', 'Производство', 'Уборка', 'Стройка'];
  // Partners as OOO and IP entities (full names from ERP)
  const partners = [
    { id: 'p1', name: 'ООО «ВкусВилл»', short: 'ВкусВилл' },
    { id: 'p2', name: 'ООО «Икс 5 Технологии»', short: 'X5 Group' },
    { id: 'p3', name: 'ООО «Самокат»', short: 'Самокат' },
    { id: 'p4', name: 'ООО «Яндекс.Лавка»', short: 'Яндекс.Лавка' },
    { id: 'p5', name: 'АО «Тандер»', short: 'Магнит' },
    { id: 'p6', name: 'ООО «Интернет Решения»', short: 'Ozon' },
    { id: 'p7', name: 'ИП Хайруллин М.Р.', short: 'ИП Хайруллин' },
    { id: 'p8', name: 'ИП Соколов А.Е. (логистика)', short: 'ИП Соколов' },
  ];
  const professionList = ['Любая', 'Курьер', 'Складской работник', 'Уборщик', 'Грузчик', 'Кассир', 'Сборщик заказов', 'Комплектовщик'];
  const subPartners = ['Все объекты', 'Москва-Север', 'Москва-Юг', 'Дарк-стор Хамовники', 'РЦ Подольск'];
  const operators = ['Все операторы', 'Анна Петрова', 'Михаил Иванов', 'Елена Смирнова', 'Дмитрий Козлов'];
  const quickSegments = [
    { v: 'one_task', l: 'Выполнили 1 задание', icon: '🆕' },
    { v: 'less_5', l: 'Меньше 5 смен', icon: '🌱' },
    { v: 'ten_tasks', l: 'Выполнили 10 заданий', icon: '✅' },
    { v: 'experienced', l: '50+ смен', icon: '⭐' },
    { v: 'was_in_app', l: 'Был в приложении', icon: '📱', hasPeriod: true }
  ];
  // Варианты периода для фильтра «Был в приложении»
  const wasInAppPeriods = [
    { v: '24h', l: 'За 24 часа' },
    { v: '7d', l: 'За 7 дней' },
    { v: '14d', l: 'За 14 дней' },
    { v: '30d', l: 'За 30 дней' },
    { v: '90d', l: 'За 90 дней' }
  ];
  const allReactions = ['❤️', '🔥', '👍', '👎', '🤔', '💯', '⚡', '🎯', '✨', '💪', '🙌', '😎'];
  const messengerTypes = [
    { v: 'call', l: 'Звонок', icon: '📞', placeholder: '+7 (495) 123-45-67', defaultLabel: 'Позвонить менеджеру' },
    { v: 'whatsapp', l: 'WhatsApp', icon: '🟢', placeholder: '+7 916 123-45-67', defaultLabel: 'Написать в WhatsApp' },
    { v: 'telegram', l: 'Telegram', icon: '✈️', placeholder: '@username или ссылка', defaultLabel: 'Написать в Telegram' },
    { v: 'max', l: 'Макс', icon: '💬', placeholder: 'max.ru/username', defaultLabel: 'Написать в Макс' },
    { v: 'link', l: 'Своя ссылка', icon: '🔗', placeholder: 'https://...', defaultLabel: 'Перейти по ссылке' }
  ];

  const addLink = () => {
    if (links.length >= 5) return showToast('Можно добавить до 5 ссылок');
    setLinks([...links, { text: '', url: 'app://', type: 'internal' }]);
  };
  const removeLink = (i) => setLinks(links.filter((_, idx) => idx !== i));
  const updateLink = (i, field, val) => setLinks(links.map((l, idx) => idx === i ? { ...l, [field]: val } : l));

  const addContact = () => {
    if (contacts.length >= 5) return showToast('Максимум 5 способов связи');
    setContacts([...contacts, { type: 'call', label: 'Позвонить менеджеру', value: '' }]);
  };
  const removeContact = (i) => setContacts(contacts.filter((_, idx) => idx !== i));
  const updateContact = (i, field, val) => setContacts(contacts.map((c, idx) => {
    if (idx !== i) return c;
    // When type changes, auto-update label to new default unless user already customized it
    if (field === 'type') {
      const oldDefault = messengerTypes.find(m => m.v === c.type)?.defaultLabel;
      const newDefault = messengerTypes.find(m => m.v === val)?.defaultLabel;
      const labelWasDefault = !c.label || c.label === oldDefault;
      return { ...c, type: val, label: labelWasDefault ? newDefault : c.label };
    }
    return { ...c, [field]: val };
  }));

  const toggleCity = (c) => {
    if (targetCities.includes(c)) setTargetCities(targetCities.filter(x => x !== c));
    else setTargetCities([...targetCities, c]);
  };
  const togglePartner = (p) => {
    if (targetPartners.includes(p)) setTargetPartners(targetPartners.filter(x => x !== p));
    else setTargetPartners([...targetPartners, p]);
  };
  const toggleReaction = (e) => {
    if (customReactions.includes(e)) {
      if (customReactions.length > 1) setCustomReactions(customReactions.filter(x => x !== e));
      else showToast('Хотя бы одна реакция должна быть включена');
    } else {
      if (customReactions.length < 4) setCustomReactions([...customReactions, e]);
      else showToast('Максимум 4 реакции');
    }
  };

  const handleFileUpload = (kind) => {
    // Mock upload — real impl would validate & process actual files
    const validVideoSecs = 45;
    if (kind === 'video_too_long') {
      setContentError('Видео длиннее 60 сек (загружено 1:32). Сократите ролик и попробуйте снова.');
      return;
    }
    if (kind === 'wrong_format') {
      setContentError('Неподдерживаемый формат (.mkv). Поддерживается: JPG, PNG, MP4, MOV, WebM');
      return;
    }
    setContentError('');
    setContentFile({ name: 'urgent_shifts_msk.mp4', size: '4.2 МБ', type: 'video', duration: validVideoSecs });
  };

  const insertEmoji = (emoji) => {
    if (emojiTarget === 'title') setTitle(t => (t + emoji).slice(0, 60));
    else if (emojiTarget === 'description') setDescription(d => (d + emoji).slice(0, 200));
    setShowEmojiPicker(false);
  };

  const covers = [
    'bg-gradient-to-br from-orange-400 via-red-500 to-rose-600',
    'bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700',
    'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600',
    'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
    'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600',
    'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
  ];

  // Quick-access sections — щелчок переносит в нужную карточку настройки
  // «Выделение сторис» (Срочно) первая — самая частая фича
  const quickSections = [
    { id: 'sec-urgent', label: 'Срочно', icon: '⚡' },
    { id: 'sec-content', label: 'Контент', icon: '🖼️' },
    { id: 'sec-text', label: 'Текст', icon: '✏️' },
    { id: 'sec-links', label: 'Ссылки', icon: '🔗' },
    { id: 'sec-contacts', label: 'Связь', icon: '📞' },
    { id: 'sec-targeting', label: 'Таргетинг', icon: '🎯' },
    { id: 'sec-copay', label: 'Доплата', icon: '💰' },
    { id: 'sec-reactions', label: 'Реакции', icon: '😊' },
    { id: 'sec-abtest', label: 'A/B-тест', icon: '🧪' },
    { id: 'sec-deactivate', label: 'Авто-снятие', icon: '⏰' }
  ];
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 p-5 items-start">
      {/* Preview column — СЛЕВА, sticky, всегда виден при скролле настроек */}
      <div className="lg:sticky lg:top-3 lg:self-start lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto no-scrollbar">
      <PhonePreview
        title={title}
        description={description}
        links={links}
        hasContact={hasContact}
        contacts={contacts}
        contentFile={contentFile}
        coverColor={abVariant === 'B' ? coverColorB : coverColor}
        reactionsEnabled={reactionsEnabled}
        customReactions={customReactions}
        hasCopay={hasCopay}
        copay={copay}
        isUrgent={isUrgent}
      />
      </div>

      {/* Settings column — справа, скроллится */}
      <div className="space-y-5 min-w-0">
        {/* Quick-access bar — кнопки быстрого доступа к настройкам (в 2 ряда) */}
        <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur -mx-6 px-6 py-2.5 border-b border-slate-200">
          <div className="flex items-start gap-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex-shrink-0 mt-1.5">Быстрый переход:</span>
            <div className="flex-1 flex flex-wrap gap-1.5">
              {quickSections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 text-[11px] font-medium text-slate-600 transition flex items-center gap-1"
                  title={`Перейти к разделу: ${s.label}`}
                >
                  <span>{s.icon}</span>{s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isTemplate && !isDraft && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5">
            <Sparkles size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-snug">
              <div className="font-bold mb-0.5">Загружен шаблон{t.name ? ` «${t.name}»` : ''}</div>
              <div className="text-blue-800">Самые часто используемые настройки уже включены — отредактируйте под себя или оставьте как есть.</div>
            </div>
          </div>
        )}

        {isDraft && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
            <Save size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-snug">
              <div className="font-bold mb-0.5">Восстановлен последний черновик{t.title ? ` «${t.title}»` : ''}</div>
              <div className="text-amber-800">Все ранее заполненные поля восстановлены. Заполнено {t.progress || 0}% — допишите и отправьте на верификацию. Сохранение: {t.savedAt || '—'}.</div>
            </div>
          </div>
        )}

        {/* Urgency marking */}
        <div id="sec-urgent"><Card title="Выделение сторис" icon={<Zap size={16} />} action={<Toggle on={isUrgent} onChange={setIsUrgent} />}>
          {isUrgent ? (
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5">
                <Zap size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-red-800 mb-0.5">Срочная сторис</div>
                  <div className="text-xs text-red-700 leading-snug">
                    Кружочек получит пульсирующий красный обод и метку «Срочно». Всегда показывается первым в ряду. На иконке появится молния.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: '🔴', t: 'Пульсирующий красный обод', d: 'Анимация привлекает взгляд' },
                  { icon: '⚡', t: 'Метка «Срочно» под кружком', d: 'Текстовый маркер' },
                  { icon: '📌', t: 'Первая позиция в ряду', d: 'Независимо от времени публикации' }
                ].map((f, i) => (
                  <div key={i} className="bg-red-50 border border-red-100 rounded-lg p-2">
                    <div className="text-xl mb-1">{f.icon}</div>
                    <div className="text-[10px] font-semibold text-slate-800">{f.t}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{f.d}</div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 rounded p-2.5">
                После истечения срока (по таймеру авто-деактивации) метка «Срочно» снимается автоматически — кружочек тухнет в режим обычного просмотренного.
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              Обычная сторис показывается в стандартном порядке, без анимации. Включите, если нужно срочно привлечь внимание — горящие вакансии, дедлайны, важные изменения.
            </div>
          )}
        </Card></div>

        {/* Cover & content */}
        <div id="sec-content"><Card title="Контент сторис" icon={<ImageIcon size={16} />}>
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-2">Обложка</div>
              <div className={`${coverColor} aspect-[9/16] rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer hover:opacity-90 transition`}>
                <Plus size={28} className="text-white/80" />
              </div>
              <div className="text-[10px] text-slate-400 mt-1.5 text-center">JPG, PNG · до 5 МБ</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-2">Основной контент</div>
              {contentFile && !contentError ? (
                <div className="border-2 border-emerald-300 bg-emerald-50/50 rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      {contentFile.type === 'video' ? <Video size={18} className="text-emerald-700" /> : <ImageIcon size={18} className="text-emerald-700" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{contentFile.name}</div>
                      <div className="text-xs text-slate-600">
                        {contentFile.size}
                        {contentFile.type === 'video' && ` · 0:${String(contentFile.duration).padStart(2,'0')}`}
                        {' · '}{contentFile.type === 'video' ? 'видео' : 'фото'}
                      </div>
                    </div>
                    <button onClick={() => setContentFile(null)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {contentFile.type === 'video' && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700">
                      <CheckCircle2 size={12} /> Длительность в пределах лимита (60 сек)
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => handleFileUpload('valid')}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 rounded-xl p-5 text-center cursor-pointer transition"
                >
                  <div className="w-10 h-10 mx-auto mb-2 bg-slate-100 rounded-full flex items-center justify-center">
                    <Upload size={18} className="text-slate-500" />
                  </div>
                  <div className="text-sm font-medium text-slate-700">Загрузить файл</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">JPG, PNG, MP4, MOV, WebM</div>
                  <div className="text-[11px] text-slate-400">Видео — до 60 сек, до 50 МБ</div>
                </div>
              )}

              {contentError && (
                <div className="mt-2 flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-2.5">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Ошибка загрузки</div>
                    <div>{contentError}</div>
                  </div>
                </div>
              )}

              {/* Demo error triggers */}
              <div className="mt-2 flex gap-1.5 text-[10px]">
                <span className="text-slate-400">Демо ошибок:</span>
                <button onClick={() => handleFileUpload('video_too_long')} className="text-amber-600 hover:underline">видео {'>'} 60с</button>
                <button onClick={() => handleFileUpload('wrong_format')} className="text-amber-600 hover:underline">неверный формат</button>
                <button onClick={() => { setContentError(''); handleFileUpload('valid'); }} className="text-emerald-600 hover:underline">сбросить</button>
              </div>

              <div className="text-xs text-slate-500 mb-1.5 mt-3">Подложка (тестовая палитра)</div>
              <div className="flex flex-wrap gap-2">
                {covers.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setCoverColor(c)}
                    className={`w-9 h-9 rounded-lg ${c} ring-2 transition ${coverColor === c ? 'ring-blue-600 ring-offset-2' : 'ring-transparent'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card></div>

        {/* Title & description */}
        <div id="sec-text"><Card title="Текст" icon={<Edit3 size={16} />}>
          <Field label="Заголовок" hint={`${title.length}/60`}>
            <div className="relative">
              <input
                value={title}
                onChange={e => setTitle(e.target.value.slice(0, 60))}
                className="w-full px-3 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                placeholder="Введите заголовок"
              />
              <button
                onClick={() => { setEmojiTarget('title'); setShowEmojiPicker(!showEmojiPicker || emojiTarget !== 'title'); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-200 text-slate-500"
                title="Вставить эмодзи"
              >
                <Smile size={16} />
              </button>
            </div>
          </Field>

          <Field label="Описание" hint={`${description.length}/200`}>
            {/* Formatting toolbar */}
            <div className="flex items-center gap-0.5 px-2 py-1.5 bg-slate-100 rounded-t-lg border border-slate-200 border-b-0">
              {[
                { i: <Bold size={14} />, t: 'Жирный (Ctrl+B)' },
                { i: <Italic size={14} />, t: 'Курсив (Ctrl+I)' },
                { i: <Underline size={14} />, t: 'Подчёркнутый' },
                { i: <Strikethrough size={14} />, t: 'Зачёркнутый' }
              ].map((b, i) => (
                <button
                  key={i}
                  onClick={() => showToast(`Применено: ${b.t}`)}
                  title={b.t}
                  className="p-1.5 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition"
                >{b.i}</button>
              ))}
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button
                onClick={() => showToast('Список')}
                title="Список"
                className="p-1.5 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition"
              ><List size={14} /></button>
              <button
                onClick={() => showToast('Ссылка в тексте')}
                title="Ссылка"
                className="p-1.5 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition"
              ><Link2 size={14} /></button>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button
                onClick={() => { setEmojiTarget('description'); setShowEmojiPicker(!showEmojiPicker || emojiTarget !== 'description'); }}
                title="Эмодзи"
                className="p-1.5 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
              ><Smile size={14} /><ChevronDown size={10} /></button>
              <div className="ml-auto text-[11px] text-slate-400">{description.length}/200</div>
            </div>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 200))}
              rows={3}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 border-t-0 rounded-b-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
              placeholder="Опишите акцию"
            />
          </Field>

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg -mt-2">
              <div className="text-[11px] text-slate-500 mb-2 flex items-center justify-between">
                <span>Эмодзи для «{emojiTarget === 'title' ? 'Заголовка' : 'Описания'}»</span>
                <button onClick={() => setShowEmojiPicker(false)} className="text-slate-400 hover:text-slate-700"><X size={12} /></button>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {['😀','😎','🔥','❤️','💪','👍','👎','🙌','✨','⚡','💯','🎯','🎉','🚀','💰','💵','📍','📞','💬','✅','❌','⭐','🏆','🎁','🆕','📢','⏰','📅','🔔','💡','🎯','🌟','💎','🎬','📦','🚚','🏪','👷','🧹','🛠️','📊','📈','📉','💼','🤝','✊','👏','🙏','😊'].map(e => (
                  <button
                    key={e}
                    onClick={() => insertEmoji(e)}
                    className="text-lg p-1 hover:bg-slate-100 rounded transition"
                  >{e}</button>
                ))}
              </div>
            </div>
          )}
        </Card></div>

        {/* Links */}
        <div id="sec-links"><Card
          title={`Ссылки (${links.length}/5)`}
          icon={<Link2 size={16} />}
          action={
            <button onClick={addLink} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Plus size={14} /> Добавить ссылку
            </button>
          }
        >
          <div className="space-y-3">
            {links.map((l, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="px-2 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-700 whitespace-nowrap flex items-center gap-1">
                  📱 В приложении
                </span>
                <input
                  value={l.text}
                  onChange={e => updateLink(i, 'text', e.target.value)}
                  placeholder="Текст кнопки"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <input
                  value={l.url}
                  onChange={e => updateLink(i, 'url', e.target.value)}
                  placeholder="app://shifts/123"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <button onClick={() => removeLink(i)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-start gap-1.5 bg-blue-50 border border-blue-100 rounded-lg p-2.5">
            <ShieldCheck size={12} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <span>В сторис доступны только <b>внутренние ссылки в приложении</b> (app://). Внешние ссылки запрещены — это исключает фишинг и накрутку, а исполнитель всегда остаётся в РР.</span>
          </div>
        </Card></div>

        {/* Contact button — multi-contact */}
        <div id="sec-contacts"><Card
          title={`Кнопка «Связаться» (${contacts.filter(c => c.value).length})`}
          icon={<Phone size={16} />}
          action={<Toggle on={hasContact} onChange={setHasContact} />}
        >
          {hasContact && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600 -mt-1">
                Исполнитель в сторис нажмёт «Связаться» и в bottom-sheet выберет один из способов: позвонить, написать в мессенджер, перейти по ссылке. Иконка и название канала добавляются автоматически — в подписи укажите только <b>что человек должен сделать</b> («Позвонить менеджеру», «Написать в Telegram»).
              </div>

              {contacts.map((c, i) => {
                const meta = messengerTypes.find(m => m.v === c.type) || messengerTypes[0];
                return (
                  <div key={i} className="flex gap-2 items-start bg-slate-50 rounded-lg p-2.5">
                    <span className="text-2xl mt-1">{meta.icon}</span>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <select
                        value={c.type}
                        onChange={e => updateContact(i, 'type', e.target.value)}
                        className="px-2 py-1.5 bg-white border border-slate-200 rounded-md text-xs"
                      >
                        {messengerTypes.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                      </select>
                      <input
                        value={c.label}
                        onChange={e => updateContact(i, 'label', e.target.value)}
                        placeholder={meta.defaultLabel}
                        className="px-2 py-1.5 bg-white border border-slate-200 rounded-md text-xs"
                        title="Подпись = действие. Канал и иконка добавляются автоматически."
                      />
                      <input
                        value={c.value}
                        onChange={e => updateContact(i, 'value', e.target.value)}
                        placeholder={meta.placeholder}
                        className="px-2 py-1.5 bg-white border border-slate-200 rounded-md text-xs"
                      />
                    </div>
                    <button onClick={() => removeContact(i)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded transition mt-0.5">
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}

              <button
                onClick={addContact}
                className="w-full py-2 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 transition flex items-center justify-center gap-1.5"
              >
                <Plus size={14} /> Добавить способ связи
              </button>

              <div className="flex items-start gap-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-2.5">
                <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
                <span>Перед звонком исполнителю показывается подтверждение «Позвонить менеджеру?». Для мессенджеров — открывается приложение. Для своей ссылки — открывается WebView внутри РР.</span>
              </div>
            </div>
          )}
        </Card></div>

        {/* Targeting */}
        <div id="sec-targeting"><Card title="Таргетинг (кому показать)" icon={<Target size={16} />}>
          {/* Mode tabs */}
          <div className="flex gap-1 mb-4 bg-slate-100 p-1 rounded-lg">
            {[
              { v: 'filters', l: 'По фильтрам', i: <Filter size={13} /> },
              { v: 'upload', l: 'Список из Excel', i: <FileSpreadsheet size={13} /> }
            ].map(t => (
              <button
                key={t.v}
                onClick={() => setTargetMode(t.v)}
                className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  targetMode === t.v ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
              >{t.i}{t.l}</button>
            ))}
          </div>

          {targetMode === 'filters' && (
            <>
              {/* Quick segments */}
              <Field label="Быстрые сегменты">
                <div className="flex flex-wrap gap-2">
                  {quickSegments.map(s => (
                    <button
                      key={s.v}
                      onClick={() => setQuickSegment(quickSegment === s.v ? null : s.v)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition flex items-center gap-1.5 ${
                        quickSegment === s.v
                          ? 'bg-violet-600 border-violet-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'
                      }`}
                    >
                      <span>{s.icon}</span>{s.l}
                      {s.v === 'was_in_app' && quickSegment === 'was_in_app' && (
                        <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[10px] font-bold ml-0.5">
                          {wasInAppPeriods.find(p => p.v === wasInAppPeriod)?.l}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {/* Период для фильтра "Был в приложении" */}
                {quickSegment === 'was_in_app' && (
                  <div className="mt-3 bg-violet-50 border border-violet-200 rounded-lg p-3">
                    <div className="text-xs font-semibold text-violet-900 mb-2 flex items-center gap-1.5">
                      <Clock size={12} /> За какой период исполнитель заходил в приложение?
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {wasInAppPeriods.map(p => (
                        <button
                          key={p.v}
                          onClick={() => setWasInAppPeriod(p.v)}
                          className={`px-3 py-1.5 rounded-md text-[11px] font-semibold border transition ${
                            wasInAppPeriod === p.v
                              ? 'bg-violet-600 border-violet-600 text-white'
                              : 'bg-white border-violet-200 text-violet-700 hover:bg-violet-100'
                          }`}
                        >
                          {p.l}
                        </button>
                      ))}
                    </div>
                    <div className="text-[10px] text-violet-700 mt-2 leading-snug">
                      Сторис увидят исполнители, которые открывали приложение РР в указанный период. Полезно для тёплой аудитории — они уже знают продукт.
                    </div>
                  </div>
                )}
              </Field>

              {/* Cities */}
              <Field label="Города">
                <div className="flex flex-wrap gap-2 mb-2">
                  <button
                    onClick={() => setTargetCities(targetCities.length === allCities.length ? [] : allCities)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                      targetCities.length === allCities.length
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Все города
                  </button>
                  {allCities.map(c => (
                    <button
                      key={c}
                      onClick={() => toggleCity(c)}
                      title={`Включает «${cityChildren[c]}»`}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                        targetCities.includes(c)
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={groupParentCity}
                    onChange={e => setGroupParentCity(e.target.checked)}
                    className="w-3.5 h-3.5 accent-blue-600"
                  />
                  <span>Учитывать область как родительский город (Москва ← Московская обл.)</span>
                </label>
              </Field>

              {/* Partner — multi-select dropdown of OOO/IP entities */}
              <Field label="Клиент / партнёр (ООО, ИП)" hint="Из ERP. Можно выбрать несколько.">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    {targetPartners.length === 0 ? (
                      <span className="text-xs text-slate-400">Не выбрано — сторис увидят все партнёры</span>
                    ) : (
                      targetPartners.map(pid => {
                        const p = partners.find(x => x.id === pid);
                        return p ? (
                          <span key={pid} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                            <Building2 size={10} />{p.short}
                            <button
                              onClick={() => togglePartner(pid)}
                              className="hover:text-blue-900 ml-0.5"
                            ><X size={10} /></button>
                          </span>
                        ) : null;
                      })
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partners.filter(p => !targetPartners.includes(p.id)).map(p => (
                      <button
                        key={p.id}
                        onClick={() => togglePartner(p.id)}
                        className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-md text-[11px] text-slate-700 transition flex items-center gap-1"
                      >
                        <Plus size={10} />{p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Field>

              {/* Object / sub-partner */}
              <Field label="Объект / точка / РЦ" hint="Конкретная локация партнёра">
                <select
                  value={targetSubPartner}
                  onChange={e => setTargetSubPartner(e.target.value)}
                  disabled={targetPartners.length === 0}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
                >
                  {subPartners.map(s => <option key={s}>{s}</option>)}
                </select>
                {targetPartners.length === 0 && (
                  <div className="text-[10px] text-slate-400 mt-1">Сначала выберите партнёра</div>
                )}
              </Field>

              {/* Profession */}
              <Field label="Профессия">
                <select
                  value={profession}
                  onChange={e => setProfession(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  {professionList.map(p => <option key={p}>{p}</option>)}
                </select>
              </Field>

              {/* Самозанятость fixed note */}
              <div className="text-[11px] text-slate-500 bg-slate-50 rounded p-2 flex items-center gap-1.5">
                <Briefcase size={12} className="text-slate-400" />
                <span>Тип занятости: <b className="text-slate-700">только самозанятые</b> (системно зашит в платформу — другие типы не используются)</span>
              </div>

              {/* Расширенные фильтры из ERP — теперь в общем потоке, без рекрутера */}
              <div className="mt-2 pt-3 border-t border-slate-100">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-blue-600" /> Дополнительные фильтры из ERP
                </div>

                <Field label="Гражданство">
                  <select value={extFilters.citizenship}
                    onChange={e => setExtFilters({ ...extFilters, citizenship: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <option value="any">Любое</option>
                    <option value="RU">РФ</option>
                    <option value="BY">Беларусь</option>
                    <option value="KZ">Казахстан</option>
                    <option value="UZ">Узбекистан</option>
                    <option value="KG">Кыргызстан</option>
                    <option value="AM">Армения</option>
                    <option value="TJ">Таджикистан</option>
                  </select>
                </Field>

                <Field label="Пол">
                  <div className="flex gap-2">
                    {[{ v: 'any', l: 'Любой' }, { v: 'M', l: 'Мужской' }, { v: 'F', l: 'Женский' }].map(g => (
                      <button
                        key={g.v}
                        onClick={() => setExtFilters({ ...extFilters, gender: g.v })}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition ${
                          extFilters.gender === g.v
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >{g.l}</button>
                    ))}
                  </div>
                </Field>

                <Field label={`Возраст: ${extFilters.ageFrom}–${extFilters.ageTo} лет`}>
                  <div className="flex items-center gap-2">
                    <input type="number" min="14" max="80" value={extFilters.ageFrom}
                      onChange={e => setExtFilters({ ...extFilters, ageFrom: +e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                    <span className="text-slate-400">—</span>
                    <input type="number" min="14" max="80" value={extFilters.ageTo}
                      onChange={e => setExtFilters({ ...extFilters, ageTo: +e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                  </div>
                </Field>

                <Field label="Станция метро" hint="Только Москва и СПб">
                  <input type="text" placeholder="например: Хамовники"
                    value={extFilters.metroStation}
                    onChange={e => setExtFilters({ ...extFilters, metroStation: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                </Field>

                <Field label="Тип документа">
                  <select value={extFilters.documentType}
                    onChange={e => setExtFilters({ ...extFilters, documentType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="any">Любой</option>
                    <option value="passport_rf">Паспорт РФ</option>
                    <option value="foreign">Иностранный паспорт</option>
                    <option value="patent">Патент на работу</option>
                    <option value="rvp">РВП</option>
                    <option value="vnj">ВНЖ</option>
                  </select>
                </Field>

                <Field label="Статус самозанятости">
                  <select value={extFilters.samozanyatStatus}
                    onChange={e => setExtFilters({ ...extFilters, samozanyatStatus: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="active">Активная (по умолчанию)</option>
                    <option value="suspended">Приостановлена</option>
                    <option value="all">Любой статус</option>
                  </select>
                </Field>

                <Field label={`Кол-во выполненных смен: ${extFilters.completedFrom}–${extFilters.completedTo}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <input type="number" min="0" value={extFilters.completedFrom}
                      onChange={e => setExtFilters({ ...extFilters, completedFrom: +e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                    <span className="text-slate-400">—</span>
                    <input type="number" min="0" value={extFilters.completedTo}
                      onChange={e => setExtFilters({ ...extFilters, completedTo: +e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-slate-500 flex-shrink-0">За период:</label>
                    <select value={extFilters.completedPeriod}
                      onChange={e => setExtFilters({ ...extFilters, completedPeriod: e.target.value })}
                      className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs">
                      <option value="all">За всё время</option>
                      <option value="7d">За 7 дней</option>
                      <option value="30d">За 30 дней</option>
                      <option value="90d">За 90 дней</option>
                      <option value="365d">За год</option>
                    </select>
                  </div>
                </Field>

                <Field label={`Минимальный рейтинг: ${extFilters.minRating.toFixed(1)} / 10`}>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0" max="10" step="0.1"
                      value={extFilters.minRating}
                      onChange={e => setExtFilters({ ...extFilters, minRating: +e.target.value })}
                      className="flex-1 accent-blue-600" />
                    <span className="text-sm font-semibold text-slate-700 tabular-nums w-14 flex items-center gap-1 justify-end">
                      <Star size={13} className="text-amber-500 fill-amber-500" />{extFilters.minRating.toFixed(1)}
                    </span>
                  </div>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Запрет оплаты">
                    <select value={extFilters.paymentBan}
                      onChange={e => setExtFilters({ ...extFilters, paymentBan: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                      <option value="any">Не учитывать</option>
                      <option value="no">Без запрета (можно платить)</option>
                      <option value="yes">С запретом (заблокирована оплата)</option>
                    </select>
                  </Field>

                  <Field label="Верификация платёжных данных">
                    <select value={extFilters.paymentDataVerified}
                      onChange={e => setExtFilters({ ...extFilters, paymentDataVerified: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                      <option value="any">Не учитывать</option>
                      <option value="verified">Верифицирована</option>
                      <option value="not_verified">Не верифицирована</option>
                    </select>
                  </Field>
                </div>

                <Field label="Чёрный список партнёра">
                  <select value={extFilters.blacklistedClient}
                    onChange={e => setExtFilters({ ...extFilters, blacklistedClient: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="">Не учитывать</option>
                    {partners.map(p => <option key={p.id} value={p.id}>Не в ЧС: {p.short}</option>)}
                  </select>
                </Field>

                <Field label="Оператор обработки">
                  <select value={extFilters.operator}
                    onChange={e => setExtFilters({ ...extFilters, operator: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    {operators.map(o => <option key={o} value={o === 'Все операторы' ? 'any' : o}>{o}</option>)}
                  </select>
                </Field>

                {/* Чек-боксы — дополнительные условия */}
                <Field label="Дополнительные условия">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-2">
                    {[
                      { k: 'online', l: 'Сейчас онлайн в приложении' },
                      { k: 'notBanned', l: 'Только не забаненные' },
                      { k: 'vahta', l: 'Открыт к вахте' },
                      { k: 'unpaidFineLastMonth', l: 'Неоплаченный штраф за месяц' }
                    ].map(f => (
                      <label key={f.k} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white rounded-md">
                        <input type="checkbox"
                          checked={extFilters[f.k]}
                          onChange={e => setExtFilters({ ...extFilters, [f.k]: e.target.checked })}
                          className="w-4 h-4 accent-blue-600" />
                        <span className="text-xs text-slate-700">{f.l}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>

              {/* Reach estimate */}
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-emerald-700 font-medium">Расчётный охват</div>
                    <div className="text-xl font-bold text-emerald-800 tabular-nums">~{(50000 + targetCities.length * 12000 + targetPartners.length * 8000).toLocaleString('ru')}</div>
                    <div className="text-[10px] text-emerald-600">из 800 000 исполнителей в базе</div>
                  </div>
                  <Users size={32} className="text-emerald-300" />
                </div>
              </div>
            </>
          )}

          {targetMode === 'upload' && (
            <div className="space-y-3">
              {!uploadedFile ? (
                <>
                  <div
                    onClick={() => setUploadedFile({
                      name: 'аудитория_май_активные.xlsx',
                      total: 12450,
                      matched: 10872,
                      notFound: 1578
                    })}
                    className="border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 rounded-xl p-6 text-center cursor-pointer transition"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-50 rounded-full flex items-center justify-center">
                      <Upload size={20} className="text-blue-600" />
                    </div>
                    <div className="text-sm font-semibold text-slate-700">
                      Перетащите файл или нажмите для выбора
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Excel с телефонами и/или ИНН · до 50 000 строк
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2">.xlsx, .xls, .csv</div>
                  </div>

                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <FileSpreadsheet size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-blue-900">
                          Шаблон файла аудитории
                        </div>
                        <div className="text-[11px] text-blue-700">
                          Один файл — две колонки. Заполните телефон и/или ИНН в любой комбинации
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Скачивается template_audience.xlsx')}
                      className="px-3 py-1.5 bg-white border border-blue-200 rounded-md text-xs font-semibold text-blue-700 hover:bg-blue-50 flex items-center gap-1.5"
                    >
                      <Download size={12} /> Скачать
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <FileSpreadsheet size={20} className="text-emerald-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{uploadedFile.name}</div>
                      <div className="text-xs text-slate-600">Загружено {uploadedFile.total} строк</div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                      <div className="text-[11px] text-emerald-700 font-medium uppercase tracking-wider">Найдено в базе</div>
                      <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-0.5">{uploadedFile.matched}</div>
                      <div className="text-[10px] text-emerald-600">{Math.round(uploadedFile.matched/uploadedFile.total*100)}% совпало</div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                      <div className="text-[11px] text-amber-700 font-medium uppercase tracking-wider">Не найдено</div>
                      <div className="text-2xl font-bold text-amber-700 tabular-nums mt-0.5">{uploadedFile.notFound}</div>
                      <div className="text-[10px] text-amber-600">не зарегистрированы</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-50 rounded-lg p-2.5">
                    💡 «Не найденных» можно выгрузить отдельно для дальнейшей работы (например, обзвона колл-центра).
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2 mt-4">
            <Sparkles size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900">
              <div className="font-semibold mb-0.5">
                Расчётный охват: ~{(uploadedFile?.matched || (targetCities.length * targetPartners.length * 312)).toLocaleString('ru')} исполнителей
              </div>
              <div className="text-blue-700">Учитываются все активные фильтры. Сегментированный показ снижает нагрузку на ленту и повышает CTR.</div>
            </div>
          </div>
        </Card></div>

        {/* Schedule */}
        <div id="sec-deactivate"><Card title="Авто-снятие сторис" icon={<Calendar size={16} />}>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-slate-800">Авто-снятие по времени</div>
                <div className="text-xs text-slate-500">Сторис снимется в указанную дату/время</div>
              </div>
              <Toggle on={autoDeactivate} onChange={setAutoDeactivate} />
            </div>
            {autoDeactivate && (
              <input
                type="datetime-local"
                value={autoDeactivateDate}
                onChange={e => setAutoDeactivateDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            )}

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-slate-800">Снимать при «битой» ссылке</div>
                <div className="text-xs text-slate-500">Если ссылка перестала отвечать — сторис снимется + придёт уведомление</div>
              </div>
              <Toggle on={autoDeactivateOnBrokenLink} onChange={setAutoDeactivateOnBrokenLink} />
            </div>
          </div>
        </Card></div>

        {/* Co-payment from РР */}
        <div id="sec-copay"><Card title="Доплата от платформы РР" icon={<CircleDollarSign size={16} />} action={<Toggle on={hasCopay} onChange={setHasCopay} />}>
          {hasCopay && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Ставка клиента</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={copay.clientRate}
                      onChange={e => setCopay({ ...copay, clientRate: +e.target.value })}
                      className="w-full pl-3 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm tabular-nums"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">₽</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Доплата от РР</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={copay.bonus}
                      onChange={e => setCopay({ ...copay, bonus: +e.target.value })}
                      className="w-full pl-3 pr-7 py-2 bg-emerald-50 border border-emerald-200 rounded-md text-sm tabular-nums text-emerald-800 font-semibold"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-emerald-500">₽</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Итого исполнителю</label>
                  <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-md text-sm font-bold text-blue-800 tabular-nums">
                    {(copay.clientRate + copay.bonus).toLocaleString('ru')} ₽
                  </div>
                </div>
              </div>

              <Field label="Подпись над суммой (видна в сторис)">
                <input
                  value={copay.text}
                  onChange={e => setCopay({ ...copay, text: e.target.value })}
                  placeholder="Например: Доплата сразу на карту"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm"
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {['Доплата сразу на карту', 'Бонус +500₽ от РР', 'Подняли ставку для вас', 'Акция мая · +20%'].map(t => (
                    <button
                      key={t}
                      onClick={() => setCopay({ ...copay, text: t })}
                      className="px-2 py-0.5 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition"
                    >{t}</button>
                  ))}
                </div>
              </Field>

              <div className="text-[11px] text-slate-500 bg-slate-50 rounded p-2.5 leading-snug">
                💡 В сторис показывается строкой <b>«{copay.clientRate}&nbsp;₽ + {copay.bonus}&nbsp;₽ от РР»</b> на тёмной плашке — заметно, но не кричит. Используется для коммуникации спецпредложений без обещаний от имени клиента.
              </div>
            </div>
          )}
        </Card></div>

        {/* Reactions — customizable */}
        <div id="sec-reactions"><Card title="Реакции (эмодзи)" icon={<Smile size={16} />} action={<Toggle on={reactionsEnabled} onChange={setReactionsEnabled} />}>
          {reactionsEnabled && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600">
                Под сторис исполнитель сможет нажать на одну из этих реакций. Выберите от 1 до 4 эмодзи.
              </div>
              <div>
                <div className="text-[11px] text-slate-500 mb-2">Выбрано: {customReactions.length}/4</div>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {allReactions.map(e => (
                    <button
                      key={e}
                      onClick={() => toggleReaction(e)}
                      className={`text-2xl p-2 rounded-lg border-2 transition ${
                        customReactions.includes(e)
                          ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200'
                          : 'border-transparent bg-slate-50 hover:bg-slate-100 opacity-60 hover:opacity-100'
                      }`}
                    >{e}</button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 bg-slate-50 rounded p-2 flex items-center gap-2">
                <Sparkles size={11} className="text-blue-500" />
                <span>Сводка реакций — во вкладке «Аналитика». Видно, кто конкретно поставил реакцию (см. таблицу «Подробно по исполнителям»).</span>
              </div>
            </div>
          )}
        </Card></div>



        {/* A/B test — with thumbnails */}
        <div id="sec-abtest"><Card title="A/B-тест" icon={<Layers size={16} />} action={<Toggle on={abTest} onChange={setAbTest} />}>
          {abTest ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Variant A */}
                <button
                  onClick={() => setAbVariant('A')}
                  className={`text-left rounded-xl border-2 transition overflow-hidden ${
                    abVariant === 'A' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`${coverColor} aspect-[16/9] relative flex items-end p-2`}>
                    <div className="text-white text-[10px] font-bold leading-tight line-clamp-2 drop-shadow">{title || 'Без заголовка'}</div>
                    <div className="absolute top-1.5 left-1.5 bg-white/95 rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-800">A</div>
                    {abVariant === 'A' && (
                      <div className="absolute top-1.5 right-1.5 bg-blue-600 rounded-full px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">Редактирую</div>
                    )}
                  </div>
                  <div className="p-2 bg-white">
                    <div className="text-[11px] font-semibold text-slate-700">Текущая версия</div>
                    <div className="text-[10px] text-slate-500">Контент из формы выше</div>
                  </div>
                </button>

                {/* Variant B */}
                <button
                  onClick={() => { setAbVariant('B'); showToast('Переключились на редактирование варианта B'); }}
                  className={`text-left rounded-xl border-2 transition overflow-hidden ${
                    abVariant === 'B' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-dashed border-slate-300 hover:border-blue-400'
                  }`}
                >
                  <div className={`${coverColorB} aspect-[16/9] relative flex items-end p-2`}>
                    <div className="text-white text-[10px] font-bold leading-tight line-clamp-2 drop-shadow">Срочные смены — х2 для опытных</div>
                    <div className="absolute top-1.5 left-1.5 bg-white/95 rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-800">B</div>
                    {abVariant === 'B' && (
                      <div className="absolute top-1.5 right-1.5 bg-blue-600 rounded-full px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">Редактирую</div>
                    )}
                  </div>
                  <div className="p-2 bg-white">
                    <div className="text-[11px] font-semibold text-slate-700">Альтернатива</div>
                    <div className="text-[10px] text-slate-500">Другая обложка и заголовок</div>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Сплит</div>
                  <div className="text-sm font-bold text-slate-800">50 / 50</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Длительность</div>
                  <div className="text-sm font-bold text-slate-800">24 часа</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Метрика</div>
                  <div className="text-sm font-bold text-slate-800">CTR</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 rounded-lg p-2.5">
                💡 Аудитория делится 50/50. Через 24 часа автоматически остаётся вариант с лучшим CTR. Слева — превью каждого варианта, кликните на B чтобы переключить редактор.
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              Опубликовать 2 версии параллельно и автоматически оставить ту, у которой выше конверсия.
            </div>
          )}
        </Card></div>

        {/* Hint at the bottom */}
        <div className="text-[11px] text-slate-400 text-center py-3">
          Все настройки сохраняются автоматически как черновик
        </div>
      </div>
    </div>
  );
}

// ============ Analytics Tab ============
function AnalyticsView() {
  // analyticsMode: 'overall' — общая статистика по всем сторис, 'single' — по конкретной сторис
  const [analyticsMode, setAnalyticsMode] = useState('overall');
  const [selectedStory, setSelectedStory] = useState('Срочные смены в Москве — х1.5');
  const [storyContentType, setStoryContentType] = useState('video'); // 'video' | 'image'

  // KPI данные для двух режимов
  const overallKpis = {
    views: '1 284 510',
    uniqueViews: '742 380',
    clicks: '184 960',
    bookings: '32 893',
    shifts: '24 175',
    conv: '2.6%'
  };
  const singleKpis = {
    views: '284 510',
    uniqueViews: '198 240',
    clicks: '38 960',
    bookings: '6 893',
    shifts: '5 175',
    conv: '2.4%'
  };
  const kpi = analyticsMode === 'overall' ? overallKpis : singleKpis;

  return (
    <div className="p-6 space-y-6">
      {/* Переключатель режимов: общая статистика / по сторис */}
      <div className="bg-white border border-slate-200 rounded-xl p-1 inline-flex gap-1">
        <button
          onClick={() => setAnalyticsMode('overall')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
            analyticsMode === 'overall' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers size={14} /> Общая статистика
        </button>
        <button
          onClick={() => setAnalyticsMode('single')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
            analyticsMode === 'single' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BarChart3 size={14} /> По конкретной сторис
        </button>
      </div>

      {/* Story selector — только в режиме single */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-end gap-3 flex-wrap">
          {analyticsMode === 'single' && (
            <>
              <div>
                <div className="text-xs text-slate-500 mb-1">Сторис</div>
                <select
                  value={selectedStory}
                  onChange={e => setSelectedStory(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-w-[280px]"
                >
                  {storyList.filter(s => s.status !== 'draft').map(s => <option key={s.id}>{s.title}</option>)}
                </select>
              </div>
              {/* Demo: content-type toggle */}
              <div>
                <div className="text-xs text-slate-500 mb-1">Тип контента <span className="text-slate-400 normal-case">(демо)</span></div>
                <div className="inline-flex bg-slate-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => setStoryContentType('video')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                      storyContentType === 'video' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Video size={12} /> Видео
                  </button>
                  <button
                    onClick={() => setStoryContentType('image')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                      storyContentType === 'image' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <ImageIcon size={12} /> Фото
                  </button>
                </div>
              </div>
            </>
          )}
          {analyticsMode === 'overall' && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2.5 max-w-2xl">
              <Layers size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-blue-900">Сводка по всем активным сторис</div>
                <div className="text-xs text-blue-800 leading-snug">
                  Все KPI и графики ниже — агрегированные данные по {storyList.filter(s => s.status === 'active' || s.status === 'archived').length} сторис за выбранный период. Для разреза по одной сторис переключитесь в режим «По конкретной сторис».
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
            <Filter size={13} /> Период: 7 дней
          </button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
            <Download size={13} /> Экспорт CSV
          </button>
        </div>
      </div>

      {/* KPI cards — добавлены "Уникальные просмотры" */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard label="Просмотры" value={kpi.views} delta={12.4} icon={<Eye size={16} />} color="blue" />
        <KPICard label="Уникальные просмотры" value={kpi.uniqueViews} delta={9.8} icon={<UserCheck size={16} />} color="violet" hint="Каждый исполнитель учитывается только один раз" />
        <KPICard label="Клики по ссылкам" value={kpi.clicks} delta={8.1} icon={<MousePointerClick size={16} />} color="emerald" />
        <KPICard label="Записи" value={kpi.bookings} delta={15.7} icon={<UserPlus size={16} />} color="amber" />
        <KPICard label="Вышли на смену" value={kpi.shifts} delta={-2.3} icon={<CheckCircle2 size={16} />} color="rose" />
        <KPICard label="Конверсия V→Запись" value={kpi.conv} delta={3.4} icon={<TrendingUp size={16} />} color="blue" />
      </div>

      {/* Дополнительная карточка — детализация уникальных просмотров */}
      <Card title="Уникальные просмотры — детализация" icon={<UserCheck size={16} />}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
            <div className="text-[10px] text-violet-700 uppercase tracking-wider font-semibold">Уникальных исполнителей</div>
            <div className="text-2xl font-bold text-violet-800 tabular-nums mt-1">{kpi.uniqueViews}</div>
            <div className="text-[10px] text-violet-600 mt-0.5">Учитываются только первые открытия</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <div className="text-[10px] text-blue-700 uppercase tracking-wider font-semibold">Повторные просмотры</div>
            <div className="text-2xl font-bold text-blue-800 tabular-nums mt-1">
              {analyticsMode === 'overall' ? '542 130' : '86 270'}
            </div>
            <div className="text-[10px] text-blue-600 mt-0.5">Те же исполнители смотрят повторно</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            <div className="text-[10px] text-emerald-700 uppercase tracking-wider font-semibold">Среднее на исполнителя</div>
            <div className="text-2xl font-bold text-emerald-800 tabular-nums mt-1">
              {analyticsMode === 'overall' ? '1.73' : '1.44'}
            </div>
            <div className="text-[10px] text-emerald-600 mt-0.5">просмотра/исполнитель</div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
            <div className="text-[10px] text-amber-700 uppercase tracking-wider font-semibold">Доля уникальных</div>
            <div className="text-2xl font-bold text-amber-800 tabular-nums mt-1">
              {analyticsMode === 'overall' ? '57.8%' : '69.7%'}
            </div>
            <div className="text-[10px] text-amber-600 mt-0.5">от общего числа просмотров</div>
          </div>
        </div>
        <div className="mt-3 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[11px] text-slate-600 flex items-start gap-2">
          <ShieldCheck size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
          <span><b>Уникальные просмотры</b> — это число исполнителей, открывших сторис хотя бы один раз. Если исполнитель открыл повторно — он не считается заново. Антифрод-метрика, ближе всего к реальному охвату.</span>
        </div>
      </Card>

      {/* Funnel */}
      <Card title="Воронка: от просмотра до выхода на смену" icon={<Layers size={16} />}>
        <div className="space-y-2">
          {[
            { l: 'Просмотры', v: 284510, w: 100, c: 'bg-blue-500' },
            { l: 'Клики по ссылке', v: 38960, w: 13.7, c: 'bg-violet-500' },
            { l: 'Записались', v: 6893, w: 2.4, c: 'bg-emerald-500' },
            { l: 'Вышли на смену', v: 5175, w: 1.8, c: 'bg-amber-500' }
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-32 text-xs text-slate-600 font-medium flex-shrink-0">{s.l}</div>
              <div className="flex-1 bg-slate-100 rounded-lg overflow-hidden h-9">
                <div
                  className={`${s.c} h-full rounded-lg flex items-center pl-3 transition-all`}
                  style={{ width: `${Math.max(s.w, 12)}%` }}
                >
                  <span className="text-white text-xs font-bold tabular-nums whitespace-nowrap">{s.v.toLocaleString('ru')}</span>
                </div>
              </div>
              <div className="w-14 text-right text-sm font-semibold text-slate-700 tabular-nums flex-shrink-0">{s.w}%</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Drop-off curve — only for video stories, и только в режиме single */}
        {analyticsMode === 'single' && storyContentType === 'video' ? (
          <Card title="Кривая досмотра (drop-off)" icon={<TrendingUp size={16} />}>
            <div className="text-xs text-slate-600 mb-3">
              Сколько исполнителей оставалось в видео в каждую секунду. Резкий спад → улучшить этот момент.
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={[
                { t: '0с', v: 100 }, { t: '3с', v: 92 }, { t: '6с', v: 84 },
                { t: '9с', v: 71 }, { t: '12с', v: 63 }, { t: '20с', v: 52 },
                { t: '30с', v: 48 }, { t: '45с', v: 45 }
              ]} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="t" fontSize={10} stroke="#94A3B8" />
                <YAxis fontSize={10} stroke="#94A3B8" unit="%" />
                <Tooltip formatter={v => [`${v}%`, 'Осталось']} contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="v" stroke="#1976D2" fill="#EFF6FF" strokeWidth={2} />
                <ReferenceLine x="6с" stroke="#F97316" strokeDasharray="4 2" label={{ value: '▼ пик отсева', position: 'insideTopLeft', fontSize: 10, fill: '#F97316' }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { l: 'Досмотрели', v: '45%' },
                { l: 'Пик отсева', v: '6-9с', warn: true },
                { l: 'Replay', v: '12%' }
              ].map(m => (
                <div key={m.l} className={`rounded-lg p-2 text-center ${m.warn ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50'}`}>
                  <div className={`text-[10px] ${m.warn ? 'text-amber-600' : 'text-slate-500'} uppercase`}>{m.l}</div>
                  <div className={`text-base font-bold ${m.warn ? 'text-amber-700' : 'text-slate-800'}`}>{m.v}</div>
                </div>
              ))}
            </div>
          </Card>
        ) : analyticsMode === 'single' ? (
          <Card title="Время на сторис" icon={<Clock size={16} />}>
            <div className="text-xs text-slate-600 mb-3">
              Для фото-сторис кривая досмотра неприменима — нет таймлайна. Вместо неё показываем медиану времени просмотра.
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg p-3 text-center bg-blue-50 border border-blue-100">
                <div className="text-[10px] text-blue-600 uppercase">Медиана просмотра</div>
                <div className="text-2xl font-bold text-blue-800 tabular-nums">4.2с</div>
              </div>
              <div className="rounded-lg p-3 text-center bg-emerald-50 border border-emerald-100">
                <div className="text-[10px] text-emerald-600 uppercase">Долго смотрели (>5с)</div>
                <div className="text-2xl font-bold text-emerald-800 tabular-nums">38%</div>
              </div>
              <div className="rounded-lg p-3 text-center bg-amber-50 border border-amber-100">
                <div className="text-[10px] text-amber-600 uppercase">Свайпнули мгновенно</div>
                <div className="text-2xl font-bold text-amber-700 tabular-nums">17%</div>
              </div>
            </div>
            <div className="mt-3 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[11px] text-slate-600 flex items-start gap-2">
              <ImageIcon size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <span>Эта сторис — фото. Кривая досмотра по секундам собирается только для видео.</span>
            </div>
          </Card>
        ) : (
          // Режим overall: вместо кривой досмотра показываем топ сторис по уникальным просмотрам
          <Card title="Топ сторис по уникальным просмотрам" icon={<TrendingUp size={16} />}>
            <div className="space-y-2">
              {[
                { name: 'Инструкция по выходу на смену', uniq: 142340, color: 'bg-sky-500' },
                { name: 'Новые правила выплат', uniq: 98180, color: 'bg-violet-500' },
                { name: 'Срочные смены в Москве — х1.5', uniq: 64200, color: 'bg-orange-500' },
                { name: 'Реферальная программа +2000₽', uniq: 52410, color: 'bg-amber-500' },
                { name: 'Новые объекты в Краснодаре', uniq: 31250, color: 'bg-emerald-500' }
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-44 text-xs text-slate-700 font-medium truncate">{s.name}</div>
                  <div className="flex-1 bg-slate-100 rounded-md overflow-hidden h-6">
                    <div className={`${s.color} h-full rounded-md`} style={{ width: `${(s.uniq / 142340) * 100}%` }} />
                  </div>
                  <div className="w-20 text-right text-xs font-bold text-slate-700 tabular-nums">{s.uniq.toLocaleString('ru')}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-slate-500">Сортировка по числу уникальных исполнителей за выбранный период.</div>
          </Card>
        )}

        {/* Time-of-day heatmap */}
        <Card title="Лучшее время публикации" icon={<Clock size={16} />}>
          <div className="text-xs text-slate-600 mb-3">CTR по часу и дню. Темнее = лучше конверсия.</div>
          <table className="w-full text-[10px]">
            <thead>
              <tr>
                <th className="text-left text-slate-500 font-medium pb-1.5 w-8"></th>
                {['7:00','10:00','13:00','16:00','19:00','21:00'].map(h => (
                  <th key={h} className="text-center text-slate-500 font-medium pb-1.5 px-0.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { d: 'Пн', v: [6, 10, 9, 12, 17, 11] },
                { d: 'Вт', v: [7, 11, 10, 13, 18, 12] },
                { d: 'Ср', v: [6, 10, 9, 14, 19, 13] },
                { d: 'Чт', v: [7, 11, 10, 13, 20, 14] },
                { d: 'Пт', v: [8, 12, 11, 12, 22, 15] },
                { d: 'Сб', v: [10, 13, 12, 10, 15, 10] },
                { d: 'Вс', v: [9, 11, 10, 9, 13, 9] }
              ].map(row => (
                <tr key={row.d}>
                  <td className="text-slate-600 font-semibold pr-1 py-0.5">{row.d}</td>
                  {row.v.map((val, i) => {
                    const intensity = val / 22;
                    const bg = `rgba(25,118,210,${0.07 + intensity * 0.9})`;
                    const tc = intensity > 0.5 ? 'white' : '#475569';
                    return (
                      <td key={i} className="px-0.5 py-0.5">
                        <div className="rounded text-center font-bold py-1.5 tabular-nums" style={{ background: bg, color: tc }}>{val}%</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-[11px] text-blue-700 bg-blue-50 border border-blue-100 rounded-lg p-2">
            🏆 Пятница 19:00 — CTR 22%, лучшее окно для срочных сторис
          </div>
        </Card>

        {/* Cities */}
        <Card
          title="Просмотры и записи по городам"
          icon={<MapPin size={16} />}
          action={
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-500">Объединять с областью</span>
              <Toggle on={true} onChange={() => {}} />
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cityData.map(c => ({ ...c, totalViews: c.views + c.region }))} layout="vertical" margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} />
              <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={11} width={110} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
                      <div className="font-bold text-slate-800 mb-1.5">{d.name} <span className="text-slate-400 font-normal">+ {d.regionName}</span></div>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-600">Город:</span>
                          <span className="font-semibold tabular-nums">{d.views.toLocaleString('ru')}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-600">Область:</span>
                          <span className="font-semibold tabular-nums text-slate-500">{d.region.toLocaleString('ru')}</span>
                        </div>
                        <div className="flex justify-between gap-4 pt-1 border-t border-slate-100">
                          <span className="text-slate-700 font-semibold">Всего:</span>
                          <span className="font-bold tabular-nums text-blue-700">{(d.views + d.region).toLocaleString('ru')}</span>
                        </div>
                        <div className="flex justify-between gap-4 mt-1.5">
                          <span className="text-emerald-700">Записей:</span>
                          <span className="font-semibold tabular-nums text-emerald-700">{d.bookings}</span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="views" fill="#1976D2" name="Город" stackId="city" radius={[0, 0, 0, 0]} />
              <Bar dataKey="region" fill="#90CAF9" name="Область" stackId="city" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-600 rounded-sm" /> Город</div>
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-300 rounded-sm" /> Область (наведите на столбец — раскладка)</div>
          </div>
        </Card>

        {/* Time series */}
        <Card title="Динамика по дням" icon={<TrendingUp size={16} />}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1976D2" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#1976D2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7E57C2" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#7E57C2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#1976D2" fill="url(#g1)" strokeWidth={2} name="Просмотры" />
              <Area type="monotone" dataKey="clicks" stroke="#7E57C2" fill="url(#g2)" strokeWidth={2} name="Клики" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Reactions summary */}
        <Card title="Реакции и вовлечение" icon={<Smile size={16} />}>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { e: '❤️', c: 1842, l: 'нравится' },
              { e: '🔥', c: 924, l: 'огонь' },
              { e: '👍', c: 612, l: 'согласен' }
            ].map(r => (
              <div key={r.e} className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-3xl mb-1">{r.e}</div>
                <div className="text-lg font-bold tabular-nums">{r.c.toLocaleString('ru')}</div>
                <div className="text-[11px] text-slate-500">{r.l}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-500">
            Реакции — самый лёгкий способ для исполнителя дать обратную связь. Высокий ❤️ = контент попал в боль, высокий 🔥 = акция «зашла».
          </div>
        </Card>
      </div>

      {/* Comparison */}
      <Card title="Сравнение всех сторис" icon={<Layers size={16} />}>
        <div className="overflow-x-auto -mx-4">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left font-medium px-4 py-2">Сторис</th>
                <th className="text-right font-medium px-4 py-2">Просмотры</th>
                <th className="text-right font-medium px-4 py-2">Уникальные</th>
                <th className="text-right font-medium px-4 py-2">CTR</th>
                <th className="text-right font-medium px-4 py-2">Записи</th>
                <th className="text-right font-medium px-4 py-2">Стоимость записи</th>
                <th className="text-right font-medium px-4 py-2">ROI</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { t: 'Срочные смены в Москве — х1.5', v: 8420, uniq: 7240, ctr: 14.2, b: 312, cost: 84, roi: 4.8 },
                { t: 'Реферальная программа +500₽', v: 6510, uniq: 5980, ctr: 18.7, b: 198, cost: 62, roi: 6.1 },
                { t: 'Новые правила выплат', v: 12180, uniq: 9210, ctr: 5.4, b: 156, cost: 95, roi: 3.1 },
                { t: 'Инструкция по выходу на смену', v: 21340, uniq: 14920, ctr: 8.1, b: 145, cost: 110, roi: 2.4 }
              ].map((r, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-medium text-slate-800">{r.t}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{r.v.toLocaleString('ru')}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-violet-700 font-semibold">{r.uniq.toLocaleString('ru')}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{r.ctr ? `${r.ctr}%` : '—'}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{r.b || '—'}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{r.cost ? `${r.cost} ₽` : '—'}</td>
                  <td className="px-4 py-2.5 text-right">
                    {r.roi ? (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        r.roi > 4 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>×{r.roi}</span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Individual users tracking — только в режиме по конкретной сторис */}
      {analyticsMode === 'single' && <UsersTable />}
    </div>
  );
}

// ============ Individual users analytics ============
function UsersTable() {
  // Фильтр: все | уникальные первые | повторные | не увидели | реакция
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const sampleUsers = [
    { id: 10042, fio: 'Петров А.С.', phone: '+7 916 234-12-89', city: 'Москва', cat: 'Курьер', shifts: 47, rating: 9.6, seen: true, viewTime: 8.2, views: 1, reaction: '🔥', date: '03.05 14:22' },
    { id: 10043, fio: 'Иванов М.Д.', phone: '+7 925 117-04-22', city: 'Москва', cat: 'Склад', shifts: 12, rating: 9.0, seen: true, viewTime: 4.5, views: 1, reaction: '', date: '03.05 14:48' },
    { id: 10044, fio: 'Сидорова К.В.', phone: '+7 999 882-65-13', city: 'Краснодар', cat: 'Уборка', shifts: 89, rating: 9.8, seen: true, viewTime: 11.1, views: 3, reaction: '❤️', date: '03.05 15:03' },
    { id: 10045, fio: 'Кузнецов И.А.', phone: '+7 905 443-21-00', city: 'СПб', cat: 'Стройка', shifts: 3, rating: 8.4, seen: true, viewTime: 2.1, views: 1, reaction: '', date: '03.05 15:10' },
    { id: 10046, fio: 'Лебедев Р.П.', phone: '+7 911 765-43-21', city: 'СПб', cat: 'Курьер', shifts: 124, rating: 10.0, seen: true, viewTime: 9.8, views: 2, reaction: '👍', date: '03.05 15:34' },
    { id: 10047, fio: 'Морозов В.Е.', phone: '+7 967 112-33-44', city: 'Москва', cat: 'Производство', shifts: 28, rating: 9.2, seen: false, viewTime: 0, views: 0, reaction: '', date: '—' },
    { id: 10048, fio: 'Алексеев Д.К.', phone: '+7 903 998-12-77', city: 'Краснодар', cat: 'Склад', shifts: 67, rating: 9.4, seen: true, viewTime: 6.3, views: 2, reaction: '🔥', date: '03.05 16:01' },
    { id: 10049, fio: 'Соколова Н.Ю.', phone: '+7 962 334-22-11', city: 'Екатеринбург', cat: 'Уборка', shifts: 41, rating: 9.6, seen: true, viewTime: 7.7, views: 1, reaction: '', date: '04.05 09:15' },
    { id: 10050, fio: 'Никитин С.А.', phone: '+7 985 222-43-87', city: 'Москва', cat: 'Курьер', shifts: 8, rating: 8.6, seen: true, viewTime: 3.4, views: 1, reaction: '', date: '04.05 10:22' },
    { id: 10051, fio: 'Волкова Е.И.', phone: '+7 926 100-99-88', city: 'Казань', cat: 'Склад', shifts: 56, rating: 9.8, seen: true, viewTime: 10.2, views: 4, reaction: '❤️', date: '04.05 11:48' }
  ];

  let filtered = sampleUsers;
  if (filter === 'unique') filtered = filtered.filter(u => u.seen);
  if (filter === 'repeat') filtered = filtered.filter(u => u.views > 1);
  if (filter === 'not_seen') filtered = filtered.filter(u => !u.seen);
  if (filter === 'reacted') filtered = filtered.filter(u => u.reaction);
  if (search) filtered = filtered.filter(u =>
    u.fio.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search) ||
    String(u.id).includes(search)
  );

  const counts = {
    all: sampleUsers.length,
    unique: sampleUsers.filter(u => u.seen).length,
    repeat: sampleUsers.filter(u => u.views > 1).length,
    not_seen: sampleUsers.filter(u => !u.seen).length,
    reacted: sampleUsers.filter(u => u.reaction).length
  };

  const filters = [
    { v: 'all', l: 'Все', c: counts.all, color: 'slate' },
    { v: 'unique', l: 'Уникальные просмотры', c: counts.unique, color: 'violet' },
    { v: 'repeat', l: 'Повторные просмотры', c: counts.repeat, color: 'blue' },
    { v: 'not_seen', l: 'Не увидели', c: counts.not_seen, color: 'rose' },
    { v: 'reacted', l: 'Поставили реакцию', c: counts.reacted, color: 'emerald' }
  ];

  return (
    <Card
      title="Подробно по исполнителям"
      icon={<Users size={16} />}
      action={
        <button
          onClick={() => alert('Скачивается users_export.xlsx — содержит 4 листа: Сводка, Все исполнители, Уникальные, Повторные, Не увидели')}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-semibold hover:bg-emerald-700 flex items-center gap-1.5"
        >
          <Download size={12} /> Excel-выгрузка
        </button>
      }
    >
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {filters.map(f => (
          <button
            key={f.v}
            onClick={() => setFilter(f.v)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition flex items-center gap-1.5 ${
              filter === f.v
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {f.l}
            <span className={`px-1.5 rounded-full text-[10px] font-bold tabular-nums ${
              filter === f.v ? 'bg-white/20' : 'bg-slate-100'
            }`}>{f.c}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по ФИО, телефону или ID..."
          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-5">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="text-[11px] text-slate-500 uppercase tracking-wider bg-slate-50">
              <th className="text-left font-medium px-3 py-2">ID</th>
              <th className="text-left font-medium px-3 py-2">ФИО</th>
              <th className="text-left font-medium px-3 py-2">Телефон</th>
              <th className="text-left font-medium px-3 py-2">Город</th>
              <th className="text-right font-medium px-3 py-2">Смен</th>
              <th className="text-right font-medium px-3 py-2">★</th>
              <th className="text-center font-medium px-3 py-2">1-й просмотр</th>
              <th className="text-center font-medium px-3 py-2">Всего открытий</th>
              <th className="text-left font-medium px-3 py-2">Статус</th>
              <th className="text-center font-medium px-3 py-2">Реакция</th>
              <th className="text-left font-medium px-3 py-2">Последнее открытие</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                <td className="px-3 py-2 text-slate-500 tabular-nums">{u.id}</td>
                <td className="px-3 py-2 font-medium text-slate-800">{u.fio}</td>
                <td className="px-3 py-2 text-slate-600 tabular-nums">{u.phone}</td>
                <td className="px-3 py-2 text-slate-600">{u.city}</td>
                <td className="px-3 py-2 text-right tabular-nums text-slate-600">{u.shifts}</td>
                <td className="px-3 py-2 text-right tabular-nums text-slate-600 flex items-center justify-end gap-0.5">
                  <Star size={11} className="text-amber-500 fill-amber-500" />{u.rating}
                </td>
                <td className="px-3 py-2 text-center">
                  {u.seen ? (
                    <span className="text-xs text-emerald-700">✓ {u.viewTime}с</span>
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-center">
                  {u.views > 0 ? (
                    <span className={`text-xs font-semibold tabular-nums ${u.views > 1 ? 'text-blue-700' : 'text-violet-700'}`}>{u.views}</span>
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {u.views > 1 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700">Повторный</span>
                  ) : u.seen ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-violet-100 text-violet-700">Уникальный</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500">Не увидел</span>
                  )}
                </td>
                <td className="px-3 py-2 text-center text-base">{u.reaction || <span className="text-slate-300 text-xs">—</span>}</td>
                <td className="px-3 py-2 text-xs text-slate-500 tabular-nums">{u.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 flex items-start gap-2">
          <UserCheck size={16} className="text-violet-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-violet-900 mb-0.5">«Уникальные просмотры» — основная метрика охвата</div>
            <div className="text-[11px] text-violet-800 leading-snug">
              Каждый исполнитель считается только один раз. Если он открыл сторис повторно — он не появится повторно в этой выборке, но попадёт в фильтр «Повторные просмотры».
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2">
          <FileSpreadsheet size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-blue-900 mb-0.5">Excel-выгрузка</div>
            <div className="text-[11px] text-blue-800 leading-snug">
              Сегменты (уникальные / повторные / не увидели / реакции) — отдельными листами, со сводкой и формулами. Готова для CRM, обзвона или Excel-аналитики.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ============ List Tab ============
function ListView({ showToast }) {
  const [search, setSearch] = useState('');
  const [storyOrder, setStoryOrder] = useState([1, 2, 3, 4, 5, 6]); // story IDs in display order
  // Управление порядком и ряд кружочков скрыты по умолчанию — раскрываются по клику
  const [showOrderControls, setShowOrderControls] = useState(false);

  const statusMeta = {
    active: { l: 'Активна', c: 'bg-emerald-100 text-emerald-700' },
    scheduled: { l: 'Запланирована', c: 'bg-blue-100 text-blue-700' },
    archived: { l: 'В архиве', c: 'bg-slate-100 text-slate-600' },
    draft: { l: 'Черновик', c: 'bg-amber-100 text-amber-700' }
  };

  const activeStories = storyList.filter(s => s.status === 'active' || s.status === 'scheduled');
  const orderedActive = storyOrder
    .map(id => activeStories.find(s => s.id === id))
    .filter(Boolean);

  const moveUp = (id) => {
    const idx = storyOrder.indexOf(id);
    if (idx <= 0) return;
    const newOrder = [...storyOrder];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    setStoryOrder(newOrder);
    showToast('Порядок обновлён');
  };
  const moveDown = (id) => {
    const idx = storyOrder.indexOf(id);
    if (idx >= storyOrder.length - 1) return;
    const newOrder = [...storyOrder];
    [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
    setStoryOrder(newOrder);
    showToast('Порядок обновлён');
  };
  const pinFirst = (id) => {
    setStoryOrder([id, ...storyOrder.filter(x => x !== id)]);
    showToast('Сторис закреплена первой');
  };

  const filtered = storyList.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  // Mock: story 1 is urgent, story 2 is viewed (faded), others normal
  const circleState = (s) => {
    if (s.id === 1) return 'urgent';
    if (s.id === 2 || s.id === 3) return 'viewed';
    return 'normal';
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">

      {/* Toggle: показать/скрыть управление кружочками и порядком */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowOrderControls(v => !v)}
          className="w-full px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-2 text-slate-700">
            <GripVertical size={14} className="text-slate-400" />
            <span className="font-semibold text-sm">Ряд кружочков и управление порядком</span>
            <span className="text-[11px] text-slate-500">— раскрыть</span>
          </div>
          <ChevronDown size={16} className={`text-slate-400 transition ${showOrderControls ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showOrderControls && (
        <>
      {/* Circle row preview — "as seen on phone home screen" */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700">
            <Smartphone size={14} className="text-slate-400" />
            <span className="font-semibold text-sm">Ряд кружочков в приложении (ручное управление)</span>
          </div>
          <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Так выглядит на главном экране</span>
        </div>
        <div className="px-5 py-4 bg-slate-900">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {orderedActive.map((s, idx) => {
              const state = circleState(s);
              return (
                <div key={s.id} className="flex flex-col items-center flex-shrink-0 group relative">
                  <div className={`relative rounded-full p-[2.5px] transition-all ${
                    state === 'urgent'
                      ? 'bg-gradient-to-br from-red-500 to-orange-500'
                      : state === 'viewed'
                      ? 'bg-slate-600'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  } ${state === 'viewed' ? 'opacity-50' : ''}`}
                    style={state === 'urgent' ? { animation: 'urgentPulse 1.5s infinite' } : {}}>
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-900">
                      <div className={`w-full h-full ${s.cover} ${state === 'viewed' ? 'grayscale' : ''}`} />
                    </div>
                    {state === 'urgent' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                        <Zap size={9} className="text-white" />
                      </div>
                    )}
                    {state === 'viewed' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                        <Check size={8} className="text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white text-[10px] font-bold">#{idx + 1}</span>
                    </div>
                  </div>
                  <div className={`text-[9px] mt-1 w-16 text-center truncate ${state === 'viewed' ? 'text-slate-500' : 'text-slate-200'}`}>
                    {state === 'urgent' ? '🔥 Срочно' : s.title.slice(0, 12) + '…'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-500 to-orange-500" /> Срочная (пульсирует)</div>
            <div className="flex items-center gap-1.5 text-slate-400 opacity-50"><span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Просмотрена (угасшая)</div>
            <div className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" /> Обычная активная</div>
          </div>
        </div>
      </div>

      {/* Order management */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700">
            <GripVertical size={14} className="text-slate-400" />
            <span className="font-semibold text-sm">Управление порядком</span>
          </div>
          <div className="text-[11px] text-slate-500">Стрелки — ручная перестановка · Закрепить — всегда первым</div>
        </div>
        <div className="divide-y divide-slate-100">
          {orderedActive.map((s, idx) => {
            const state = circleState(s);
            return (
              <div key={s.id} className={`flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition ${state === 'viewed' ? 'opacity-60' : ''}`}>
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                <div className={`w-8 h-11 rounded-md ${s.cover} flex-shrink-0 relative`}>
                  {state === 'urgent' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <Zap size={8} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">{s.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${statusMeta[s.status].c}`}>
                      {statusMeta[s.status].l}
                    </span>
                    {state === 'urgent' && <span className="text-[10px] font-bold text-red-600 flex items-center gap-0.5"><Zap size={9} />Срочная</span>}
                    {state === 'viewed' && <span className="text-[10px] text-slate-400">Угасшая (просмотрена {Math.floor(Math.random() * 80 + 70)}%)</span>}
                    <span className="text-[10px] text-slate-500">{s.city}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => pinFirst(s.id)}
                    title="Закрепить первым"
                    className="p-1.5 rounded hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition"
                  >
                    <Star size={13} />
                  </button>
                  <button
                    onClick={() => moveUp(s.id)}
                    disabled={idx === 0}
                    className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                  >
                    <ChevronRight size={14} className="rotate-[-90deg]" />
                  </button>
                  <button
                    onClick={() => moveDown(s.id)}
                    disabled={idx >= orderedActive.length - 1}
                    className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                  >
                    <ChevronRight size={14} className="rotate-90" />
                  </button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <IconBtn icon={<Edit3 size={13} />} onClick={() => showToast(`Редактирование: ${s.title}`)} />
                  <IconBtn icon={<Copy size={13} />} onClick={() => showToast('Сторис продублирована')} />
                  <IconBtn icon={<Archive size={13} />} onClick={() => showToast('Перенесено в архив')} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
        </>
      )}

      {/* Full story list (all statuses) */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        {['Все', 'Активные', 'Запланированные', 'Черновики', 'Архив'].map((f, i) => (
          <button
            key={i}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
              i === 0 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left font-medium px-4 py-3">Сторис</th>
                <th className="text-left font-medium px-4 py-3">Статус</th>
                <th className="text-left font-medium px-4 py-3">Город</th>
                <th className="text-right font-medium px-4 py-3">Просмотры</th>
                <th className="text-right font-medium px-4 py-3">CTR</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className={`border-t border-slate-100 hover:bg-slate-50/50 ${s.status === 'archived' ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-12 rounded-md ${s.cover} flex-shrink-0 relative`}>
                        {s.id === 1 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <Zap size={8} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800 block">{s.title}</span>
                        {s.id === 1 && <span className="text-[10px] font-bold text-red-600 flex items-center gap-0.5"><Zap size={9} />Срочная</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusMeta[s.status].c}`}>
                      {statusMeta[s.status].l}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{s.city}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{s.views.toLocaleString('ru')}</td>
                  <td className="px-4 py-3 text-right">{s.ctr}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <IconBtn icon={<Edit3 size={14} />} onClick={() => showToast(`Редактирование: ${s.title}`)} />
                      <IconBtn icon={<Copy size={14} />} onClick={() => showToast('Сторис продублирована')} />
                      <IconBtn icon={<Archive size={14} />} onClick={() => showToast('Перенесено в архив')} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ Templates Tab ============
function TemplatesView({ showToast, onUseTemplate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { v: 'all', l: 'Все', count: 7 },
    { v: 'urgent', l: 'Срочные смены', count: 2, icon: '🔥' },
    { v: 'promo', l: 'Акции', count: 3, icon: '🎁' },
    { v: 'onboarding', l: 'Онбординг', count: 2, icon: '📚' }
  ];

  const templates = [
    {
      id: 1, cat: 'urgent', name: 'Срочные смены — повышенная ставка',
      desc: 'Горящие вакансии с доплатой от РР. Кнопка записи.',
      cover: 'bg-gradient-to-br from-orange-500 to-red-600', icon: '🔥',
      title: 'Срочно нужны люди в Москве!',
      body: 'У ВкусВилла на складе в Хамовниках есть смены сегодня и завтра. Ставка 2500 ₽ + 500 ₽ от РР. Нажми «Записаться».',
      hasContact: true, hasCopay: true,
      uses: 47
    },
    {
      id: 2, cat: 'urgent', name: 'Завтрашние смены (за день)',
      desc: 'За сутки до даты — список открытых смен',
      cover: 'bg-gradient-to-br from-amber-500 to-orange-600', icon: '⏰',
      title: 'Смены на завтра',
      body: 'Завтра у партнёров 12 открытых смен. Ставки от 2200 ₽. Локации в описании.',
      hasContact: true, hasCopay: false,
      uses: 31
    },
    {
      id: 5, cat: 'promo', name: 'Реферальная программа',
      desc: 'Приведи друга — +2000 ₽',
      cover: 'bg-gradient-to-br from-emerald-500 to-teal-600', icon: '🎁',
      title: 'Приведи друга — получи 2000 ₽',
      body: 'Поделись приложением с друзьями. За каждого, кто выполнит первую смену, начислим 2000 ₽ на карту.',
      hasContact: false, hasCopay: false,
      uses: 24
    },
    {
      id: 6, cat: 'promo', name: 'Бонус за серию смен',
      desc: 'Геймификация для активных',
      cover: 'bg-gradient-to-br from-fuchsia-500 to-pink-600', icon: '🏆',
      title: '5 смен — бонус 1000 ₽',
      body: 'Сделайте 5 смен на этой неделе — получите 1000 ₽ бонусом сверху.',
      hasContact: false, hasCopay: true,
      uses: 19
    },
    {
      id: 7, cat: 'promo', name: 'Возврат активной аудитории',
      desc: 'Для тех, кто давно не заходил',
      cover: 'bg-gradient-to-br from-cyan-500 to-blue-600', icon: '👋',
      title: 'Соскучились по сменам?',
      body: 'У наших партнёров есть смены со ставкой от 2500 ₽ + бонус 300 ₽ за возврат к работе.',
      hasContact: true, hasCopay: true,
      uses: 8
    },
    {
      id: 8, cat: 'onboarding', name: 'Первая смена — инструкция',
      desc: 'Для новичков — что делать в день смены',
      cover: 'bg-gradient-to-br from-blue-500 to-indigo-600', icon: '📚',
      title: 'Как пройдёт ваша первая смена',
      body: 'Подойдите за 15 минут до начала. Возьмите паспорт. Менеджер встретит у входа и покажет, что делать.',
      hasContact: true, hasCopay: false,
      uses: 56
    },
    {
      id: 9, cat: 'onboarding', name: 'Что взять с собой',
      desc: 'Чек-лист перед сменой',
      cover: 'bg-gradient-to-br from-slate-600 to-slate-800', icon: '✅',
      title: 'Чек-лист на смену',
      body: 'Паспорт, СНИЛС, ИНН, рабочая обувь, удобная одежда. Зарядка для телефона — на всякий случай.',
      hasContact: false, hasCopay: false,
      uses: 41
    }
  ];

  const filtered = activeCategory === 'all' ? templates : templates.filter(t => t.cat === activeCategory);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Шаблоны сторис</h3>
          <p className="text-sm text-slate-500">Готовые конструкции — заголовки, описания, кнопки. Загружаются в редактор одним кликом, дальше правите под себя.</p>
        </div>
        <button
          onClick={() => showToast('Откроется окно загрузки .json или сохранения текущей сторис как шаблона')}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-700 transition"
        >
          <Upload size={14} /> Загрузить свой шаблон
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {categories.map(c => (
          <button
            key={c.v}
            onClick={() => setActiveCategory(c.v)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition flex items-center gap-1.5 ${
              activeCategory === c.v
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {c.icon && <span>{c.icon}</span>}{c.l}
            <span className={`px-1.5 rounded-full text-[10px] font-bold tabular-nums ${
              activeCategory === c.v ? 'bg-white/20' : 'bg-slate-100'
            }`}>{c.count}</span>
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(t => (
          <div
            key={t.id}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition flex flex-col"
          >
            {/* Mini phone-style preview */}
            <div className={`${t.cover} aspect-[4/5] relative flex flex-col p-3 overflow-hidden`}>
              {/* Top row: РР badge + icon */}
              <div className="flex items-start justify-between gap-2 mb-auto">
                <div className="flex items-center gap-1 flex-shrink min-w-0">
                  <div className="w-5 h-5 rounded-full bg-white/95 flex items-center justify-center text-[9px] font-bold text-slate-700 flex-shrink-0">РР</div>
                  <div className="text-white text-[10px] font-medium drop-shadow truncate">Рабочие руки</div>
                </div>
                <div className="text-2xl flex-shrink-0 leading-none">{t.icon}</div>
              </div>
              {/* Bottom: title + badges */}
              <div className="space-y-1.5">
                <div className="text-white text-xs font-bold leading-tight drop-shadow line-clamp-2">{t.title}</div>
                {(t.hasContact || t.hasCopay) && (
                  <div className="flex gap-1 flex-wrap">
                    {t.hasContact && <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">📞 связаться</span>}
                    {t.hasCopay && <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full">💰 доплата</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Body preview */}
            <div className="p-3 flex-1 flex flex-col">
              <div className="text-sm font-semibold text-slate-800 mb-1">{t.name}</div>
              <div className="text-[11px] text-slate-500 mb-2 leading-snug">{t.desc}</div>
              <div className="text-[11px] bg-slate-50 rounded-md p-2 leading-relaxed text-slate-700 flex-1">
                {t.body}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-[10px] text-slate-400">Использовали {t.uses} раз</div>
                <button
                  onClick={() => {
                    if (onUseTemplate) onUseTemplate(t);
                    else showToast(`Шаблон «${t.name}» загружен в редактор.`);
                  }}
                  className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-600 hover:text-white transition"
                >
                  Использовать
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add template */}
        <div
          onClick={() => showToast('Можно сохранить текущую сторис как шаблон или загрузить .json файл')}
          className="cursor-pointer bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 hover:from-blue-50 hover:to-indigo-50 transition flex flex-col items-center justify-center p-6 text-slate-500 hover:text-blue-600 min-h-[280px]"
        >
          <ImagePlus size={32} className="mb-2" />
          <div className="font-semibold text-sm">Создать свой шаблон</div>
          <div className="text-xs text-center mt-1 leading-snug">Загрузите .json или сохраните текущую сторис как шаблон</div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Sparkles size={14} /> Как работают шаблоны
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-blue-800">
          <div>
            <div className="font-semibold mb-0.5">1. Выбираете шаблон</div>
            <div className="text-blue-700">Все поля — заголовок, описание, кнопки, реакции — заполняются автоматически</div>
          </div>
          <div>
            <div className="font-semibold mb-0.5">2. Правите под себя</div>
            <div className="text-blue-700">Меняете текст, добавляете картинку, настраиваете таргетинг</div>
          </div>
          <div>
            <div className="font-semibold mb-0.5">3. Публикуете</div>
            <div className="text-blue-700">Сторис уходит в приложение исполнителям, попадающим под таргетинг</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Reusable components ============
function Card({ title, icon, action, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="text-slate-400">{icon}</span>
          <span className="font-semibold text-sm">{title}</span>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-xs font-medium text-slate-600">{label}</label>
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative w-10 h-6 rounded-full transition ${on ? 'bg-blue-600' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition shadow ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
  );
}

function KPICard({ label, value, delta, icon, color, hint }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600'
  };
  const positive = delta > 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4" title={hint || ''}>
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>{icon}</div>
        <div className={`text-xs font-semibold flex items-center gap-0.5 ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(delta)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-800 tabular-nums">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
        {label}
        {hint && <span className="text-slate-300" title={hint}>ⓘ</span>}
      </div>
    </div>
  );
}

function IconBtn({ icon, onClick }) {
  return (
    <button onClick={onClick} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition">
      {icon}
    </button>
  );
}

// ============ Root ============
// ============ Notifications & Settings panels ============
function NotificationsPanel({ onClose }) {
  const items = [
    { id: 1, type: 'success', icon: <CheckCircle2 size={14} className="text-emerald-600" />, title: '5 новых записей через сторис', body: '«Срочные смены в Москве — х1.5» — за последний час', time: '12 мин назад', unread: true },
    { id: 2, type: 'info', icon: <ClipboardCheck size={14} className="text-amber-600" />, title: 'Новая сторис на верификации', body: '«Срочно нужны курьеры в Москве» от Анны Соколовой — проверьте, пожалуйста', time: '1ч назад', unread: true },
    { id: 3, type: 'warning', icon: <AlertTriangle size={14} className="text-amber-600" />, title: 'Битая ссылка снята автоматически', body: 'Сторис «Реферальная программа» переведена в архив — 2 ссылки 404', time: '3ч назад', unread: true },
    { id: 4, type: 'info', icon: <UserPlus size={14} className="text-blue-600" />, title: 'Анна Соколова опубликовала сторис', body: '«Бонус за выходные смены» — охват ~3200', time: 'вчера', unread: false },
    { id: 5, type: 'success', icon: <Sparkles size={14} className="text-blue-600" />, title: 'A/B-тест завершён — победил вариант B', body: 'CTR 18.7% против 14.2%. Применили автоматически.', time: 'вчера', unread: false }
  ];
  return (
    <div className="absolute right-0 top-full mt-2 w-[360px] bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden text-slate-800">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="font-bold text-sm flex items-center gap-2">
          <Bell size={14} /> Уведомления
          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">3</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-400">
          <X size={14} />
        </button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {items.map(it => (
          <div
            key={it.id}
            className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition ${it.unread ? 'bg-blue-50/30' : ''}`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">{it.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 leading-snug flex items-start gap-2">
                  {it.title}
                  {it.unread && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{it.body}</div>
                <div className="text-[10px] text-slate-400 mt-1">{it.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-slate-100 flex justify-between items-center bg-slate-50">
        <button className="text-[11px] text-slate-600 hover:text-slate-800 font-medium">Отметить всё прочитанным</button>
        <button className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold">Все уведомления →</button>
      </div>
    </div>
  );
}

function SettingsPanel({ onClose }) {
  const sections = [
    {
      title: 'Уведомления',
      icon: <Bell size={14} className="text-blue-600" />,
      items: [
        { l: 'Push в браузер', d: 'Когда сторис собирает >100 записей или >100 ответов', toggle: true, on: true },
        { l: 'Email-сводки', d: 'Еженедельный отчёт по понедельникам в 09:00', toggle: true, on: true },
        { l: 'Telegram-бот @rabochie_ruki_mkt_bot', d: 'Подключён к каналу маркетинга', toggle: true, on: true },
        { l: 'Slack #marketing', d: 'Не подключён', toggle: true, on: false }
      ]
    },
    {
      title: 'Часовой пояс',
      icon: <Globe size={14} className="text-emerald-600" />,
      items: [
        { l: 'Москва (UTC+3)', d: 'Используется во всех расписаниях и аналитике', value: 'Изменить' }
      ]
    },
    {
      title: 'Бренд',
      icon: <Sparkles size={14} className="text-violet-600" />,
      items: [
        { l: 'Логотип в превью', d: 'Загружен — РР (синий)', value: 'Заменить' },
        { l: 'Корпоративный синий', d: '#1976D2 — используется в кнопках', value: 'Изменить' },
        { l: 'Шрифт', d: 'Системный (по умолчанию)', value: 'Изменить' }
      ]
    },
    {
      title: 'Интеграции',
      icon: <Boxes size={14} className="text-amber-600" />,
      items: [
        { l: 'Подключение к ERP', d: 'Активно · база исполнителей и партнёров', status: 'ok' },
        { l: 'Push-сервис (FCM/APNs)', d: 'Активно · доставка ~96%', status: 'ok' },
        { l: 'Звонки колл-центра', d: 'Не подключён · для обзвона невалидных номеров из загрузок', status: 'off' }
      ]
    },
    {
      title: 'Доступы и роли',
      icon: <Users size={14} className="text-rose-600" />,
      items: [
        { l: 'Маркетологи (5)', d: 'Создание и публикация сторис', value: 'Управлять' },
        { l: 'Контент-редакторы (2)', d: 'Только черновики, без публикации', value: 'Управлять' },
        { l: 'Аналитики (3)', d: 'Только просмотр отчётов', value: 'Управлять' }
      ]
    },
    {
      title: 'API ключи',
      icon: <Code size={14} className="text-slate-600" />,
      items: [
        { l: 'Ключ для интеграции с ERP', d: 'Создан 12.04.2026 · последняя активность 7 минут назад', value: 'Скрыть' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden text-slate-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-2.5">
            <Settings size={18} className="text-slate-700" />
            <div>
              <div className="font-bold text-base">Настройки</div>
              <div className="text-xs text-slate-500">Конфигурация рабочего пространства · Мария Куликова</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {sections.map((s, si) => (
            <div key={si}>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                {s.icon}{s.title}
              </div>
              <div className="bg-slate-50 rounded-lg divide-y divide-slate-200">
                {s.items.map((it, ii) => (
                  <div key={ii} className="px-3 py-2.5 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800">{it.l}</div>
                      <div className="text-[11px] text-slate-500">{it.d}</div>
                    </div>
                    {it.toggle ? (
                      <Toggle on={it.on} onChange={() => {}} />
                    ) : it.status ? (
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                        it.status === 'ok' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                      }`}>{it.status === 'ok' ? '● Работает' : '○ Выключено'}</span>
                    ) : (
                      <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 hover:bg-blue-50 rounded">{it.value}</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Отмена</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Сохранить изменения</button>
        </div>
      </div>
    </div>
  );
}

// ============ Add-story choice modal ============
// Открывается над основной СРМ при нажатии «Добавить историю».
// Предлагает: выбрать шаблон или создать с нуля.
function AddChoiceModal({ onClose, onPickNew, onPickTemplate, onPickDraft, lastDraft }) {
  const [stage, setStage] = useState('choice'); // 'choice' | 'templates'

  const popularTemplates = [
    { id: 1, cat: 'urgent', name: 'Срочные смены — повышенная ставка', desc: 'Горящие вакансии с доплатой. Кнопка записи.', cover: 'bg-gradient-to-br from-orange-500 to-red-600', icon: '🔥', title: 'Срочно нужны люди в Москве!', body: 'У ВкусВилла на складе в Хамовниках есть смены сегодня и завтра. Ставка 2500 ₽ + 500 ₽ от РР. Нажми «Записаться».', hasContact: true, hasCopay: true, uses: 47 },
    { id: 2, cat: 'urgent', name: 'Завтрашние смены (за день)', desc: 'За сутки до даты — список открытых смен', cover: 'bg-gradient-to-br from-amber-500 to-orange-600', icon: '⏰', title: 'Смены на завтра', body: 'Завтра у партнёров 12 открытых смен. Ставки от 2200 ₽. Локации в описании.', hasContact: true, hasCopay: false, uses: 31 },
    { id: 5, cat: 'promo', name: 'Реферальная программа', desc: 'Приведи друга — +2000 ₽', cover: 'bg-gradient-to-br from-emerald-500 to-teal-600', icon: '🎁', title: 'Приведи друга — получи 2000 ₽', body: 'Поделись приложением с друзьями. За каждого, кто выполнит первую смену, начислим 2000 ₽ на карту.', hasContact: false, hasCopay: false, uses: 24 },
    { id: 6, cat: 'promo', name: 'Бонус за серию смен', desc: 'Геймификация для активных', cover: 'bg-gradient-to-br from-fuchsia-500 to-pink-600', icon: '🏆', title: '5 смен — бонус 1000 ₽', body: 'Сделайте 5 смен на этой неделе — получите 1000 ₽ бонусом сверху.', hasContact: false, hasCopay: true, uses: 19 },
    { id: 8, cat: 'onboarding', name: 'Первая смена — инструкция', desc: 'Для новичков — что делать в день смены', cover: 'bg-gradient-to-br from-blue-500 to-indigo-600', icon: '📚', title: 'Как пройдёт ваша первая смена', body: 'Подойдите за 15 минут до начала. Возьмите паспорт. Менеджер встретит у входа и покажет, что делать.', hasContact: true, hasCopay: false, uses: 56 },
    { id: 9, cat: 'onboarding', name: 'Что взять с собой', desc: 'Чек-лист перед сменой', cover: 'bg-gradient-to-br from-slate-600 to-slate-800', icon: '✅', title: 'Чек-лист на смену', body: 'Паспорт, СНИЛС, ИНН, рабочая обувь, удобная одежда. Зарядка для телефона — на всякий случай.', hasContact: false, hasCopay: false, uses: 41 }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full my-8 overflow-hidden text-slate-800"
        style={{ maxWidth: stage === 'choice' ? 560 : 920 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header — оформлен как в текущей СРМ */}
        <div className="px-6 py-4 bg-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {stage === 'templates' && (
              <button onClick={() => setStage('choice')} className="p-1 hover:bg-white/15 rounded-lg" title="Назад">
                <ChevronRight size={16} className="rotate-180" />
              </button>
            )}
            <div className="font-bold text-base">{stage === 'choice' ? 'Добавление истории' : 'Выбор шаблона'}</div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/15 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {stage === 'choice' && (
          <div className="p-6">
            <div className="text-sm text-slate-600 mb-4">Как создать новую сторис?</div>

            {/* Draft continuation — показывается только если есть последний черновик */}
            {lastDraft && (
              <button
                onClick={() => onPickDraft(lastDraft)}
                className="text-left bg-gradient-to-r from-amber-50 to-white border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50 rounded-xl p-4 transition group w-full mb-3 flex items-start gap-3"
              >
                <div className={`${lastDraft.cover} w-14 h-20 rounded-lg flex-shrink-0 relative flex items-end p-1.5 overflow-hidden`}>
                  <div className="text-white text-[8px] font-bold leading-tight drop-shadow line-clamp-2">{lastDraft.title || 'Без названия'}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider bg-amber-200 px-1.5 py-0.5 rounded">Черновик</span>
                    <span className="text-[10px] text-slate-500">Последнее сохранение: {lastDraft.savedAt}</span>
                  </div>
                  <div className="font-bold text-sm text-slate-800 mb-0.5 truncate">Продолжить заполнение черновика</div>
                  <div className="text-xs text-slate-600 truncate">«{lastDraft.title || 'Без названия'}»</div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{lastDraft.description || 'Описание не заполнено'}</div>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-0.5">📍 {lastDraft.targetCities?.join(', ') || 'Без города'}</span>
                    <span>·</span>
                    <span>Заполнено {lastDraft.progress}%</span>
                  </div>
                </div>
                <div className="text-amber-600 group-hover:translate-x-1 transition self-center">
                  <ChevronRight size={20} />
                </div>
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Template card */}
              <button
                onClick={() => setStage('templates')}
                className="text-left bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 rounded-xl p-5 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-3 group-hover:scale-105 transition">
                  <Sparkles size={20} />
                </div>
                <div className="font-bold text-sm text-slate-800 mb-1">Выбрать шаблон</div>
                <div className="text-xs text-slate-500 leading-snug">Готовые конструкции — текст, кнопки, реакции. Часто используемые настройки уже включены.</div>
                <div className="mt-3 text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                  Открыть галерею <ChevronRight size={12} />
                </div>
              </button>

              {/* Blank card */}
              <button
                onClick={onPickNew}
                className="text-left bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 rounded-xl p-5 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white mb-3 group-hover:scale-105 transition">
                  <Plus size={20} />
                </div>
                <div className="font-bold text-sm text-slate-800 mb-1">Создать новую историю</div>
                <div className="text-xs text-slate-500 leading-snug">Пустая форма — все поля и настройки заполняются вручную с нуля.</div>
                <div className="mt-3 text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                  Открыть редактор <ChevronRight size={12} />
                </div>
              </button>
            </div>

            <div className="mt-4 flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 rounded-lg p-2.5">
              <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
              <span>В любом режиме справа — настройки, слева — превью. Можно менять любую часть, шаблон или черновик не блокируют редактирование.</span>
            </div>
          </div>
        )}

        {stage === 'templates' && (
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="text-sm text-slate-600 mb-4">
              Выберите готовый шаблон. Часто используемые настройки (реакции, авто-снятие, таргетинг по Москве) уже проставлены — отредактируйте под себя.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularTemplates.map(t => (
                <button
                  key={t.id}
                  onClick={() => onPickTemplate(t)}
                  className="text-left bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-xl overflow-hidden transition group"
                >
                  <div className={`${t.cover} aspect-[4/3] relative flex flex-col p-2.5 overflow-hidden`}>
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-5 h-5 rounded-full bg-white/95 flex items-center justify-center text-[9px] font-bold text-slate-700">РР</div>
                      <div className="text-xl">{t.icon}</div>
                    </div>
                    <div className="text-white text-[11px] font-bold leading-tight drop-shadow line-clamp-2">{t.title}</div>
                  </div>
                  <div className="p-2.5">
                    <div className="text-xs font-semibold text-slate-800 truncate">{t.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">{t.desc}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-[10px] text-slate-400">{t.uses} использ.</div>
                      <div className="text-[11px] font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-0.5">
                        Выбрать <ChevronRight size={11} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ Verification View — модерация сторис ============
function VerificationView({ showToast }) {
  // Активная вкладка: pending — ожидающие, history — история
  const [tab, setTab] = useState('pending');
  // Состояние модалки отклонения
  const [rejectingStory, setRejectingStory] = useState(null);
  // Состояние решений (для демо — храним локально)
  const [decisions, setDecisions] = useState({});

  // Самые частые причины отказа (согласно прототипу)
  const rejectionReasons = [
    { id: 'low_quality', label: 'Низкое качество обложки / контента' },
    { id: 'errors', label: 'Орфографические ошибки в тексте' },
    { id: 'irrelevant', label: 'Нерелевантный контент для исполнителей' },
    { id: 'partner_not_confirmed', label: 'Не одобрена партнёрская интеграция' },
    { id: 'legal', label: 'Юридические риски / нужна проверка юриста' },
    { id: 'misleading', label: 'Вводящая в заблуждение информация (ставка, бонус, сроки)' },
    { id: 'duplicate', label: 'Дубликат уже опубликованной сторис' },
    { id: 'fake_urgency', label: 'Искусственная срочность без основания' },
    { id: 'broken_link', label: 'Неработающая ссылка / ведёт не туда' }
  ];

  const handleApprove = (storyId) => {
    setDecisions({ ...decisions, [storyId]: { decision: 'approved', date: new Date().toLocaleString('ru') } });
    showToast('Сторис одобрена и автоматически опубликована');
  };

  // Активный список ожидающих — без тех, по кому уже есть решение
  const activePending = pendingVerification.filter(s => !decisions[s.id]);
  // История с учётом локальных решений
  const localDecisions = Object.entries(decisions).map(([id, d]) => {
    const story = pendingVerification.find(s => s.id === +id);
    return story ? {
      id: story.id,
      title: story.title,
      author: story.author,
      decision: d.decision,
      moderator: 'Мария Куликова',
      decidedAt: d.date,
      reasons: d.reasons,
      comment: d.comment,
      cover: story.cover
    } : null;
  }).filter(Boolean);
  const fullHistory = [...localDecisions, ...verificationHistory];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ClipboardCheck size={20} className="text-amber-600" /> Верификация сторис
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Очередь модерации перед публикацией. Проверяйте качество контента, отсутствие ошибок и соответствие правилам.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-amber-900">{activePending.length}</span>
            <span className="text-xs text-amber-700">в очереди</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab('pending')}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${
            tab === 'pending' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-600'
          }`}
        >
          <ShieldAlert size={14} /> Ожидающие
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${tab === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
            {activePending.length}
          </span>
        </button>
        <button
          onClick={() => setTab('history')}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${
            tab === 'history' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-600'
          }`}
        >
          <Archive size={14} /> История
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${tab === 'history' ? 'bg-slate-200 text-slate-700' : 'bg-slate-200 text-slate-600'}`}>
            {fullHistory.length}
          </span>
        </button>
      </div>

      {/* Pending list */}
      {tab === 'pending' && (
        <>
          {activePending.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
              <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-emerald-900">Очередь пуста</div>
              <div className="text-sm text-emerald-700 mt-1">Все сторис обработаны. Когда маркетологи отправят новые — они появятся здесь.</div>
            </div>
          ) : (
            <div className="space-y-4">
              {activePending.map(story => (
                <div key={story.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
                  {/* Preview */}
                  <div className={`${story.cover} md:w-[200px] flex-shrink-0 p-4 flex flex-col justify-between text-white relative overflow-hidden min-h-[200px]`}>
                    <div className="flex items-start justify-between">
                      <div className="w-7 h-7 rounded-full bg-white/95 flex items-center justify-center text-[10px] font-bold text-slate-800">РР</div>
                      <span className="text-[10px] bg-white/20 backdrop-blur px-2 py-0.5 rounded-full">
                        {story.contentType === 'video' ? '🎥 Видео' : '📷 Фото'}
                        {story.contentDuration && ` · ${story.contentDuration}с`}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold leading-tight drop-shadow line-clamp-3">{story.title}</div>
                      <div className="text-[11px] opacity-90 mt-1 line-clamp-2">{story.description}</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-sm font-bold text-slate-800">{story.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1"><UserPlus size={11} />{story.author}</span>
                          <span className="text-slate-300">·</span>
                          <span>{story.authorRole}</span>
                          <span className="text-slate-300">·</span>
                          <span>{story.createdAt}</span>
                        </div>
                      </div>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">На проверке</span>
                    </div>

                    <div className="text-xs text-slate-600 mb-3 leading-snug">{story.description}</div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Города</div>
                        <div className="text-xs font-semibold text-slate-800 mt-0.5">{story.targetCities.join(', ')}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Охват</div>
                        <div className="text-xs font-semibold text-slate-800 mt-0.5 tabular-nums">~{story.estimatedReach.toLocaleString('ru')}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Кнопка связи</div>
                        <div className="text-xs font-semibold text-slate-800 mt-0.5">{story.hasContact ? '✓ Есть' : '— Нет'}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Доплата</div>
                        <div className="text-xs font-semibold text-slate-800 mt-0.5">{story.hasCopay ? '✓ Есть' : '— Нет'}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleApprove(story.id)}
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                      >
                        <ThumbsUp size={14} /> Одобрить
                      </button>
                      <button
                        onClick={() => setRejectingStory(story)}
                        className="px-4 py-2 bg-white border-2 border-rose-200 text-rose-700 text-sm font-bold rounded-lg hover:bg-rose-50 flex items-center gap-2"
                      >
                        <ThumbsDown size={14} /> Отклонить
                      </button>
                      <button
                        onClick={() => showToast('Открыт полноэкранный предпросмотр сторис')}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Eye size={14} /> Полный предпросмотр
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* History */}
      {tab === 'history' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="divide-y divide-slate-100">
            {fullHistory.map(h => (
              <div key={h.id} className="p-4 hover:bg-slate-50/50 transition">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-14 rounded-md ${h.cover} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <div className="font-semibold text-sm text-slate-800">{h.title}</div>
                      {h.decision === 'approved' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                          <ThumbsUp size={10} /> Одобрено
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                          <ThumbsDown size={10} /> Отклонено
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Автор: <b className="text-slate-700">{h.author}</b> · Модератор: <b className="text-slate-700">{h.moderator}</b> · {h.decidedAt}
                    </div>
                    {h.decision === 'rejected' && h.reasons && (
                      <div className="mt-2 bg-rose-50 border border-rose-100 rounded-lg p-2.5">
                        <div className="text-[11px] font-bold text-rose-900 mb-1">Причины отказа:</div>
                        <ul className="text-[11px] text-rose-800 space-y-0.5 list-disc list-inside">
                          {h.reasons.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                        {h.comment && (
                          <div className="mt-2 text-[11px] text-rose-700 italic border-t border-rose-100 pt-1.5 flex items-start gap-1.5">
                            <MessageSquare size={11} className="flex-shrink-0 mt-0.5" />
                            <span>«{h.comment}»</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejection modal */}
      {rejectingStory && (
        <RejectModal
          story={rejectingStory}
          reasons={rejectionReasons}
          onClose={() => setRejectingStory(null)}
          onConfirm={(selectedReasons, comment) => {
            const reasonLabels = selectedReasons.map(id => rejectionReasons.find(r => r.id === id)?.label).filter(Boolean);
            setDecisions({
              ...decisions,
              [rejectingStory.id]: {
                decision: 'rejected',
                reasons: reasonLabels,
                comment,
                date: new Date().toLocaleString('ru')
              }
            });
            setRejectingStory(null);
            showToast('Сторис отклонена, автор получит уведомление');
          }}
        />
      )}
    </div>
  );
}

// ============ Reject modal ============
function RejectModal({ story, reasons, onClose, onConfirm }) {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [comment, setComment] = useState('');

  const toggleReason = (id) => {
    if (selectedReasons.includes(id)) {
      setSelectedReasons(selectedReasons.filter(r => r !== id));
    } else {
      setSelectedReasons([...selectedReasons, id]);
    }
  };

  const canSubmit = selectedReasons.length > 0;

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ThumbsDown size={18} />
            <div>
              <div className="font-bold text-base">Отклонить сторис</div>
              <div className="text-xs text-rose-100">«{story.title}»</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/15 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Reasons */}
          <div>
            <div className="text-sm font-bold text-slate-800 mb-2 flex items-center justify-between">
              <span>Выберите причины отказа</span>
              <span className="text-[11px] text-slate-500 font-normal">Выбрано: {selectedReasons.length}</span>
            </div>
            <div className="text-xs text-slate-500 mb-3">Можно выбрать несколько. Самые частые — наверху.</div>
            <div className="space-y-1.5">
              {reasons.map(r => (
                <label
                  key={r.id}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition ${
                    selectedReasons.includes(r.id)
                      ? 'bg-rose-50 border-rose-300'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedReasons.includes(r.id)}
                    onChange={() => toggleReason(r.id)}
                    className="w-4 h-4 accent-rose-600"
                  />
                  <span className="text-sm text-slate-800 flex-1">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">
              Комментарий <span className="text-xs text-slate-500 font-normal">(необязательно — но поможет автору исправить)</span>
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value.slice(0, 500))}
              rows={4}
              placeholder="Например: «Замените обложку — слишком мелкий шрифт. И уточните ставку — у партнёра она 2500, а не 2800»"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 resize-none"
            />
            <div className="text-[11px] text-slate-400 text-right mt-1">{comment.length}/500</div>
          </div>

          {/* Info */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-800 leading-snug">
              Автор сторис получит push-уведомление с указанными причинами и комментарием. Сторис вернётся в черновики и его можно будет переотправить после исправления.
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Отмена
          </button>
          <button
            onClick={() => onConfirm(selectedReasons, comment)}
            disabled={!canSubmit}
            className="px-4 py-2 text-sm font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ThumbsDown size={14} /> Отклонить сторис
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Editor overlay — раскрывается над основной СРМ ============
function EditorOverlay({ mode, templateData, onClose, showToast }) {
  // Показывать ли плашку «Отправлено на верификацию» после сохранения
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSendForVerification = () => {
    setVerificationSent(true);
  };

  if (verificationSent) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          <div className="px-6 py-5 bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-100">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ClipboardCheck size={24} className="text-amber-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">Ваша история отправлена на верификацию</div>
                <div className="text-sm text-slate-600 mt-1">Ожидайте — модератор проверит её в ближайшее время.</div>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-amber-600 font-bold flex-shrink-0">1.</span>
                <span>Сторис попала в очередь раздела <b>«Верификация Сторис»</b>.</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-amber-600 font-bold flex-shrink-0">2.</span>
                <span>Модератор может одобрить или отклонить сторис с указанием причины.</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-amber-600 font-bold flex-shrink-0">3.</span>
                <span>После одобрения сторис автоматически уйдёт в публикацию.</span>
              </div>
            </div>
            <div className="mt-5 bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-500 flex items-start gap-2">
              <Bell size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <span>Вы получите push-уведомление, когда модератор примет решение. Среднее время верификации — <b>15 минут</b>.</span>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
            <button
              onClick={() => { setVerificationSent(false); showToast('Сторис отправлена на верификацию'); onClose(); }}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Check size={14} /> Понятно
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-40 flex items-start justify-center overflow-y-auto">
      <div
        className="bg-slate-50 w-full max-w-[1400px] my-4 mx-2 sm:mx-4 rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header — like the existing CRM modal style */}
        <div className="px-6 py-4 bg-blue-600 text-white flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="font-bold text-base">
              {mode === 'template'
                ? `Создание истории по шаблону${templateData?.name ? ` «${templateData.name}»` : ''}`
                : mode === 'draft'
                ? `Продолжение черновика${templateData?.title ? ` «${templateData.title}»` : ''}`
                : 'Создание новой истории'}
            </div>
            <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full text-[10px] font-bold uppercase tracking-wide">Черновик</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => showToast('Сохранено в черновики')} className="px-3 py-1.5 text-xs font-medium text-white bg-white/15 hover:bg-white/25 rounded-lg flex items-center gap-1.5">
              <Save size={14} /> Черновик
            </button>
            <button onClick={handleSendForVerification} className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-white rounded-lg hover:bg-slate-100 flex items-center gap-1.5">
              <ClipboardCheck size={14} /> Отправить на верификацию
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-white/15 rounded-lg" title="Закрыть">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Editor body — превью слева sticky, настройки справа скроллятся */}
        <div className="max-h-[calc(100vh-90px)] overflow-y-auto">
          <EditorView mode={mode} templateData={templateData} onClose={onClose} showToast={showToast} />
        </div>
      </div>
    </div>
  );
}

// ============ List preview row — мини-статистика прошлых сторис, видна на главном экране ============
function PastStoriesStatsBar() {
  const stats = [
    { l: 'Активных сейчас', v: '3', d: '+1 за неделю', color: 'emerald' },
    { l: 'Просмотров за 7 дней', v: '184 320', d: '+12.4%', color: 'blue' },
    { l: 'Средний CTR', v: '14.8%', d: '+1.2 п.п.', color: 'violet' },
    { l: 'Кликов за 7 дней', v: '27 280', d: '+8.7%', color: 'amber' }
  ];
  const colors = {
    emerald: 'from-emerald-50 to-white border-emerald-200 text-emerald-700',
    blue: 'from-blue-50 to-white border-blue-200 text-blue-700',
    violet: 'from-violet-50 to-white border-violet-200 text-violet-700',
    amber: 'from-amber-50 to-white border-amber-200 text-amber-700'
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <div key={i} className={`bg-gradient-to-br ${colors[s.color]} border rounded-xl p-3`}>
          <div className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{s.l}</div>
          <div className="text-xl font-bold tabular-nums mt-1">{s.v}</div>
          <div className="text-[11px] opacity-70 mt-0.5">{s.d}</div>
        </div>
      ))}
    </div>
  );
}

export default function StoriesAdmin() {

  const [activeTab, setActiveTab] = useState('list'); // По умолчанию — список с прошлой статистикой
  const [toast, setToast] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // Modal flow: «Добавить историю» → выбор → редактор-оверлей
  const [addChoiceOpen, setAddChoiceOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState('new'); // 'new' | 'template' | 'draft'
  const [editorTemplate, setEditorTemplate] = useState(null);

  // Последний несохранённый черновик — заглушка для прототипа.
  // В проде здесь будет последний draft текущего пользователя из БД.
  const lastDraft = {
    id: 'draft-9001',
    title: 'Бонус +500₽ за смены на выходные',
    body: 'В субботу и воскресенье ставка +500₽ от РР для всех смен на складах ВкусВилла. Записаться можно прямо сейчас.',
    description: 'В субботу и воскресенье ставка +500₽ от РР для всех смен на складах ВкусВилла. Записаться можно прямо сейчас.',
    cover: 'bg-gradient-to-br from-amber-400 to-orange-500',
    targetCities: ['Москва', 'Санкт-Петербург'],
    hasContact: true,
    hasCopay: true,
    progress: 78,
    savedAt: 'сегодня в 14:32'
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openEditorBlank = () => {
    setEditorMode('new');
    setEditorTemplate(null);
    setAddChoiceOpen(false);
    setEditorOpen(true);
  };
  const openEditorWithTemplate = (tpl) => {
    setEditorMode('template');
    setEditorTemplate(tpl);
    setAddChoiceOpen(false);
    setEditorOpen(true);
  };
  const openEditorWithDraft = (draft) => {
    setEditorMode('draft');
    setEditorTemplate(draft);
    setAddChoiceOpen(false);
    setEditorOpen(true);
  };

  const tabs = [
    { id: 'list', label: 'Все сторис', icon: <Layers size={15} /> },
    { id: 'templates', label: 'Шаблоны', icon: <Sparkles size={15} /> }
  ];

  // Боковая навигация — повторяет реальную СРМ Рабочие руки (handswork.pro)
  const navItems = [
    { l: 'Заявки', icon: '📋' },
    { l: 'Этапы', icon: '🪜' },
    { l: 'Клиенты', icon: '👥' },
    { l: 'Исполнители', icon: '👷' },
    { l: 'Пользователи', icon: '🧑' },
    { l: 'Риски бизнеса', icon: '⚠️', dot: true },
    { l: 'Рекрутинг исполнителей', icon: '🎯', dot: true },
    { l: 'Вахта', icon: '🏗️' },
    { l: 'Выгрузки', icon: '📤' },
    { l: 'Подготовка договоров', icon: '📝' },
    { l: 'Интеграции', icon: '🔌' },
    { l: 'Документы', icon: '📑' },
    { l: 'Новости и обновления', icon: '📰' },
    { l: 'Инструменты администратора', icon: '⚙️', dot: true },
    {
      l: 'Управление приложением', icon: '📲', expanded: true,
      children: [
        { l: 'Акции' },
        { l: 'Оповещения' },
        { l: 'Сторис', active: activeTab !== 'verification' },
        { l: 'Верификация Сторис', active: activeTab === 'verification', badge: 3 },
        { l: 'Новости' },
        { l: 'Инструкции' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif' }}>
      {/* Top bar — узкая синяя шапка как в реальной СРМ */}
      <header className="bg-blue-600 text-white h-12 flex items-center px-3 fixed top-0 left-0 right-0 z-30 shadow-sm">
        <button className="p-2 hover:bg-white/10 rounded" title="Свернуть/развернуть меню">
          {/* hamburger icon заменим на двойную стрелку как в скрине */}
          <span className="block text-white text-base leading-none">‖</span>
        </button>
        <div className="flex-1" />
        <div className="text-xs text-white/90 mr-3 hidden sm:block">Чеков: 0 | Статусов: 0</div>
        {/* Колокольчик скрываем при открытом редакторе */}
        {!editorOpen && (
          <button
            onClick={() => { setShowNotifications(!showNotifications); }}
            className="relative p-2 hover:bg-white/10 rounded"
            title="Уведомления"
          >
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded leading-none">13256</span>
          </button>
        )}
        {showNotifications && !editorOpen && (
          <div className="relative">
            <NotificationsPanel onClose={() => setShowNotifications(false)} />
          </div>
        )}
      </header>

      {/* Sidebar — белая, с профилем и навигацией */}
      <aside className="fixed top-12 left-0 bottom-0 w-[230px] bg-white border-r border-slate-200 flex flex-col z-20 overflow-hidden">
        {/* User profile — скрывается при открытии редактора */}
        {!editorOpen && (
          <div className="px-3 py-3 border-b border-slate-200 flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">РР</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-slate-800 truncate">Азамат Псеунов</div>
              <div className="text-[11px] text-slate-500">+7 (925) 716-52-80</div>
              <a className="text-[11px] text-blue-600 hover:underline cursor-pointer">Выйти</a>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-0.5">
              <Edit3 size={11} />
            </button>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-1">
          {navItems.map((it, i) => (
            <div key={i}>
              <div className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${it.expanded ? 'text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                <span className="text-slate-400 text-sm w-4">{it.icon}</span>
                <span className="flex-1 text-[12.5px] leading-tight">{it.l}</span>
                {it.dot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                {it.children && <ChevronDown size={12} className={`text-slate-400 transition ${it.expanded ? 'rotate-180' : ''}`} />}
              </div>
              {it.expanded && it.children && (
                <div className="bg-slate-50/40">
                  {it.children.map((c, ci) => (
                    <div
                      key={ci}
                      onClick={() => {
                        if (c.l === 'Верификация Сторис') setActiveTab('verification');
                        else if (c.l === 'Сторис') setActiveTab('list');
                      }}
                      className={`pl-10 pr-3 py-1.5 text-[12.5px] cursor-pointer flex items-center justify-between ${
                        c.active
                          ? 'bg-sky-100 text-blue-700 font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{c.l}</span>
                      {c.badge && (
                        <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                          {c.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Tech support */}
        <div className="px-3 py-2.5 border-t border-slate-200 text-[10.5px] text-slate-500 leading-snug">
          <div className="font-semibold text-slate-700 mb-0.5">Техническая поддержка:</div>
          <div>С 6:00 до 00:00 мск</div>
          <div className="mt-0.5">тел: <a className="text-blue-600 underline">+7 925 716-44-78</a></div>
          <div className="mt-1 flex gap-1.5 items-center">
            <span className="w-4 h-4 rounded bg-blue-500 text-white text-[8px] font-bold flex items-center justify-center">tg</span>
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400" />
          </div>
          <div className="mt-1">email: <a className="text-blue-600 underline">help@handswork.net</a></div>
        </div>
      </aside>

      {/* Main content — справа от sidebar */}
      <main className="ml-[230px] mt-12">
        {/* Action bar — кнопки + поиск, как в реальной СРМ */}
        <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setAddChoiceOpen(true)}
            className="px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-1.5"
          >
            <Plus size={13} /> Добавить историю
          </button>
          {/* Кнопка «Аналитика» — открывает полную аналитику */}
          <button
            onClick={() => setActiveTab(activeTab === 'analytics' ? 'list' : 'analytics')}
            className={`px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide rounded flex items-center gap-1.5 transition border ${
              activeTab === 'analytics'
                ? 'bg-violet-600 border-violet-600 text-white hover:bg-violet-700'
                : 'bg-white border-slate-300 text-slate-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700'
            }`}
          >
            <BarChart3 size={13} /> Аналитика
          </button>
          {/* Кнопка «Верификация» — открывает раздел модерации */}
          <button
            onClick={() => setActiveTab(activeTab === 'verification' ? 'list' : 'verification')}
            className={`px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide rounded flex items-center gap-1.5 transition border relative ${
              activeTab === 'verification'
                ? 'bg-amber-600 border-amber-600 text-white hover:bg-amber-700'
                : 'bg-white border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            <ClipboardCheck size={13} /> Верификация
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
              activeTab === 'verification' ? 'bg-white/25 text-white' : 'bg-amber-500 text-white'
            }`}>3</span>
          </button>
          <div className="flex-1 min-w-[200px] relative">
            <input
              placeholder="Введите заголовок для поиска"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white min-h-[calc(100vh-12rem)]">
          {activeTab === 'list' && (
            <div className="p-4 sm:p-5 space-y-5">
              <PastStoriesStatsBar />
              <ListView showToast={showToast} />
            </div>
          )}
          {activeTab === 'analytics' && (
            <div>
              <div className="px-5 pt-3 pb-2 flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('list')}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ChevronRight size={12} className="rotate-180" /> Назад к списку историй
                </button>
              </div>
              <AnalyticsView />
            </div>
          )}
          {activeTab === 'verification' && (
            <div>
              <div className="px-5 pt-3 pb-2 flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('list')}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ChevronRight size={12} className="rotate-180" /> Назад к списку историй
                </button>
              </div>
              <VerificationView showToast={showToast} />
            </div>
          )}
        </div>
      </main>

      {/* Choice modal — «Шаблон / Новая» над основной СРМ */}
      {addChoiceOpen && (
        <AddChoiceModal
          onClose={() => setAddChoiceOpen(false)}
          onPickNew={openEditorBlank}
          onPickTemplate={openEditorWithTemplate}
          onPickDraft={openEditorWithDraft}
          lastDraft={lastDraft}
        />
      )}

      {/* Editor overlay — модальный редактор над СРМ */}
      {editorOpen && (
        <EditorOverlay
          mode={editorMode}
          templateData={editorTemplate}
          onClose={() => setEditorOpen(false)}
          showToast={showToast}
        />
      )}

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}
