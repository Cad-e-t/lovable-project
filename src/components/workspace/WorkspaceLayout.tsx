
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DocumentLibrary } from "./DocumentLibrary";
import { DocumentViewer } from "./DocumentViewer";
import { AIAssistant } from "./AIAssistant";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Upload } from "lucide-react";

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  startIndex: number;
  endIndex: number;
}

export interface Issue {
  id: string;
  type: 'tone' | 'logic' | 'repetition' | 'transition' | 'argument';
  severity: 'critical' | 'moderate' | 'minor';
  title: string;
  description: string;
  suggestion: string;
  sectionId: string;
  startIndex: number;
  endIndex: number;
}

export interface DocumentAnalysis {
  issues: Issue[];
  overallScore: number;
  strengths: string[];
  suggestions: string[];
  processingComplete: boolean;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  content: string;
  sections: DocumentSection[];
  analysis?: DocumentAnalysis;
  pages: string[];
  metadata?: {
    pageCount: number;
    fileSize: number;
  };
}

const WorkspaceLayout = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    setCurrentPage(0);
  };

  const handleDocumentUpload = (newDocument: Document) => {
    setDocuments(prev => [...prev, newDocument]);
    setSelectedDocument(newDocument);
    setCurrentPage(0);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-lg">Glubook</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <DocumentLibrary 
              documents={documents}
              selectedDocument={selectedDocument}
              onDocumentSelect={handleDocumentSelect}
              onDocumentUpload={handleDocumentUpload}
            />
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t">
            <Button
              variant={showAI ? "default" : "outline"}
              onClick={() => setShowAI(!showAI)}
              className="w-full justify-start"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                {selectedDocument && (
                  <div>
                    <h1 className="text-xl font-semibold">{selectedDocument.title}</h1>
                    <p className="text-sm text-gray-500">
                      Page {currentPage + 1} of {selectedDocument.pages.length}
                    </p>
                  </div>
                )}
              </div>
            </header>

            <div className="flex-1 p-6">
              {selectedDocument ? (
                <DocumentViewer 
                  document={selectedDocument}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">
                      No document selected
                    </h2>
                    <p className="text-gray-500">
                      Upload a document from the sidebar to get started
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showAI && selectedDocument && (
            <div className="w-80 border-l bg-white">
              <AIAssistant 
                document={selectedDocument}
                currentPage={currentPage}
                onPageJump={setCurrentPage}
              />
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceLayout;
