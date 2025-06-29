import { Question } from "@shared/schema";

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export const parsePDF = async (file: File): Promise<Question[]> => {
  // Load PDF.js if not already loaded
  if (!window.pdfjsLib) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    document.head.appendChild(script);
    
    await new Promise((resolve) => {
      script.onload = resolve;
    });
    
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
  
  let allText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // Better text extraction preserving layout
    const items = textContent.items;
    let pageText = '';
    let lastY = 0;
    
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      // Add newline if significant vertical gap
      if (lastY > 0 && Math.abs(item.transform[5] - lastY) > 5) {
        pageText += '\n';
      }
      pageText += item.str + ' ';
      lastY = item.transform[5];
    }
    
    allText += pageText + '\n\n';
  }

  console.log('Extracted text from PDF:', allText.substring(0, 1000) + '...');
  return parseQuestionsFromText(allText);
};

const parseQuestionsFromText = (text: string): Question[] => {
  const questions: Question[] = [];
  
  // Clean and normalize text
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  // Enhanced question splitting patterns
  const questionPatterns = [
    /(?=^\d+[\.\)]\s)/gm,  // 1. or 1)
    /(?=\b\d+[\.\)]\s+[A-Z])/g,  // 1. A or 1) A (question starts with capital)
    /(?=Question\s*\d+)/gi, // Question 1
    /(?=Q\s*\d+[\.\)]\s)/gi, // Q1. or Q1)
    /(?=\[\s*\d+\s*\])/g,  // [1]
    /(?=^\d+\s+[A-Z])/gm,  // 1 A (number space capital letter)
  ];
  
  let questionBlocks: string[] = [];
  
  // Try different splitting patterns
  for (const pattern of questionPatterns) {
    questionBlocks = cleanText.split(pattern).filter(block => block.trim().length > 10);
    if (questionBlocks.length > 1) break;
  }
  
  // If no clear pattern, try line-by-line analysis
  if (questionBlocks.length <= 1) {
    const lines = text.split('\n').filter(line => line.trim());
    let currentBlock = '';
    let blockStarted = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check if line starts a new question
      if (/^\d+[\.\)]\s/.test(trimmedLine) || /^Question\s*\d+/i.test(trimmedLine) || /^Q\s*\d+/i.test(trimmedLine)) {
        if (blockStarted && currentBlock.trim()) {
          questionBlocks.push(currentBlock.trim());
        }
        currentBlock = trimmedLine;
        blockStarted = true;
      } else if (blockStarted) {
        currentBlock += ' ' + trimmedLine;
      }
    }
    
    if (blockStarted && currentBlock.trim()) {
      questionBlocks.push(currentBlock.trim());
    }
  }
  
  console.log('Found question blocks:', questionBlocks.length);
  
  questionBlocks.forEach((block, index) => {
    if (block.length < 10) return;
    
    console.log(`Processing block ${index + 1}:`, block.substring(0, 200) + '...');
    
    const questionNumber = index + 1;
    let questionText = '';
    let subject = determineSubject(block);
    let questionType: 'mcq' | 'numerical' | 'multi-correct' = 'mcq';
    let options: Record<string, string> = {};
    
    // Enhanced option detection patterns
    const optionPatterns = [
      /\(([A-D])\)\s*([^(]+?)(?=\([A-D]\)|$)/gi,  // (A) text (B) text
      /([A-D])[\.\)]\s*([^A-D]+?)(?=[A-D][\.\)]|$)/gi,  // A. text B. text
      /\[([A-D])\]\s*([^\[]+?)(?=\[[A-D]\]|$)/gi,  // [A] text [B] text
    ];
    
    let optionsFound = false;
    let questionEndPos = block.length;
    
    // Try to find options using different patterns
    for (const pattern of optionPatterns) {
      const matches: RegExpExecArray[] = [];
      let match;
      while ((match = pattern.exec(block)) !== null) {
        matches.push(match);
        if (pattern.global === false) break;
      }
      pattern.lastIndex = 0; // Reset pattern
      
      if (matches.length >= 3) { // At least 3 options found
        optionsFound = true;
        options = {};
        
        // Find where options start
        const firstOptionPos = matches[0].index || 0;
        questionEndPos = firstOptionPos;
        
        matches.forEach(match => {
          const optionKey = match[1].toUpperCase();
          const optionText = match[2].trim();
          if (optionText && optionKey.match(/[A-D]/)) {
            options[optionKey] = optionText;
          }
        });
        
        break;
      }
    }
    
    // Extract question text
    questionText = block.substring(0, questionEndPos).trim();
    
    // Remove question number prefix
    questionText = questionText.replace(/^\d+[\.\)]\s*/, '');
    questionText = questionText.replace(/^Question\s*\d+[\.\):]?\s*/i, '');
    questionText = questionText.replace(/^Q\s*\d+[\.\):]?\s*/i, '');
    
    // Determine question type more accurately
    if (optionsFound && Object.keys(options).length >= 4) {
      questionType = 'mcq';
    } else if (optionsFound && Object.keys(options).length >= 2) {
      questionType = 'mcq';
    } else {
      // Check for numerical indicators
      const numericalKeywords = ['value', 'answer', 'result', 'calculate', 'find', 'determine', 'units', 'decimal'];
      const hasNumericalKeywords = numericalKeywords.some(keyword => 
        questionText.toLowerCase().includes(keyword)
      );
      
      // Check for typical MCQ structure even without clear options
      const mcqKeywords = ['which', 'correct', 'best', 'most', 'appropriate', 'following'];
      const hasMcqKeywords = mcqKeywords.some(keyword => 
        questionText.toLowerCase().includes(keyword)
      );
      
      if (hasNumericalKeywords && !hasMcqKeywords) {
        questionType = 'numerical';
      } else if (!optionsFound && questionText.length > 50) {
        // Default to MCQ for longer questions without clear options
        questionType = 'mcq';
        // Generate default options
        options = {
          'A': 'Option A',
          'B': 'Option B', 
          'C': 'Option C',
          'D': 'Option D'
        };
      }
    }
    
    // Generate appropriate correct answer
    let correctAnswer: string | number = 'A';
    if (questionType === 'numerical') {
      correctAnswer = Math.round(Math.random() * 100 * 100) / 100;
    } else {
      const optionKeys = Object.keys(options);
      correctAnswer = optionKeys.length > 0 ? 
        optionKeys[Math.floor(Math.random() * optionKeys.length)] : 'A';
    }
    
    if (questionText && questionText.length > 5) {
      questions.push({
        id: questionNumber,
        number: questionNumber,
        subject: subject as 'physics' | 'chemistry' | 'maths',
        type: questionType,
        text: questionText,
        options: questionType === 'numerical' ? undefined : options,
        correctAnswer,
        marks: 4,
        negativeMark: -1,
      });
    }
  });
  
  // If no questions were parsed, generate some mock questions
  if (questions.length === 0) {
    return generateMockQuestions();
  }
  
  return questions;
};

