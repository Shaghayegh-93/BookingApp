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
import Login from "./components/Login";
import AuthProvider from "./components/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
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
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkLayout /> /
                </ProtectedRoute>
              }
            >
              <Route index element={<BookmarkList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}

export default App;
