import { useState, useRef, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import {
  MessageSquare, Send, Bot, User, RotateCcw, ThumbsUp,
  Zap, Brain, Users, ChevronRight, Award, Clock, Loader2,
  Mic, MicOff, Video, VideoOff, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Message {
  role: "interviewer" | "user" | "system";
  content: string;
  timestamp: Date;
  feedback?: AnswerFeedback;
}

interface AnswerFeedback {
  technical: number;
  communication: number;
  confidence: number;
  tip: string;
}

interface FinalFeedback {
  technical: number;
  communication: number;
  confidence: number;
  overall: number;
  strengths: string[];
  improvements: string[];
  betterAnswer: string;
  totalQuestions: number;
  answeredQuestions: number;
}

type InterviewType = "technical" | "behavioral" | "mixed";
type Difficulty = "easy" | "medium" | "hard";

const questionBank: Record<string, Record<InterviewType, Record<Difficulty, string[]>>> = {
  "Frontend Developer": {
    technical: {
      easy: [
        "What is the difference between var, let, and const?",
        "Explain what the DOM is.",
        "What are semantic HTML elements? Give examples.",
        "What is the CSS Box Model?",
      ],
      medium: [
        "How does the Virtual DOM work in React?",
        "Explain closures in JavaScript with an example.",
        "What is the difference between useEffect and useLayoutEffect?",
        "How would you implement lazy loading in a React app?",
        "Explain the concept of CSS specificity.",
        "What are React hooks and why were they introduced?",
      ],
      hard: [
        "Design a real-time collaborative text editor architecture.",
        "How would you implement server-side rendering from scratch?",
        "Explain the React fiber reconciliation algorithm.",
        "How would you optimize a React app that renders 10,000 list items?",
      ],
    },
    behavioral: {
      easy: [
        "Tell me about yourself and your interest in frontend development.",
        "Why do you want to work as a frontend developer?",
      ],
      medium: [
        "Describe a challenging bug you fixed and what you learned.",
        "Tell me about a time you had to meet a tight deadline.",
        "How do you stay updated with new frontend technologies?",
        "Describe a situation where you disagreed with a design decision.",
      ],
      hard: [
        "Tell me about a time you had to refactor a large legacy codebase.",
        "Describe how you mentored a junior developer through a difficult project.",
      ],
    },
    mixed: { easy: [], medium: [], hard: [] },
  },
  "Backend Developer": {
    technical: {
      easy: [
        "What is an API and how does it work?",
        "Explain the difference between GET and POST requests.",
        "What is a database index?",
      ],
      medium: [
        "Explain RESTful API design principles.",
        "What is the difference between SQL and NoSQL databases? When would you use each?",
        "How do you handle authentication vs authorization?",
        "Explain database normalization and its forms.",
        "What is middleware in Express/Node.js?",
        "How would you design a rate limiter?",
      ],
      hard: [
        "Design a URL shortening service like bit.ly.",
        "How would you implement a message queue system?",
        "Explain CAP theorem and its practical implications.",
        "How would you handle distributed transactions across microservices?",
      ],
    },
    behavioral: {
      easy: [
        "What drew you to backend development?",
        "How do you approach learning new technologies?",
      ],
      medium: [
        "Describe a time you debugged a complex production issue.",
        "Tell me about a system you designed that you're proud of.",
        "How do you handle conflicting priorities from stakeholders?",
      ],
      hard: [
        "Tell me about a time a production system you built failed. What happened?",
        "Describe how you led a major architectural migration.",
      ],
    },
    mixed: { easy: [], medium: [], hard: [] },
  },
  "Data Scientist": {
    technical: {
      easy: [
        "What is the difference between supervised and unsupervised learning?",
        "Explain what a confusion matrix is.",
        "What is the purpose of train-test split?",
      ],
      medium: [
        "How do you handle missing data in a dataset?",
        "Explain the bias-variance tradeoff.",
        "What is overfitting and how do you prevent it?",
        "Explain cross-validation and why it's important.",
        "What evaluation metrics would you use for imbalanced classification?",
        "How does gradient descent work?",
      ],
      hard: [
        "Explain how transformers work in NLP.",
        "Design an ML pipeline for a recommendation system.",
        "How would you detect and handle concept drift in production?",
        "Explain the math behind backpropagation.",
      ],
    },
    behavioral: {
      easy: [
        "What excites you about data science?",
        "Describe your favorite data project.",
      ],
      medium: [
        "Tell me about a time your analysis led to a business decision.",
        "How do you communicate complex findings to non-technical stakeholders?",
        "Describe a project where data quality was a major challenge.",
      ],
      hard: [
        "Tell me about a time your model's predictions were wrong and the impact.",
        "How do you handle ethical concerns in ML models?",
      ],
    },
    mixed: { easy: [], medium: [], hard: [] },
  },
  "Full Stack Developer": {
    technical: {
      easy: [
        "What is the difference between frontend and backend?",
        "Explain what an ORM is.",
        "What is version control and why is it important?",
      ],
      medium: [
        "How do you design a REST API for a blog application?",
        "Explain how authentication with JWT tokens works.",
        "What are WebSockets and when would you use them?",
        "How do you handle database migrations in production?",
        "Explain the concept of server-side rendering vs client-side rendering.",
      ],
      hard: [
        "Design the architecture for a real-time chat application.",
        "How would you implement a CI/CD pipeline from scratch?",
        "Explain how you'd scale a full-stack app from 100 to 1M users.",
      ],
    },
    behavioral: {
      easy: [
        "Why do you prefer full-stack over specializing?",
        "How do you manage your time between frontend and backend tasks?",
      ],
      medium: [
        "Tell me about a project where you owned the entire stack.",
        "Describe a time you had to quickly learn a new technology for a project.",
        "How do you prioritize features in a sprint?",
      ],
      hard: [
        "Describe how you handled a major production outage.",
        "Tell me about a time you had to make a critical architecture decision with incomplete information.",
      ],
    },
    mixed: { easy: [], medium: [], hard: [] },
  },
  "DevOps Engineer": {
    technical: {
      easy: [
        "What is CI/CD?",
        "Explain the difference between a container and a virtual machine.",
        "What is Infrastructure as Code?",
      ],
      medium: [
        "How does Docker networking work?",
        "Explain Kubernetes pods, services, and deployments.",
        "How would you set up monitoring for a microservices architecture?",
        "What is a blue-green deployment?",
        "How do you manage secrets in a CI/CD pipeline?",
      ],
      hard: [
        "Design a multi-region disaster recovery strategy.",
        "How would you implement a zero-downtime migration for a database?",
        "Explain service mesh architecture and when to use it.",
      ],
    },
    behavioral: {
      easy: [
        "What attracted you to DevOps?",
        "How do you handle on-call responsibilities?",
      ],
      medium: [
        "Describe a time you automated a painful manual process.",
        "Tell me about a production incident and how you resolved it.",
        "How do you balance security with developer velocity?",
      ],
      hard: [
        "Describe how you built a platform team's culture from scratch.",
        "Tell me about the most complex infrastructure challenge you've solved.",
      ],
    },
    mixed: { easy: [], medium: [], hard: [] },
  },
};

// Populate mixed questions from technical + behavioral
Object.keys(questionBank).forEach((role) => {
  (["easy", "medium", "hard"] as Difficulty[]).forEach((diff) => {
    questionBank[role].mixed[diff] = [
      ...questionBank[role].technical[diff],
      ...questionBank[role].behavioral[diff],
    ];
  });
});

const roles = Object.keys(questionBank);

const feedbackTemplates = {
  excellent: [
    "Excellent answer! You demonstrated strong understanding.",
    "Great response! Very thorough and well-structured.",
    "Impressive! You covered the key points effectively.",
  ],
  good: [
    "Good answer. You covered the main concepts well.",
    "Solid response. A few more details would strengthen it.",
    "Nice job! Consider adding a real-world example next time.",
  ],
  average: [
    "Decent attempt. Try to provide more technical depth.",
    "You're on the right track. Expand on the 'why' behind your answer.",
    "Fair response. Practice structuring with intro → details → example.",
  ],
  weak: [
    "This needs more depth. Review this topic and try again.",
    "Consider studying this area more. Focus on core concepts first.",
    "Keep practicing! Try explaining this to a friend for better understanding.",
  ],
};

const tips: Record<string, string[]> = {
  technical: [
    "Use the STAR method: Situation, Task, Action, Result",
    "Include specific technical terms and concepts",
    "Mention trade-offs and alternatives you considered",
    "Give a concrete code example when possible",
    "Explain your reasoning process, not just the answer",
  ],
  communication: [
    "Start with a brief overview before diving into details",
    "Use clear, concise language",
    "Avoid filler words like 'um', 'like', 'you know'",
    "Pause between key points for emphasis",
    "Summarize your answer at the end",
  ],
  confidence: [
    "Own your answer — avoid hedging with 'I think maybe...'",
    "It's okay to say 'I'd need to research that, but here's my understanding...'",
    "Practice answering aloud before interviews",
    "Use confident language: 'In my experience...' or 'The approach I'd take is...'",
  ],
};

const followUpQuestions: Record<string, string[]> = {
  "Frontend Developer": [
    "Can you explain how you'd handle that in a production environment?",
    "What trade-offs did you consider with that approach?",
    "How would this scale with a larger codebase?",
    "Can you walk me through the performance implications?",
    "How would you test this implementation?",
    "What alternative approaches did you consider?",
    "How would this work on mobile devices?",
    "Can you describe a real scenario where you applied this?",
  ],
  "Backend Developer": [
    "How would you handle error cases in this approach?",
    "What about data consistency in a distributed system?",
    "How would you monitor this in production?",
    "Can you explain the security implications?",
    "What would change if you needed 10x the throughput?",
    "How would you handle backward compatibility?",
    "What database optimizations would you apply?",
    "How would you document this for your team?",
  ],
  "Data Scientist": [
    "How would you validate this model's results?",
    "What if the data distribution changes over time?",
    "How would you explain these findings to a non-technical stakeholder?",
    "What ethical considerations should we keep in mind?",
    "How would you handle class imbalance in this case?",
    "What metrics would you track in production?",
    "Can you walk me through your feature selection process?",
    "How would you A/B test this model?",
  ],
  "Full Stack Developer": [
    "How would you handle authentication across the stack?",
    "What caching strategy would you use?",
    "How would you structure the API for mobile clients too?",
    "Can you explain your deployment strategy?",
    "How would you handle real-time updates?",
    "What testing strategy covers both frontend and backend?",
    "How would you handle migrations in production?",
    "What monitoring would you set up?",
  ],
  "DevOps Engineer": [
    "How would you handle a rollback scenario?",
    "What's your approach to secret management?",
    "How would you implement blue-green deployments?",
    "Can you explain your disaster recovery strategy?",
    "How would you handle auto-scaling?",
    "What observability tools would you use?",
    "How would you ensure compliance in this setup?",
    "What would your incident response process look like?",
  ],
};

const suggestedAnswers: Record<string, Record<string, string>> = {
  "Frontend Developer": {
    "var, let, const": "var is function-scoped with hoisting, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned. In modern JavaScript, prefer const by default, use let when reassignment is needed, and avoid var due to its confusing scoping behavior.",
    "Virtual DOM": "The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to efficiently update the UI — when state changes, React creates a new Virtual DOM tree, diffs it against the previous one (reconciliation), and applies only the minimal necessary changes to the real DOM.",
    "default": "Start with a clear definition, then explain the 'why' and 'how', give a concrete code example, and discuss trade-offs or alternatives.",
  },
  "Backend Developer": {
    "RESTful": "REST APIs follow principles like statelessness, resource-based URLs, standard HTTP methods (GET, POST, PUT, DELETE), proper status codes, and HATEOAS. Each endpoint represents a resource, and the API should be predictable, consistent, and well-documented.",
    "default": "Begin with the core concept, explain implementation details with specific technology choices, discuss scalability considerations, and mention monitoring/error handling.",
  },
  "Data Scientist": {
    "supervised": "Supervised learning uses labeled data to train models — the algorithm learns a mapping from inputs to known outputs (e.g., classification, regression). Unsupervised learning finds patterns in unlabeled data (e.g., clustering, dimensionality reduction). Semi-supervised and self-supervised approaches bridge the gap.",
    "default": "Define the concept clearly, explain the mathematical intuition if applicable, discuss practical applications, and mention evaluation approaches.",
  },
  "Full Stack Developer": {
    "default": "Cover both frontend and backend perspectives, explain data flow end-to-end, discuss your technology choices and trade-offs, and mention testing and deployment considerations.",
  },
  "DevOps Engineer": {
    "default": "Explain the infrastructure pattern, discuss automation approaches, mention monitoring and alerting, and consider security and compliance implications.",
  },
};

function getFollowUp(role: string, answer: string): string {
  const pool = followUpQuestions[role] || followUpQuestions["Full Stack Developer"];
  return pool[Math.floor(Math.random() * pool.length)];
}

function getSuggestedAnswer(role: string, question: string): string {
  const roleAnswers = suggestedAnswers[role] || suggestedAnswers["Full Stack Developer"];
  for (const [key, answer] of Object.entries(roleAnswers)) {
    if (key !== "default" && question.toLowerCase().includes(key.toLowerCase())) {
      return answer;
    }
  }
  return roleAnswers["default"] || "Structure your answer with a clear introduction, technical details, examples, and conclusion.";
}

function analyzeAnswer(answer: string, questionType: InterviewType): AnswerFeedback {
  const words = answer.trim().split(/\s+/);
  const wordCount = words.length;
  const sentences = answer.split(/[.!?]+/).filter(Boolean);
  const hasCodeTerms = /function|const|let|var|class|import|export|return|async|await|=>|\.map|\.filter|interface|type /i.test(answer);
  const hasExamples = /for example|for instance|such as|like when|in my experience|I once|I built|I worked/i.test(answer);
  const hasStructure = /first|second|third|additionally|moreover|however|in conclusion|to summarize|the main|key point/i.test(answer);

  let technical = 4;
  if (wordCount > 30) technical += 1;
  if (wordCount > 60) technical += 1;
  if (wordCount > 100) technical += 1;
  if (hasCodeTerms) technical += 1;
  if (hasExamples) technical += 1;
  if (sentences.length >= 3) technical += 1;
  technical = Math.min(10, technical);

  let communication = 4;
  if (wordCount > 20) communication += 1;
  if (wordCount > 50) communication += 1;
  if (hasStructure) communication += 2;
  if (sentences.length >= 2) communication += 1;
  if (hasExamples) communication += 1;
  communication = Math.min(10, communication);

  let confidence = 4;
  const hedging = /i think maybe|i'm not sure|i guess|probably|might be|could be wrong/i.test(answer);
  if (!hedging) confidence += 2;
  if (wordCount > 40) confidence += 1;
  if (wordCount > 80) confidence += 1;
  if (hasExamples) confidence += 1;
  if (/I built|I designed|I implemented|I led|In my experience/i.test(answer)) confidence += 1;
  confidence = Math.min(10, confidence);

  const avg = (technical + communication + confidence) / 3;
  let category: keyof typeof feedbackTemplates;
  if (avg >= 8) category = "excellent";
  else if (avg >= 6) category = "good";
  else if (avg >= 4) category = "average";
  else category = "weak";

  const tipPool = [
    ...tips.technical.slice(0, 2),
    ...tips.communication.slice(0, 2),
    ...tips.confidence.slice(0, 1),
  ];

  const randomTip = tipPool[Math.floor(Math.random() * tipPool.length)];

  return {
    technical,
    communication,
    confidence,
    tip: `${feedbackTemplates[category][Math.floor(Math.random() * feedbackTemplates[category].length)]} 💡 Tip: ${randomTip}`,
  };
}

const MockInterviewPage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [interviewType, setInterviewType] = useState<InterviewType>("mixed");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FinalFeedback | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState<AnswerFeedback[]>([]);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [responseMode, setResponseMode] = useState<"text" | "voice" | "camera">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const startVoiceRecording = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition not supported. Use Chrome or Edge."); return; }
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    let finalT = input;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalT += (finalT ? " " : "") + event.results[i][0].transcript;
        else interim = event.results[i][0].transcript;
      }
      setInput(finalT + (interim ? " " + interim : ""));
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopVoiceRecording = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
  };

  const toggleVoice = () => isRecording ? stopVoiceRecording() : startVoiceRecording();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240, facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch { alert("Camera access denied. Please allow camera access."); }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsCameraOn(false);
  };

  const toggleCamera = () => isCameraOn ? stopCamera() : startCamera();

  const selectMode = (mode: "text" | "voice" | "camera") => {
    if (mode !== "voice" && isRecording) stopVoiceRecording();
    if (mode !== "camera" && isCameraOn) stopCamera();
    setResponseMode(mode);
    if (mode === "camera") startCamera();
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const addBotMessage = useCallback((content: string, feedbackData?: AnswerFeedback) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "interviewer", content, timestamp: new Date(), feedback: feedbackData },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  }, []);

  const startInterview = () => {
    if (!selectedRole) return;
    const pool = questionBank[selectedRole][interviewType][difficulty];
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 6);
    setQuestions(shuffled);
    setStarted(true);
    setQuestionIndex(0);
    setFeedback(null);
    setAllFeedbacks([]);
    setTimer(0);
    setTimerActive(true);

    setMessages([
      {
        role: "system",
        content: `Interview started — ${selectedRole} • ${interviewType} • ${difficulty}`,
        timestamp: new Date(),
      },
      {
        role: "interviewer",
        content: `Hello! Welcome to your ${selectedRole} mock interview. I'll be asking you ${shuffled.length} ${interviewType} questions at ${difficulty} difficulty.\n\nTake your time with each answer. Ready? Let's begin!`,
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "interviewer",
          content: `**Question 1 of ${shuffled.length}:**\n\n${shuffled[0]}`,
          timestamp: new Date(),
        },
      ]);
    }, 1200);
  };

  const submitAnswer = () => {
    if (!input.trim() || isTyping) return;

    // Stop recording if active
    if (isRecording) stopVoiceRecording();

    const answerMethod = responseMode === "voice" ? " 🎤" : responseMode === "camera" ? " 📹" : "";
    const userMessage: Message = {
      role: "user",
      content: input + answerMethod,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const answerFeedback = analyzeAnswer(input, interviewType);
    const newFeedbacks = [...allFeedbacks, answerFeedback];
    setAllFeedbacks(newFeedbacks);

    const nextIndex = questionIndex + 1;

    if (nextIndex < questions.length) {
      // Per-answer feedback + follow-up + next question
      const currentQuestion = questions[questionIndex];
      const followUp = getFollowUp(selectedRole, input);
      const suggested = getSuggestedAnswer(selectedRole, currentQuestion);

      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "interviewer",
            content: `${answerFeedback.tip}\n\n💡 **Suggested approach:** ${suggested}${isCameraOn ? `\n\n📹 **Body Language:** ${getBodyLanguageFeedback()}` : ""}\n\n🔄 **Follow-up:** ${followUp}`,
            timestamp: new Date(),
            feedback: answerFeedback,
          },
        ]);
        setIsTyping(false);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "interviewer",
              content: `**Question ${nextIndex + 1} of ${questions.length}:**\n\n${questions[nextIndex]}`,
              timestamp: new Date(),
            },
          ]);
        }, 800);
      }, 1000 + Math.random() * 500);

      setQuestionIndex(nextIndex);
    } else {
      // Final feedback
      setTimerActive(false);
      const avgTech = Math.round(newFeedbacks.reduce((a, f) => a + f.technical, 0) / newFeedbacks.length);
      const avgComm = Math.round(newFeedbacks.reduce((a, f) => a + f.communication, 0) / newFeedbacks.length);
      const avgConf = Math.round(newFeedbacks.reduce((a, f) => a + f.confidence, 0) / newFeedbacks.length);
      const overall = Math.round((avgTech + avgComm + avgConf) / 3);

      const strengths: string[] = [];
      const improvements: string[] = [];
      if (avgTech >= 7) strengths.push("Strong technical knowledge");
      else improvements.push("Deepen technical understanding with examples");
      if (avgComm >= 7) strengths.push("Clear and structured communication");
      else improvements.push("Structure answers: overview → details → example");
      if (avgConf >= 7) strengths.push("Confident delivery");
      else improvements.push("Use confident language, avoid hedging phrases");
      if (newFeedbacks.length >= 4) strengths.push("Good persistence through all questions");
      if (overall >= 7) strengths.push("Well-rounded interview performance");
      else improvements.push("Practice with more mock interviews regularly");

      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "interviewer",
            content: `That concludes our interview! 🎉\n\nYou answered ${newFeedbacks.length} questions in ${formatTime(timer)}. Check the feedback panel for your detailed scores and improvement tips.`,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
        setFeedback({
          technical: avgTech,
          communication: avgComm,
          confidence: avgConf,
          overall,
          strengths,
          improvements,
          betterAnswer:
            "Use the STAR method (Situation, Task, Action, Result) for behavioral questions. For technical questions, explain the concept, give an example, and discuss trade-offs.",
          totalQuestions: questions.length,
          answeredQuestions: newFeedbacks.length,
        });
      }, 1200);
    }
  };

  const endInterview = () => {
    stopCamera();
    stopVoiceRecording();
    setStarted(false);
    setMessages([]);
    setFeedback(null);
    setSelectedRole("");
    setAllFeedbacks([]);
    setTimerActive(false);
    setTimer(0);
    setResponseMode("text");
    setIsCameraOn(false);
    setIsRecording(false);
  };

  const scoreColor = (score: number) =>
    score >= 8 ? "text-success" : score >= 5 ? "text-warning" : "text-destructive";

  const scoreLabel = (score: number) =>
    score >= 8 ? "Excellent" : score >= 6 ? "Good" : score >= 4 ? "Fair" : "Needs Work";

  return (
    <AppLayout>
      <PageHeader
        title="AI Mock Interview"
        description="Practice interviews with our AI interviewer and get real-time feedback"
        icon={<MessageSquare className="h-6 w-6 text-primary-foreground" />}
      />

      {!started ? (
        <div className="max-w-2xl space-y-6">
          {/* Role Selection */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">1. Select a Role</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`rounded-lg border p-4 text-left transition-all
                    ${selectedRole === r
                      ? "border-primary bg-sidebar-accent shadow-card"
                      : "border-border hover:border-primary/40 hover:bg-secondary/50"
                    }`}
                >
                  <p className="font-medium text-foreground">{r}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {questionBank[r].technical.medium.length + questionBank[r].behavioral.medium.length}+ questions available
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Interview Type */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">2. Interview Type</h3>
            <div className="grid gap-2 sm:grid-cols-3">
              {([
                { value: "technical" as InterviewType, icon: Zap, label: "Technical", desc: "Coding & concepts" },
                { value: "behavioral" as InterviewType, icon: Users, label: "Behavioral", desc: "Soft skills & stories" },
                { value: "mixed" as InterviewType, icon: Brain, label: "Mixed", desc: "Both types combined" },
              ]).map(({ value, icon: Icon, label, desc }) => (
                <button
                  key={value}
                  onClick={() => setInterviewType(value)}
                  className={`rounded-lg border p-4 text-left transition-all
                    ${interviewType === value
                      ? "border-primary bg-sidebar-accent shadow-card"
                      : "border-border hover:border-primary/40 hover:bg-secondary/50"
                    }`}
                >
                  <Icon className="h-5 w-5 text-primary mb-2" />
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">3. Difficulty Level</h3>
            <div className="flex gap-2">
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`rounded-lg border px-6 py-3 text-sm font-medium capitalize transition-all
                    ${difficulty === d
                      ? "border-primary bg-sidebar-accent text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={startInterview}
            disabled={!selectedRole}
            size="lg"
            className="gradient-primary text-primary-foreground"
          >
            <ChevronRight className="mr-2 h-5 w-5" />
            Start Mock Interview
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat Panel */}
          <div className="lg:col-span-2 rounded-xl bg-card shadow-card border border-border flex flex-col" style={{ height: "75vh" }}>
            {/* Header */}
            <div className="border-b border-border px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="gradient-primary rounded-lg p-1.5">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-heading font-semibold text-foreground text-sm">AI Interviewer</span>
                  <div className="flex gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{selectedRole}</Badge>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize">{difficulty}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {formatTime(timer)}
                </div>
                <span className="text-xs text-muted-foreground">
                  Q{Math.min(questionIndex + 1, questions.length)}/{questions.length}
                </span>
                <Button variant="outline" size="sm" onClick={endInterview}>End</Button>
              </div>
            </div>

            {/* Progress */}
            <div className="px-5 pt-2">
              <Progress value={((questionIndex + (feedback ? 1 : 0)) / questions.length) * 100} className="h-1.5" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => {
                if (msg.role === "system") {
                  return (
                    <div key={i} className="flex justify-center">
                      <span className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "interviewer" && (
                      <div className="gradient-primary rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className="max-w-[80%] space-y-2">
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed
                          ${msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-secondary text-foreground rounded-bl-md"
                          }`}
                      >
                        {msg.content.split("\n").map((line, li) => (
                          <p key={li} className={li > 0 ? "mt-2" : ""}>
                            {line.startsWith("**") && line.endsWith("**")
                              ? <strong>{line.replace(/\*\*/g, "")}</strong>
                              : line}
                          </p>
                        ))}
                      </div>
                      {msg.feedback && (
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <span className={scoreColor(msg.feedback.technical)}>
                            Tech: {msg.feedback.technical}/10
                          </span>
                          <span className={scoreColor(msg.feedback.communication)}>
                            Comm: {msg.feedback.communication}/10
                          </span>
                          <span className={scoreColor(msg.feedback.confidence)}>
                            Conf: {msg.feedback.confidence}/10
                          </span>
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="rounded-full bg-muted p-2 h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="gradient-primary rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!feedback && (
              <div className="border-t border-border p-4">
                {/* Response Mode Selector */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] text-muted-foreground">Response mode:</span>
                  <button
                    onClick={() => selectMode("text")}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium transition-all
                      ${responseMode === "text" ? "bg-primary/10 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-transparent hover:bg-muted"}`}
                  >
                    ⌨️ Text
                  </button>
                  <button
                    onClick={() => selectMode("voice")}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium transition-all
                      ${responseMode === "voice" ? "bg-primary/10 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-transparent hover:bg-muted"}`}
                  >
                    🎤 Voice
                  </button>
                  <button
                    onClick={() => selectMode("camera")}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium transition-all
                      ${responseMode === "camera" ? "bg-primary/10 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-transparent hover:bg-muted"}`}
                  >
                    📹 Camera
                  </button>
                </div>

                {/* Camera Preview */}
                {responseMode === "camera" && (
                  <div className="mb-3 flex items-start gap-3">
                    <div className="relative rounded-lg overflow-hidden bg-foreground/5 border border-border" style={{ width: 160, height: 120 }}>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                        style={{ transform: "scaleX(-1)" }}
                      />
                      {!isCameraOn && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <VideoOff className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      {isCameraOn && (
                        <div className="absolute top-1.5 right-1.5">
                          <span className="flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">
                        📹 Camera is {isCameraOn ? "active" : "off"}. Your video is used for body language analysis feedback.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleCamera}
                        className="mt-2 text-xs"
                      >
                        {isCameraOn ? <><VideoOff className="h-3 w-3 mr-1" /> Stop Camera</> : <><Video className="h-3 w-3 mr-1" /> Start Camera</>}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Voice Recording Indicator */}
                {responseMode === "voice" && isRecording && (
                  <div className="mb-3 flex items-center gap-3 rounded-lg bg-destructive/5 border border-destructive/20 px-4 py-2.5">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-destructive opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
                    </span>
                    <span className="text-sm text-destructive font-medium">Recording... Speak your answer</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopVoiceRecording}
                      className="ml-auto text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <MicOff className="h-3 w-3 mr-1" /> Stop
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  {/* Mic button for voice mode */}
                  {responseMode === "voice" && (
                    <Button
                      onClick={toggleVoice}
                      variant={isRecording ? "destructive" : "outline"}
                      className="self-end shrink-0"
                      title={isRecording ? "Stop recording" : "Start recording"}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}

                  <Textarea
                    ref={textareaRef}
                    placeholder={
                      responseMode === "voice"
                        ? "Click 🎤 to speak, or type here. Your speech will appear as text..."
                        : responseMode === "camera"
                        ? "Type your answer while on camera for body language analysis..."
                        : "Type your answer... (Enter to send, Shift+Enter for new line)"
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submitAnswer();
                      }
                    }}
                    className="min-h-[60px] max-h-[120px] resize-none"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => {
                      if (isRecording) stopVoiceRecording();
                      submitAnswer();
                    }}
                    disabled={!input.trim() || isTyping}
                    className="gradient-primary text-primary-foreground self-end"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  {responseMode === "voice" && "🎤 Click the mic button to start speaking. Your speech is transcribed to text in real-time."}
                  {responseMode === "camera" && "📹 Your camera feed enables body language feedback. Answer via text while on camera."}
                  {responseMode === "text" && "💡 Write detailed answers for better feedback. Include examples, technical terms, and structure your response."}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: Live Score or Final Feedback */}
          <div className="space-y-4">
            {/* Live scoring during interview */}
            {!feedback && allFeedbacks.length > 0 && (
              <div className="rounded-xl bg-card p-5 shadow-card border border-border">
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Live Score</h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Technical",
                      score: Math.round(allFeedbacks.reduce((a, f) => a + f.technical, 0) / allFeedbacks.length),
                    },
                    {
                      label: "Communication",
                      score: Math.round(allFeedbacks.reduce((a, f) => a + f.communication, 0) / allFeedbacks.length),
                    },
                    {
                      label: "Confidence",
                      score: Math.round(allFeedbacks.reduce((a, f) => a + f.confidence, 0) / allFeedbacks.length),
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={`font-medium ${scoreColor(item.score)}`}>{item.score}/10</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted">
                        <div className="h-1.5 rounded-full gradient-primary transition-all duration-500" style={{ width: `${item.score * 10}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-3">
                  Based on {allFeedbacks.length} answer{allFeedbacks.length > 1 ? "s" : ""}
                </p>
              </div>
            )}

            {/* Quick tips */}
            {!feedback && (
              <div className="rounded-xl bg-card p-5 shadow-card border border-border">
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">💡 Interview Tips</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Structure answers clearly with intro → details → example</li>
                  <li>• Use specific technical terminology</li>
                  <li>• Include real-world examples from projects</li>
                  <li>• Discuss trade-offs and alternatives</li>
                  <li>• Keep answers focused and concise (2-3 minutes)</li>
                </ul>
              </div>
            )}

            {/* Final Feedback */}
            {feedback && (
              <div className="rounded-xl bg-card p-5 shadow-card border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-lg font-semibold text-foreground">Final Score</h3>
                </div>

                {/* Overall Score */}
                <div className="text-center mb-5 py-4 rounded-lg bg-secondary">
                  <p className={`font-heading text-4xl font-bold ${scoreColor(feedback.overall)}`}>
                    {feedback.overall}/10
                  </p>
                  <p className={`text-sm font-medium mt-1 ${scoreColor(feedback.overall)}`}>
                    {scoreLabel(feedback.overall)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feedback.answeredQuestions}/{feedback.totalQuestions} questions • {formatTime(timer)}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-3 mb-5">
                  {[
                    { label: "Technical", score: feedback.technical },
                    { label: "Communication", score: feedback.communication },
                    { label: "Confidence", score: feedback.confidence },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={`font-medium ${scoreColor(item.score)}`}>
                          {item.score}/10 — {scoreLabel(item.score)}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div className="h-2 rounded-full gradient-primary transition-all duration-700" style={{ width: `${item.score * 10}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strengths */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5 text-success" /> Strengths
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {feedback.strengths.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">🎯 Areas to Improve</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {feedback.improvements.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>

                {/* Better Answer Tip */}
                <div className="rounded-lg bg-secondary p-3 mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-1">💡 Pro Tip</h4>
                  <p className="text-xs text-muted-foreground">{feedback.betterAnswer}</p>
                </div>

                <Button onClick={endInterview} className="w-full gradient-primary text-primary-foreground">
                  <RotateCcw className="mr-2 h-4 w-4" /> Practice Again
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default MockInterviewPage;
