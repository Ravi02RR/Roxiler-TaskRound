import Home from "./pages/Home"
import Navbar from "./components/Nav/Navbar"
import MonthlyStats from "./pages/MonthlyStats"
import PriceRange from "./pages/PriceRange"
import Piechart from "./pages/Piechart"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MonthlyStats" element={<MonthlyStats />} />
          <Route path="/price-range" element={<PriceRange />} />
          <Route path="/pieChart" element={<Piechart />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
