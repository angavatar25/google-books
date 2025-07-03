import { useState } from "react"

const useSearchBooks = () => {
  const [keyword, setKeyword] = useState("");

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return { keyword, onChangeKeyword };
};

export default useSearchBooks;