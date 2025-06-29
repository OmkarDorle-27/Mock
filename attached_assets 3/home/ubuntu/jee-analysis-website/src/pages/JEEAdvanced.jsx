import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { GraduationCap, Calendar, Clock, AlertCircle, BookOpen, Target } from 'lucide-react';

export function JEEAdvanced() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          JEE Advanced 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive analysis and preparation tools for JEE Advanced 2025 will be available here.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <GraduationCap className="w-4 h-4 mr-1" />
            IIT Entrance
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            May 2025
          </Badge>
          <Badge variant="outline" className="text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            Coming Soon
          </Badge>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            JEE Advanced Analysis
          </CardTitle>
          <CardDescription>
            Advanced analysis tools and preparation resources for JEE Advanced 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-12 bg-purple-50">
            <GraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Coming Soon</h3>
            <p className="text-purple-600 mb-4">
              JEE Advanced 2025 analysis and preparation tools are under development
            </p>
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
              <Clock className="w-4 h-4 mr-2" />
              Notify Me
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Paper Analysis</h3>
          <p className="text-sm text-gray-600">
            Detailed analysis of JEE Advanced papers with topic-wise breakdown
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Rank Predictor</h3>
          <p className="text-sm text-gray-600">
            Predict your JEE Advanced rank based on your performance
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">IIT Counselling</h3>
          <p className="text-sm text-gray-600">
            Complete guide for IIT counselling and seat allocation
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">Important Dates</h3>
          <p className="text-sm text-gray-600">
            All important dates and deadlines for JEE Advanced 2025
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-semibold mb-2">Study Material</h3>
          <p className="text-sm text-gray-600">
            Curated study materials and previous year papers
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-semibold mb-2">Mock Tests</h3>
          <p className="text-sm text-gray-600">
            Practice with JEE Advanced pattern mock tests
          </p>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">JEE Advanced 2025 Timeline</CardTitle>
          <CardDescription>Important dates and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-purple-200">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">Registration Opens</div>
                <div className="text-sm text-gray-600">Expected: April 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-purple-200">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">JEE Advanced Exam</div>
                <div className="text-sm text-gray-600">Expected: May 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-purple-200">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">Results Declaration</div>
                <div className="text-sm text-gray-600">Expected: June 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-purple-200">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">Counselling Begins</div>
                <div className="text-sm text-gray-600">Expected: June 2025</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-purple-800 mb-1">Stay Updated</h4>
            <p className="text-sm text-purple-700">
              JEE Advanced 2025 analysis tools and resources will be added as soon as the exam is conducted. 
              This section will include detailed paper analysis, rank prediction tools, and comprehensive 
              counselling guidance to help you secure admission in your dream IIT.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

