import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, Target, BookOpen, Calculator } from 'lucide-react';
import { overallAverageTopicWise, marksToPercentile, paperData } from '../data/paperData';

const COLORS = {
  Physics: '#0088FE',
  Chemistry: '#FF8042',
  Mathematics: '#00C49F',
};

export function HomePage() {
  const physicsData = Object.entries(overallAverageTopicWise.Physics).map(([name, value]) => ({ name, value }));
  const chemistryData = Object.entries(overallAverageTopicWise.Chemistry).map(([name, value]) => ({ name, value }));
  const mathematicsData = Object.entries(overallAverageTopicWise.Mathematics).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          JEE Mains Analysis Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive analysis of JEE Mains 2025 papers with topic-wise weightage, marks-to-percentile conversion, and strategic insights for your preparation.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <BookOpen className="w-4 h-4 mr-1" />
            Topic Analysis
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Calculator className="w-4 h-4 mr-1" />
            Percentile Calculator
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            Performance Insights
          </Badge>
        </div>
      </div>

      {/* Average Topic-wise Weightage */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Average Topic-wise Weightage (All January Papers)</CardTitle>
          <CardDescription>Distribution of questions across Physics, Chemistry, and Mathematics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-center text-blue-600 mb-2">Physics</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={physicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {physicsData.map((entry, index) => (
                      <Cell key={`cell-physics-${index}`} fill={COLORS.Physics} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} questions`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-gray-600 text-sm mt-2">{`Total: ${physicsData.reduce((sum, entry) => sum + entry.value, 0)} questions`}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-center text-orange-600 mb-2">Chemistry</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chemistryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chemistryData.map((entry, index) => (
                      <Cell key={`cell-chemistry-${index}`} fill={COLORS.Chemistry} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} questions`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-gray-600 text-sm mt-2">{`Total: ${chemistryData.reduce((sum, entry) => sum + entry.value, 0)} questions`}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-center text-green-600 mb-2">Mathematics</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={mathematicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#ffc658"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mathematicsData.map((entry, index) => (
                      <Cell key={`cell-mathematics-${index}`} fill={COLORS.Mathematics} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} questions`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-gray-600 text-sm mt-2">{`Total: ${mathematicsData.reduce((sum, entry) => sum + entry.value, 0)} questions`}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marks Required for Target Percentiles */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Marks Required for Target Percentiles</CardTitle>
          <CardDescription>Based on difficulty levels for 94%, 98%, and 99%ile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {marksToPercentile.map((data, index) => (
              <Card key={index} className="text-center p-4 border-purple-200 hover:border-purple-400 transition-colors">
                <CardTitle className="text-xl text-purple-700 mb-2">{data.difficulty}</CardTitle>
                <p className="text-lg font-semibold text-gray-800 mb-4">{data.marks} Marks</p>
                <div className="space-y-2 text-left text-sm">
                  <p><strong>94%ile:</strong> {data.percentile["94"]}</p>
                  <p><strong>98%ile:</strong> {data.percentile["98"]}</p>
                  <p><strong>99%ile:</strong> {data.percentile["99"]}</p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights and Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Detailed Paper Analysis</h3>
          <p className="text-sm text-gray-600">
            Breakdown of each January paper by subject and topic-wise weightage.
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Percentile Calculator</h3>
          <p className="text-sm text-gray-600">
            Estimate your percentile based on your marks for any January paper.
          </p>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold mb-2">Strategic Insights</h3>
          <p className="text-sm text-gray-600">
            Understand key trends and focus areas to maximize your score.
          </p>
        </Card>
      </div>

      {/* Data Summary */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <Card className="p-6 border-l-4 border-purple-500 bg-purple-50">
          <CardContent>
            <p className="text-5xl font-bold text-purple-700">{Object.keys(overallAverageTopicWise.Mathematics).length}</p>
            <p className="text-gray-600">Topics Analyzed</p>
          </CardContent>
        </Card>
        <Card className="p-6 border-l-4 border-indigo-500 bg-indigo-50">
          <CardContent>
            <p className="text-5xl font-bold text-indigo-700">{paperData.length}</p>
            <p className="text-gray-600">Papers Covered</p>
          </CardContent>
        </Card>
        <Card className="p-6 border-l-4 border-pink-500 bg-pink-50">
          <CardContent>
            <p className="text-5xl font-bold text-pink-700">3</p>
            <p className="text-gray-600">Subjects Included</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



