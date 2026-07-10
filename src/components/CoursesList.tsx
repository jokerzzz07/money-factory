import React, { useState, useEffect } from "react";
import { BookOpen, Clock, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Sparkles } from "lucide-react";
import { Course } from "../types";

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  
  // Interactive mini-quiz state
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setCourses(data.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        // Fallback standard course data
        const fallback: Course[] = [
          {
            id: "course-1",
            title: "Institutional Order Blocks & Liquidity",
            description: "Learn how central banks accumulate and distribute volume. Master supply, demand, and liquidity engineering.",
            lessonsCount: 12,
            duration: "4.5 hours",
            difficulty: "Intermediate",
            progress: 75,
            modules: [
              "Defining institutional orders vs. retail patterns",
              "Identifying valid order blocks (OB) vs. fake zones",
              "Mitigation cycles and premium/discount pricing",
              "Liquidity sweeps: Engineering fake breakouts",
            ],
          },
          {
            id: "course-2",
            title: "Inefficiencies: Fair Value Gaps (FVG)",
            description: "Understand imbalances in delivery. Spot price displacement, voids, and institutional delivery cycles.",
            lessonsCount: 8,
            duration: "3.2 hours",
            difficulty: "Beginner",
            progress: 40,
            modules: [
              "Introduction to one-sided market delivery",
              "Drawing and measuring Fair Value Gaps (FVG)",
              "Consequent encroachment: Key 50% equilibrium levels",
              "Combining FVGs with Order Blocks",
            ],
          },
        ];
        setCourses(fallback);
        setLoading(false);
      });
  }, []);

  const handleToggleExpand = (id: string) => {
    setExpandedCourse(expandedCourse === id ? null : id);
    setQuizOpen(false);
    setSelectedAnswer(null);
    setSubmittedQuiz(false);
  };

  const quizQuestion = {
    question: "When a high-volume candle sweeps previous lows and immediately closes back above, leaving a long shadow, what SMC concept was triggered?",
    options: [
      "Retail Double Bottom Confirmation",
      "Sell-Side Liquidity Sweep into Bullish Displacement",
      "Bearish Fair Value Gap Alignment",
      "Consolidation Breakout Continuation",
    ],
    correctIdx: 1,
    explanation: "Correct! Institutions engineer sell-side liquidity sweeps to fill large buy orders in discount zones before displacing prices upward.",
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setSubmittedQuiz(true);
    }
  };

  if (loading) {
    return (
      <div id="courses-loading-container" className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="h-10 w-10 animate-spin rounded-none border-2 border-primary-brand border-t-transparent" />
        <span className="text-[10px] text-primary-brand font-bold uppercase tracking-widest font-mono">Loading Curriculum Matrix...</span>
      </div>
    );
  }

  return (
    <div id="courses-section-wrapper" className="space-y-8 max-w-5xl mx-auto px-4">
      {/* Tab Header Description */}
      <div id="courses-section-header" className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-none bg-navy-lighter px-4 py-1.5 text-[10px] font-bold text-primary-brand uppercase tracking-[0.2em] border border-primary-brand/10">
          <BookOpen className="h-3.5 w-3.5" /> Institutional Curriculum
        </span>
        <h2 className="text-3xl font-serif font-bold italic tracking-tight text-primary-brand">
          Learn to Trade Like the 1%
        </h2>
        <p className="text-xs text-primary-brand/60 uppercase tracking-wider leading-relaxed">
          Unlock institutional mechanics. No lagging indicators or retail trendlines — pure, unmanipulated algorithmic orderflow and market structure.
        </p>
      </div>

      {/* Courses List Layout */}
      <div id="courses-grid" className="grid grid-cols-1 gap-6">
        {courses.map((course) => {
          // Calculate SVG stroke parameters for circular progress
          const radius = 24;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (course.progress / 100) * circumference;

          return (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="rounded-none bg-white border border-primary-brand/15 shadow-[8px_8px_0px_rgba(26,26,26,0.03)] p-8 transition-all duration-300 hover:shadow-[8px_8px_0px_rgba(26,26,26,0.08)] hover:border-primary-brand/35"
            >
              {/* Card Header Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-primary-brand/10">
                <div className="space-y-2 flex-1">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary-brand/50 uppercase tracking-[0.2em]">
                    {course.difficulty}
                  </span>
                  <h3 className="text-2xl font-serif font-bold italic text-primary-brand">
                    {course.title}
                  </h3>
                  <p className="text-xs text-primary-brand/70 leading-relaxed max-w-3xl font-serif italic">
                    {course.description}
                  </p>
                </div>

                {/* Circular Progress Indicator */}
                <div id={`progress-container-${course.id}`} className="flex items-center gap-4 bg-navy-lighter px-4 py-3 rounded-none border border-primary-brand/10 self-start md:self-center">
                  <div className="relative h-14 w-14 flex items-center justify-center">
                    <svg className="h-full w-full transform -rotate-90">
                      {/* Track */}
                      <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        className="stroke-gray-200 fill-none stroke-[6]"
                      />
                      {/* Fill */}
                      <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        className="stroke-primary-brand fill-none stroke-[6] transition-all duration-500"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-primary-brand font-mono">
                      {course.progress}%
                    </span>
                  </div>
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-primary-brand/50 font-bold">
                      Progress
                    </div>
                    <div className="text-[10px] font-bold text-primary-brand uppercase tracking-wider">
                      {course.progress === 100 ? "Completed" : "In Progress"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info & Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-6 text-[10px] text-primary-brand/60 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 font-bold">
                    <BookOpen className="h-3.5 w-3.5 text-primary-brand/40" />
                    {course.lessonsCount} lessons
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Clock className="h-3.5 w-3.5 text-primary-brand/40" />
                    {course.duration}
                  </span>
                </div>

                <button
                  id={`btn-expand-course-${course.id}`}
                  onClick={() => handleToggleExpand(course.id)}
                  className="flex items-center gap-2 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] bg-primary-brand text-white hover:bg-neutral-800 rounded-none shadow-[4px_4px_0px_rgba(26,26,26,0.15)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(26,26,26,0.15)] transition-all"
                >
                  {expandedCourse === course.id ? (
                    <>
                      Hide Modules <ChevronUp className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Expand Modules <ChevronDown className="h-3 w-3" />
                    </>
                  )}
                </button>
              </div>

              {/* Expandable Module Content */}
              {expandedCourse === course.id && (
                <div id={`modules-panel-${course.id}`} className="mt-6 border-t border-primary-brand/10 pt-6 space-y-4">
                  <h4 className="text-[9px] font-bold text-primary-brand/50 uppercase tracking-[0.2em]">
                    Course Modules & Lessons
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.modules.map((moduleStr, idx) => (
                      <div
                        key={idx}
                        id={`module-item-${course.id}-${idx}`}
                        className="flex items-start gap-3 p-4 bg-navy-lighter rounded-none border border-primary-brand/10"
                      >
                        <CheckCircle className={`h-4 w-4 mt-0.5 ${idx < (course.progress / 10) ? "text-success-green" : "text-gray-300"}`} />
                        <div>
                          <span className="text-[8px] font-bold text-primary-brand font-mono uppercase tracking-[0.15em] block mb-0.5">
                            Module 0{idx + 1}
                          </span>
                          <span className="text-xs font-serif italic font-semibold text-primary-brand leading-snug">
                            {moduleStr}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Smart conceptual practice quiz trigger */}
                  <div className="mt-6 p-6 rounded-none bg-surface-brand border border-primary-brand/15 shadow-[4px_4px_0px_rgba(26,26,26,0.03)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#EBE9E4] text-primary-brand border border-primary-brand/10">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase tracking-wider text-primary-brand">SMC Knowledge Check</h5>
                          <p className="text-[10px] text-primary-brand/60 font-serif italic">Test your mastery of institutional volume delivery.</p>
                        </div>
                      </div>
                      <button
                        id={`btn-quiz-toggle-${course.id}`}
                        onClick={() => setQuizOpen(!quizOpen)}
                        className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-none bg-primary-brand text-white hover:bg-neutral-800 transition active:scale-[0.98]"
                      >
                        {quizOpen ? "Close Check" : "Start Check"}
                      </button>
                    </div>

                    {/* Quiz Body */}
                    {quizOpen && (
                      <div className="mt-6 border-t border-primary-brand/10 pt-6 space-y-4">
                        <p className="text-xs font-serif font-bold italic text-primary-brand leading-relaxed">
                          {quizQuestion.question}
                        </p>
                        <div className="space-y-2">
                          {quizQuestion.options.map((option, oIdx) => (
                            <button
                              key={oIdx}
                              id={`quiz-option-${course.id}-${oIdx}`}
                              onClick={() => !submittedQuiz && setSelectedAnswer(oIdx)}
                              className={`w-full text-left p-3 text-[11px] rounded-none border transition flex items-center justify-between ${
                                selectedAnswer === oIdx
                                  ? submittedQuiz
                                    ? oIdx === quizQuestion.correctIdx
                                      ? "bg-success-green/10 border-success-green text-success-green font-semibold"
                                      : "bg-red-50 border-red-200 text-red-600"
                                    : "bg-[#EBE9E4] border-primary-brand text-primary-brand font-semibold"
                                  : "bg-white border-primary-brand/10 hover:border-primary-brand/35 text-primary-brand/70"
                              }`}
                              disabled={submittedQuiz}
                            >
                              <span>{option}</span>
                              {submittedQuiz && oIdx === quizQuestion.correctIdx && (
                                <CheckCircle className="h-3.5 w-3.5 text-success-green" />
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Quiz Action / Explanation */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                          {!submittedQuiz ? (
                            <button
                              id={`quiz-submit-btn-${course.id}`}
                              onClick={handleQuizSubmit}
                              disabled={selectedAnswer === null}
                              className={`px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider rounded-none text-white transition ${
                                selectedAnswer !== null
                                  ? "bg-primary-brand hover:bg-neutral-800"
                                    : "bg-gray-200 cursor-not-allowed text-gray-400"
                              }`}
                            >
                              Submit Answer
                            </button>
                          ) : (
                            <div className="rounded-none bg-white p-4 border border-primary-brand/10 w-full flex gap-3">
                              <AlertCircle className={`h-4 w-4 shrink-0 ${selectedAnswer === quizQuestion.correctIdx ? "text-success-green" : "text-amber-500"}`} />
                              <div>
                                <span className="text-[10px] uppercase tracking-wider font-bold block mb-0.5">
                                  {selectedAnswer === quizQuestion.correctIdx ? "Excellent!" : "Not quite correct"}
                                </span>
                                <span className="text-xs text-primary-brand/70 leading-normal font-serif italic">
                                  {quizQuestion.explanation}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
