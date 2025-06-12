
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, FileText, BarChart3 } from "lucide-react";

const UserTypeCards = () => {
  const userTypes = [
    {
      icon: BookOpen,
      title: "Fiction Writers",
      description: "Update plot changes across your novel in minutes, retrieve setting details instantly, and summarize character arcs without re-reading 1000+ pages.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Ghostwriters", 
      description: "Align memoir timelines for clients fast, pull dialogue to match tone, and summarize themes effortlessly.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FileText,
      title: "Nonfiction Writers",
      description: "Update facts across your book with precision, retrieve citations in seconds, and summarize arguments for proposals.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: BarChart3,
      title: "Analysts",
      description: "Find contract clauses quickly, verify report data consistency, and summarize compliance terms for meetings.",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Designed for Document Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're crafting stories, managing client content, or analyzing complex documents, 
            Glubook adapts to your specific workflow.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((type, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypeCards;
