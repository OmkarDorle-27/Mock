import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { FileText, Clock, Target, AlertCircle, BookOpen, Settings, Play } from 'lucide-react';

export function MockTestGenerator() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Mock Test Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Generate customized mock tests based on JEE Mains pattern with topic-wise questions and detailed analysis.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <FileText className="w-4 h-4 mr-1" />
            Custom Tests
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Clock className="w-4 h-4 mr-1" />
            Timed Practice
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Target className="w-4 h-4 mr-1" />
            Performance Analysis
          </Badge>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            Mock Test Generator
          </CardTitle>
          <CardDescription>
            Advanced mock test generation system for JEE Mains preparation
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="border-2 border-dashed border-emerald-300 rounded-lg p-12 bg-emerald-50">
            <FileText className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-emerald-700 mb-2">Coming Soon</h3>
            <p className="text-emerald-600 mb-4">
              Advanced mock test generation features are under development
            </p>
            <Button variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
              <Clock className="w-4 h-4 mr-2" />
              Get Notified
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Settings className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold mb-2">Custom Test Creation</h3>
          <p className="text-sm text-gray-600">
            Create tests with specific topics, difficulty levels, and question counts
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Timed Practice</h3>
          <p className="text-sm text-gray-600">
            Practice with real exam timing and get used to time pressure
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Performance Analysis</h3>
          <p className="text-sm text-gray-600">
            Detailed analysis of your performance with improvement suggestions
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">Topic-wise Tests</h3>
          <p className="text-sm text-gray-600">
            Focus on specific chapters or topics that need improvement
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Play className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-semibold mb-2">Instant Results</h3>
          <p className="text-sm text-gray-600">
            Get immediate feedback with detailed solutions and explanations
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-semibold mb-2">JEE Pattern</h3>
          <p className="text-sm text-gray-600">
            Tests follow exact JEE Mains pattern and marking scheme
          </p>
        </Card>
      </div>

      {/* Test Types */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Test Types</CardTitle>
          <CardDescription>Different types of mock tests available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-emerald-600">Full Length Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">3 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-medium">90 Questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Subjects:</span>
                  <span className="font-medium">Physics, Chemistry, Math</span>
                </div>
                <div className="flex justify-between">
                  <span>Pattern:</span>
                  <span className="font-medium">JEE Mains</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-blue-600">Subject-wise Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">1 Hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-medium">30 Questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span className="font-medium">Single Subject</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="font-medium">Customizable</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-purple-600">Topic-wise Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">30 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-medium">15 Questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span className="font-medium">Specific Topics</span>
                </div>
                <div className="flex justify-between">
                  <span>Purpose:</span>
                  <span className="font-medium">Concept Practice</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Features Timeline */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Upcoming Features</CardTitle>
          <CardDescription>Development roadmap for mock test generator</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">Question Bank Integration</div>
                <div className="text-sm text-gray-600">Integration with comprehensive question database</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">AI-Powered Test Generation</div>
                <div className="text-sm text-gray-600">Smart test creation based on your weak areas</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">Performance Analytics</div>
                <div className="text-sm text-gray-600">Detailed performance tracking and improvement suggestions</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">Adaptive Testing</div>
                <div className="text-sm text-gray-600">Tests that adapt to your skill level in real-time</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-emerald-800 mb-1">Development in Progress</h4>
            <p className="text-sm text-emerald-700">
              The Mock Test Generator is currently under development. This feature will provide 
              comprehensive test generation capabilities with customizable difficulty levels, 
              topic selection, and detailed performance analysis. Stay tuned for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

