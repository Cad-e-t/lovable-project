
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Upload, PlusCircle } from "lucide-react";

interface WelcomeChatProps {
  onUploadDocument: () => void;
  onCreateNew: () => void;
}

export const WelcomeChat = ({ onUploadDocument, onCreateNew }: WelcomeChatProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showActions, setShowActions] = useState(false);

  const messages = [
    "Welcome! Ready to tighten up your draft?",
    "Upload your work and I'll analyze it for tone, flow, and consistency.",
    "I can help you identify weaknesses and strengthen your writing before delivery."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMessage < messages.length - 1) {
        setCurrentMessage(prev => prev + 1);
      } else {
        setShowActions(true);
      }
    }, currentMessage === 0 ? 1000 : 2000);

    return () => clearTimeout(timer);
  }, [currentMessage, messages.length]);

  return (
    <div className="p-8 min-h-[400px] flex flex-col">
      {/* AI Avatar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Bot className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Glubook Assistant</h3>
          <p className="text-sm text-gray-500">Your AI editing companion</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 mb-6">
        {messages.slice(0, currentMessage + 1).map((message, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-gray-600" />
            </div>
            <Card className="flex-1 bg-gray-50 border-gray-200">
              <div className="p-4">
                <p className="text-gray-800 leading-relaxed">{message}</p>
              </div>
            </Card>
          </div>
        ))}

        {currentMessage < messages.length - 1 && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Bot className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex space-x-1 p-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="space-y-3 animate-fade-in">
          <Button
            onClick={onUploadDocument}
            className="w-full justify-start h-12 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Upload a Document</div>
              <div className="text-xs text-blue-100">Analyze your existing draft</div>
            </div>
          </Button>
          
          <Button
            onClick={onCreateNew}
            variant="outline"
            className="w-full justify-start h-12 border-gray-300"
          >
            <PlusCircle className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Create New Project</div>
              <div className="text-xs text-gray-500">Start writing with AI assistance</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};
