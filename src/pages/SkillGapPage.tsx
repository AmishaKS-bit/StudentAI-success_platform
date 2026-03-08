import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import {
  Target, Search, CheckCircle, XCircle, AlertCircle,
  BookOpen, Briefcase, TrendingUp, Wrench, Users, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SkillCategory {
  technical: string[];
  soft: string[];
  tools: string[];
}

interface SkillAnalysis {
  matching: string[];
  missing: string[];
  improve: string[];
  courses: { skill: string; course: string; platform: string }[];
  matchPercentage: number;
  projectSuggestions: { skill: string; project: string }[];
}

interface RoleRecommendation {
  title: string;
  description: string;
  matchScore: number;
  demandScore: number;
  requiredSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
}

const industryRoles: Record<string, { description: string; skills: SkillCategory; demandScore: number }> = {
  "Frontend Developer": {
    description: "Build responsive, interactive user interfaces for web applications",
    skills: {
      technical: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
      soft: ["Attention to Detail", "Creativity", "Communication"],
      tools: ["Tailwind CSS", "Git", "Figma", "VS Code", "Chrome DevTools"],
    },
    demandScore: 88,
  },
  "Backend Developer": {
    description: "Design scalable APIs, databases, and server-side logic",
    skills: {
      technical: ["Node.js", "Python", "SQL", "REST APIs", "System Design", "Docker"],
      soft: ["Analytical Thinking", "Problem-solving", "Documentation"],
      tools: ["MongoDB", "Redis", "Postman", "pgAdmin", "AWS"],
    },
    demandScore: 85,
  },
  "Full Stack Developer": {
    description: "Build complete web applications from frontend to backend",
    skills: {
      technical: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
      soft: ["Problem-solving", "Communication", "Time Management"],
      tools: ["TypeScript", "Git", "Docker", "REST APIs", "VS Code"],
    },
    demandScore: 92,
  },
  "Data Scientist": {
    description: "Analyze data and build predictive ML models for business decisions",
    skills: {
      technical: ["Python", "Statistics", "Machine Learning", "SQL", "Deep Learning"],
      soft: ["Analytical Thinking", "Storytelling", "Curiosity"],
      tools: ["Pandas", "NumPy", "TensorFlow", "Jupyter", "Tableau"],
    },
    demandScore: 90,
  },
  "DevOps Engineer": {
    description: "Automate infrastructure, deployments, and cloud operations",
    skills: {
      technical: ["Linux", "Docker", "Kubernetes", "CI/CD", "Networking"],
      soft: ["Troubleshooting", "Communication", "On-call Readiness"],
      tools: ["AWS", "Terraform", "Jenkins", "Prometheus", "Grafana"],
    },
    demandScore: 94,
  },
  "Mobile Developer": {
    description: "Build native and cross-platform mobile applications",
    skills: {
      technical: ["React Native", "JavaScript", "TypeScript", "Mobile UI", "APIs"],
      soft: ["User Empathy", "Attention to Detail", "Collaboration"],
      tools: ["Expo", "Xcode", "Android Studio", "Git", "Firebase"],
    },
    demandScore: 82,
  },
  "ML Engineer": {
    description: "Deploy and scale machine learning models in production",
    skills: {
      technical: ["Python", "TensorFlow", "MLOps", "Docker", "SQL"],
      soft: ["Problem-solving", "Research Skills", "Collaboration"],
      tools: ["Kubernetes", "MLflow", "AWS SageMaker", "Git", "Jupyter"],
    },
    demandScore: 91,
  },
  "Cloud Architect": {
    description: "Design and manage cloud infrastructure and solutions",
    skills: {
      technical: ["AWS", "Networking", "Security", "System Design", "Microservices"],
      soft: ["Leadership", "Strategic Thinking", "Communication"],
      tools: ["Terraform", "Docker", "Kubernetes", "CloudFormation", "Monitoring"],
    },
    demandScore: 95,
  },
};

const courseDatabase: Record<string, { course: string; platform: string }> = {
  "React": { course: "React - The Complete Guide", platform: "Udemy" },
  "TypeScript": { course: "TypeScript Fundamentals", platform: "Pluralsight" },
  "Docker": { course: "Docker Mastery", platform: "Udemy" },
  "System Design": { course: "Grokking System Design", platform: "Educative" },
  "Machine Learning": { course: "ML Specialization", platform: "Coursera" },
  "SQL": { course: "Complete SQL Bootcamp", platform: "Udemy" },
  "Node.js": { course: "Node.js Developer Course", platform: "Udemy" },
  "Python": { course: "Python for Everybody", platform: "Coursera" },
  "Next.js": { course: "Next.js Official Tutorial", platform: "Vercel" },
  "Kubernetes": { course: "Kubernetes for Beginners", platform: "KodeKloud" },
  "HTML": { course: "HTML & CSS Bootcamp", platform: "Udemy" },
  "CSS": { course: "Advanced CSS and Sass", platform: "Udemy" },
  "JavaScript": { course: "The Complete JavaScript Course", platform: "Udemy" },
  "AWS": { course: "AWS Solutions Architect", platform: "A Cloud Guru" },
  "Terraform": { course: "Terraform for Beginners", platform: "KodeKloud" },
  "Linux": { course: "Linux Mastery", platform: "Udemy" },
  "Git": { course: "Git Complete", platform: "Udemy" },
  "Statistics": { course: "Statistics with Python", platform: "Coursera" },
  "Deep Learning": { course: "Deep Learning Specialization", platform: "Coursera" },
  "CI/CD": { course: "GitHub Actions Complete Guide", platform: "Udemy" },
  "TensorFlow": { course: "TensorFlow Developer Certificate", platform: "Coursera" },
  "REST APIs": { course: "REST API Design & Development", platform: "Udemy" },
  "Networking": { course: "Computer Networking", platform: "Coursera" },
  "Microservices": { course: "Microservices with Node.js", platform: "Udemy" },
  "MLOps": { course: "MLOps Specialization", platform: "Coursera" },
  "React Native": { course: "React Native - Practical Guide", platform: "Udemy" },
};

const projectSuggestions: Record<string, string> = {
  "React": "Build a movie search app with favorites",
  "Node.js": "Create a REST API for a task manager",
  "Python": "Build a web scraper with data analysis",
  "SQL": "Design a database for an e-commerce platform",
  "Docker": "Containerize a multi-service application",
  "Machine Learning": "Build a sentiment analysis classifier",
  "TypeScript": "Convert a JavaScript project to TypeScript",
  "AWS": "Deploy a web app using EC2 and S3",
  "Kubernetes": "Deploy a microservice to a K8s cluster",
  "Next.js": "Build a blog with SSR and MDX",
  "TensorFlow": "Build an image classification model",
  "Linux": "Set up a web server from scratch",
  "Git": "Contribute to an open-source project",
  "JavaScript": "Build an interactive game",
  "HTML": "Create an accessible multi-page website",
  "CSS": "Build a CSS art gallery with animations",
  "REST APIs": "Build a weather aggregation API",
  "CI/CD": "Set up automated testing pipeline",
};

const SkillGapPage = () => {
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("Full Stack Developer");
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);
  const [roleRecommendations, setRoleRecommendations] = useState<RoleRecommendation[] | null>(null);
  const [mode, setMode] = useState<"gap" | "recommend">("gap");

  const analyzeGap = () => {
    const userSkills = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    const roleData = industryRoles[role];
    if (!roleData) return;

    const allRequired = [...roleData.skills.technical, ...roleData.skills.soft, ...roleData.skills.tools];
    const matching = allRequired.filter((s) => userSkills.includes(s.toLowerCase()));
    const missing = allRequired.filter((s) => !userSkills.includes(s.toLowerCase()));
    const improve = matching.filter((s) => roleData.skills.technical.includes(s)).slice(0, 4);

    const courses = missing
      .filter((s) => courseDatabase[s])
      .map((skill) => ({
        skill,
        course: courseDatabase[skill].course,
        platform: courseDatabase[skill].platform,
      }));

    const projects = missing
      .filter((s) => projectSuggestions[s])
      .slice(0, 4)
      .map((skill) => ({ skill, project: projectSuggestions[skill] }));

    setAnalysis({
      matching,
      missing,
      improve,
      courses,
      matchPercentage: Math.round((matching.length / allRequired.length) * 100),
      projectSuggestions: projects,
    });
    setRoleRecommendations(null);
    setMode("gap");
  };

  const recommendRoles = () => {
    const userSkills = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (userSkills.length === 0) return;

    const recs: RoleRecommendation[] = Object.entries(industryRoles).map(([title, data]) => {
      const allRequired = [...data.skills.technical, ...data.skills.soft, ...data.skills.tools];
      const matchingSkills = allRequired.filter((s) => userSkills.includes(s.toLowerCase()));
      const missingSkills = allRequired.filter((s) => !userSkills.includes(s.toLowerCase()));
      return {
        title,
        description: data.description,
        matchScore: Math.round((matchingSkills.length / allRequired.length) * 100),
        demandScore: data.demandScore,
        requiredSkills: allRequired,
        matchingSkills,
        missingSkills,
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);

    setRoleRecommendations(recs);
    setAnalysis(null);
    setMode("recommend");
  };

  const roleData = industryRoles[role];

  return (
    <AppLayout>
      <PageHeader
        title="Skill Gap Analyzer"
        description="Compare your skills with industry standards, get recommendations, and find learning paths"
        icon={<Target className="h-6 w-6 text-primary-foreground" />}
      />

      {/* Input */}
      <div className="rounded-xl bg-card p-6 shadow-card border border-border max-w-2xl mb-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Your Skills (comma-separated)</Label>
            <Input
              placeholder="e.g. JavaScript, React, Python, SQL, Communication"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Target Role (for gap analysis)</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {Object.keys(industryRoles).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <Button onClick={analyzeGap} className="gradient-primary text-primary-foreground">
              <Search className="mr-2 h-4 w-4" /> Analyze Skill Gap
            </Button>
            <Button onClick={recommendRoles} variant="outline">
              <Star className="mr-2 h-4 w-4" /> Recommend Roles from Skills
            </Button>
          </div>
        </div>
      </div>

      {/* Skill Gap Analysis Results */}
      {analysis && mode === "gap" && (
        <div className="space-y-6">
          {/* Match Score */}
          <div className="rounded-xl bg-card p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Skill Match for {role}
              </h3>
              <Badge className={`text-sm ${analysis.matchPercentage >= 70 ? "bg-success/10 text-success" : analysis.matchPercentage >= 40 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                {analysis.matchPercentage}% Match
              </Badge>
            </div>
            <Progress value={analysis.matchPercentage} className="h-3 mb-2" />
            <p className="text-xs text-muted-foreground">
              {analysis.matching.length} of {analysis.matching.length + analysis.missing.length} skills matched
            </p>
          </div>

          {/* Skills Breakdown by Category */}
          {roleData && (
            <div className="rounded-xl bg-card p-6 shadow-card border border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Skills Breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: "Technical Skills", icon: Wrench, items: roleData.skills.technical },
                  { label: "Soft Skills", icon: Users, items: roleData.skills.soft },
                  { label: "Tools & Technologies", icon: Briefcase, items: roleData.skills.tools },
                ].map(({ label, icon: Icon, items }) => {
                  const userSkillsLower = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
                  return (
                    <div key={label}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-medium text-foreground">{label}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((s) => {
                          const has = userSkillsLower.includes(s.toLowerCase());
                          return (
                            <span key={s} className={`rounded-full px-3 py-1 text-xs font-medium
                              ${has ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                              {has ? "✓" : "✗"} {s}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Three columns: Matching, Missing, Improve */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl bg-card p-5 shadow-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <h3 className="font-heading font-semibold text-foreground">Matching ({analysis.matching.length})</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.matching.length > 0 ? analysis.matching.map((s) => (
                  <Badge key={s} className="bg-success/10 text-success border-success/20">{s}</Badge>
                )) : <p className="text-sm text-muted-foreground">No matching skills found</p>}
              </div>
            </div>
            <div className="rounded-xl bg-card p-5 shadow-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-5 w-5 text-destructive" />
                <h3 className="font-heading font-semibold text-foreground">Missing ({analysis.missing.length})</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.missing.length > 0 ? analysis.missing.map((s) => (
                  <Badge key={s} className="bg-destructive/10 text-destructive border-destructive/20">{s}</Badge>
                )) : <p className="text-sm text-muted-foreground">All skills covered! 🎉</p>}
              </div>
            </div>
            <div className="rounded-xl bg-card p-5 shadow-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-warning" />
                <h3 className="font-heading font-semibold text-foreground">Improve Further</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.improve.map((s) => (
                  <Badge key={s} className="bg-warning/10 text-warning border-warning/20">{s}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Courses */}
          {analysis.courses.length > 0 && (
            <div className="rounded-xl bg-card p-6 shadow-card border border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Recommended Courses
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {analysis.courses.map((c) => (
                  <div key={c.skill} className="flex items-start gap-3 rounded-lg bg-secondary p-3">
                    <div className="gradient-primary rounded-md p-1.5 mt-0.5">
                      <BookOpen className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.skill}</p>
                      <p className="text-xs text-muted-foreground">{c.course}</p>
                      <Badge variant="outline" className="text-[10px] mt-1">{c.platform}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Projects */}
          {analysis.projectSuggestions.length > 0 && (
            <div className="rounded-xl bg-card p-6 shadow-card border border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">🛠️ Practice Projects</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {analysis.projectSuggestions.map((p) => (
                  <div key={p.skill} className="rounded-lg border border-border p-4">
                    <Badge variant="secondary" className="text-xs mb-2">{p.skill}</Badge>
                    <p className="text-sm text-foreground">{p.project}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Role Recommendations */}
      {roleRecommendations && mode === "recommend" && (
        <div className="space-y-6">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            🏆 Top 5 Career Roles for Your Skills
          </h3>
          {roleRecommendations.map((rec, i) => (
            <div key={rec.title} className="rounded-xl bg-card p-6 shadow-card border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                    {i === 0 && "🏆"} {i === 1 && "🥈"} {i === 2 && "🥉"} {rec.title}
                    {i === 0 && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs ml-1">Best Match</Badge>}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="font-heading text-2xl font-bold text-primary">{rec.matchScore}%</p>
                  <p className="text-xs text-muted-foreground">match</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mb-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Skill Match</span>
                    <span className="text-foreground font-medium">{rec.matchScore}%</span>
                  </div>
                  <Progress value={rec.matchScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Industry Demand</span>
                    <span className="text-foreground font-medium">{rec.demandScore}/100</span>
                  </div>
                  <Progress value={rec.demandScore} className="h-2" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <h5 className="text-xs font-medium text-success mb-1.5">✅ Your Matching Skills</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.matchingSkills.length > 0 ? rec.matchingSkills.map((s) => (
                      <Badge key={s} className="bg-success/10 text-success border-success/20 text-xs">{s}</Badge>
                    )) : <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-medium text-destructive mb-1.5">❌ Skills to Learn</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.missingSkills.slice(0, 6).map((s) => (
                      <Badge key={s} className="bg-destructive/10 text-destructive border-destructive/20 text-xs">{s}</Badge>
                    ))}
                    {rec.missingSkills.length > 6 && (
                      <Badge variant="outline" className="text-xs">+{rec.missingSkills.length - 6} more</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default SkillGapPage;
