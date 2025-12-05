import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, AlertCircle, Info } from 'lucide-react';
import { sendMessageToGemini } from '@/services/geminiService';
import { ChatMessage } from '@/types/portfolio';
import { AvatarWithIcon } from '@/components/ui/avatar-with-icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';

const GeminiChat: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: t('chat.welcome')
    }
  ]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: t('chat.welcome')
      }
    ]);
  }, [language, t]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Filter out error messages from history before sending to API
      const history = messages
        .filter(m => !m.isError)
        .map(m => ({ role: m.role, text: m.text }));
        
      const responseText = await sendMessageToGemini(textToSend, history);
      
      const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: responseText || "Ursäkta, jag tappade tanken. Kan du fråga igen?" 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'Något gick fel med AI-tjänsten. Kontrollera API-nyckeln eller försök igen senare.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chat" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('chat.title')}</h2>
          <p className="text-slate-600 mb-3">
            {t('chat.description')}
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-1">
            <span>{t('chat.techInfo')}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  <strong>{t('chat.tooltip.title')}</strong> {t('chat.tooltip.content')}
                </p>
              </TooltipContent>
            </Tooltip>
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0">
                  {msg.role === 'model' ? (
                    <AvatarWithIcon
                      imageUrl="/marcus.jpg"
                      name="Marcus Björke"
                      icon={Bot}
                      colorClass="bg-indigo-600"
                      iconColorClass="text-white"
                      size={48}
                    />
                  ) : (
                    <AvatarWithIcon
                      imageUrl={undefined}
                      name="User"
                      icon={User}
                      colorClass="bg-slate-300"
                      iconColorClass="text-slate-600"
                      size={48}
                    />
                  )}
                </div>
                
                <div className={`p-4 rounded-2xl max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-none' 
                    : msg.isError 
                      ? 'bg-red-50 text-red-600 border border-red-200 rounded-tl-none'
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.isError && <AlertCircle className="w-4 h-4 inline mr-2" />}
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <AvatarWithIcon
                    imageUrl="/marcus.jpg"
                    name="Marcus Björke"
                    icon={Bot}
                    colorClass="bg-indigo-600"
                    iconColorClass="text-white"
                    size={48}
                  />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-6 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto whitespace-nowrap">
            <div className="flex gap-2">
              {t<string[]>('chat.suggestedQuestions').map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-white text-xs font-medium text-indigo-600 border border-indigo-100 rounded-full hover:bg-indigo-50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('chat.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">
              AI kan göra misstag. Kontrollera viktig information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeminiChat;

