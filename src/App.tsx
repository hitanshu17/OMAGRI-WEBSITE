import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import FruitPage from "./pages/FruitsPage";
import LoadingPage from "./pages/LoadingPage";
import HayatKiwiPage from "./pages/HayatKiwi";
import ScrollToTop from "./components/shared/ScrollToTop";

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
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hayat-kiwi" element={<HayatKiwiPage />} />
        </Route>
        <Route path="/:fruitName" element={<FruitPage />} />
      </Routes>
      <LoadingPage isLoading={isLoading} />
    </>
  );
}

export default App;
