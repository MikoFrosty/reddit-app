import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "../../app/redditSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <input
      id="search"
      type="text"
      placeholder="Search Posts..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
}
