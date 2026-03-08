import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { BookOpen, Target, MessageSquare, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadialBarChart, RadialBar, Legend,
} from "recharts";

const weeklyStudy = [
  { day: "Mon", hours: 4 }, { day: "Tue", hours: 3 },
  { day: "Wed", hours: 5 }, { day: "Thu", hours: 2 },
  { day: "Fri", hours: 6 }, { day: "Sat", hours: 4 },
  { day: "Sun", hours: 3 },
];

const skillProgress = [
  { week: "W1", score: 45 }, { week: "W2", score: 52 },
  { week: "W3", score: 58 }, { week: "W4", score: 67 },
  { week: "W5", score: 72 }, { week: "W6", score: 78 },
];

const interviewScores = [
  { name: "Technical", score: 75, fill: "hsl(245, 58%, 51%)" },
  { name: "Communication", score: 68, fill: "hsl(168, 70%, 42%)" },
  { name: "Confidence", score: 82, fill: "hsl(38, 92%, 50%)" },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Progress Dashboard"
        description="Track your academic progress, skills, and interview readiness"
        icon={<TrendingUp className="h-6 w-6 text-primary-foreground" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Study Hours"
          value="27"
          subtitle="This week"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
          trend={{ value: "12% vs last week", positive: true }}
        />
        <StatCard
          title="Skills Learned"
          value="12"
          subtitle="3 new this month"
          icon={<Target className="h-5 w-5 text-accent" />}
          trend={{ value: "3 new", positive: true }}
        />
        <StatCard
          title="Interview Score"
          value="75%"
          subtitle="Average"
          icon={<MessageSquare className="h-5 w-5 text-warning" />}
          trend={{ value: "8% improvement", positive: true }}
        />
        <StatCard
          title="Completion"
          value="68%"
          subtitle="Study plan progress"
          icon={<TrendingUp className="h-5 w-5 text-success" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Weekly Study Hours */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Weekly Study Hours</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyStudy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="hours" fill="hsl(245, 58%, 51%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Progress */}
        <div className="rounded-xl bg-card p-6 shadow-card border border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Skill Progress</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={skillProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="hsl(168, 70%, 42%)" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interview Scores */}
      <div className="mt-6 rounded-xl bg-card p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Interview Readiness</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {interviewScores.map((item) => (
            <div key={item.name} className="text-center">
              <ResponsiveContainer width="100%" height={140}>
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
              <p className="font-heading text-2xl font-bold text-foreground -mt-8">{item.score}%</p>
              <p className="text-sm text-muted-foreground mt-1">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Report Summary */}
      <div className="mt-6 rounded-xl bg-card p-6 shadow-card border border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Weekly Performance Report</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="font-medium text-foreground mb-2">✅ Strengths</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Consistent daily study routine</li>
              <li>• Strong improvement in Data Structures</li>
              <li>• Completed 3 mock interviews</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">🎯 Areas for Improvement</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• System Design needs more practice</li>
              <li>• Increase study hours on weekends</li>
              <li>• Practice behavioral interview questions</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
