interface TSearch {
  value: string;
  onEnter: any;
  onChange: (keyword: string) => void;
}

const Search = (props: TSearch) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.onEnter(e.currentTarget.value);
    }
  }
  return (
    <input
      value={props.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      className="border border-gray-300 leading-12 rounded-md pl-4 w-full outline-none focus:outline-none"
      type="text"
      name=""
      id=""
      placeholder="Insert placeholder"
    />
  )
};

export default Search;