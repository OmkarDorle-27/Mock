import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";

export default function JanuaryAttempt() {
  // Mock data for JEE January papers
  const papers = [
    { date: "22 Jan", shift: "Morning", session: "1", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "22 Jan", shift: "Evening", session: "2", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "23 Jan", shift: "Morning", session: "3", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "23 Jan", shift: "Evening", session: "4", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "24 Jan", shift: "Morning", session: "5", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "24 Jan", shift: "Evening", session: "6", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "25 Jan", shift: "Morning", session: "7", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "25 Jan", shift: "Evening", session: "8", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "26 Jan", shift: "Morning", session: "9", questions: { physics: 20, chemistry: 20, maths: 20 } },
    { date: "26 Jan", shift: "Evening", session: "10", questions: { physics: 20, chemistry: 20, maths: 20 } },
  ];

  const topicWiseData = {
    Physics: {
      "Mechanics": 4.2,
      "Thermodynamics": 2.8,
      "Wave & Optics": 3.1,
      "Electricity & Magnetism": 5.3,
      "Modern Physics": 4.6
    },
    Chemistry: {
      "Physical Chemistry": 7.1,
      "Inorganic Chemistry": 6.4,
      "Organic Chemistry": 6.5
    },
    Mathematics: {
      "Algebra": 4.8,
      "Coordinate Geometry": 3.7,
      "Calculus": 4.9,
      "Trigonometry": 2.9,
      "Statistics & Probability": 3.7
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header - consistent with home page */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">January Attempt Analysis</h1>
            </div>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
              <a href="/january-attempt" className="text-blue-600 font-medium">January Analysis</a>
              <a href="/percentile-calculator" className="text-gray-600 hover:text-blue-600 font-medium">Percentile Calculator</a>
              <a href="/mock-test" className="text-gray-600 hover:text-blue-600 font-medium">Mock Test</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            JEE Mains 2025 - January Attempt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed analysis of all papers conducted in the January attempt with topic-wise question distribution.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              10 Papers Analyzed
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Clock className="w-4 h-4 mr-1" />
              5 Days, 2 Shifts Each
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <FileText className="w-4 h-4 mr-1" />
              600 Total Questions
            </Badge>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Session {paper.session}</span>
                  <Badge variant="outline">{paper.shift}</Badge>
                </CardTitle>
                <CardDescription>{paper.date} 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-medium">Physics:</span>
                    <span>{paper.questions.physics} questions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">Chemistry:</span>
                    <span>{paper.questions.chemistry} questions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600 font-medium">Mathematics:</span>
                    <span>{paper.questions.maths} questions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Average Topic-wise Weightage */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Average Topic-wise Weightage</CardTitle>
            <CardDescription>Average number of questions per topic across all January papers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Physics */}
              <div>
                <h3 className="text-lg font-semibold text-center text-blue-600 mb-4">Physics</h3>
                <div className="space-y-3">
                  {Object.entries(topicWiseData.Physics).map(([topic, avg]) => (
                    <div key={topic} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{topic}</span>
                      <Badge variant="secondary">{avg} Qs</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chemistry */}
              <div>
                <h3 className="text-lg font-semibold text-center text-orange-600 mb-4">Chemistry</h3>
                <div className="space-y-3">
                  {Object.entries(topicWiseData.Chemistry).map(([topic, avg]) => (
                    <div key={topic} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{topic}</span>
                      <Badge variant="secondary">{avg} Qs</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematics */}
              <div>
                <h3 className="text-lg font-semibold text-center text-green-600 mb-4">Mathematics</h3>
                <div className="space-y-3">
                  {Object.entries(topicWiseData.Mathematics).map(([topic, avg]) => (
                    <div key={topic} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{topic}</span>
                      <Badge variant="secondary">{avg} Qs</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Key Insights from January Attempt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 mb-3">High Weightage Topics</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Electricity & Magnetism (Physics) - 5.3 questions avg</li>
                  <li>• Physical Chemistry - 7.1 questions avg</li>
                  <li>• Calculus (Mathematics) - 4.9 questions avg</li>
                  <li>• Modern Physics - 4.6 questions avg</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-3">Strategic Preparation Tips</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Focus on Electricity & Magnetism for Physics</li>
                  <li>• Equal emphasis on all Chemistry branches</li>
                  <li>• Strong Calculus foundation essential</li>
                  <li>• Modern Physics concepts are crucial</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}