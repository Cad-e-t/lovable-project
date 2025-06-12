
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, MessageSquare, FileText, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface InteractiveDemoProps {
  activeDemo: string;
  setActiveDemo: (demo: string) => void;
}

const InteractiveDemo = ({ activeDemo, setActiveDemo }: InteractiveDemoProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveDemo("analysis");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setActiveDemo("results");
    }, 1500);
  };

  const searchResults = [
    {
      type: "Character",
      title: "Sarah's character arc development",
      content: "Chapter 3, Page 47: Sarah begins her transformation from timid observer to confident leader...",
      confidence: 98
    },
    {
      type: "Plot Point",
      title: "Timeline inconsistency detected",
      content: "Chapter 7, Page 156: Date conflict - wedding mentioned as June 15th but earlier referenced as June 12th",
      confidence: 95,
      isIssue: true
    },
    {
      type: "Setting",
      title: "London coffee shop description",
      content: "Chapter 2, Page 23: The Grind coffee shop on Baker Street with exposed brick walls and vintage posters...",
      confidence: 92
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See Glubook in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how our AI assistant analyzes your documents and provides intelligent insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Analysis
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50">
                <CardContent className="p-12 text-center">
                  <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Document</h3>
                  <p className="text-gray-600 mb-6">
                    Drop your manuscript, novel, or report here. We support PDF, DOCX, and TXT files up to 1000+ pages.
                  </p>
                  <Button 
                    onClick={simulateUpload} 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File to Upload
                  </Button>
                  {uploadProgress > 0 && (
                    <div className="mt-6">
                      <div className="bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">Processing: {uploadProgress}%</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Document Analysis Complete
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">847</div>
                      <div className="text-sm text-gray-600">Pages Processed</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">23</div>
                      <div className="text-sm text-gray-600">Characters Identified</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-600">3</div>
                      <div className="text-sm text-gray-600">Potential Issues</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Key Insights Generated:</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="mr-2">Character relationships mapped</Badge>
                      <Badge variant="secondary" className="mr-2">Timeline verified</Badge>
                      <Badge variant="secondary" className="mr-2">Setting details catalogued</Badge>
                      <Badge variant="secondary" className="mr-2">Dialogue patterns analyzed</Badge>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setActiveDemo("search")} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Start Exploring Your Document
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    AI-Powered Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask anything about your document... (e.g., 'Show me Sarah's character development' or 'Find timeline inconsistencies')"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={simulateSearch}
                        disabled={isSearching}
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        {isSearching ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {setSearchQuery("Sarah's character development"); simulateSearch();}}
                      >
                        Character arcs
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {setSearchQuery("Timeline inconsistencies"); simulateSearch();}}
                      >
                        Timeline issues
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {setSearchQuery("London settings"); simulateSearch();}}
                      >
                        Setting details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {setSearchQuery("Dialogue patterns"); simulateSearch();}}
                      >
                        Dialogue style
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Search Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map((result, index) => (
                      <Card key={index} className={`border-l-4 ${result.isIssue ? 'border-l-yellow-500 bg-yellow-50' : 'border-l-blue-500 bg-blue-50'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={result.isIssue ? "destructive" : "secondary"}>
                                {result.type}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {result.confidence}% confidence
                              </span>
                            </div>
                            {result.isIssue && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{result.title}</h4>
                          <p className="text-gray-600 text-sm">{result.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h4>
                    <p className="text-gray-600 text-sm">
                      Use natural language queries like "Find all mentions of the red car" or "Show me contradictions in the timeline" 
                      for even more precise results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
