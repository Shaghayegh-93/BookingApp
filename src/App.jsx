import "./App.css";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./components/bookmarkLayout/BookmarkLayout";
import BookmarkList from "./components/bookmarkLayout/BookmarkList";
import AddNewBookmark from "./components/bookmarkLayout/AddNewBookmark";
import BookmarkListProvider from "./components/context/BookmarkListProvider";
import SingleBookmark from "./components/bookmarkLayout/SingleBookmark";

function App() {
  return (
    <BookmarkListProvider>
      <HotelProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/Bookmark" element={<BookmarkLayout />}>
            <Route index element={<BookmarkList />} />
            <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
        </Routes>
      </HotelProvider>
    </BookmarkListProvider>
  );
}

export default App;
