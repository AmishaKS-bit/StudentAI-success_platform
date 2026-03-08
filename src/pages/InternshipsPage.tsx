import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase, MapPin, Clock, ExternalLink, Search, Star,
  Building2, TrendingUp, GraduationCap, IndianRupee
} from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Internship" | "Full-Time" | "Part-Time" | "Remote";
  skills: string[];
  stipend: string;
  duration: string;
  platform: string;
  platformUrl: string;
  description: string;
  demandScore: number;
}

const allListings: JobListing[] = [
  {
    id: "1", title: "Frontend Developer Intern", company: "TechCorp", location: "Bangalore",
    type: "Internship", skills: ["React", "JavaScript", "CSS", "TypeScript"],
    stipend: "₹15,000/month", duration: "3 months", platform: "Internshala",
    platformUrl: "https://internshala.com", description: "Build modern web interfaces using React and TypeScript.", demandScore: 9,
  },
  {
    id: "2", title: "Backend Developer", company: "DataFlow Inc.", location: "Remote",
    type: "Full-Time", skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    stipend: "₹6-10 LPA", duration: "Full-time", platform: "LinkedIn",
    platformUrl: "https://linkedin.com/jobs", description: "Design and build scalable APIs and microservices.", demandScore: 9,
  },
  {
    id: "3", title: "Data Science Intern", company: "AnalyticsHub", location: "Hyderabad",
    type: "Internship", skills: ["Python", "Pandas", "Machine Learning", "SQL"],
    stipend: "₹20,000/month", duration: "6 months", platform: "Internshala",
    platformUrl: "https://internshala.com", description: "Work on real datasets to extract insights and build ML models.", demandScore: 8,
  },
  {
    id: "4", title: "Full Stack Developer", company: "StartupXYZ", location: "Mumbai",
    type: "Full-Time", skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    stipend: "₹8-14 LPA", duration: "Full-time", platform: "Indeed",
    platformUrl: "https://indeed.com", description: "End-to-end development of SaaS products.", demandScore: 10,
  },
  {
    id: "5", title: "DevOps Engineer Intern", company: "CloudNine", location: "Remote",
    type: "Internship", skills: ["Linux", "Docker", "Kubernetes", "CI/CD"],
    stipend: "₹18,000/month", duration: "4 months", platform: "LinkedIn",
    platformUrl: "https://linkedin.com/jobs", description: "Set up CI/CD pipelines and manage cloud infrastructure.", demandScore: 8,
  },
  {
    id: "6", title: "UI/UX Designer Intern", company: "DesignLab", location: "Delhi",
    type: "Internship", skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    stipend: "₹12,000/month", duration: "3 months", platform: "Internshala",
    platformUrl: "https://internshala.com", description: "Create wireframes, prototypes, and user flows for mobile apps.", demandScore: 7,
  },
  {
    id: "7", title: "Machine Learning Engineer", company: "AI Solutions", location: "Bangalore",
    type: "Full-Time", skills: ["Python", "TensorFlow", "Deep Learning", "NLP"],
    stipend: "₹12-20 LPA", duration: "Full-time", platform: "Glassdoor",
    platformUrl: "https://glassdoor.com", description: "Develop production-grade ML models for NLP applications.", demandScore: 9,
  },
  {
    id: "8", title: "Mobile App Developer", company: "AppWorks", location: "Pune",
    type: "Part-Time", skills: ["React Native", "JavaScript", "Firebase", "REST APIs"],
    stipend: "₹25,000/month", duration: "Part-time", platform: "Indeed",
    platformUrl: "https://indeed.com", description: "Build cross-platform mobile applications.", demandScore: 8,
  },
];

const platformColors: Record<string, string> = {
  Internshala: "bg-accent/10 text-accent border-accent/20",
  LinkedIn: "bg-info/10 text-info border-info/20",
  Indeed: "bg-warning/10 text-warning border-warning/20",
  Glassdoor: "bg-success/10 text-success border-success/20",
};

const typeColors: Record<string, string> = {
  Internship: "bg-primary/10 text-primary",
  "Full-Time": "bg-success/10 text-success",
  "Part-Time": "bg-warning/10 text-warning",
  Remote: "bg-accent/10 text-accent",
};

const InternshipsPage = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("All");

  const filtered = allListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <AppLayout>
      <PageHeader
        title="Internships & Jobs"
        description="Discover opportunities matched to your skills and career goals"
        icon={<Briefcase className="h-6 w-6 text-primary-foreground" />}
      />

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by role, skill, or company..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Internship", "Full-Time", "Part-Time"].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
              className={filterType === type ? "gradient-primary text-primary-foreground" : ""}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Platforms Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { name: "LinkedIn", url: "https://linkedin.com/jobs", icon: Building2, desc: "Professional network" },
          { name: "Internshala", url: "https://internshala.com", icon: GraduationCap, desc: "Student internships" },
          { name: "Indeed", url: "https://indeed.com", icon: Briefcase, desc: "Job aggregator" },
          { name: "Glassdoor", url: "https://glassdoor.com", icon: TrendingUp, desc: "Reviews & salaries" },
        ].map((p) => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
            <Card className="hover:shadow-elevated transition-shadow cursor-pointer border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="border-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              No opportunities found. Try adjusting your search or filters.
            </CardContent>
          </Card>
        )}
        {filtered.map((job) => (
          <Card key={job.id} className="border-border hover:shadow-elevated transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg font-heading">{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
                </div>
                <Badge className={typeColors[job.type]}>{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-foreground">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{job.stipend}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.duration}</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />Demand: {job.demandScore}/10</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge variant="outline" className={platformColors[job.platform]}>{job.platform}</Badge>
                <a href={job.platformUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="gap-1">
                    Apply <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default InternshipsPage;
