import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import {
  BookOpen, Target, MessageSquare, TrendingUp, Award,
  Calendar, CheckCircle, Clock, Flame, BarChart3
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadialBarChart, RadialBar, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const weeklyStudy = [
  { day: "Mon", hours: 4, target: 5 }, { day: "Tue", hours: 3, target: 5 },
  { day: "Wed", hours: 5, target: 5 }, { day: "Thu", hours: 2, target: 5 },
  { day: "Fri", hours: 6, target: 5 }, { day: "Sat", hours: 4, target: 3 },
  { day: "Sun", hours: 3, target: 3 },
];

const skillProgress = [
  { week: "W1", score: 45, interviews: 2 },
  { week: "W2", score: 52, interviews: 3 },
  { week: "W3", score: 58, interviews: 4 },
  { week: "W4", score: 67, interviews: 3 },
  { week: "W5", score: 72, interviews: 5 },
  { week: "W6", score: 78, interviews: 4 },
];

const interviewScores = [
  { name: "Technical", score: 75, fill: "hsl(245, 58%, 51%)" },
  { name: "Communication", score: 68, fill: "hsl(168, 70%, 42%)" },
  { name: "Confidence", score: 82, fill: "hsl(38, 92%, 50%)" },
];

const skillMastery = [
  { skill: "JavaScript", mastery: 85, trend: "+5%" },
  { skill: "React", mastery: 78, trend: "+8%" },
  { skill: "Node.js", mastery: 65, trend: "+12%" },
  { skill: "SQL", mastery: 72, trend: "+3%" },
  { skill: "Python", mastery: 55, trend: "+15%" },
  { skill: "Docker", mastery: 40, trend: "+20%" },
  { skill: "TypeScript", mastery: 60, trend: "+10%" },
  { skill: "Git", mastery: 90, trend: "+2%" },
];

const learningMilestones = [
  { title: "HTML & CSS Basics", completed: true, date: "Week 1" },
  { title: "JavaScript Fundamentals", completed: true, date: "Week 2" },
  { title: "React Components & Hooks", completed: true, date: "Week 3" },
  { title: "Node.js & REST APIs", completed: true, date: "Week 4" },
  { title: "Database Design & SQL", completed: false, date: "Week 5" },
  { title: "Authentication & Security", completed: false, date: "Week 6" },
  { title: "Docker & Deployment", completed: false, date: "Week 7" },
  { title: "Portfolio Project", completed: false, date: "Week 8" },
];

const weeklyActivity = [
  { day: "Mon", study: 4, interview: 1, skills: 2 },
  { day: "Tue", study: 3, interview: 0, skills: 1 },
  { day: "Wed", study: 5, interview: 2, skills: 3 },
  { day: "Thu", study: 2, interview: 0, skills: 1 },
  { day: "Fri", study: 6, interview: 1, skills: 2 },
  { day: "Sat", study: 4, interview: 1, skills: 2 },
  { day: "Sun", study: 3, interview: 0, skills: 1 },
];

const categoryBreakdown = [
  { name: "Study", value: 40, fill: "hsl(245, 58%, 51%)" },
  { name: "Interview", value: 25, fill: "hsl(168, 70%, 42%)" },
  { name: "Projects", value: 20, fill: "hsl(38, 92%, 50%)" },
  { name: "Reading", value: 15, fill: "hsl(210, 100%, 52%)" },
];

const Dashboard = () => {
  const completedMilestones = learningMilestones.filter((m) => m.completed).length;
  const totalMilestones = learningMilestones.length;
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <AppLayout>
      <PageHeader
        title="Progress Dashboard"
        description="Track your academic progress, skills, interviews, and weekly performance"
        icon={<BarChart3 className="h-6 w-6 text-primary-foreground" />}
      />

      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Study Hours"
          value="27"
          subtitle="This week"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
          trend={{ value: "12% vs last week", positive: true }}
        />
        <StatCard
          title="Skills Mastered"
          value="12"
          subtitle="3 new this month"
          icon={<Target className="h-5 w-5 text-accent" />}
          trend={{ value: "3 new skills", positive: true }}
        />
        <StatCard
          title="Interview Score"
          value="75%"
          subtitle="Avg across sessions"
          icon={<MessageSquare className="h-5 w-5 text-warning" />}
          trend={{ value: "8% improvement", positive: true }}
        />
        <StatCard
          title="Learning Progress"
          value={`${overallProgress}%`}
          subtitle={`${completedMilestones}/${totalMilestones} milestones`}
          icon={<TrendingUp className="h-5 w-5 text-success" />}
          trend={{ value: "On track", positive: true }}
        />
      </div>

      {/* Skill Mastery */}
      <div className="mt-8 rounded-xl bg-card p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-warning" /> Skill Mastery Tracker
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {skillMastery.map((skill) => (
            <div key={skill.skill} className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground w-24 shrink-0">{skill.skill}</span>
              <div className="flex-1">
                <Progress value={skill.mastery} className="h-2.5" />
              </div>
              <span className="text-sm font-medium text-foreground w-10 text-right">{skill.mastery}%</span>
              <Badge className="bg-success/10 text-success border-success/20 text-[10px] shrink-0">{skill.trend}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Weekly Study Hours vs Target */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Study Hours vs Target</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyStudy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="hours" fill="hsl(245, 58%, 51%)" radius={[6, 6, 0, 0]} name="Actual" />
              <Bar dataKey="target" fill="hsl(220, 13%, 90%)" radius={[6, 6, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill & Interview Improvement */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Skill & Interview Trends</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={skillProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="hsl(168, 70%, 42%)" fill="hsl(168, 70%, 42%)" fillOpacity={0.15} strokeWidth={2} name="Skill Score" />
              <Line type="monotone" dataKey="interviews" stroke="hsl(245, 58%, 51%)" strokeWidth={2} name="Interviews" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Interview Readiness */}
        <div className="lg:col-span-2 rounded-xl bg-card p-6 shadow-card border border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" /> Interview Readiness
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {interviewScores.map((item) => (
              <div key={item.name} className="text-center">
                <ResponsiveContainer width="100%" height={130}>
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={[{ ...item, fullMark: 100 }]}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar dataKey="score" fill={item.fill} cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <p className="font-heading text-2xl font-bold text-foreground -mt-6">{item.score}%</p>
                <p className="text-sm text-muted-foreground mt-1">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time Distribution */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Time Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                {categoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.fill }} />
                <span className="text-muted-foreground">{cat.name} {cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Milestones */}
      <div className="mt-6 rounded-xl bg-card p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" /> Learning Milestones
        </h3>
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium text-foreground">{completedMilestones}/{totalMilestones} completed</span>
          </div>
          <Progress value={overallProgress} className="h-2.5" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {learningMilestones.map((m, i) => (
            <div key={i} className={`rounded-lg p-3 border ${m.completed ? "bg-success/5 border-success/20" : "bg-secondary border-border"}`}>
              <div className="flex items-center gap-2">
                {m.completed ? (
                  <CheckCircle className="h-4 w-4 text-success shrink-0" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className={`text-sm font-medium ${m.completed ? "text-foreground" : "text-muted-foreground"}`}>{m.title}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-6">{m.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Performance Report */}
      <div className="mt-6 rounded-xl bg-card p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" /> Weekly Performance Report
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="font-heading text-3xl font-bold text-foreground">27h</p>
            <p className="text-xs text-muted-foreground mt-1">Study Hours</p>
          </div>
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="font-heading text-3xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground mt-1">Topics Covered</p>
          </div>
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="font-heading text-3xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground mt-1">Skills Learned</p>
          </div>
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="font-heading text-3xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground mt-1">Interviews Done</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-1.5">
              <span className="text-success">✅</span> Strengths
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Consistent daily study routine (5 of 7 days)</li>
              <li>• Strong improvement in React (+8%)</li>
              <li>• Completed 5 mock interviews</li>
              <li>• Active learning with projects</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-1.5">
              <span>🎯</span> Areas for Improvement
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• System Design practice needed</li>
              <li>• Weekend study hours below target</li>
              <li>• Docker skills at 40% — focus here</li>
              <li>• Practice behavioral interview questions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-1.5">
              <span>📋</span> Next Week Goals
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Complete SQL & Database module</li>
              <li>• Practice 3+ mock interviews</li>
              <li>• Start Docker fundamentals</li>
              <li>• Build blog project backend</li>
              <li>• Study 30+ hours total</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
