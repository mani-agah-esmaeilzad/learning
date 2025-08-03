import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Mic, BookOpen, ShieldQuestion, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInputValue = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // NOTE: This fetch call should be updated to your actual API endpoint.
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInputValue }),
      });

      if (!response.ok) {
        throw new Error(`خطای سرور: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "متاسفانه در ارتباط با سرور مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-center">
          <div className="text-center">
            {/* <div className=""> */}
               <img src="/fanoos.png" alt="Fanoos"
               className="w-32 h-16 mx-auto mb-3 flex items-center justify-center" />
            {/* </div> */}
            <h2 className="text-lg font-semibold">دستیار هوشمند فانوس</h2>
            <p className="text-sm text-muted-foreground">
              پاسخگوی سوالات شما در مورد دوره‌های آموزشی، فرآیندهای سازمانی و پشتیبانی فنی
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>سوال خود را در مورد فرآیندهای سازمانی بپرسید</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 chat-message",
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Avatar className="w-8 h-8 mt-1">
                {message.sender === "user" ? (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    شما
                  </AvatarFallback>
                ) : (
                  <AvatarImage src="/fanoos-avatar.png" alt="Fanoos" />
                )}
              </Avatar>
              <div
                className={cn(
                  "max-w-[80%] rounded-xl p-3 text-sm",
                  message.sender === "user"
                    ? "bg-chat-user text-chat-user-foreground"
                    : "bg-chat-assistant text-chat-assistant-foreground"
                )}
              >
                <p className="leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 mt-1">
              <AvatarImage src="/fanoos-avatar.png" alt="Fanoos" />
            </Avatar>
            <div className="bg-chat-assistant text-chat-assistant-foreground rounded-xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Actions */}
      <div className="p-4 border-t border-border">
        

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-input rounded-xl border border-border focus-within:ring-2 focus-within:ring-ring">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="سوال خود را در مورد فرآیندهای سازمانی بپرسید..."
              className="min-h-[60px] max-h-32 border-0 bg-transparent resize-none pr-12 pl-4 py-4 focus-visible:ring-0"
              disabled={isLoading}
            />

            <div className="absolute left-2 bottom-2 flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Mic className="h-4 w-4" />
              </Button>

              <Button
                type="submit"
                size="icon"
                className="h-8 w-8"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}