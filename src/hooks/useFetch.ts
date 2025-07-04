import { useState } from "react";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

import { apiFetch } from "../helper/api";
import { database } from "../../firebase";
import type { TFavourites } from "../interface/interface";
import { Status } from "../enum";

const useFetch = () => {
  const [bookList, setBookList] = useState([]);
  const [favList, setFavList] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState<Status>(Status.success);

  const searchBook = (keyword: string) => {
    const keyQuery = new URLSearchParams({
      q: keyword.length > 0 ? keyword : "",
    });

    setLoading(true);

    apiFetch(`/volumes?q=${keyQuery.toString()}`)
      .then((res) => {
        setBookList(res.items);
      })
      .catch(() => {
        // DO nothing
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const toastTimeout = () => {
    const toastTimeout = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => clearTimeout(toastTimeout);
  };

  const addToFavourites = async (payload: TFavourites) => {
    const { name: bookName } = payload;

    try {
      const q = query(collection(database, 'bookFavourites'), where('name', '==', bookName));
      const queryDocs = await getDocs(q);

      if (queryDocs.empty) {
        await addDoc(collection(database, "bookFavourites"), payload)
          .then(() => {
            setShowToast(true);
            setFlag(Status.success);
            setMessage("Book added");

            toastTimeout();
          })

        return;
      }

      setShowToast(true);
      setFlag(Status.failed);
      setMessage("Book already exist");

      toastTimeout();
    } catch (e) {
      // do nothing
    }
  };

  const fetchFavouriteBooks = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(database, "bookFavourites"));
  
      const bookList: any = querySnapshot.docs.map((book) => {
        const id = book.id;
        const { author, name, rating, thumbnail } = book.data();

        return {
          id,
          author,
          name,
          rating,
          thumbnail
        }
      });

      setFavList(bookList);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchBook,
    addToFavourites,
    fetchFavouriteBooks,
    bookList,
    favList,
    showToast,
    message,
    flag,
    loading,
  };
};

export default useFetch;