import React, { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkListContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkListProvider({ children }) {
  const [currentBookmarkList, setCurrentBookmarkList] = useState(null);
  const [isLoadingCurrentBookmarkList, setIsLoadingCurrentBookmarkList] =useState(false);
    

  const { data, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmarkList(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmarkList(data);
      setIsLoadingCurrentBookmarkList(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoadingCurrentBookmarkList(false);
    }
   
  }
  return (
    <BookmarkListContext.Provider
      value={{
        data,
        isLoading,
        getBookmark,
        currentBookmarkList,
        isLoadingCurrentBookmarkList,
      }}
    >
      {children}
    </BookmarkListContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmarkList() {
  return useContext(BookmarkListContext);
}
