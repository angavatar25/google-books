import { useState } from "react";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

import { apiFetch } from "../helper/api";
import { database } from "../../firebase";
import type { TFavourites } from "../interface/interface";
import { Status } from "../enum";

const useFetch = () => {
  const [bookList, setBookList] = useState([]);
  const [favList, setFavList] = useState([]);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [flag, setFlag] = useState<Status>(Status.success);

  const searchBook = (keyword: string) => {
    const keyQuery = new URLSearchParams({
      q: keyword.length > 0 ? keyword : "",
    });

    setLoading(true);

    apiFetch(`/volumes?${keyQuery.toString()}`)
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
    try {
      const { title: bookTitle } = payload;

      const q = query(collection(database, 'bookFavourites'),
        where('title', '==', bookTitle)
      );
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
        const { authors, title, averageRating, imageLinks } = book.data();

        return {
          id,
          authors,
          title,
          averageRating,
          imageLinks,
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