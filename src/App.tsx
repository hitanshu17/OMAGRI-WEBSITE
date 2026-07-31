import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
