
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Document } from "./WorkspaceLayout";

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (document: Document) => void;
}

export const DocumentUpload = ({ isOpen, onClose, onUpload }: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
  };

  const processDocument = async (file: File): Promise<string[]> => {
    // Simulate document processing and text extraction
    const content = `This is a sample document content for ${file.name}. 

Page 1 Content:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Page 2 Content:
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Page 3 Content:
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

    // Split content into pages (simple simulation)
    return content.split('\n\nPage ').map((page, index) => 
      index === 0 ? page : `Page ${page}`
    );
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and enter a title",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Process the document
      const pages = await processDocument(file);
      
      clearInterval(interval);
      setProgress(100);

      const newDocument: Document = {
        id: Date.now().toString(),
        title: title.trim(),
        type: file.type,
        uploadDate: new Date().toISOString(),
        content: pages.join('\n\n'),
        pages,
        sections: [{
          id: '1',
          title: 'Document',
          content: pages.join('\n\n'),
          startIndex: 0,
          endIndex: pages.join('\n\n').length
        }],
        metadata: {
          pageCount: pages.length,
          fileSize: file.size,
        }
      };

      onUpload(newDocument);
      
      toast({
        title: "Success",
        description: "Document uploaded and processed successfully",
      });

      // Reset form
      setFile(null);
      setTitle("");
      setProgress(0);
      onClose();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Select File</Label>
            <div className="mt-2">
              {!file ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to select a document
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, DOCX, TXT files supported
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    handleFileSelect(selectedFile);
                  }
                }}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title..."
              className="mt-2"
            />
          </div>

          {uploading && (
            <div>
              <Label>Upload Progress</Label>
              <Progress value={progress} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">Processing document...</p>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!file || !title.trim() || uploading}
              className="flex-1"
            >
              {uploading ? "Processing..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
