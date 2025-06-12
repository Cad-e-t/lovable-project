
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CleanWorkspace } from "@/components/workspace/CleanWorkspace";

export interface Document {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  content: string;
  sections: DocumentSection[];
  analysis?: DocumentAnalysis;
}

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

const Workspace = () => {
  const [searchParams] = useSearchParams();
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const action = searchParams.get('action');

  const handleDocumentUpload = async (document: Document) => {
    setCurrentDocument(document);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = generateMockAnalysis(document);
      setCurrentDocument(prev => prev ? { ...prev, analysis } : null);
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateMockAnalysis = (document: Document): DocumentAnalysis => {
    const issues: Issue[] = [
      {
        id: '1',
        type: 'tone',
        severity: 'moderate',
        title: 'Tone Inconsistency',
        description: 'The tone shifts from formal to casual mid-paragraph.',
        suggestion: 'Maintain consistent formal tone throughout this section.',
        sectionId: document.sections[0]?.id || '1',
        startIndex: 150,
        endIndex: 300
      },
      {
        id: '2',
        type: 'repetition',
        severity: 'minor',
        title: 'Repetitive Phrasing',
        description: 'The phrase "in conclusion" appears multiple times.',
        suggestion: 'Use varied transitional phrases like "ultimately" or "to summarize".',
        sectionId: document.sections[1]?.id || '2',
        startIndex: 450,
        endIndex: 500
      },
      {
        id: '3',
        type: 'logic',
        severity: 'critical',
        title: 'Logical Gap',
        description: 'Argument jumps to conclusion without supporting evidence.',
        suggestion: 'Add transitional paragraph with supporting data or examples.',
        sectionId: document.sections[0]?.id || '1',
        startIndex: 800,
        endIndex: 950
      }
    ];

    return {
      issues,
      overallScore: 7.3,
      strengths: [
        'Strong opening hook',
        'Clear thesis statement',
        'Good use of examples'
      ],
      suggestions: [
        'Strengthen transitions between paragraphs',
        'Add more supporting evidence',
        'Vary sentence structure'
      ],
      processingComplete: true
    };
  };

  return (
    <CleanWorkspace 
      action={action}
      document={currentDocument}
      isAnalyzing={isAnalyzing}
      onDocumentUpload={handleDocumentUpload}
    />
  );
};

export default Workspace;
