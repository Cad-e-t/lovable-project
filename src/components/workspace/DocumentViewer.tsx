
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Document, Issue } from "@/pages/Workspace";

interface DocumentViewerProps {
  document: Document;
  currentPage: number;
  onPageChange: (page: number) => void;
  editorMode?: boolean;
  selectedIssue?: Issue | null;
}

export const DocumentViewer = ({ document, currentPage, onPageChange, editorMode = false, selectedIssue }: DocumentViewerProps) => {
  const highlightIssues = (content: string, sectionId: string) => {
    if (!editorMode || !document.analysis?.issues) return content;

    const sectionIssues = document.analysis.issues.filter(issue => issue.sectionId === sectionId);
    
    let highlightedContent = content;
    
    // Sort issues by start index in reverse order to avoid index shifting
    sectionIssues.sort((a, b) => b.startIndex - a.startIndex);
    
    sectionIssues.forEach(issue => {
      const before = highlightedContent.substring(0, issue.startIndex);
      const highlighted = highlightedContent.substring(issue.startIndex, issue.endIndex);
      const after = highlightedContent.substring(issue.endIndex);
      
      const className = `issue-highlight ${
        issue.severity === 'critical' ? 'bg-red-100 border-l-4 border-red-400' :
        issue.severity === 'moderate' ? 'bg-yellow-100 border-l-4 border-yellow-400' :
        'bg-blue-100 border-l-4 border-blue-400'
      } ${selectedIssue?.id === issue.id ? 'ring-2 ring-blue-500' : ''}`;
      
      highlightedContent = before + 
        `<span class="${className} px-1 cursor-pointer" data-issue-id="${issue.id}">${highlighted}</span>` + 
        after;
    });
    
    return highlightedContent;
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Document Sections */}
            {document.sections.map((section, index) => (
              <div key={section.id} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 m-0">
                    {section.title}
                  </h2>
                  {editorMode && document.analysis?.issues.filter(issue => issue.sectionId === section.id).length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {document.analysis.issues.filter(issue => issue.sectionId === section.id).length} issues
                    </Badge>
                  )}
                </div>
                
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div 
                      className="whitespace-pre-wrap leading-relaxed text-gray-800"
                      dangerouslySetInnerHTML={{
                        __html: highlightIssues(section.content, section.id)
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
