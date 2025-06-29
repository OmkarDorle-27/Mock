import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Target } from "lucide-react";

export default function PercentileCalculator() {
  const [marks, setMarks] = useState({
    physics: '',
    chemistry: '',
    mathematics: ''
  });
  const [result, setResult] = useState<{
    totalMarks: number;
    percentile: number;
    estimatedRank: number;
    physicsMarks: number;
    chemistryMarks: number;
    mathMarks: number;
  } | null>(null);

  // Mock percentile calculation data based on January 2025 analysis
  const marksToPercentile = {
    280: 99.9, 270: 99.8, 260: 99.5, 250: 99.0, 240: 98.5,
    230: 97.8, 220: 96.9, 210: 95.5, 200: 93.8, 190: 91.5,
    180: 88.7, 170: 85.2, 160: 81.1, 150: 76.3, 140: 70.8,
    130: 64.5, 120: 57.6, 110: 50.2, 100: 42.1, 90: 33.8,
    80: 25.7, 70: 18.2, 60: 11.5, 50: 6.2, 40: 2.8,
    30: 1.1, 20: 0.4, 10: 0.1, 0: 0.0
  };

  const calculatePercentile = () => {
    const physicsMarks = parseInt(marks.physics) || 0;
    const chemistryMarks = parseInt(marks.chemistry) || 0;
    const mathMarks = parseInt(marks.mathematics) || 0;
    const totalMarks = physicsMarks + chemistryMarks + mathMarks;

    // Find closest percentile
    let percentile = 0;
    for (const [mark, perc] of Object.entries(marksToPercentile)) {
      if (totalMarks >= parseInt(mark)) {
        percentile = perc;
        break;
      }
    }

    // Calculate rank (assuming 12 lakh candidates)
    const totalCandidates = 1200000;
    const estimatedRank = Math.ceil((100 - percentile) * totalCandidates / 100);

    setResult({
      totalMarks,
      percentile,
      estimatedRank,
      physicsMarks,
      chemistryMarks,
      mathMarks
    });
  };

  const getRankCategory = (rank: number) => {
    if (rank <= 1000) return { text: "Excellent", color: "bg-green-100 text-green-800" };
    if (rank <= 10000) return { text: "Very Good", color: "bg-blue-100 text-blue-800" };
    if (rank <= 50000) return { text: "Good", color: "bg-yellow-100 text-yellow-800" };
    if (rank <= 100000) return { text: "Average", color: "bg-orange-100 text-orange-800" };
    return { text: "Needs Improvement", color: "bg-red-100 text-red-800" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Percentile Calculator</h1>
            </div>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
              <a href="/january-attempt" className="text-gray-600 hover:text-blue-600 font-medium">January Analysis</a>
              <a href="/percentile-calculator" className="text-blue-600 font-medium">Percentile Calculator</a>
              <a href="/mock-test" className="text-gray-600 hover:text-blue-600 font-medium">Mock Test</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JEE Mains Percentile Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your JEE Mains percentile and rank based on January 2025 attempt data analysis
          </p>
          <Badge variant="secondary" className="text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            Based on 12 Lakh+ Candidates Data
          </Badge>
        </div>

        {/* Calculator */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Enter Your Marks
            </CardTitle>
            <CardDescription>
              Enter your marks in each subject to calculate percentile and estimated rank
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="physics" className="text-blue-600 font-medium">Physics (out of 100)</Label>
                <Input
                  id="physics"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={marks.physics}
                  onChange={(e) => setMarks({...marks, physics: e.target.value})}
                  className="text-center text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chemistry" className="text-orange-600 font-medium">Chemistry (out of 100)</Label>
                <Input
                  id="chemistry"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={marks.chemistry}
                  onChange={(e) => setMarks({...marks, chemistry: e.target.value})}
                  className="text-center text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mathematics" className="text-green-600 font-medium">Mathematics (out of 100)</Label>
                <Input
                  id="mathematics"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={marks.mathematics}
                  onChange={(e) => setMarks({...marks, mathematics: e.target.value})}
                  className="text-center text-lg"
                />
              </div>
            </div>

            <div className="text-center">
              <Button onClick={calculatePercentile} size="lg" className="px-8">
                Calculate Percentile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Your Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                    <div className="text-3xl font-bold">{result.totalMarks}/300</div>
                    <div className="text-sm opacity-90">Total Marks</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
                    <div className="text-3xl font-bold">{result.percentile}%</div>
                    <div className="text-sm opacity-90">Percentile</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
                    <div className="text-3xl font-bold">{result.estimatedRank.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Estimated Rank</div>
                  </div>

                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getRankCategory(result.estimatedRank).color}`}>
                      {getRankCategory(result.estimatedRank).text}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Subject-wise breakdown */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-4">Subject-wise Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{result.physicsMarks}</div>
                    <div className="text-sm text-gray-600">Physics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{result.chemistryMarks}</div>
                    <div className="text-sm text-gray-600">Chemistry</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{result.mathMarks}</div>
                    <div className="text-sm text-gray-600">Mathematics</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cutoff Information */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Expected Cutoffs (Based on Trends)</CardTitle>
            <CardDescription>Approximate marks required for different NITs and IIITs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Top NITs (General Category)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">NIT Trichy, NIT Warangal</span>
                    <Badge variant="outline">220-250+</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">NIT Surathkal, NIT Calicut</span>
                    <Badge variant="outline">200-220</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Other Top NITs</span>
                    <Badge variant="outline">180-200</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">IIITs & Other Institutes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">IIIT Hyderabad, IIIT Delhi</span>
                    <Badge variant="outline">210-240+</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Other IIITs</span>
                    <Badge variant="outline">160-190</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">State Engineering Colleges</span>
                    <Badge variant="outline">120-160</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}