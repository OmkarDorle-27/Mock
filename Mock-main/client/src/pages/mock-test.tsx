import { useState, useEffect } from "react";
import { TestState, initialTestState, loadTestState, saveTestState, clearTestState } from "@/lib/test-state";
import PdfUpload from "@/components/mock-test/pdf-upload";
import TestInterface from "@/components/mock-test/test-interface";
import * as XLSX from 'xlsx';

export default function MockTest() {
  const [testState, setTestState] = useState<TestState>(initialTestState);
  const [showUpload, setShowUpload] = useState(true);

  useEffect(() => {
    // Try to load existing test state
    const savedState = loadTestState();
    if (savedState && savedState.testStarted && savedState.questions.length > 0) {
      setTestState(savedState);
      setShowUpload(false);
    }
  }, []);

  useEffect(() => {
    // Auto-save test state every 10 seconds
    if (testState.testStarted) {
      const interval = setInterval(() => {
        saveTestState(testState);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [testState]);

  const handleTestStart = async (file: File, solutionFile: File | null, answerKeyFile: File | null, config: any) => {
    try {
      // Parse answer key if provided
      let answerKeyData: Record<number, any> = {};
      if (answerKeyFile) {
        console.log('Parsing answer key Excel file...');
        answerKeyData = await parseExcelAnswerKey(answerKeyFile);
        console.log('Answer key parsed successfully:', Object.keys(answerKeyData).length, 'questions found');
      } else {
        console.warn('No answer key file provided - using default answers');
      }
      
      // Generate questions with real answer keys
      const questions = generateQuestionsFromConfig(config, answerKeyData);
      console.log('Generated', questions.length, 'questions for the test');
      
      const newState: TestState = {
        ...initialTestState,
        testStarted: true,
        timeRemaining: config.duration * 60 * 1000, // Convert minutes to milliseconds
        questions,
      };
      setTestState(newState);
      setShowUpload(false);
      saveTestState(newState);
      
      // Store PDF files for viewing
      localStorage.setItem('mockTestPDF', URL.createObjectURL(file));
      localStorage.setItem('mockTestConfig', JSON.stringify(config));
      
      // Store solution PDF if provided
      if (solutionFile) {
        localStorage.setItem('mockTestSolution', URL.createObjectURL(solutionFile));
      }
    } catch (error) {
      console.error('Error starting test:', error);
      alert('Error processing the answer key Excel file. Please check the file format and try again.\n\nExpected format:\nColumn A: Question Number\nColumn B: Answer (A, B, C, D for single/multi-correct, or numerical value)');
    }
  };

  const parseExcelAnswerKey = async (file: File): Promise<Record<number, any>> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          
          // Skip header row by starting from row 2
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: ['questionNumber', 'answer'],
            range: 1 // Skip first row (header)
          });
          
          const answerKey: Record<number, any> = {};
          
          jsonData.forEach((row: any, index: number) => {
            if (row.questionNumber !== undefined && row.answer !== undefined) {
              const questionNum = parseInt(String(row.questionNumber));
              
              // Skip if question number is invalid
              if (isNaN(questionNum) || questionNum <= 0) {
                console.warn(`Invalid question number at row ${index + 2}: ${row.questionNumber}`);
                return;
              }
              
              let answer = row.answer;
              
              // Handle different answer formats
              if (typeof answer === 'string') {
                const answerStr = answer.toString().trim();
                
                // Check if it's multi-correct (contains commas)
                if (answerStr.includes(',')) {
                  answer = answerStr.split(',').map(a => a.trim().toUpperCase()).filter(a => a.length > 0);
                } else {
                  // Check if it's numerical
                  const numAnswer = parseFloat(answerStr);
                  if (!isNaN(numAnswer)) {
                    answer = numAnswer;
                  } else {
                    // Single correct answer
                    answer = answerStr.toUpperCase();
                  }
                }
              } else if (typeof answer === 'number') {
                // Already a number, keep as is
                answer = answer;
              }
              
              answerKey[questionNum] = answer;
              console.log(`Parsed answer for Q${questionNum}: ${JSON.stringify(answer)}`);
            }
          });
          
          console.log('Successfully parsed answer key:', answerKey);
          resolve(answerKey);
        } catch (error) {
          console.error('Error parsing Excel file:', error);
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read Excel file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const generateQuestionsFromConfig = (config: any, answerKeyData: Record<number, any> = {}) => {
    const questions: any[] = [];
    let questionId = 1;

    // Process each subject
    Object.entries(config.subjects).forEach(([subjectName, subjectConfig]: [string, any]) => {
      // Generate single correct questions for this subject (only if enabled)
      if (subjectConfig.singleCorrect.enabled) {
        for (let i = subjectConfig.singleCorrect.start; i <= subjectConfig.singleCorrect.end; i++) {
          const correctAnswer = answerKeyData[i] || 'A'; // Use answer key or default to 'A'
          questions.push({
            id: questionId++,
            number: i,
            subject: subjectName,
            type: 'mcq',
            text: `Question ${i}`,
            options: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
            correctAnswer: correctAnswer,
            marks: subjectConfig.singleCorrect.marks,
            negativeMark: subjectConfig.singleCorrect.negativeMark,
          });
        }
      }

      // Generate multi correct questions for this subject (only if enabled)
      if (subjectConfig.multiCorrect.enabled) {
        for (let i = subjectConfig.multiCorrect.start; i <= subjectConfig.multiCorrect.end; i++) {
          const correctAnswer = answerKeyData[i] || ['A', 'B']; // Use answer key or default
          questions.push({
            id: questionId++,
            number: i,
            subject: subjectName,
            type: 'multi-correct',
            text: `Question ${i}`,
            options: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
            correctAnswer: correctAnswer,
            marks: subjectConfig.multiCorrect.marks,
            negativeMark: subjectConfig.multiCorrect.negativeMark,
          });
        }
      }

      // Generate numerical questions for this subject (only if enabled)
      if (subjectConfig.numerical.enabled) {
        for (let i = subjectConfig.numerical.start; i <= subjectConfig.numerical.end; i++) {
          const correctAnswer = answerKeyData[i] || 0; // Use answer key or default to 0
          questions.push({
            id: questionId++,
            number: i,
            subject: subjectName,
            type: 'numerical',
            text: `Question ${i}`,
            correctAnswer: correctAnswer,
            marks: subjectConfig.numerical.marks,
            negativeMark: subjectConfig.numerical.negativeMark,
          });
        }
      }
    });

    // Sort questions by question number
    return questions.sort((a, b) => a.number - b.number);
  };

  const getSubjectForQuestion = (questionNumber: number): 'physics' | 'chemistry' | 'maths' => {
    // Distribute questions across subjects (assuming 30 questions total: 10 each)
    if (questionNumber <= 10) return 'physics';
    if (questionNumber <= 20) return 'chemistry';
    return 'maths';
  };

  const handleTestComplete = () => {
    clearTestState();
    setTestState(initialTestState);
    setShowUpload(true);
  };

  const updateTestState = (updates: Partial<TestState>) => {
    setTestState(prev => ({ ...prev, ...updates }));
  };

  if (showUpload) {
    return <PdfUpload onTestStart={handleTestStart} />;
  }

  return (
    <TestInterface 
      testState={testState} 
      updateTestState={updateTestState}
      onTestComplete={handleTestComplete}
    />
  );
}
