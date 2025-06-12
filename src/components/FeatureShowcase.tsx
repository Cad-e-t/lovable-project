
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertTriangle, Target, FileText, Clock, Zap } from "lucide-react";

const FeatureShowcase = () => {
  const features = [
    {
      icon: Search,
      title: "Instant Search & Retrieval",
      description: "Find any detail, character mention, or plot point across 1000+ pages in seconds. Use natural language queries to get precise results.",
      benefits: ["Search by context, not just keywords", "Find connections between elements", "Retrieve specific quotes and references"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: AlertTriangle,
      title: "Contradiction Detection",
      description: "Automatically identify inconsistencies in timelines, character details, facts, or plot elements that could damage your credibility.",
      benefits: ["Timeline verification", "Character trait consistency", "Fact-checking across chapters"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: Target,
      title: "Custom Element Tracking",
      description: "Define and track specific elements unique to your document - themes, symbols, motifs, or compliance terms.",
      benefits: ["Track recurring themes", "Monitor character development", "Compliance term management"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: FileText,
      title: "Intelligent Summaries",
      description: "Generate comprehensive summaries of characters, chapters, themes, or specific document sections for quick reference.",
      benefits: ["Chapter-by-chapter breakdowns", "Character arc summaries", "Theme analysis reports"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Version Control & Updates",
      description: "When you make changes, instantly update all related references throughout your document while maintaining consistency.",
      benefits: ["Global find and replace", "Reference updating", "Change impact analysis"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Zap,
      title: "Smart Contextual Insights",
      description: "Get AI-powered insights about your document's structure, pacing, character development, and potential improvements.",
      benefits: ["Pacing analysis", "Character development tracking", "Structural recommendations"],
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Document Mastery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed to save you hours of manual work while ensuring your documents are error-free and professionally polished.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 mb-4 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
