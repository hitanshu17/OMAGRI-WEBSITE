import { Route, Routes } from "react-router-dom"

import MainLayout from "./layout/MainLayout"
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import FruitsPage from "./pages/OurFruits";
import PartnerWithUsPage from "./pages/PartnerWithUsPage";
import LeadershipPage from "./pages/LeadershipPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/our-fruits" element={<FruitsPage />} />
        <Route path="/our-leadership" element={<LeadershipPage />} />
        <Route path="/partner-with-us" element={<PartnerWithUsPage />} />
      </Route>
    </Routes>
  );
}

export default App
