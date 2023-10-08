import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkListContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkListProvider({ children }) {
  const [currentBookmarkList, setCurrentBookmarkList] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmarkList(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setCurrentBookmarkList(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteBookmark(id) {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarkListContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmarkList,
        createBookmark,
        deleteBookmark,
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
