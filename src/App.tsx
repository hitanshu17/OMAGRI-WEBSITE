import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import FruitPage from "./pages/FruitsPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/:fruitName" element={<FruitPage />} />
    </Routes>
  );
}

export default App;
