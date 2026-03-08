import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Target, Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface SkillAnalysis {
  matching: string[];
  missing: string[];
  improve: string[];
  courses: { skill: string; course: string }[];
}

const industrySkills: Record<string, string[]> = {
  "frontend developer": ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Git", "REST APIs", "Testing"],
  "backend developer": ["Node.js", "Python", "SQL", "REST APIs", "Docker", "Git", "System Design", "MongoDB", "Redis", "Testing"],
  "full stack developer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Git", "Docker", "REST APIs", "TypeScript"],
  "data scientist": ["Python", "Statistics", "Machine Learning", "SQL", "Pandas", "NumPy", "TensorFlow", "Data Visualization", "R", "Git"],
  "devops engineer": ["Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Git", "Python", "Monitoring", "Networking"],
};

const courseMap: Record<string, string> = {
  "React": "React - The Complete Guide (Udemy)",
  "TypeScript": "TypeScript Fundamentals (Pluralsight)",
  "Docker": "Docker Mastery (Udemy)",
  "System Design": "Grokking System Design (Educative)",
  "Machine Learning": "ML Specialization (Coursera)",
  "SQL": "Complete SQL Bootcamp (Udemy)",
  "Node.js": "Node.js Developer Course (Udemy)",
  "Python": "Python for Everybody (Coursera)",
  "Next.js": "Next.js Official Tutorial",
  "Kubernetes": "Kubernetes for Beginners (KodeKloud)",
};

const SkillGapPage = () => {
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("full stack developer");
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);

  const analyze = () => {
    const userSkills = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    const required = industrySkills[role.toLowerCase()] || industrySkills["full stack developer"];

    const matching = required.filter((s) => userSkills.includes(s.toLowerCase()));
    const missing = required.filter((s) => !userSkills.includes(s.toLowerCase()));
    const improve = matching.slice(0, 3); // suggest improving top matching skills

    const courses = missing.map((skill) => ({
      skill,
      course: courseMap[skill] || `Search "${skill} course" online`,
    }));

    setAnalysis({ matching, missing, improve, courses });
  };

  return (
    <AppLayout>
      <PageHeader
        title="Skill Gap Analyzer"
        description="Compare your skills with industry requirements and find gaps"
        icon={<Target className="h-6 w-6 text-primary-foreground" />}
      />

      <div className="rounded-xl bg-card p-6 shadow-card border border-border max-w-2xl mb-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Your Skills (comma-separated)</Label>
            <Input placeholder="e.g. JavaScript, React, Python, SQL" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Target Role</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {Object.keys(industrySkills).map((r) => (
                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
              ))}
            </select>
          </div>
          <Button onClick={analyze} className="w-fit gradient-primary text-primary-foreground">
            <Search className="mr-2 h-4 w-4" /> Analyze Skills
          </Button>
        </div>
      </div>

      {analysis && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-card p-5 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-success" />
              <h3 className="font-heading font-semibold text-foreground">Matching Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.matching.length > 0 ? analysis.matching.map((s) => (
                <Badge key={s} className="bg-success/10 text-success border-success/20">{s}</Badge>
              )) : <p className="text-sm text-muted-foreground">No matching skills found</p>}
            </div>
          </div>

          <div className="rounded-xl bg-card p-5 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="font-heading font-semibold text-foreground">Missing Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.missing.map((s) => (
                <Badge key={s} variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-card p-5 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-warning" />
              <h3 className="font-heading font-semibold text-foreground">Improve Further</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.improve.map((s) => (
                <Badge key={s} className="bg-warning/10 text-warning border-warning/20">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 rounded-xl bg-card p-6 shadow-card border border-border">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">📚 Recommended Courses</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {analysis.courses.map((c) => (
                <div key={c.skill} className="flex items-start gap-3 rounded-lg bg-secondary p-3">
                  <div className="gradient-primary rounded-md p-1.5 mt-0.5">
                    <BookOpen className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.skill}</p>
                    <p className="text-xs text-muted-foreground">{c.course}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

// Need BookOpen icon import
import { BookOpen } from "lucide-react";

export default SkillGapPage;
