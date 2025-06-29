import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { School, Calendar, Users, AlertCircle, MapPin, BookOpen } from 'lucide-react';

export function CollegeCounselling() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          College Counselling 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete guidance for JEE Mains and Advanced counselling process, college selection, and admission procedures.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <School className="w-4 h-4 mr-1" />
            College Selection
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Users className="w-4 h-4 mr-1" />
            Counselling Process
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
            <School className="w-6 h-6 text-indigo-600" />
            Counselling Guidance
          </CardTitle>
          <CardDescription>
            Comprehensive counselling support for JEE Mains and Advanced admissions
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="border-2 border-dashed border-indigo-300 rounded-lg p-12 bg-indigo-50">
            <School className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Coming Soon</h3>
            <p className="text-indigo-600 mb-4">
              Complete counselling guidance and college selection tools are under development
            </p>
            <Button variant="outline" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50">
              <Calendar className="w-4 h-4 mr-2" />
              Get Notified
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <School className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-semibold mb-2">College Predictor</h3>
          <p className="text-sm text-gray-600">
            Predict colleges you can get based on your JEE rank and category
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">College Finder</h3>
          <p className="text-sm text-gray-600">
            Find colleges by location, branch, fees, and other preferences
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Counselling Process</h3>
          <p className="text-sm text-gray-600">
            Step-by-step guide for JoSAA, CSAB, and state counselling
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">Important Dates</h3>
          <p className="text-sm text-gray-600">
            All counselling dates, deadlines, and important milestones
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-semibold mb-2">Cut-off Analysis</h3>
          <p className="text-sm text-gray-600">
            Previous year cut-offs and trends for all colleges and branches
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <School className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="font-semibold mb-2">College Compare</h3>
          <p className="text-sm text-gray-600">
            Compare colleges based on placements, fees, and facilities
          </p>
        </Card>
      </div>

      {/* Counselling Types */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Counselling Types</CardTitle>
          <CardDescription>Different counselling processes you need to know about</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-indigo-200 hover:border-indigo-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-indigo-600">JoSAA Counselling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>For:</span>
                  <span className="font-medium">IITs, NITs, IIITs, GFTIs</span>
                </div>
                <div className="flex justify-between">
                  <span>Based on:</span>
                  <span className="font-medium">JEE Main & Advanced</span>
                </div>
                <div className="flex justify-between">
                  <span>Rounds:</span>
                  <span className="font-medium">6-7 rounds</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">June-July</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-green-600">CSAB Counselling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>For:</span>
                  <span className="font-medium">NITs, IIITs (Vacant Seats)</span>
                </div>
                <div className="flex justify-between">
                  <span>Based on:</span>
                  <span className="font-medium">JEE Main</span>
                </div>
                <div className="flex justify-between">
                  <span>Rounds:</span>
                  <span className="font-medium">2-3 rounds</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">July-August</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-purple-600">State Counselling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>For:</span>
                  <span className="font-medium">State Govt. Colleges</span>
                </div>
                <div className="flex justify-between">
                  <span>Based on:</span>
                  <span className="font-medium">JEE Main</span>
                </div>
                <div className="flex justify-between">
                  <span>Rounds:</span>
                  <span className="font-medium">Varies by state</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">June-August</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Counselling Timeline 2025</CardTitle>
          <CardDescription>Expected counselling schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">JEE Main Result</div>
                <div className="text-sm text-gray-600">April 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">JEE Advanced Result</div>
                <div className="text-sm text-gray-600">June 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">JoSAA Registration</div>
                <div className="text-sm text-gray-600">June 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-semibold">Counselling Rounds</div>
                <div className="text-sm text-gray-600">June-August 2025</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-indigo-800 mb-1">Important Note</h4>
            <p className="text-sm text-indigo-700">
              Detailed counselling guidance, college predictor tools, and step-by-step admission process 
              will be available here. This section will help you make informed decisions about college 
              selection and ensure you don't miss any important deadlines during the counselling process.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

