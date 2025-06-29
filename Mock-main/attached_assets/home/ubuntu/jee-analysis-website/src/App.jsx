import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { JanuaryAttempt } from './pages/JanuaryAttempt';
import { AprilAttempt } from './pages/AprilAttempt';
import { PercentileCalculator } from './pages/PercentileCalculator';
import { JEEAdvanced } from './pages/JEEAdvanced';
import { College } from './pages/College';
import { MockTestGenerator } from './pages/MockTestGenerator';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/january-attempt" element={<JanuaryAttempt />} />
            <Route path="/april-attempt" element={<AprilAttempt />} />
            <Route path="/percentile-calculator" element={<PercentileCalculator />} />
            <Route path="/jee-advanced" element={<JEEAdvanced />} />
            <Route path="/college" element={<College />} />
            <Route path="/mock-test-generator" element={<MockTestGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


