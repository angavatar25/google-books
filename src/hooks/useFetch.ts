import { useState } from "react";
import { collection, addDoc, getDocs } from 'firebase/firestore';

import { apiFetch } from "../helper/api";
import { database } from "../../firebase";
import type { TFavourites } from "../interface/interface";

const useFetch = () => {
  const [bookList, setBookList] = useState([]);
  const [favList, setFavList] = useState([]);

  const searchBook = (keyword: string) => {
    const keyQuery = new URLSearchParams({
      q: keyword.length > 0 ? keyword : "",
    });

    apiFetch(`/volumes?q=${keyQuery.toString()}`)
      .then((res) => {
        setBookList(res.items);
      })
  };

  const addToFavourites = async (payload: TFavourites) => {
    try {
      await addDoc(collection(database, "bookFavourites"), payload);
    } catch (e) {
      // do nothing
    }
  };

  const fetchFavouriteBooks = async () => {
    try {
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
    }
  };

  return { searchBook, addToFavourites, fetchFavouriteBooks, bookList, favList };
};

export default useFetch;