
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-blue-600/10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Document Intelligence
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Glubook
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
            Context-Aware AI Assistant for Managing
          </p>
          <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-8">
            1000+ Page Documents
          </p>
          
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Instantly find specific details, detect contradictions, track custom elements, and summarize content. 
            Save 10–20 hours per project while eliminating costly errors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Watch How It Works
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600">Pages Analyzed</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-purple-600">10-20h</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-purple-600">Instant</div>
              <div className="text-sm text-gray-600">Search Results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
