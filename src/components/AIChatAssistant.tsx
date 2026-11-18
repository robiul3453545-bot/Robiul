import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant for Robiconic Digital, a digital marketing agency based in Dhaka, Bangladesh.

About Robiconic Digital:
- We specialize in SEO, SEM, Social Media Marketing (SMM), and Google Ads campaigns
- We have delivered 100+ projects with 50+ happy clients
- We provide 24/7 campaign monitoring
- We achieve an average 3x return on ad spend
- Based in Dhaka, Bangladesh
- Contact: robiconicdigital@gmail.com | robiconicdigital.com

Your role:
- Help visitors understand our services
- Answer questions about digital marketing
- Guide potential clients to book a free consultation
- Be friendly, professional, and helpful
- Keep responses concise and actionable
- Always respond in the same language the user writes in (Bengali or English)

If asked about pricing, say we offer custom packages and encourage them to get a free consultation.`;

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am Robiconic Digital\'s AI assistant. How can I help you today? 👋\n\nআমি Robiconic Digital-এর AI সহকারী। আপনাকে কীভাবে সাহায্য করতে পারি?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY) as string;
      const ai = new GoogleGenAI({ apiKey });
      const history = messages.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' as const : 'user' as const,
        parts: [{ text: msg.content }],
      }));
      const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: { systemInstruction: SYSTEM_PROMPT },
        history,
      });
      const response = await chat.sendMessage({ message: userMessage.content });
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please contact us at robiconicdigital@gmail.com',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[350px] sm:w-[400px] flex flex-col rounded-2xl shadow-2xl border border-[#dde6f2] bg-white dark:border-[#233468] dark:bg-[#0f1a40] overflow-hidden" style={{ height: '520px' }}>
          <div className="flex items-center justify-between bg-[#1a3c8e] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Robiconic AI</p>
                <p className="text-xs text-blue-200">Digital Marketing Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.role === 'assistant' ? 'bg-[#1a3c8e]' : 'bg-[#f8701a]'}`}>
                  {msg.role === 'assistant' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-[#f2f7fc] text-[#14213f] dark:bg-[#132050] dark:text-[#eef3ff] rounded-tl-sm' : 'bg-[#f8701a] text-white rounded-tr-sm'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a3c8e]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-[#f2f7fc] px-4 py-3 dark:bg-[#132050]">
                  <Loader2 className="h-4 w-4 animate-spin text-[#1a3c8e] dark:text-[#1ea5e8]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-[#dde6f2] p-3 dark:border-[#233468]">
            <div className="flex items-center gap-2 rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-3 py-2 focus-within:border-[#1a3c8e] dark:border-[#233468] dark:bg-[#132050] transition-colors">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything..." className="flex-1 bg-transparent text-sm text-[#14213f] placeholder-[#58637f] outline-none dark:text-[#eef3ff]" disabled={isLoading} />
              <button onClick={sendMessage} disabled={!input.trim() || isLoading} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a3c8e] text-white transition-all hover:bg-[#f8701a] disabled:opacity-40 disabled:cursor-not-allowed">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-[#58637f] dark:text-[#a6b3d6]">Powered by Gemini AI · Robiconic Digital</p>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen((prev) => !prev)} className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a3c8e] text-white shadow-lg transition-all duration-300 hover:bg-[#f8701a] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8701a]" aria-label="Open AI Chat">
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}