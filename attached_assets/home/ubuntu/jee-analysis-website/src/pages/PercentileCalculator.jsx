import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Calculator, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { paperData, getPercentileFromMarks } from '../data/paperData';

export function PercentileCalculator() {
  const [selectedPaper, setSelectedPaper] = useState('');
  const [marks, setMarks] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const papers = Object.entries(paperData);

  const calculatePercentile = () => {
    setError('');
    setResult(null);

    if (!selectedPaper) {
      setError('Please select a paper');
      return;
    }

    if (!marks || isNaN(marks) || marks < 0 || marks > 300) {
      setError('Please enter valid marks (0-300)');
      return;
    }

    const numMarks = parseInt(marks);
    const percentileRange = getPercentileFromMarks(numMarks);
    
    if (percentileRange === "Invalid marks range") {
      setError('Invalid marks range');
      return;
    }

    const selectedPaperData = paperData[selectedPaper];
    
    setResult({
      paper: selectedPaperData,
      marks: numMarks,
      percentileRange: percentileRange,
      paperId: selectedPaper
    });
  };

  const getPercentileColor = (percentile) => {
    const numPercentile = parseFloat(percentile.split(' - ')[0]);
    if (numPercentile >= 99) return 'text-green-600';
    if (numPercentile >= 95) return 'text-blue-600';
    if (numPercentile >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPercentileBadge = (percentile) => {
    const numPercentile = parseFloat(percentile.split(' - ')[0]);
    if (numPercentile >= 99) return { variant: 'default', text: 'Excellent', color: 'bg-green-600' };
    if (numPercentile >= 95) return { variant: 'secondary', text: 'Very Good', color: 'bg-blue-600' };
    if (numPercentile >= 85) return { variant: 'outline', text: 'Good', color: 'bg-yellow-600' };
    return { variant: 'destructive', text: 'Needs Improvement', color: 'bg-red-600' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Percentile Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate your percentile based on your marks in any JEE Mains 2025 paper.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <Calculator className="w-4 h-4 mr-1" />
            Instant Results
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Target className="w-4 h-4 mr-1" />
            Accurate Percentiles
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            Performance Analysis
          </Badge>
        </div>
      </div>

      {/* Calculator */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-green-600" />
            Calculate Your Percentile
          </CardTitle>
          <CardDescription>
            Select your paper and enter your marks to get your percentile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Paper Selection */}
          <div className="space-y-2">
            <Label htmlFor="paper-select">Select JEE Mains Paper</Label>
            <Select value={selectedPaper} onValueChange={setSelectedPaper}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a paper..." />
              </SelectTrigger>
              <SelectContent>
                {papers.map(([paperId, paper]) => (
                  <SelectItem key={paperId} value={paperId}>
                    {paper.date} - {paper.shift}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Marks Input */}
          <div className="space-y-2">
            <Label htmlFor="marks-input">Your Marks (0-300)</Label>
            <Input
              id="marks-input"
              type="number"
              placeholder="Enter your marks..."
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              min="0"
              max="300"
            />
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={calculatePercentile} 
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            size="lg"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Percentile
          </Button>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Result */}
          {result && (
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Percentile Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Paper</Label>
                    <p className="font-semibold">{result.paper.date} - {result.paper.shift}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Your Marks</Label>
                    <p className="font-semibold text-blue-600">{result.marks} / 300</p>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Your Percentile Range</Label>
                    <p className={`text-2xl font-bold ${getPercentileColor(result.percentileRange)}`}>
                      {result.percentileRange}
                    </p>
                  </div>
                  
                  <Badge 
                    className={`${getPercentileBadge(result.percentileRange).color} text-white`}
                  >
                    {getPercentileBadge(result.percentileRange).text}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Physics</p>
                    <p className="font-semibold text-blue-600">{result.paper.physics} Qs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Chemistry</p>
                    <p className="font-semibold text-red-600">{result.paper.chemistry} Qs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Mathematics</p>
                    <p className="font-semibold text-green-600">{result.paper.mathematics} Qs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Percentile Guide */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Percentile Guide</CardTitle>
          <CardDescription>
            Understanding what your percentile means
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="text-center p-4">
                <div className="text-2xl font-bold text-green-600 mb-2">99+</div>
                <div className="text-sm font-semibold text-green-700 mb-1">Excellent</div>
                <div className="text-xs text-green-600">Top 1% candidates</div>
                <div className="text-xs text-gray-500 mt-1">IIT/NIT eligible</div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">95-99</div>
                <div className="text-sm font-semibold text-blue-700 mb-1">Very Good</div>
                <div className="text-xs text-blue-600">Top 5% candidates</div>
                <div className="text-xs text-gray-500 mt-1">Good NITs/IIITs</div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="text-center p-4">
                <div className="text-2xl font-bold text-yellow-600 mb-2">85-95</div>
                <div className="text-sm font-semibold text-yellow-700 mb-1">Good</div>
                <div className="text-xs text-yellow-600">Top 15% candidates</div>
                <div className="text-xs text-gray-500 mt-1">State colleges</div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="text-center p-4">
                <div className="text-2xl font-bold text-red-600 mb-2">&lt;85</div>
                <div className="text-sm font-semibold text-red-700 mb-1">Improve</div>
                <div className="text-xs text-red-600">Needs more prep</div>
                <div className="text-xs text-gray-500 mt-1">Focus on basics</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <Target className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Pro Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Percentiles are calculated based on the performance of all candidates in that specific shift</li>
              <li>• The same marks can have different percentiles in different shifts due to varying difficulty</li>
              <li>• Use this tool to set realistic targets for your next attempt</li>
              <li>• Focus on improving weak areas identified through subject-wise analysis</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

