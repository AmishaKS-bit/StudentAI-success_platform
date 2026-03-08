import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import StudyPlannerPage from "./pages/StudyPlannerPage";
import SkillGapPage from "./pages/SkillGapPage";
import CareerPage from "./pages/CareerPage";
import MockInterviewPage from "./pages/MockInterviewPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/study-planner" element={<StudyPlannerPage />} />
          <Route path="/skill-gap" element={<SkillGapPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/interview" element={<MockInterviewPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
