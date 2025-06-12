
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Upload, PlusCircle, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showActions, setShowActions] = useState(false);

  const messages = [
    "Welcome! Ready to tighten up your draft?",
    "Upload your work and I'll analyze it for tone, flow, and consistency.",
    "I can help you identify weaknesses and strengthen your writing before delivery."
  ];

  // Auto-progress messages
  useState(() => {
    const timer = setTimeout(() => {
      if (currentMessage < messages.length - 1) {
        setCurrentMessage(prev => prev + 1);
      } else {
        setShowActions(true);
      }
    }, currentMessage === 0 ? 1000 : 2000);

    return () => clearTimeout(timer);
  });

  const handleUploadDocument = () => {
    navigate("/workspace?action=upload");
  };

  const handleCreateNew = () => {
    navigate("/workspace?action=new");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Glubook</h1>
          </div>
          <p className="text-gray-600">AI-Powered Draft Analysis & Editing</p>
        </div>

        {/* AI Chat Interface */}
        <Card className="shadow-lg border-gray-200">
          <CardContent className="p-8">
            {/* AI Avatar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Glubook Assistant</h3>
                <p className="text-sm text-gray-500">Your AI editing companion</p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-8">
              {messages.slice(0, currentMessage + 1).map((message, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex-1">
                    <p className="text-gray-800">{message}</p>
                  </div>
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
              <div className="flex gap-3">
                <Button
                  onClick={handleUploadDocument}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                
                <Button
                  onClick={handleCreateNew}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
