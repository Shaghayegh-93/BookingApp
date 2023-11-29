import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkListContext = createContext();
const BASE_URL = "http://localhost:5000";
const initialState = {
  currentBookmarkList: null,
  bookmarks: [],
  isLoading: false,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: action.payload,
        isLoading: false,
      };
    case "bookmark/loaded":
      return {
        ...state,
        bookmarks: action.payload,
        isLoading: false,
      };
    case "bookmark/created":
      return {
        bookmarks: [...state.bookmarks, action.payload],
        isLoading: false,
        currentBookmarkList: action.payload,
      };
    case "bookmarks/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload
        ),
        currentBookmarkList: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}
function BookmarkListProvider({ children }) {
  const [{ currentBookmarkList, bookmarks, isLoading, error }, dispatch] =
    useReducer(bookmarkReducer, initialState);
  //   const [currentBookmarkList, setCurrentBookmarkList] = useState(null);
  //   const [bookmarks, setBookmarks] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "an Error accureed in loading bookmarks",
        });
        toast.error(error?.message);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmarkList?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: "rejected",
        payload: "an Error accureed in loading bookmark",
      });
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);

      //   setCurrentBookmarkList(data);
      //   setBookmarks((prev) => [...prev, data]);

      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: "rejected",
        payload: "an Error accureed in creating bookmark",
      });
    }
  }
  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      //   setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
      dispatch({
        type: "bookmarks/deleted",
        payload: id,
      });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: "rejected",
        payload: "an Error accureed in creating bookmark",
      });
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
