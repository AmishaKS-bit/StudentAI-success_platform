import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Briefcase, Map, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface CareerRole {
  title: string;
  description: string;
  requiredSkills: string[];
  matchScore: number;
  demandScore: number;
}

const roleDatabase: CareerRole[] = [
  { title: "Full Stack Developer", description: "Build end-to-end web applications", requiredSkills: ["JavaScript", "React", "Node.js", "SQL", "Git"], matchScore: 0, demandScore: 92 },
  { title: "Frontend Developer", description: "Create user interfaces and experiences", requiredSkills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"], matchScore: 0, demandScore: 88 },
  { title: "Backend Developer", description: "Design APIs and server-side logic", requiredSkills: ["Python", "Node.js", "SQL", "Docker", "REST APIs"], matchScore: 0, demandScore: 85 },
  { title: "Data Scientist", description: "Analyze data and build ML models", requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Pandas"], matchScore: 0, demandScore: 90 },
  { title: "DevOps Engineer", description: "Manage infrastructure and deployments", requiredSkills: ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD"], matchScore: 0, demandScore: 94 },
  { title: "Mobile Developer", description: "Build iOS and Android applications", requiredSkills: ["React Native", "JavaScript", "TypeScript", "Git", "REST APIs"], matchScore: 0, demandScore: 82 },
  { title: "ML Engineer", description: "Deploy machine learning models at scale", requiredSkills: ["Python", "TensorFlow", "Docker", "MLOps", "SQL"], matchScore: 0, demandScore: 91 },
  { title: "Cloud Architect", description: "Design cloud infrastructure solutions", requiredSkills: ["AWS", "Terraform", "Networking", "Security", "Docker"], matchScore: 0, demandScore: 95 },
];

const CareerPage = () => {
  const [skills, setSkills] = useState("");
  const [recommendations, setRecommendations] = useState<CareerRole[] | null>(null);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);

  const recommend = () => {
    const userSkills = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

    const scored = roleDatabase.map((role) => {
      const matches = role.requiredSkills.filter((s) => userSkills.includes(s.toLowerCase()));
      return { ...role, matchScore: Math.round((matches.length / role.requiredSkills.length) * 100) };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);

    setRecommendations(scored);
    setSelectedRole(null);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Career Recommendations"
        description="Discover career paths that match your skills and interests"
        icon={<Briefcase className="h-6 w-6 text-primary-foreground" />}
      />

      <div className="rounded-xl bg-card p-6 shadow-card border border-border max-w-2xl mb-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Your Skills (comma-separated)</Label>
            <Input placeholder="e.g. JavaScript, React, Python, SQL, Docker" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </div>
          <Button onClick={recommend} className="w-fit gradient-primary text-primary-foreground">
            <Star className="mr-2 h-4 w-4" /> Get Recommendations
          </Button>
        </div>
      </div>

      {recommendations && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-foreground">Top Career Matches</h3>
            {recommendations.map((role, i) => (
              <button
                key={role.title}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left rounded-xl bg-card p-5 shadow-card border transition-all
                  ${selectedRole?.title === role.title ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-semibold text-foreground">
                    {i === 0 && "🏆 "}{role.title}
                  </h4>
                  <span className="text-sm font-medium text-primary">{role.matchScore}% match</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                <Progress value={role.matchScore} className="h-2" />
              </button>
            ))}
          </div>

          {selectedRole && (
            <div className="rounded-xl bg-card p-6 shadow-card border border-border h-fit sticky top-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-1">{selectedRole.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{selectedRole.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Skill Match</span>
                  <span className="font-medium text-foreground">{selectedRole.matchScore}%</span>
                </div>
                <Progress value={selectedRole.matchScore} className="h-2 mb-3" />
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Industry Demand</span>
                  <span className="font-medium text-foreground">{selectedRole.demandScore}%</span>
                </div>
                <Progress value={selectedRole.demandScore} className="h-2" />
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRole.requiredSkills.map((s) => {
                    const has = skills.split(",").map(sk => sk.trim().toLowerCase()).includes(s.toLowerCase());
                    return (
                      <span key={s} className={`rounded-full px-3 py-1 text-xs font-medium
                        ${has ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                        {has ? "✓" : "✗"} {s}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Map className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium text-foreground">30-Day Roadmap</h4>
                </div>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Week 1:</strong> Learn fundamentals of missing skills</li>
                  <li><strong>Week 2:</strong> Build a small project using those skills</li>
                  <li><strong>Week 3:</strong> Practice with real-world scenarios</li>
                  <li><strong>Week 4:</strong> Build a portfolio project & practice interviews</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default CareerPage;