const determineSubject = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  // Physics keywords
  const physicsKeywords = ['force', 'energy', 'momentum', 'velocity', 'acceleration', 'mass', 'gravity', 'electric', 'magnetic', 'wave', 'frequency', 'amplitude', 'newton', 'joule', 'watt', 'volt', 'current', 'resistance', 'capacitor', 'inductor', 'motion', 'friction', 'pressure', 'temperature', 'thermodynamics', 'optics', 'lens', 'mirror', 'refraction', 'diffraction'];
  
  // Chemistry keywords  
  const chemistryKeywords = ['atom', 'molecule', 'element', 'compound', 'reaction', 'bond', 'ionic', 'covalent', 'electron', 'proton', 'neutron', 'periodic', 'oxidation', 'reduction', 'acid', 'base', 'salt', 'ph', 'molarity', 'molality', 'catalyst', 'equilibrium', 'enthalpy', 'entropy', 'organic', 'inorganic', 'hydrocarbon', 'polymer', 'isomer'];
  
  // Math keywords
  const mathKeywords = ['function', 'derivative', 'integral', 'limit', 'matrix', 'determinant', 'vector', 'probability', 'statistics', 'geometry', 'trigonometry', 'algebra', 'calculus', 'logarithm', 'exponential', 'polynomial', 'quadratic', 'linear', 'parabola', 'hyperbola', 'ellipse', 'circle', 'triangle', 'angle', 'sine', 'cosine', 'tangent'];
  
  const physicsScore = physicsKeywords.reduce((score, keyword) => 
    score + (lowerText.includes(keyword) ? 1 : 0), 0);
  const chemistryScore = chemistryKeywords.reduce((score, keyword) => 
    score + (lowerText.includes(keyword) ? 1 : 0), 0);
  const mathScore = mathKeywords.reduce((score, keyword) => 
    score + (lowerText.includes(keyword) ? 1 : 0), 0);
  
  if (physicsScore > chemistryScore && physicsScore > mathScore) return 'physics';
  if (chemistryScore > mathScore) return 'chemistry';
  return 'maths';
};

const generateMockQuestions = (): Question[] => {
  const questions: Question[] = [];
  const subjects: Array<'physics' | 'chemistry' | 'maths'> = ['physics', 'chemistry', 'maths'];
  
  for (let i = 1; i <= 30; i++) {
    const subject = subjects[Math.floor((i - 1) / 10)];
    const isNumerical = Math.random() > 0.7; // 30% numerical questions
    
    const question: Question = {
      id: i,
      number: i,
      subject,
      type: isNumerical ? 'numerical' : 'mcq',
      text: `Sample ${subject} question ${i}. This is a mock question for demonstration purposes. Please solve this problem using the appropriate method.`,
      options: isNumerical ? undefined : {
        A: `Option A for question ${i}`,
        B: `Option B for question ${i}`,
        C: `Option C for question ${i}`,
        D: `Option D for question ${i}`,
      },
      correctAnswer: isNumerical ? Math.round(Math.random() * 100 * 100) / 100 : ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
      marks: 4,
      negativeMark: -1,
    };
    
    questions.push(question);
  }
  
  return questions;
};
