import { useEffect } from "react";
import { BookHeart, CircleCheck, CircleX } from "lucide-react";

import Book from "../components/Book";
import Search from "../components/Search";
import useFetch from "../hooks/useFetch";
import useSearchBooks from "../hooks/useSearchBooks";
import Button from "../components/Button";
import useNavigation from "../hooks/useNavigation";
import Toast from "../components/Toast";
import { Status } from "../enum";

const Home = () => {
  const {
    searchBook,
    addToFavourites,
    bookList,
    message,
    showToast,
    flag,
    loading,
  } = useFetch();
  const { keyword, onChangeKeyword } = useSearchBooks();
  const { redirectToPage } = useNavigation();

  const handleSearchBooks = () => {
    searchBook(keyword);
  };

  useEffect(() => {
    searchBook("aid");
  }, []);

  return (
    <div className="p-4 relative">
      <Toast
        show={showToast}
        flag={flag}
      >
        <div className="flex justify-center items-center gap-1">
          {flag === Status.success ? (
              <CircleCheck size={14} />
            ) : <CircleX size={14} />
          }
          <p>{message}</p>
        </div>
      </Toast>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Search</h1>
        <Button onClick={() => redirectToPage('/favourites')}>
          <BookHeart size={14} className="my-auto" />
          <p className="my-auto">See favourites</p>
        </Button>
      </div>
      <div className="my-5">
        <Search
          value={keyword}
          onEnter={handleSearchBooks}
          onChange={onChangeKeyword}
          placeholder="Search books"
        />
      </div>
      <div>
        {loading && bookList.length === 0 && (<p>Loading...</p>)}
        {bookList.length > 0 && bookList.map((book: any, index: number) => (
          <Book
            bookDetail={book.volumeInfo}
            key={`book-${book.id}`}
            addToFavourite={(payload) => addToFavourites(payload)}
            index={index}
            totalBook={bookList.length}
            showFavButton={true}
          />
        ))}
      </div>
    </div>
  )
};

export default Home;