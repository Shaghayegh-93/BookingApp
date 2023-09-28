import "./App.css";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <LocationList/>
    </>
  );
}

export default App;
