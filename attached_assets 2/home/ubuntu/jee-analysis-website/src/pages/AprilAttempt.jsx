import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Upload, Calendar, AlertCircle, Clock, FileText } from 'lucide-react';

export function AprilAttempt() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          JEE Mains 2025 - April Attempt
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Analysis of April attempt papers will be available here once the papers are uploaded.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            April 2-9, 2025
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Clock className="w-4 h-4 mr-1" />
            Session 2
          </Badge>
          <Badge variant="outline" className="text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            Coming Soon
          </Badge>
        </div>
      </div>

      {/* Upload Placeholder */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Upload className="w-6 h-6 text-orange-600" />
            April Papers Upload
          </CardTitle>
          <CardDescription>
            Upload April attempt papers to get detailed analysis and topic-wise weightage
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload April Papers</h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your April attempt papers here, or click to browse
            </p>
            <Button variant="outline" className="mb-4">
              <FileText className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, JPG, PNG (Max 10MB per file)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Subject-wise question distribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Topic-wise weightage analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Interactive pie charts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Comparison with January attempt</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-700">Expected Papers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>April 2, 2025</span>
                  <span className="text-gray-500">Shift 1 & 2</span>
                </div>
                <div className="flex justify-between">
                  <span>April 3, 2025</span>
                  <span className="text-gray-500">Shift 1 & 2</span>
                </div>
                <div className="flex justify-between">
                  <span>April 4, 2025</span>
                  <span className="text-gray-500">Shift 1 & 2</span>
                </div>
                <div className="flex justify-between">
                  <span>April 7, 2025</span>
                  <span className="text-gray-500">Shift 1 & 2</span>
                </div>
                <div className="flex justify-between">
                  <span>April 8, 2025</span>
                  <span className="text-gray-500">Shift 1 & 2</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold mb-2">Paper Analysis</h3>
          <p className="text-sm text-gray-600">
            Detailed breakdown of each paper with question distribution
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Date-wise Insights</h3>
          <p className="text-sm text-gray-600">
            Compare difficulty and patterns across different exam dates
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Easy Upload</h3>
          <p className="text-sm text-gray-600">
            Simple drag-and-drop interface for quick paper uploads
          </p>
        </Card>
      </div>

      {/* Note */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">Note</h4>
            <p className="text-sm text-yellow-700">
              April attempt papers will be analyzed using the same methodology as January papers. 
              The analysis will include subject-wise distribution, topic weightage, and comparative insights 
              to help you understand the exam pattern evolution.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

