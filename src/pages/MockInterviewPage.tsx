import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { MessageSquare, Send, Bot, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Message {
  role: "interviewer" | "user";
  content: string;
}

interface Feedback {
  technical: number;
  communication: number;
  confidence: number;
  strengths: string[];
  improvements: string[];
  betterAnswer: string;
}

const interviewQuestions: Record<string, string[]> = {
  "Frontend Developer": [
    "Explain the difference between var, let, and const in JavaScript.",
    "What is the Virtual DOM and how does React use it?",
    "How would you optimize the performance of a React application?",
    "Describe the CSS Box Model.",
    "Tell me about a challenging project you worked on and how you overcame obstacles.",
    "How do you handle state management in large React applications?",
    "What are Web Vitals and why do they matter?",
    "How do you ensure cross-browser compatibility?",
  ],
  "Backend Developer": [
    "Explain RESTful API design principles.",
    "What is the difference between SQL and NoSQL databases?",
    "How do you handle authentication and authorization?",
    "Describe a time you debugged a complex production issue.",
    "What is middleware and how is it used?",
    "Explain database indexing and when to use it.",
    "How do you design for scalability?",
    "What are microservices and when would you use them?",
  ],
  "Data Scientist": [
    "Explain the difference between supervised and unsupervised learning.",
    "How do you handle missing data in a dataset?",
    "What is overfitting and how do you prevent it?",
    "Describe a data analysis project you are proud of.",
    "Explain the bias-variance tradeoff.",
    "What evaluation metrics would you use for a classification problem?",
    "How do you feature engineer for a machine learning model?",
    "Explain cross-validation and its importance.",
  ],
};

const roles = Object.keys(interviewQuestions);

const MockInterviewPage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startInterview = () => {
    if (!selectedRole) return;
    setStarted(true);
    setQuestionIndex(0);
    setFeedback(null);
    const firstQ = interviewQuestions[selectedRole][0];
    setMessages([
      { role: "interviewer", content: `Welcome! I'll be your interviewer today for the ${selectedRole} position. Let's begin.` },
      { role: "interviewer", content: firstQ },
    ]);
  };

  const submitAnswer = () => {
    if (!input.trim()) return;
    const questions = interviewQuestions[selectedRole];
    const newMessages: Message[] = [...messages, { role: "user", content: input }];

    const nextIndex = questionIndex + 1;

    // Generate simple feedback scores
    const wordCount = input.trim().split(/\s+/).length;
    const technicalScore = Math.min(10, Math.max(3, Math.round(wordCount / 8)));
    const commScore = Math.min(10, Math.max(4, Math.round(wordCount / 6)));
    const confScore = Math.min(10, Math.max(3, Math.round(wordCount / 7)));

    if (nextIndex < questions.length) {
      newMessages.push({
        role: "interviewer",
        content: `Good answer! Let me give you a quick score: Technical ${technicalScore}/10, Communication ${commScore}/10. \n\nNext question:`,
      });
      newMessages.push({ role: "interviewer", content: questions[nextIndex] });
      setQuestionIndex(nextIndex);
    } else {
      newMessages.push({
        role: "interviewer",
        content: "Great job! That concludes our interview. Here's your detailed feedback:",
      });
      setFeedback({
        technical: technicalScore,
        communication: commScore,
        confidence: confScore,
        strengths: ["Good problem-solving approach", "Clear explanations", "Relevant examples used"],
        improvements: ["Add more technical depth", "Structure answers using STAR method", "Practice concise delivery"],
        betterAnswer: "Consider structuring your answer with a brief overview, then key technical details, followed by a real-world example.",
      });
    }

    setMessages(newMessages);
    setInput("");
  };

  const endInterview = () => {
    setStarted(false);
    setMessages([]);
    setFeedback(null);
    setSelectedRole("");
  };

  return (
    <AppLayout>
      <PageHeader
        title="AI Mock Interview"
        description="Practice interviews with our AI interviewer and get instant feedback"
        icon={<MessageSquare className="h-6 w-6 text-primary-foreground" />}
      />

      {!started ? (
        <div className="rounded-xl bg-card p-6 shadow-card border border-border max-w-lg">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Select a Role</h3>
          <div className="grid gap-3 mb-4">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`rounded-lg border p-4 text-left transition-all
                  ${selectedRole === r ? "border-primary bg-sidebar-accent" : "border-border hover:border-primary/40"}`}
              >
                <p className="font-medium text-foreground">{r}</p>
                <p className="text-xs text-muted-foreground">{interviewQuestions[r].length} questions</p>
              </button>
            ))}
          </div>
          <Button onClick={startInterview} disabled={!selectedRole} className="gradient-primary text-primary-foreground">
            Start Interview
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat */}
          <div className="lg:col-span-2 rounded-xl bg-card shadow-card border border-border flex flex-col" style={{ height: "70vh" }}>
            <div className="border-b border-border px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-heading font-semibold text-foreground">AI Interviewer</span>
                <span className="text-xs text-muted-foreground">• {selectedRole}</span>
              </div>
              <Button variant="outline" size="sm" onClick={endInterview}>End Interview</Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "interviewer" && (
                    <div className="gradient-primary rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`rounded-xl px-4 py-3 max-w-[80%] text-sm whitespace-pre-wrap
                    ${msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"}`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="rounded-full bg-muted p-2 h-8 w-8 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {!feedback && (
              <div className="border-t border-border p-4 flex gap-2">
                <Input
                  placeholder="Type your answer..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
                />
                <Button onClick={submitAnswer} className="gradient-primary text-primary-foreground">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Feedback Panel */}
          {feedback && (
            <div className="rounded-xl bg-card p-5 shadow-card border border-border h-fit">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Interview Feedback</h3>

              <div className="space-y-3 mb-4">
                {[
                  { label: "Technical Knowledge", score: feedback.technical },
                  { label: "Communication", score: feedback.communication },
                  { label: "Confidence", score: feedback.confidence },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-foreground">{item.score}/10</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full gradient-primary transition-all"
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">✅ Strengths</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {feedback.strengths.map((s) => <li key={s}>• {s}</li>)}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">🎯 Improve</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {feedback.improvements.map((s) => <li key={s}>• {s}</li>)}
                </ul>
              </div>

              <div className="rounded-lg bg-secondary p-3">
                <h4 className="text-sm font-medium text-foreground mb-1">💡 Better Answer Tip</h4>
                <p className="text-xs text-muted-foreground">{feedback.betterAnswer}</p>
              </div>

              <Button onClick={endInterview} className="w-full mt-4" variant="outline">
                Practice Again
              </Button>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default MockInterviewPage;
