import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    course: "",
    subjects: "",
    skills: "",
    examDates: "",
    dailyHours: "4",
    careerGoal: "",
  });

  const handleSave = () => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    toast.success("Profile saved successfully!");
  };

  return (
    <AppLayout>
      <PageHeader
        title="Student Profile"
        description="Set up your profile to get personalized recommendations"
        icon={<User className="h-6 w-6 text-primary-foreground" />}
      />

      <div className="rounded-xl bg-card p-6 shadow-card border border-border max-w-2xl">
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your name" value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course">Course / Branch</Label>
            <Input id="course" placeholder="e.g. B.Tech Computer Science" value={profile.course}
              onChange={(e) => setProfile({ ...profile, course: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subjects">Subjects (comma-separated)</Label>
            <Input id="subjects" placeholder="e.g. Data Structures, DBMS, OS" value={profile.subjects}
              onChange={(e) => setProfile({ ...profile, subjects: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="skills">Current Skills (comma-separated)</Label>
            <Input id="skills" placeholder="e.g. Python, SQL, React" value={profile.skills}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="examDates">Upcoming Exam Dates</Label>
            <Input id="examDates" placeholder="e.g. Data Structures - March 20, DBMS - March 25" value={profile.examDates}
              onChange={(e) => setProfile({ ...profile, examDates: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dailyHours">Daily Study Hours Available</Label>
            <Input id="dailyHours" type="number" min="1" max="16" value={profile.dailyHours}
              onChange={(e) => setProfile({ ...profile, dailyHours: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="careerGoal">Career Goal (optional)</Label>
            <Textarea id="careerGoal" placeholder="e.g. Full Stack Developer at a tech company" value={profile.careerGoal}
              onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })} />
          </div>
          <Button onClick={handleSave} className="w-fit gradient-primary text-primary-foreground">
            <Save className="mr-2 h-4 w-4" /> Save Profile
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
