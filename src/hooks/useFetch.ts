import { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';

import { apiFetch } from "../helper/api";
import { database } from "../../firebase";
import type { TFavourites } from "../interface/interface";

const useFetch = () => {
  const [bookList, setBookList] = useState([]);

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
    console.log(payload)
    try {
      const docRef = await addDoc(collection(database, "bookFavourites"), payload);

      console.log("Doc written in", docRef.id);
    } catch (e) {
      // do nothing
    }
  }

  return { searchBook, addToFavourites, bookList };
};

export default useFetch;