import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Sparkles, Clock, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScheduleItem {
  subject: string;
  hours: number;
}

interface DaySchedule {
  day: string;
  items: ScheduleItem[];
  breakTip: string;
}

const breakTips = [
  "🧘 5-min stretching + eye relaxation",
  "☕ Hydration break + quick walk",
  "🎵 Listen to a favorite song",
  "👁 20-20-20 eye rule: look 20ft away for 20s",
  "🌿 Step outside for fresh air",
  "💪 Quick desk exercises",
  "🧠 Mindful breathing for 3 minutes",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const StudyPlannerPage = () => {
  const [subjects, setSubjects] = useState("");
  const [hours, setHours] = useState("5");
  const [schedule, setSchedule] = useState<DaySchedule[] | null>(null);

  const generateSchedule = () => {
    const subjectList = subjects.split(",").map((s) => s.trim()).filter(Boolean);
    if (subjectList.length === 0) return;

    const dailyHours = parseInt(hours) || 5;
    const hoursPerSubject = dailyHours / subjectList.length;

    const generated: DaySchedule[] = days.map((day, i) => {
      // Rotate subjects to vary the schedule
      const rotated = [...subjectList.slice(i % subjectList.length), ...subjectList.slice(0, i % subjectList.length)];
      return {
        day,
        items: rotated.map((sub) => ({
          subject: sub,
          hours: Math.round(hoursPerSubject * 10) / 10,
        })),
        breakTip: breakTips[i % breakTips.length],
      };
    });
    setSchedule(generated);
  };

  return (
    <AppLayout>
      <PageHeader
        title="AI Study Planner"
        description="Generate a personalized study timetable based on your subjects and availability"
        icon={<BookOpen className="h-6 w-6 text-primary-foreground" />}
      />

      <div className="rounded-xl bg-card p-6 shadow-card border border-border max-w-2xl mb-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Subjects (comma-separated)</Label>
            <Input placeholder="e.g. Data Structures, DBMS, Operating Systems" value={subjects} onChange={(e) => setSubjects(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Daily Study Hours</Label>
            <Input type="number" min="1" max="16" value={hours} onChange={(e) => setHours(e.target.value)} />
          </div>
          <Button onClick={generateSchedule} className="w-fit gradient-primary text-primary-foreground">
            <Sparkles className="mr-2 h-4 w-4" /> Generate Schedule
          </Button>
        </div>
      </div>

      {schedule && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schedule.map((day) => (
            <div key={day.day} className="rounded-xl bg-card p-5 shadow-card border border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{day.day}</h3>
              <div className="space-y-2">
                {day.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                    <span className="text-sm font-medium text-foreground">{item.subject}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {item.hours}h
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                <Coffee className="h-3 w-3 shrink-0" />
                {day.breakTip}
              </div>
            </div>
          ))}
        </div>
      )}

      {schedule && (
        <div className="mt-8 rounded-xl bg-card p-6 shadow-card border border-border max-w-2xl">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-3">📚 Study Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Pomodoro Technique:</strong> Study for 25 mins, break for 5 mins</li>
            <li>• <strong>Active Recall:</strong> Test yourself instead of re-reading</li>
            <li>• <strong>Spaced Repetition:</strong> Review material at increasing intervals</li>
            <li>• <strong>Interleaving:</strong> Mix different subjects in one session</li>
            <li>• <strong>Revision:</strong> Start revising 3-5 days before each exam</li>
          </ul>
        </div>
      )}
    </AppLayout>
  );
};

export default StudyPlannerPage;
