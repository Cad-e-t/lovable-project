
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, FileText, File } from "lucide-react";
import { Document } from "./WorkspaceLayout";
import { DocumentUpload } from "./DocumentUpload";

interface DocumentLibraryProps {
  documents: Document[];
  selectedDocument: Document | null;
  onDocumentSelect: (document: Document) => void;
  onDocumentUpload: (document: Document) => void;
}

export const DocumentLibrary = ({
  documents,
  selectedDocument,
  onDocumentSelect,
  onDocumentUpload
}: DocumentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    return File;
  };

  return (
    <div className="p-4 space-y-4">
      <Button
        onClick={() => setShowUpload(true)}
        className="w-full justify-start"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Document
      </Button>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {documents.length === 0 ? "No documents uploaded" : "No documents found"}
            </p>
          </div>
        ) : (
          filteredDocuments.map((document) => {
            const IconComponent = getFileIcon(document.type);
            const isSelected = selectedDocument?.id === document.id;
            
            return (
              <Card 
                key={document.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => onDocumentSelect(document)}
              >
                <CardHeader className="p-3">
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 text-blue-600 mt-1" />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-medium truncate">
                        {document.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {document.metadata?.pageCount || document.pages.length} pages
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })
        )}
      </div>

      <DocumentUpload 
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUpload={onDocumentUpload}
      />
    </div>
  );
};
