// Create a new file: ExamBuilder.js
import React, { useState } from 'react';
import { Label, Input, Textarea, Select, Toggle, HelpText, FormGroup } from '../ui/Field';
import ElevatedCard from '../ui/ElevatedCard';

export default function ExamBuilder({ courseId, moduleId }) {
  const [examType, setExamType] = useState('quiz'); // quiz, assignment, test
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'mcq', // mcq, truefalse, shortanswer, coding, fileupload
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1,
    explanation: '',
    codeSnippet: '',
    allowedFileTypes: '',
    maxFileSize: 5,
  });

  // Exam configuration
  const [examConfig, setExamConfig] = useState({
    title: '',
    description: '',
    duration: 60, // minutes
    totalPoints: 100,
    passingScore: 70,
    maxAttempts: 1,
    showResultImmediately: true,
    randomizeQuestions: false,
    allowReview: true,
    scheduled: false,
    startDate: '',
    endDate: '',
    proctored: false,
  });

  // Add a new question
  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert('Please enter a question');
      return;
    }

    const newQuestion = {
      ...currentQuestion,
      id: Date.now(),
      options: currentQuestion.type === 'mcq' ? currentQuestion.options.filter(opt => opt.trim()) : [],
    };

    setQuestions([...questions, newQuestion]);
    resetCurrentQuestion();
  };

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1,
      explanation: '',
      codeSnippet: '',
      allowedFileTypes: '',
      maxFileSize: 5,
    });
  };

  // Remove question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Handle option change for MCQ
  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  // Add more options
  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ''],
    });
  };

  // Remove option
  const removeOption = (index) => {
    const newOptions = currentQuestion.options.filter((_, i) => i !== index);
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  // Save exam
  const saveExam = async () => {
    if (!examConfig.title.trim()) {
      alert('Please enter exam title');
      return;
    }

    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    const examData = {
      courseId,
      moduleId,
      ...examConfig,
      questions,
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to backend
    console.log('Saving exam:', examData);
    // await saveExamToBackend(examData);
  };

  // Import questions from file
  const importQuestions = (file) => {
    // Parse CSV/JSON file and convert to questions
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      // Parse based on file type
      // This is a simplified example
      alert('Import functionality would parse the file here');
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Exam Configuration */}
      <ElevatedCard title="Create Exam/Test" subtitle="Configure exam settings and add questions">
        <div className="space-y-6">
          {/* Exam Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setExamType('quiz')}
              className={`p-4 rounded-xl border-2 text-center transition-colors ${
                examType === 'quiz'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              <div className="font-medium mb-1">Quiz</div>
              <div className="text-sm text-gray-500">Short assessment</div>
            </button>
            <button
              onClick={() => setExamType('test')}
              className={`p-4 rounded-xl border-2 text-center transition-colors ${
                examType === 'test'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              <div className="font-medium mb-1">Test</div>
              <div className="text-sm text-gray-500">Comprehensive exam</div>
            </button>
            <button
              onClick={() => setExamType('assignment')}
              className={`p-4 rounded-xl border-2 text-center transition-colors ${
                examType === 'assignment'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              <div className="font-medium mb-1">Assignment</div>
              <div className="text-sm text-gray-500">Project/File upload</div>
            </button>
          </div>

          {/* Exam Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormGroup>
                <Label>Exam Title *</Label>
                <Input
                  value={examConfig.title}
                  onChange={(e) => setExamConfig({...examConfig, title: e.target.value})}
                  placeholder="e.g., Final Exam, Chapter 1 Quiz"
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <Textarea
                  value={examConfig.description}
                  onChange={(e) => setExamConfig({...examConfig, description: e.target.value})}
                  placeholder="Instructions for students..."
                  rows={3}
                />
              </FormGroup>

              <FormGroup>
                <Label>Duration (minutes) *</Label>
                <Input
                  type="number"
                  value={examConfig.duration}
                  onChange={(e) => setExamConfig({...examConfig, duration: parseInt(e.target.value) || 0})}
                  min="1"
                />
                <HelpText>0 for unlimited time</HelpText>
              </FormGroup>

              <FormGroup>
                <Label>Passing Score (%)</Label>
                <Input
                  type="number"
                  value={examConfig.passingScore}
                  onChange={(e) => setExamConfig({...examConfig, passingScore: parseInt(e.target.value) || 0})}
                  min="0"
                  max="100"
                />
              </FormGroup>
            </div>

            <div className="space-y-4">
              <FormGroup>
                <Label>Maximum Attempts</Label>
                <Input
                  type="number"
                  value={examConfig.maxAttempts}
                  onChange={(e) => setExamConfig({...examConfig, maxAttempts: parseInt(e.target.value) || 1})}
                  min="1"
                />
                <HelpText>0 for unlimited attempts</HelpText>
              </FormGroup>

              <div className="space-y-3">
                <Toggle
                  enabled={examConfig.showResultImmediately}
                  setEnabled={(val) => setExamConfig({...examConfig, showResultImmediately: val})}
                  label="Show results immediately"
                />
                <Toggle
                  enabled={examConfig.randomizeQuestions}
                  setEnabled={(val) => setExamConfig({...examConfig, randomizeQuestions: val})}
                  label="Randomize questions"
                />
                <Toggle
                  enabled={examConfig.allowReview}
                  setEnabled={(val) => setExamConfig({...examConfig, allowReview: val})}
                  label="Allow review after submission"
                />
                <Toggle
                  enabled={examConfig.proctored}
                  setEnabled={(val) => setExamConfig({...examConfig, proctored: val})}
                  label="Enable proctoring"
                />
              </div>

              {examConfig.scheduled && (
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup>
                    <Label>Start Date</Label>
                    <Input
                      type="datetime-local"
                      value={examConfig.startDate}
                      onChange={(e) => setExamConfig({...examConfig, startDate: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>End Date</Label>
                    <Input
                      type="datetime-local"
                      value={examConfig.endDate}
                      onChange={(e) => setExamConfig({...examConfig, endDate: e.target.value})}
                    />
                  </FormGroup>
                </div>
              )}
            </div>
          </div>
        </div>
      </ElevatedCard>

      {/* Question Builder */}
      <ElevatedCard title="Add Questions" subtitle="Build your question bank">
        <div className="space-y-6">
          {/* Question Type Selection */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            {['MCQ', 'True/False', 'Short Answer', 'Coding', 'File Upload'].map((type) => (
              <button
                key={type}
                onClick={() => setCurrentQuestion({
                  ...currentQuestion,
                  type: type.toLowerCase().replace('/', '').replace(' ', '')
                })}
                className={`p-3 rounded-lg text-center text-sm font-medium transition-colors ${
                  currentQuestion.type === type.toLowerCase().replace('/', '').replace(' ', '')
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Question Form */}
          <div className="space-y-4">
            <FormGroup>
              <Label>Question Text *</Label>
              <Textarea
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                placeholder="Enter your question here..."
                rows={3}
              />
            </FormGroup>

            {/* Options for MCQ */}
            {currentQuestion.type === 'mcq' && (
              <div className="space-y-3">
                <Label>Options *</Label>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <button
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                      disabled={currentQuestion.options.length <= 2}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  + Add Option
                </button>

                <FormGroup>
                  <Label>Correct Answer</Label>
                  <Select
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: parseInt(e.target.value)
                    })}
                  >
                    {currentQuestion.options.map((_, index) => (
                      <option key={index} value={index}>
                        Option {index + 1}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </div>
            )}

            {/* True/False Options */}
            {currentQuestion.type === 'truefalse' && (
              <FormGroup>
                <Label>Correct Answer</Label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={currentQuestion.correctAnswer === true}
                      onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: true})}
                      className="mr-2"
                    />
                    True
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={currentQuestion.correctAnswer === false}
                      onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: false})}
                      className="mr-2"
                    />
                    False
                  </label>
                </div>
              </FormGroup>
            )}

            {/* Coding Question */}
            {currentQuestion.type === 'coding' && (
              <FormGroup>
                <Label>Code Snippet/Starter Code</Label>
                <Textarea
                  value={currentQuestion.codeSnippet}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, codeSnippet: e.target.value})}
                  placeholder="Provide starter code if needed..."
                  rows={5}
                  className="font-mono text-sm"
                />
              </FormGroup>
            )}

            {/* File Upload Question */}
            {currentQuestion.type === 'fileupload' && (
              <div className="grid grid-cols-2 gap-4">
                <FormGroup>
                  <Label>Allowed File Types</Label>
                  <Input
                    value={currentQuestion.allowedFileTypes}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, allowedFileTypes: e.target.value})}
                    placeholder="e.g., .pdf,.doc,.zip"
                  />
                  <HelpText>Comma separated extensions</HelpText>
                </FormGroup>
                <FormGroup>
                  <Label>Max File Size (MB)</Label>
                  <Input
                    type="number"
                    value={currentQuestion.maxFileSize}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, maxFileSize: parseInt(e.target.value) || 5})}
                    min="1"
                    max="100"
                  />
                </FormGroup>
              </div>
            )}

            {/* Points and Explanation */}
            <div className="grid grid-cols-2 gap-4">
              <FormGroup>
                <Label>Points</Label>
                <Input
                  type="number"
                  value={currentQuestion.points}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, points: parseInt(e.target.value) || 1})}
                  min="1"
                />
              </FormGroup>
              <FormGroup>
                <Label>Explanation (For review)</Label>
                <Textarea
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, explanation: e.target.value})}
                  placeholder="Explain the correct answer..."
                  rows={2}
                />
              </FormGroup>
            </div>

            {/* Add Question Button */}
            <div className="flex justify-end">
              <button
                onClick={addQuestion}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Question
              </button>
            </div>
          </div>

          {/* Import Questions */}
          <div className="border-t pt-4">
            <Label>Import Questions</Label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".csv,.json,.txt"
                onChange={(e) => importQuestions(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <HelpText>Supported formats: CSV, JSON</HelpText>
            </div>
          </div>
        </div>
      </ElevatedCard>

      {/* Questions List */}
      {questions.length > 0 && (
        <ElevatedCard title={`Questions (${questions.length})`}>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium">Q{index + 1}: {q.question.substring(0, 50)}...</span>
                    <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {q.points} point{q.points !== 1 ? 's' : ''}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 capitalize">
                      ({q.type})
                    </span>
                  </div>
                  <button
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                {q.type === 'mcq' && (
                  <div className="ml-4 text-sm text-gray-600">
                    Options: {q.options.join(', ')}
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-lg font-medium">
                Total Points: {questions.reduce((sum, q) => sum + q.points, 0)}
              </div>
              <button
                onClick={saveExam}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Save Exam
              </button>
            </div>
          </div>
        </ElevatedCard>
      )}
    </div>
  );
}