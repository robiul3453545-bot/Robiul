import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are a helpful, professional AI assistant for Robiconic Digital, a leading digital marketing agency in Dhaka, Bangladesh.

About Robiconic Digital:
- Services: SEO (Search Engine Optimization), SEM (Search Engine Marketing), SMM (Social Media Marketing on Facebook, Instagram, LinkedIn), and Google Ads campaigns
- Track Record: 100+ projects delivered, 50+ happy clients, 3x average return on ad spend (ROAS), 24/7 campaign monitoring
- Pricing: Custom packages tailored to business goals. Offer free initial consultation.
- Location: Dhaka, Bangladesh
- Contact: robiconicdigital@gmail.com | robiconicdigital.com

Instructions:
- Provide concise, friendly, and expert answers.
- Respond in the same language the user writes in (Bengali or English).
- Encourage users to book a free consultation or contact via email.`;

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
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const callGemini = async (userText: string, chatHistory: Message[], apiKey: string): Promise<string> => {
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Filter out initial welcome message if it has no preceding user message
    const relevantHistory = chatHistory.filter((m, idx) => !(idx === 0 && m.role === 'assistant'));

    for (const msg of relevantHistory) {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: userText }],
    });

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
    };

    const models = ['gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        }
      } catch {
        // Continue to fallback model
      }
    }

    throw new Error('All models unavailable');
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey =
        import.meta.env.VITE_GEMINI_API_KEY ||
        (window as any).GEMINI_API_KEY ||
        '';

      if (!apiKey) {
        throw new Error('API key missing');
      }

      const reply = await callGemini(text, messages, apiKey);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'দুঃখিত, সংযোগে সাময়িক সমস্যা হয়েছে। আপনি সরাসরি আমাদের সাথে robiconicdigital@gmail.com এ যোগাযোগ করতে পারেন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন।',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 flex w-[350px] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-[#dde6f2] bg-white shadow-2xl dark:border-[#233468] dark:bg-[#0f1a40]"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#1a3c8e] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Robiconic AI</p>
                <p className="text-xs text-blue-200">Online · Digital Marketing Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === 'assistant' ? 'bg-[#1a3c8e]' : 'bg-[#f8701a]'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'rounded-tl-sm bg-[#f2f7fc] text-[#14213f] dark:bg-[#132050] dark:text-[#eef3ff]'
                      : 'rounded-tr-sm bg-[#f8701a] text-white'
                  }`}
                >
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

          {/* Input */}
          <div className="border-t border-[#dde6f2] p-3 dark:border-[#233468]">
            <div className="flex items-center gap-2 rounded-xl border border-[#dde6f2] bg-[#f8fafc] px-3 py-2 transition-colors focus-within:border-[#1a3c8e] dark:border-[#233468] dark:bg-[#132050]">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything / যেকোনো প্রশ্ন লিখুন..."
                className="flex-1 bg-transparent text-sm text-[#14213f] placeholder-[#58637f] outline-none dark:text-[#eef3ff]"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a3c8e] text-white transition-all hover:bg-[#f8701a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-[#58637f] dark:text-[#a6b3d6]">
              Powered by Gemini 3.5 Flash · Robiconic Digital
            </p>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a3c8e] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#f8701a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8701a]"
        aria-label="Open AI Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}