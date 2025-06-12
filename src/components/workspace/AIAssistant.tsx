import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Send, User, Bot, ExternalLink } from "lucide-react";
import { Document } from "./WorkspaceLayout";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  pageReferences?: number[];
}

interface AIAssistantProps {
  document: Document;
  currentPage: number;
  onPageJump: (page: number) => void;
}

export const AIAssistant = ({ document, currentPage, onPageJump }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI assistant for "${document.title}". I have full access to all ${document.pages.length} pages of your document. You can ask me to:

• Find specific information
• Summarize sections or themes
• Detect contradictions
• Extract quotes or references
• Navigate to specific content

What would you like to know about your document?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): Message => {
    // Simulate AI processing with calm, respectful, specific, and suggestive responses
    let content = "";
    let pageReferences: number[] = [];

    const calmPrefix = "Hey — here’s something I noticed. Want to take a look together?\n\n";
    const respectPrefix = "Looks like you’ve put solid thought into this section.\n\n";
    const suggestiveSuffix = "\n\nHere’s one way to improve this… Or you might prefer to keep it — totally your call.";

    if (userMessage.toLowerCase().includes('summary') || userMessage.toLowerCase().includes('summarize')) {
      content = calmPrefix + respectPrefix + `Here's a summary of your document "${document.title}":

The document contains ${document.pages.length} pages covering various topics. Key themes include detailed analysis and comprehensive coverage of the subject matter.

**Main Points:**
• Introduction and overview (Page 1)
• Core concepts and methodology (Page 2-3)
• Detailed analysis and findings (Page 4+)` + suggestiveSuffix;
      pageReferences = [0, 1, 2];
    } else if (userMessage.toLowerCase().includes('find') || userMessage.toLowerCase().includes('search')) {
      content = calmPrefix + respectPrefix + `I found relevant content across several pages:

**Page 1:** Contains introductory material related to your query
**Page 2:** Discusses core concepts that match your search
**Page 3:** Provides detailed analysis on the topic

Click the page links above to jump directly to the relevant sections.` + suggestiveSuffix;
      pageReferences = [0, 1, 2];
    } else if (userMessage.toLowerCase().includes('contradiction')) {
      content = calmPrefix + respectPrefix + `I've analyzed the document for potential contradictions:

**No major contradictions detected** ✅

The document maintains consistency in:
• Terminology usage
• Data references
• Argument flow

All statements appear to be logically consistent throughout the document.` + suggestiveSuffix;
    } else {
      content = calmPrefix + respectPrefix + `I understand you're asking about "${userMessage}". Based on my analysis of "${document.title}", I can help you with specific information.

The document contains relevant information on pages 1-3. Would you like me to:
• Provide more specific details?
• Find exact quotes?
• Summarize related sections?

Feel free to ask more specific questions!` + suggestiveSuffix;
      pageReferences = [0, 1, 2];
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content,
      timestamp: new Date(),
      pageReferences,
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">AI Assistant</CardTitle>
        <p className="text-xs text-gray-500">
          Currently viewing: Page {currentPage + 1}
        </p>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`flex gap-3 max-w-[85%] ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                    
                    {message.pageReferences && message.pageReferences.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-300">
                        <div className="text-xs font-medium mb-2">Referenced Pages:</div>
                        <div className="flex flex-wrap gap-1">
                          {message.pageReferences.map((pageNum) => (
                            <Button
                              key={pageNum}
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => onPageJump(pageNum)}
                            >
                              Page {pageNum + 1}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your document..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isTyping}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ask me to find information, summarize sections, or detect contradictions
          </p>
        </div>
      </CardContent>
    </div>
  );
};
