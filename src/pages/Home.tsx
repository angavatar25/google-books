import { useEffect } from "react";
import { BookHeart } from "lucide-react";

import Book from "../components/Book";
import Search from "../components/Search";
import useFetch from "../hooks/useFetch";
import useSearchBooks from "../hooks/useSearchBooks";
import Button from "../components/Button";

const Home = () => {
  const { searchBook, addToFavourites, bookList } = useFetch();
  const { keyword, onChangeKeyword } = useSearchBooks();

  const handleSearchBooks = () => {
    searchBook(keyword);
  };

  useEffect(() => {
    searchBook("aid");
  }, []);

  return (
    <div className="p-4 relative">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Search</h1>
        <Button>
          <BookHeart size={14} className="my-auto" />
          <p className="my-auto">See favourites</p>
        </Button>
      </div>
      <div className="my-5">
        <Search
          value={keyword}
          onEnter={handleSearchBooks}
          onChange={onChangeKeyword}
        />
      </div>
      <div>
        {bookList.length > 0 && bookList.map((book: any, index: number) => (
          <Book
            key={`book-${book.id}`}
            addToFavourite={(payload) => addToFavourites(payload)}
            thumbnail={book.volumeInfo?.imageLinks?.thumbnail}
            author={book.volumeInfo?.authors}
            name={book.volumeInfo?.title}
            ratingValue={book.volumeInfo?.averageRating ?? 0}
            index={index}
            totalBook={bookList.length}
          />
        ))}
      </div>
    </div>
  )
};

export default Home;