
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Upload, Bot, ChevronRight, ChevronLeft, Send, User } from "lucide-react";
import { Document, Issue } from "@/pages/Workspace";

interface CleanWorkspaceProps {
  action: string | null;
  document: Document | null;
  isAnalyzing: boolean;
  onDocumentUpload: (document: Document) => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  issues?: Issue[];
}

export const CleanWorkspace = ({ action, document, isAnalyzing, onDocumentUpload }: CleanWorkspaceProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [documentContent, setDocumentContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize AI analysis when document is uploaded
  useEffect(() => {
    if (document && document.analysis && !messages.some(m => m.issues)) {
      setIsTyping(true);
      setTimeout(() => {
        const analysisMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'ai',
          content: `I've analyzed your draft "${document.title}" and found ${document.analysis.issues.length} areas for improvement. Here's what I noticed:`,
          timestamp: new Date(),
          issues: document.analysis.issues
        };
        setMessages([analysisMessage]);
        setIsTyping(false);
      }, 2000);
    }
  }, [document]);

  // Set initial document content
  useEffect(() => {
    if (document) {
      setDocumentContent(document.content);
    }
  }, [document]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      
      const newDocument: Document = {
        id: Date.now().toString(),
        title: file.name,
        type: file.type,
        uploadDate: new Date().toISOString(),
        content,
        sections: [{
          id: '1',
          title: 'Document',
          content,
          startIndex: 0,
          endIndex: content.length
        }]
      };

      onDocumentUpload(newDocument);
    };
    reader.readAsText(file);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I can help you with that. Based on your document, here are some suggestions...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Upload screen
  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Card className="p-8">
            {/* AI Avatar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Glubook Assistant</h3>
                <p className="text-sm text-gray-500">AI-powered draft analysis</p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex-1">
                  <p className="text-gray-800 mb-3">
                    Welcome! I'm here to help tighten up your writing. 
                  </p>
                  <p className="text-gray-800 mb-3">
                    Upload a draft and I'll analyze it for tone, flow, logic gaps, and suggest improvements.
                  </p>
                  <p className="text-gray-800">
                    Or start a new project and I'll help you write from scratch.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700" asChild>
                  <span className="cursor-pointer flex items-center justify-center">
                    <Upload className="w-5 h-5 mr-3" />
                    Upload Draft for Analysis
                  </span>
                </Button>
              </label>
              
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => {
                  const newDoc: Document = {
                    id: Date.now().toString(),
                    title: "New Project",
                    type: "text/plain",
                    uploadDate: new Date().toISOString(),
                    content: "",
                    sections: [{
                      id: '1',
                      title: 'Document',
                      content: "",
                      startIndex: 0,
                      endIndex: 0
                    }]
                  };
                  onDocumentUpload(newDoc);
                }}
              >
                Create New Project
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Workspace screen
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Writing Canvas */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'mr-12' : 'mr-80'}`}>
        <div className="p-6 border-b bg-white">
          <h1 className="text-xl font-semibold text-gray-900">{document.title}</h1>
          <p className="text-sm text-gray-500">Writing Canvas</p>
        </div>
        
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <textarea
              value={documentContent}
              onChange={(e) => setDocumentContent(e.target.value)}
              placeholder="Start writing or paste your draft here..."
              className="w-full min-h-[600px] p-6 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-serif text-lg leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - AI Chat */}
      <div className={`fixed right-0 top-0 h-full bg-white border-l transition-all duration-300 ${
        sidebarCollapsed ? 'w-12' : 'w-80'
      }`}>
        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute top-4 left-2 z-10"
        >
          {sidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>

        {!sidebarCollapsed && (
          <div className="h-full flex flex-col">
            {/* AI Header */}
            <div className="p-6 border-b mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-gray-500">
                    {isAnalyzing ? 'Analyzing...' : 'Ready to help'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-blue-600' : 'bg-gray-100'
                    }`}>
                      {message.type === 'user' ? 
                        <User className="w-4 h-4 text-white" /> : 
                        <Bot className="w-4 h-4 text-gray-600" />
                      }
                    </div>
                    <div className={`flex-1 rounded-lg p-3 ${
                      message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-50'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      
                      {message.issues && (
                        <div className="mt-3 space-y-2">
                          {message.issues.map((issue) => (
                            <div 
                              key={issue.id} 
                              className="p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                // Scroll to issue in document using DOM document
                                const element = window.document.getElementById(`issue-${issue.id}`);
                                element?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  issue.severity === 'critical' ? 'bg-red-500' :
                                  issue.severity === 'moderate' ? 'bg-yellow-500' : 'bg-blue-500'
                                }`} />
                                <span className="text-xs font-medium text-gray-900">{issue.title}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{issue.suggestion}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
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

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your writing..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
