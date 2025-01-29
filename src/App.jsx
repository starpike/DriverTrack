import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import VehiclesPage from "./pages/VehiclesPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
