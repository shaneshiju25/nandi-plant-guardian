import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Leaf, Sparkles, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Predefined AI responses for agricultural guidance (placeholder)
const aiResponses: Record<string, string> = {
  default: "I'm Nandi AI, your agricultural assistant. I can help you with crop disease identification, treatment recommendations, and farming best practices. What would you like to know?",
  disease: "Based on common symptoms, this could be a fungal infection. I recommend:\n\n1. **Isolate affected plants** to prevent spread\n2. **Apply fungicide** suitable for your crop type\n3. **Improve air circulation** between plants\n4. **Avoid overhead watering** to reduce moisture\n\nWould you like me to suggest specific fungicides for your crop?",
  treatment: "For effective treatment, consider these steps:\n\n• **Organic options**: Neem oil, copper-based sprays, or baking soda solution\n• **Chemical options**: Consult local agricultural extension for approved products\n• **Prevention**: Crop rotation, resistant varieties, proper spacing\n\nThe best approach depends on the severity and your farming practices. What type of farming do you practice?",
  prevention: "Prevention is key to healthy crops! Here are my top recommendations:\n\n🌱 **Soil Health**: Regular testing and proper pH balance\n💧 **Irrigation**: Drip irrigation reduces leaf wetness\n🔄 **Rotation**: Change crop families each season\n🐛 **Monitoring**: Weekly inspections for early detection\n🌿 **Biodiversity**: Companion planting for natural pest control\n\nWould you like details on any of these practices?",
};

const suggestedQuestions = [
  "How do I identify bacterial leaf blight?",
  "What are the best organic treatments for fungal diseases?",
  "How can I prevent diseases in my rice crop?",
  "When is the best time to apply pesticides?",
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: aiResponses.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    if (lower.includes("disease") || lower.includes("blight") || lower.includes("infection")) {
      return aiResponses.disease;
    }
    if (lower.includes("treatment") || lower.includes("cure") || lower.includes("treat")) {
      return aiResponses.treatment;
    }
    if (lower.includes("prevent") || lower.includes("protection") || lower.includes("avoid")) {
      return aiResponses.prevention;
    }
    return "That's a great question! In a production environment, I would analyze your query using advanced AI models trained on agricultural data. For now, I can help with general guidance on:\n\n• Disease identification\n• Treatment recommendations\n• Prevention strategies\n• Best farming practices\n\nPlease ask about any of these topics, and I'll provide detailed assistance.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: aiResponses.default,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 h-[calc(100vh-80px)] flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between py-4 border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-foreground">Nandi AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Agricultural guidance powered by AI</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={clearChat} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              New Chat
            </Button>
          </motion.div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 py-6" ref={scrollRef}>
            <div className="max-w-3xl mx-auto space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-primary"
                          : "bg-gradient-to-br from-primary to-accent"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-primary-foreground" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl px-5 py-4">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                            className="w-2 h-2 rounded-full bg-muted-foreground"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto w-full py-4"
            >
              <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestionClick(question)}
                    className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-sm text-foreground transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="py-4 border-t border-border">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about crop diseases, treatments, or farming tips..."
                    className="resize-none min-h-[56px] max-h-[200px] pr-12 rounded-xl"
                    rows={1}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-muted-foreground">
                    <Leaf className="w-4 h-4" />
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="h-14 w-14 rounded-xl bg-primary hover:bg-primary/90"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Nandi AI provides general agricultural guidance. For specific advice, consult local agricultural experts.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
