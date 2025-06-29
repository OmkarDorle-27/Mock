import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calendar, Clock, FileText, TrendingUp } from 'lucide-react';
import { paperData } from '../data/paperData';

const COLORS = {
  Physics: '#3B82F6',
  Chemistry: '#EF4444', 
  Mathematics: '#10B981'
};

export function JanuaryAttempt() {
  const papers = Object.entries(individual_papers);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{payload[0].value} questions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
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
      <div className="grid gap-6">
        {papers.map(([paperId, paper]) => {
          const physicsTopics = Object.entries(paper.Physics).map(([name, value]) => ({ name, value }));
          const chemistryTopics = Object.entries(paper.Chemistry).map(([name, value]) => ({ name, value }));
          const mathematicsTopics = Object.entries(paper.Mathematics).map(([name, value]) => ({ name, value }));
          
          const totalPhysics = physicsTopics.reduce((sum, entry) => sum + entry.value, 0);
          const totalChemistry = chemistryTopics.reduce((sum, entry) => sum + entry.value, 0);
          const totalMathematics = mathematicsTopics.reduce((sum, entry) => sum + entry.value, 0);

          return (
            <Card key={paperId} className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      {paperId}
                    </CardTitle>
                    <CardDescription>
                      Topic-wise question distribution and analysis
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {totalPhysics + totalChemistry + totalMathematics} Questions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Physics Topics */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center text-blue-600">Physics Topics</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={physicsTopics}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {physicsTopics.map((entry, index) => (
                              <Cell key={`cell-physics-${index}`} fill={COLORS.Physics} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{totalPhysics}</p>
                      <p className="text-sm text-gray-600">Questions</p>
                    </div>
                  </div>

                  {/* Chemistry Topics */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center text-red-600">Chemistry Topics</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chemistryTopics}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {chemistryTopics.map((entry, index) => (
                              <Cell key={`cell-chemistry-${index}`} fill={COLORS.Chemistry} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{totalChemistry}</p>
                      <p className="text-sm text-gray-600">Questions</p>
                    </div>
                  </div>

                  {/* Mathematics Topics */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center text-green-600">Mathematics Topics</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mathematicsTopics}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {mathematicsTopics.map((entry, index) => (
                              <Cell key={`cell-mathematics-${index}`} fill={COLORS.Mathematics} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{totalMathematics}</p>
                      <p className="text-sm text-gray-600">Questions</p>
                    </div>
                  </div>
                </div>

                {/* Additional Insights */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Key Insights
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-600">Physics:</span> Analysis of topic distribution in Physics.
                    </div>
                    <div>
                      <span className="font-medium text-red-600">Chemistry:</span> Analysis of topic distribution in Chemistry.
                    </div>
                    <div>
                      <span className="font-medium text-green-600">Mathematics:</span> Analysis of topic distribution in Mathematics.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">January Attempt Summary</CardTitle>
          <CardDescription>Overall statistics across all papers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{papers.length}</div>
              <div className="text-sm text-gray-600">Papers Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">{Object.keys(individual_papers["22 Jan Shift 1"].Physics).length}</div>
              <div className="text-sm text-gray-600">Physics Topics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{Object.keys(individual_papers["22 Jan Shift 1"].Chemistry).length}</div>
              <div className="text-sm text-gray-600">Chemistry Topics</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

