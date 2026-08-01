import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import FruitPage from "./pages/FruitsPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with your real readiness check — initial data fetch,
    // asset preload, auth check, etc.
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/:fruitName" element={<FruitPage />} />
      </Routes>

      <LoadingPage isLoading={isLoading} />
    </>
  );
}

export default App;