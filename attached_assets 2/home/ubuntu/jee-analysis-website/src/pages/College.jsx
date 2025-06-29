import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { School, Upload, Users, AlertCircle, MapPin, BookOpen, Target } from 'lucide-react';

export function College() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          College Selection & Admission
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload rank data and get personalized college recommendations based on your JEE performance and preferences.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <School className="w-4 h-4 mr-1" />
            College Predictor
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Target className="w-4 h-4 mr-1" />
            Rank Analysis
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Upload className="w-4 h-4 mr-1" />
            Data Upload
          </Badge>
        </div>
      </div>

      {/* Rank Data Upload */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Upload className="w-6 h-6 text-indigo-600" />
            Upload Rank Data
          </CardTitle>
          <CardDescription>
            Upload your JEE rank data to get personalized college recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="border-2 border-dashed border-indigo-300 rounded-lg p-12 bg-indigo-50">
            <Upload className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Upload Your Rank Data</h3>
            <p className="text-indigo-600 mb-4">
              Upload your JEE Mains/Advanced rank to get accurate college predictions
            </p>
            <Button variant="outline" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 mb-4">
              <Upload className="w-4 h-4 mr-2" />
              Choose Rank File
            </Button>
            <p className="text-xs text-indigo-400">
              Supported formats: PDF, JPG, PNG, TXT (Max 5MB)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg text-indigo-700">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Personalized college recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Branch-wise admission chances</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Cut-off analysis and trends</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Category-wise predictions</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-700">Required Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>JEE Mains Rank</span>
                  <span className="text-green-600 font-medium">Required</span>
                </div>
                <div className="flex justify-between">
                  <span>JEE Advanced Rank</span>
                  <span className="text-gray-500">Optional</span>
                </div>
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="text-green-600 font-medium">Required</span>
                </div>
                <div className="flex justify-between">
                  <span>Home State</span>
                  <span className="text-green-600 font-medium">Required</span>
                </div>
                <div className="flex justify-between">
                  <span>Preferred Branches</span>
                  <span className="text-gray-500">Optional</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-semibold mb-2">College Predictor</h3>
          <p className="text-sm text-gray-600">
            Get accurate predictions based on your rank and category
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Location Filter</h3>
          <p className="text-sm text-gray-600">
            Find colleges by state, city, and distance preferences
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Branch Analysis</h3>
          <p className="text-sm text-gray-600">
            Detailed analysis of admission chances for each branch
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <School className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">College Compare</h3>
          <p className="text-sm text-gray-600">
            Compare colleges based on placements, fees, and facilities
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-semibold mb-2">Cut-off Trends</h3>
          <p className="text-sm text-gray-600">
            Historical cut-off data and admission trends
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="font-semibold mb-2">Admission Strategy</h3>
          <p className="text-sm text-gray-600">
            Strategic guidance for maximizing admission chances
          </p>
        </Card>
      </div>

      {/* College Categories */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">College Categories</CardTitle>
          <CardDescription>Different types of engineering colleges in India</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-blue-600">IITs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">23 IITs</span>
                </div>
                <div className="flex justify-between">
                  <span>Admission:</span>
                  <span className="font-medium">JEE Advanced</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank Range:</span>
                  <span className="font-medium">1-15,000</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-green-600">NITs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">31 NITs</span>
                </div>
                <div className="flex justify-between">
                  <span>Admission:</span>
                  <span className="font-medium">JEE Main</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank Range:</span>
                  <span className="font-medium">1-50,000</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-purple-600">IIITs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">25 IIITs</span>
                </div>
                <div className="flex justify-between">
                  <span>Admission:</span>
                  <span className="font-medium">JEE Main</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank Range:</span>
                  <span className="font-medium">1-80,000</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg text-orange-600">GFTIs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">100+ Colleges</span>
                </div>
                <div className="flex justify-between">
                  <span>Admission:</span>
                  <span className="font-medium">JEE Main</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank Range:</span>
                  <span className="font-medium">1-1,50,000</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-indigo-800 mb-1">Upload Your Data</h4>
            <p className="text-sm text-indigo-700">
              Upload your JEE rank data to get personalized college recommendations. Our algorithm 
              analyzes your rank, category, and preferences to suggest the best colleges where you 
              have high chances of admission. The system considers historical cut-offs, seat availability, 
              and category-wise reservations to provide accurate predictions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

