import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import {
  Briefcase, Map, Star, TrendingUp, Building2, Wrench,
  Users, BookOpen, Calendar, FolderGit2, ExternalLink, ChevronDown, ChevronUp,
  Lightbulb, GraduationCap, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RoleDetail {
  title: string;
  description: string;
  overview: string;
  responsibilities: string[];
  industries: string[];
  technicalSkills: string[];
  softSkills: string[];
  tools: string[];
  demandScore: number;
  demandExplanation: string;
  hiringIndustries: string[];
  futureGrowth: string;
  roadmap: { phase: string; skills: string[]; milestone: string }[];
  dailyPlan: { day: string; topic: string; task: string }[];
  projects: { level: string; title: string; description: string }[];
  jobPlatforms: { name: string; url: string; searchTip: string }[];
}

const roleDatabase: Record<string, RoleDetail> = {
  "Full Stack Developer": {
    title: "Full Stack Developer",
    description: "Build end-to-end web applications covering both frontend and backend",
    overview: "Full Stack Developers handle the complete development lifecycle of web applications. They work on user interfaces, server-side logic, databases, and deployment. They're versatile engineers who can build an entire product from scratch.",
    responsibilities: [
      "Design and develop frontend user interfaces",
      "Build RESTful APIs and backend services",
      "Manage databases and data models",
      "Deploy and maintain applications",
      "Collaborate with designers and product managers",
      "Write tests and ensure code quality",
    ],
    industries: ["Tech Startups", "E-commerce", "FinTech", "Healthcare", "SaaS", "Consulting"],
    technicalSkills: ["JavaScript", "React", "Node.js", "SQL", "Git", "TypeScript", "REST APIs", "Docker"],
    softSkills: ["Problem-solving", "Communication", "Time Management", "Teamwork", "Adaptability"],
    tools: ["VS Code", "GitHub", "Postman", "Figma", "Jira", "AWS/Vercel"],
    demandScore: 92,
    demandExplanation: "Full Stack developers are among the most in-demand roles globally. Companies prefer versatile developers who can handle both frontend and backend, especially startups.",
    hiringIndustries: ["Technology", "E-commerce", "Financial Services", "Healthcare Tech", "Education Tech"],
    futureGrowth: "Strong growth expected. The shift to web-based applications and the rise of remote work continue to drive demand. AI integration skills will be a differentiator.",
    roadmap: [
      { phase: "Foundation (Week 1-2)", skills: ["HTML/CSS", "JavaScript Fundamentals", "Git Basics"], milestone: "Build a static portfolio website" },
      { phase: "Frontend (Week 3-4)", skills: ["React", "State Management", "Responsive Design"], milestone: "Build an interactive React application" },
      { phase: "Backend (Week 5-6)", skills: ["Node.js", "Express", "REST APIs", "SQL"], milestone: "Build a REST API with database" },
      { phase: "Integration (Week 7-8)", skills: ["Full Stack Project", "Authentication", "Deployment"], milestone: "Deploy a full-stack application" },
    ],
    dailyPlan: [
      { day: "Day 1-3", topic: "HTML & CSS Fundamentals", task: "Build a responsive landing page" },
      { day: "Day 4-6", topic: "JavaScript Core Concepts", task: "Build a todo app with vanilla JS" },
      { day: "Day 7-9", topic: "Git & Version Control", task: "Create a GitHub repo and practice branching" },
      { day: "Day 10-13", topic: "React Basics", task: "Convert todo app to React" },
      { day: "Day 14-16", topic: "React Advanced", task: "Build a weather dashboard with API" },
      { day: "Day 17-19", topic: "Node.js & Express", task: "Build a REST API for a blog" },
      { day: "Day 20-22", topic: "Database (SQL/PostgreSQL)", task: "Add database to blog API" },
      { day: "Day 23-25", topic: "Authentication & Security", task: "Add user auth to blog" },
      { day: "Day 26-28", topic: "Full Stack Integration", task: "Connect React frontend to blog API" },
      { day: "Day 29-30", topic: "Deployment & Polish", task: "Deploy to Vercel/Railway" },
    ],
    projects: [
      { level: "🟢 Beginner", title: "Personal Portfolio Website", description: "Responsive portfolio with projects section, about page, and contact form" },
      { level: "🟢 Beginner", title: "Weather Dashboard", description: "Fetch weather data from API and display with charts and search" },
      { level: "🟢 Beginner", title: "Todo Application", description: "CRUD todo app with categories, filters, and local storage" },
      { level: "🟡 Intermediate", title: "Blog Platform", description: "Full-stack blog with auth, CRUD posts, comments, and rich text editor" },
      { level: "🟡 Intermediate", title: "E-commerce Store", description: "Product catalog, cart, checkout flow, and order management" },
      { level: "🔴 Advanced", title: "Real-time Chat Application", description: "WebSocket-based chat with rooms, file sharing, and notifications" },
    ],
    jobPlatforms: [
      { name: "LinkedIn", url: "https://linkedin.com/jobs", searchTip: "Search 'Full Stack Developer' + your city or 'Remote'" },
      { name: "Internshala", url: "https://internshala.com", searchTip: "Filter by 'Web Development' internships for entry-level" },
      { name: "Indeed", url: "https://indeed.com", searchTip: "Use 'Junior Full Stack' or 'Full Stack Intern' for entry roles" },
      { name: "Glassdoor", url: "https://glassdoor.com", searchTip: "Check company reviews and salary ranges before applying" },
      { name: "AngelList", url: "https://wellfound.com", searchTip: "Great for startup positions with equity options" },
    ],
  },
  "Frontend Developer": {
    title: "Frontend Developer",
    description: "Create beautiful, responsive, and interactive user interfaces",
    overview: "Frontend Developers specialize in building the visual and interactive parts of web applications. They transform designs into functional interfaces that users interact with directly.",
    responsibilities: [
      "Implement UI designs with pixel-perfect accuracy",
      "Build responsive layouts for all devices",
      "Optimize web performance and accessibility",
      "Integrate with backend APIs",
      "Write unit and integration tests",
      "Maintain component libraries and design systems",
    ],
    industries: ["Tech Companies", "Digital Agencies", "Media", "E-commerce", "SaaS"],
    technicalSkills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Testing"],
    softSkills: ["Attention to Detail", "Creativity", "Communication", "User Empathy", "Collaboration"],
    tools: ["VS Code", "Chrome DevTools", "Figma", "Storybook", "GitHub", "Webpack/Vite"],
    demandScore: 88,
    demandExplanation: "Frontend development remains highly sought after as companies invest in user experience. The rise of design systems and component-driven development creates steady demand.",
    hiringIndustries: ["Technology", "Digital Marketing", "E-commerce", "Media & Publishing", "Banking"],
    futureGrowth: "Steady growth with emphasis on performance, accessibility, and AI-assisted interfaces. Knowledge of Web Components and micro-frontends is increasingly valuable.",
    roadmap: [
      { phase: "Foundation (Week 1-2)", skills: ["HTML5 Semantics", "CSS Flexbox/Grid", "Responsive Design"], milestone: "Build 3 responsive web pages" },
      { phase: "JavaScript (Week 3-4)", skills: ["ES6+", "DOM Manipulation", "Async/Await", "Fetch API"], milestone: "Build an interactive web app" },
      { phase: "React (Week 5-6)", skills: ["React Components", "Hooks", "State Management", "Routing"], milestone: "Build a multi-page React app" },
      { phase: "Advanced (Week 7-8)", skills: ["TypeScript", "Testing", "Performance", "Next.js"], milestone: "Build a production-ready Next.js app" },
    ],
    dailyPlan: [
      { day: "Day 1-3", topic: "HTML5 Semantic Elements", task: "Build a blog layout with semantic HTML" },
      { day: "Day 4-6", topic: "CSS Flexbox & Grid", task: "Recreate a popular website layout" },
      { day: "Day 7-9", topic: "Responsive Design & Media Queries", task: "Make layouts mobile-responsive" },
      { day: "Day 10-12", topic: "JavaScript Fundamentals", task: "Build an image carousel" },
      { day: "Day 13-15", topic: "ES6+ & Async JavaScript", task: "Fetch and display API data" },
      { day: "Day 16-18", topic: "React Basics & Components", task: "Build a movie search app" },
      { day: "Day 19-21", topic: "React Hooks & State", task: "Add favorites and filters" },
      { day: "Day 22-24", topic: "TypeScript with React", task: "Convert movie app to TypeScript" },
      { day: "Day 25-27", topic: "Testing & Accessibility", task: "Add tests and ARIA labels" },
      { day: "Day 28-30", topic: "Next.js & Deployment", task: "Convert to Next.js and deploy" },
    ],
    projects: [
      { level: "🟢 Beginner", title: "Responsive Landing Page", description: "Mobile-first landing page with animations and form" },
      { level: "🟢 Beginner", title: "Interactive Quiz App", description: "Multi-step quiz with scoring and results display" },
      { level: "🟢 Beginner", title: "Recipe Finder", description: "Search recipes from API with filtering and favorites" },
      { level: "🟡 Intermediate", title: "Dashboard UI", description: "Admin dashboard with charts, tables, and data filtering" },
      { level: "🟡 Intermediate", title: "Social Media Feed", description: "Infinite scroll feed with likes, comments, and user profiles" },
      { level: "🔴 Advanced", title: "Design System & Component Library", description: "Reusable component library with Storybook documentation" },
    ],
    jobPlatforms: [
      { name: "LinkedIn", url: "https://linkedin.com/jobs", searchTip: "Search 'Frontend Developer React' or 'UI Developer'" },
      { name: "Internshala", url: "https://internshala.com", searchTip: "Look for 'Frontend Development' or 'React Developer' internships" },
      { name: "Indeed", url: "https://indeed.com", searchTip: "Try 'Junior Frontend Developer' or 'React Developer'" },
      { name: "Glassdoor", url: "https://glassdoor.com", searchTip: "Compare salaries for Frontend roles in your area" },
      { name: "RemoteOK", url: "https://remoteok.com", searchTip: "Filter by 'Frontend' for remote-first positions" },
    ],
  },
  "Backend Developer": {
    title: "Backend Developer",
    description: "Design and build server-side logic, APIs, and databases",
    overview: "Backend Developers build the server-side logic that powers applications. They design APIs, manage databases, handle authentication, and ensure systems are scalable and secure.",
    responsibilities: [
      "Design and build RESTful and GraphQL APIs",
      "Manage relational and NoSQL databases",
      "Implement authentication and authorization",
      "Optimize application performance and scalability",
      "Write server-side business logic",
      "Set up monitoring, logging, and error handling",
    ],
    industries: ["FinTech", "Enterprise Software", "Cloud Services", "Healthcare", "E-commerce"],
    technicalSkills: ["Python", "Node.js", "SQL", "REST APIs", "Docker", "System Design", "MongoDB", "Redis"],
    softSkills: ["Analytical Thinking", "Problem-solving", "Documentation", "Collaboration", "Security Mindset"],
    tools: ["VS Code", "Postman", "Docker Desktop", "pgAdmin", "Redis CLI", "AWS Console"],
    demandScore: 85,
    demandExplanation: "Backend development is foundational to every tech product. Demand is consistent across industries, with particular growth in cloud-native and microservices architecture.",
    hiringIndustries: ["Technology", "Banking & Finance", "Healthcare", "E-commerce", "Government"],
    futureGrowth: "Growing demand especially for developers with cloud, security, and distributed systems expertise. AI/ML integration into backends is an emerging differentiator.",
    roadmap: [
      { phase: "Foundation (Week 1-2)", skills: ["Python/Node.js Basics", "HTTP Protocol", "JSON"], milestone: "Build a basic HTTP server" },
      { phase: "APIs (Week 3-4)", skills: ["REST API Design", "Express/Flask", "Middleware"], milestone: "Build a CRUD API" },
      { phase: "Database (Week 5-6)", skills: ["SQL", "PostgreSQL", "ORM", "Migrations"], milestone: "Build API with database" },
      { phase: "Advanced (Week 7-8)", skills: ["Authentication", "Docker", "Caching", "Testing"], milestone: "Deploy a production-ready API" },
    ],
    dailyPlan: [
      { day: "Day 1-3", topic: "Node.js/Python Fundamentals", task: "Build a CLI tool" },
      { day: "Day 4-6", topic: "HTTP & REST Principles", task: "Build a basic HTTP server" },
      { day: "Day 7-9", topic: "Express/Flask Framework", task: "Build a REST API" },
      { day: "Day 10-12", topic: "SQL & PostgreSQL", task: "Design a database schema" },
      { day: "Day 13-15", topic: "ORM & Migrations", task: "Connect API to database" },
      { day: "Day 16-18", topic: "Authentication (JWT)", task: "Add user registration and login" },
      { day: "Day 19-21", topic: "Error Handling & Validation", task: "Add input validation" },
      { day: "Day 22-24", topic: "Docker & Containerization", task: "Dockerize the application" },
      { day: "Day 25-27", topic: "Caching & Performance", task: "Add Redis caching layer" },
      { day: "Day 28-30", topic: "Testing & Deployment", task: "Write tests and deploy" },
    ],
    projects: [
      { level: "🟢 Beginner", title: "URL Shortener API", description: "Shorten URLs with click tracking and analytics" },
      { level: "🟢 Beginner", title: "Notes API", description: "CRUD API for notes with categories and search" },
      { level: "🟢 Beginner", title: "Authentication System", description: "User registration, login, and password reset" },
      { level: "🟡 Intermediate", title: "Task Management API", description: "API with teams, projects, tasks, and role-based access" },
      { level: "🟡 Intermediate", title: "File Storage Service", description: "Upload, store, and serve files with access control" },
      { level: "🔴 Advanced", title: "Microservices E-commerce", description: "Distributed system with separate services for users, orders, and payments" },
    ],
    jobPlatforms: [
      { name: "LinkedIn", url: "https://linkedin.com/jobs", searchTip: "Search 'Backend Developer' or 'API Developer'" },
      { name: "Internshala", url: "https://internshala.com", searchTip: "Filter by 'Python' or 'Node.js' internships" },
      { name: "Indeed", url: "https://indeed.com", searchTip: "Try 'Junior Backend Developer' or 'Server-side Developer'" },
      { name: "Glassdoor", url: "https://glassdoor.com", searchTip: "Check backend developer salaries in your city" },
      { name: "HackerRank Jobs", url: "https://hackerrank.com/jobs", searchTip: "Take assessments to get matched with companies" },
    ],
  },
  "Data Scientist": {
    title: "Data Scientist",
    description: "Analyze data, build predictive models, and drive business decisions",
    overview: "Data Scientists extract insights from complex data using statistics, machine learning, and domain expertise. They help organizations make data-driven decisions and build predictive models.",
    responsibilities: [
      "Collect, clean, and analyze large datasets",
      "Build and evaluate machine learning models",
      "Create data visualizations and dashboards",
      "Present findings to stakeholders",
      "Design and run A/B experiments",
      "Collaborate with engineering to deploy models",
    ],
    industries: ["Technology", "Finance", "Healthcare", "Retail", "Research", "Automotive"],
    technicalSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Pandas", "NumPy", "TensorFlow", "Data Visualization"],
    softSkills: ["Analytical Thinking", "Storytelling with Data", "Curiosity", "Business Acumen", "Communication"],
    tools: ["Jupyter Notebook", "Python", "Tableau", "scikit-learn", "Git", "BigQuery"],
    demandScore: 90,
    demandExplanation: "Data Science continues to grow as organizations increasingly rely on data for decisions. The integration of AI/ML into products drives exceptional demand for skilled practitioners.",
    hiringIndustries: ["Technology", "Banking & Finance", "Healthcare", "E-commerce", "Automotive", "Research"],
    futureGrowth: "Excellent growth trajectory. GenAI, MLOps, and responsible AI are expanding the field. Domain expertise combined with data skills commands premium salaries.",
    roadmap: [
      { phase: "Foundation (Week 1-2)", skills: ["Python", "Statistics", "Pandas/NumPy"], milestone: "Complete an exploratory data analysis" },
      { phase: "Visualization (Week 3-4)", skills: ["Matplotlib", "Seaborn", "Tableau", "Storytelling"], milestone: "Create a data story with visualizations" },
      { phase: "Machine Learning (Week 5-6)", skills: ["scikit-learn", "Classification", "Regression"], milestone: "Build and evaluate an ML model" },
      { phase: "Advanced (Week 7-8)", skills: ["Deep Learning", "NLP", "Model Deployment"], milestone: "Deploy an ML model as an API" },
    ],
    dailyPlan: [
      { day: "Day 1-3", topic: "Python for Data Science", task: "Practice with Pandas and NumPy" },
      { day: "Day 4-6", topic: "Statistics Fundamentals", task: "Calculate distributions and hypothesis tests" },
      { day: "Day 7-9", topic: "Data Cleaning", task: "Clean a messy Kaggle dataset" },
      { day: "Day 10-12", topic: "Data Visualization", task: "Create charts with Matplotlib/Seaborn" },
      { day: "Day 13-15", topic: "Exploratory Data Analysis", task: "Complete EDA on a real dataset" },
      { day: "Day 16-18", topic: "Supervised Learning", task: "Build a classification model" },
      { day: "Day 19-21", topic: "Model Evaluation", task: "Compare models and tune hyperparameters" },
      { day: "Day 22-24", topic: "Unsupervised Learning", task: "Implement clustering on customer data" },
      { day: "Day 25-27", topic: "Deep Learning Intro", task: "Build a neural network with TensorFlow" },
      { day: "Day 28-30", topic: "Project & Deployment", task: "Build end-to-end ML project" },
    ],
    projects: [
      { level: "🟢 Beginner", title: "Titanic Survival Prediction", description: "Classic ML project: predict passenger survival" },
      { level: "🟢 Beginner", title: "Sales Data Analysis", description: "Analyze sales trends and create visualizations" },
      { level: "🟢 Beginner", title: "Movie Recommendation System", description: "Collaborative filtering for movie suggestions" },
      { level: "🟡 Intermediate", title: "Sentiment Analysis", description: "NLP model to analyze product reviews" },
      { level: "🟡 Intermediate", title: "Customer Churn Prediction", description: "Predict which customers will leave" },
      { level: "🔴 Advanced", title: "Real-time Fraud Detection", description: "Streaming ML pipeline for transaction fraud" },
    ],
    jobPlatforms: [
      { name: "LinkedIn", url: "https://linkedin.com/jobs", searchTip: "Search 'Data Scientist' or 'ML Engineer'" },
      { name: "Kaggle", url: "https://kaggle.com/jobs", searchTip: "Compete in challenges to build your profile" },
      { name: "Indeed", url: "https://indeed.com", searchTip: "Try 'Junior Data Scientist' or 'Data Analyst'" },
      { name: "Glassdoor", url: "https://glassdoor.com", searchTip: "Compare DS salaries across companies" },
      { name: "AI Jobs", url: "https://ai-jobs.net", searchTip: "Specialized board for AI/ML positions" },
    ],
  },
  "DevOps Engineer": {
    title: "DevOps Engineer",
    description: "Automate infrastructure, CI/CD pipelines, and cloud deployments",
    overview: "DevOps Engineers bridge development and operations, automating infrastructure and deployment processes. They ensure applications are reliable, scalable, and deployed efficiently.",
    responsibilities: [
      "Design and maintain CI/CD pipelines",
      "Manage cloud infrastructure (AWS, GCP, Azure)",
      "Containerize applications with Docker/Kubernetes",
      "Monitor system health and respond to incidents",
      "Implement Infrastructure as Code",
      "Ensure security and compliance",
    ],
    industries: ["Cloud Services", "Enterprise Tech", "FinTech", "Gaming", "Telecom"],
    technicalSkills: ["Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Python", "Networking"],
    softSkills: ["Troubleshooting", "Communication", "Documentation", "On-call Readiness", "Collaboration"],
    tools: ["Docker", "Kubernetes", "Jenkins/GitHub Actions", "Terraform", "Prometheus", "Grafana"],
    demandScore: 94,
    demandExplanation: "DevOps is one of the highest-demand roles in tech. As companies move to cloud-native architectures, the need for skilled DevOps engineers continues to surge.",
    hiringIndustries: ["Technology", "Financial Services", "Cloud Providers", "E-commerce", "Gaming"],
    futureGrowth: "Exceptional growth. Platform engineering and SRE are expanding the field. AI-assisted operations (AIOps) is the next frontier.",
    roadmap: [
      { phase: "Foundation (Week 1-2)", skills: ["Linux", "Bash Scripting", "Networking Basics"], milestone: "Set up a Linux server" },
      { phase: "Containers (Week 3-4)", skills: ["Docker", "Docker Compose", "Container Networking"], milestone: "Containerize a multi-service app" },
      { phase: "CI/CD (Week 5-6)", skills: ["GitHub Actions", "Jenkins", "Automated Testing"], milestone: "Build a CI/CD pipeline" },
      { phase: "Cloud & IaC (Week 7-8)", skills: ["AWS", "Terraform", "Kubernetes"], milestone: "Deploy to Kubernetes on AWS" },
    ],
    dailyPlan: [
      { day: "Day 1-3", topic: "Linux Fundamentals", task: "Practice essential commands and scripting" },
      { day: "Day 4-6", topic: "Networking & Security", task: "Configure firewall rules and SSH" },
      { day: "Day 7-9", topic: "Docker Basics", task: "Containerize a Node.js application" },
      { day: "Day 10-12", topic: "Docker Compose", task: "Create multi-container setup" },
      { day: "Day 13-15", topic: "CI/CD with GitHub Actions", task: "Automate testing and builds" },
      { day: "Day 16-18", topic: "AWS Essentials", task: "Deploy EC2 instance and S3 bucket" },
      { day: "Day 19-21", topic: "Infrastructure as Code", task: "Write Terraform configurations" },
      { day: "Day 22-24", topic: "Kubernetes Basics", task: "Deploy app to Kubernetes" },
      { day: "Day 25-27", topic: "Monitoring & Logging", task: "Set up Prometheus + Grafana" },
      { day: "Day 28-30", topic: "Complete Pipeline", task: "Build end-to-end DevOps project" },
    ],
    projects: [
      { level: "🟢 Beginner", title: "Automated Deployment Script", description: "Bash script to deploy a web app to a server" },
      { level: "🟢 Beginner", title: "Docker Multi-Container App", description: "Web app + database + cache with Docker Compose" },
      { level: "🟢 Beginner", title: "CI/CD Pipeline", description: "GitHub Actions pipeline with testing and deployment" },
      { level: "🟡 Intermediate", title: "Infrastructure as Code", description: "Terraform setup for a complete AWS environment" },
      { level: "🟡 Intermediate", title: "Monitoring Dashboard", description: "Prometheus + Grafana monitoring for microservices" },
      { level: "🔴 Advanced", title: "Kubernetes Platform", description: "Production K8s cluster with auto-scaling and GitOps" },
    ],
    jobPlatforms: [
      { name: "LinkedIn", url: "https://linkedin.com/jobs", searchTip: "Search 'DevOps Engineer' or 'SRE'" },
      { name: "Internshala", url: "https://internshala.com", searchTip: "Look for 'Cloud Computing' or 'DevOps' internships" },
      { name: "Indeed", url: "https://indeed.com", searchTip: "Try 'Junior DevOps' or 'Cloud Engineer'" },
      { name: "Glassdoor", url: "https://glassdoor.com", searchTip: "DevOps typically has above-average salaries" },
      { name: "DevOps Jobs", url: "https://devopsjobs.io", searchTip: "Specialized board for DevOps/SRE roles" },
    ],
  },
};

const allRoles = Object.keys(roleDatabase);

const CareerPage = () => {
  const [skills, setSkills] = useState("");
  const [selectedRoleName, setSelectedRoleName] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<{ title: string; matchScore: number; demandScore: number }[] | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");
  const [activeTab, setActiveTab] = useState("analysis");

  const selectedRole = selectedRoleName ? roleDatabase[selectedRoleName] : null;
  const userSkills = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

  const recommend = () => {
    const scored = allRoles.map((roleName) => {
      const role = roleDatabase[roleName];
      const allRequired = [...role.technicalSkills, ...role.softSkills];
      const matches = allRequired.filter((s) => userSkills.includes(s.toLowerCase()));
      return {
        title: roleName,
        matchScore: Math.round((matches.length / allRequired.length) * 100),
        demandScore: role.demandScore,
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);

    setRecommendations(scored);
    setSelectedRoleName(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionHeader = ({ id, icon: Icon, title }: { id: string; icon: any; title: string }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-3 text-left"
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h4 className="font-heading font-semibold text-foreground">{title}</h4>
      </div>
      {expandedSection === id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
    </button>
  );

  return (
    <AppLayout>
      <PageHeader
        title="Career Path Explorer"
        description="Analyze roles, get recommendations, build roadmaps, and find opportunities"
        icon={<Briefcase className="h-6 w-6 text-primary-foreground" />}
      />

      {/* Input Section */}
      <div className="rounded-xl bg-card p-6 shadow-card border border-border max-w-2xl mb-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Your Skills (comma-separated)</Label>
            <Input
              placeholder="e.g. JavaScript, React, Python, SQL, Docker, Communication"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={recommend} className="gradient-primary text-primary-foreground">
              <Star className="mr-2 h-4 w-4" /> Get Role Recommendations
            </Button>
            {allRoles.map((r) => (
              <Button
                key={r}
                variant="outline"
                size="sm"
                onClick={() => { setSelectedRoleName(r); setExpandedSection("overview"); setActiveTab("analysis"); }}
                className={selectedRoleName === r ? "border-primary bg-sidebar-accent" : ""}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations && !selectedRole && (
        <div className="mb-8">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">🏆 Top 5 Career Matches</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec, i) => (
              <button
                key={rec.title}
                onClick={() => { setSelectedRoleName(rec.title); setExpandedSection("overview"); }}
                className="rounded-xl bg-card p-5 shadow-card border border-border text-left hover:border-primary/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-semibold text-foreground text-sm">
                    {i === 0 && "🏆 "}{i === 1 && "🥈 "}{i === 2 && "🥉 "}{rec.title}
                  </h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Skill Match</span>
                      <span className="font-medium text-primary">{rec.matchScore}%</span>
                    </div>
                    <Progress value={rec.matchScore} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Industry Demand</span>
                      <span className="font-medium text-accent">{rec.demandScore}/100</span>
                    </div>
                    <Progress value={rec.demandScore} className="h-1.5" />
                  </div>
                </div>
                {i === 0 && (
                  <Badge className="mt-3 bg-primary/10 text-primary border-primary/20 text-xs">⭐ Best Match</Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Role Detail */}
      {selectedRole && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Button variant="outline" size="sm" onClick={() => setSelectedRoleName(null)}>← Back</Button>
            <h2 className="font-heading text-xl font-bold text-foreground">{selectedRole.title}</h2>
            <Badge className="gradient-primary text-primary-foreground">{selectedRole.demandScore}/100 Demand</Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="analysis">Role Analysis</TabsTrigger>
              <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="jobs">Job Search</TabsTrigger>
            </TabsList>

            {/* Role Analysis Tab */}
            <TabsContent value="analysis" className="space-y-4">
              {/* Overview */}
              <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden">
                <div className="px-5">
                  <SectionHeader id="overview" icon={Briefcase} title="Role Overview" />
                </div>
                {expandedSection === "overview" && (
                  <div className="px-5 pb-5 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedRole.overview}</p>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Key Responsibilities</h5>
                      <ul className="grid gap-1.5 sm:grid-cols-2">
                        {selectedRole.responsibilities.map((r) => (
                          <li key={r} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Industries</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.industries.map((ind) => (
                          <Badge key={ind} variant="secondary" className="text-xs">{ind}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Required Skills */}
              <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden">
                <div className="px-5">
                  <SectionHeader id="skills" icon={Wrench} title="Required Skills" />
                </div>
                {expandedSection === "skills" && (
                  <div className="px-5 pb-5 space-y-4">
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Technical Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.technicalSkills.map((s) => {
                          const has = userSkills.includes(s.toLowerCase());
                          return (
                            <span key={s} className={`rounded-full px-3 py-1 text-xs font-medium
                              ${has ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                              {has ? "✓" : "✗"} {s}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Soft Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.softSkills.map((s) => {
                          const has = userSkills.includes(s.toLowerCase());
                          return (
                            <span key={s} className={`rounded-full px-3 py-1 text-xs font-medium
                              ${has ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                              {has ? "✓" : "○"} {s}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tools & Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.tools.map((t) => (
                          <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Skill Gap Analysis */}
              {userSkills.length > 0 && (
                <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden">
                  <div className="px-5">
                    <SectionHeader id="gap" icon={TrendingUp} title="Your Skill Gap Analysis" />
                  </div>
                  {expandedSection === "gap" && (
                    <div className="px-5 pb-5">
                      {(() => {
                        const allRequired = [...selectedRole.technicalSkills, ...selectedRole.softSkills];
                        const matching = allRequired.filter((s) => userSkills.includes(s.toLowerCase()));
                        const missing = allRequired.filter((s) => !userSkills.includes(s.toLowerCase()));
                        const matchPct = Math.round((matching.length / allRequired.length) * 100);
                        return (
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Overall Match</span>
                                <span className="font-medium text-foreground">{matchPct}%</span>
                              </div>
                              <Progress value={matchPct} className="h-2.5" />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <h5 className="text-sm font-medium text-success mb-2">✅ Matching ({matching.length})</h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {matching.map((s) => (
                                    <Badge key={s} className="bg-success/10 text-success border-success/20 text-xs">{s}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-destructive mb-2">❌ Missing ({missing.length})</h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {missing.map((s) => (
                                    <Badge key={s} className="bg-destructive/10 text-destructive border-destructive/20 text-xs">{s}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* Industry Demand */}
              <div className="rounded-xl bg-card shadow-card border border-border overflow-hidden">
                <div className="px-5">
                  <SectionHeader id="demand" icon={Globe} title="Industry Demand Score" />
                </div>
                {expandedSection === "demand" && (
                  <div className="px-5 pb-5 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-heading text-4xl font-bold text-primary">{selectedRole.demandScore}</p>
                        <p className="text-xs text-muted-foreground">/100</p>
                      </div>
                      <div className="flex-1">
                        <Progress value={selectedRole.demandScore} className="h-3" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedRole.demandExplanation}</p>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Hiring Industries</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.hiringIndustries.map((h) => (
                          <Badge key={h} variant="secondary" className="text-xs">{h}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-1">Future Growth</h5>
                      <p className="text-sm text-muted-foreground">{selectedRole.futureGrowth}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Learning Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-6">
              {/* Phased Roadmap */}
              <div className="rounded-xl bg-card p-6 shadow-card border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" /> Learning Roadmap
                </h3>
                <div className="space-y-4">
                  {selectedRole.roadmap.map((phase, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="gradient-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground text-sm font-bold">{i + 1}</div>
                        {i < selectedRole.roadmap.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                      </div>
                      <div className="pb-4">
                        <h4 className="font-heading font-semibold text-foreground">{phase.phase}</h4>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {phase.skills.map((s) => (
                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-accent" />
                          <strong>Milestone:</strong> {phase.milestone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 30-Day Plan */}
              <div className="rounded-xl bg-card p-6 shadow-card border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> 30-Day Learning Plan
                </h3>
                <div className="grid gap-2">
                  {selectedRole.dailyPlan.map((day, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary p-3">
                      <div className="gradient-primary rounded-md px-2 py-1 text-xs font-bold text-primary-foreground whitespace-nowrap">
                        {day.day}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{day.topic}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">📝 {day.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="rounded-xl bg-card p-6 shadow-card border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FolderGit2 className="h-5 w-5 text-primary" /> Portfolio Projects
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedRole.projects.map((proj, i) => (
                    <div key={i} className="rounded-lg border border-border p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{proj.level}</span>
                      </div>
                      <h4 className="font-heading font-semibold text-foreground text-sm">{proj.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Job Search Tab */}
            <TabsContent value="jobs" className="space-y-6">
              <div className="rounded-xl bg-card p-6 shadow-card border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" /> Internship & Job Platforms
                </h3>
                <div className="grid gap-3">
                  {selectedRole.jobPlatforms.map((platform) => (
                    <div key={platform.name} className="flex items-start gap-4 rounded-lg bg-secondary p-4">
                      <div className="gradient-primary rounded-lg p-2 shrink-0">
                        <ExternalLink className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-semibold text-foreground text-sm">{platform.name}</h4>
                          <a href={platform.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline">{platform.url}</a>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">💡 {platform.searchTip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-card border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-warning" /> Job Search Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Tailor your resume for each application — highlight relevant skills</li>
                  <li>• Build a strong GitHub profile with portfolio projects</li>
                  <li>• Network on LinkedIn — connect with professionals in your target role</li>
                  <li>• Apply to internships first to build experience</li>
                  <li>• Practice interviews using the Mock Interview module</li>
                  <li>• Contribute to open-source projects to stand out</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </AppLayout>
  );
};

export default CareerPage;
