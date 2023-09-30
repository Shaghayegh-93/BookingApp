import "./App.css";
import Header from "./components/Header";
import  { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";

function App() {
  return (
    <>
      <Toaster />
      <Header/>
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<p>singleHotels</p>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
