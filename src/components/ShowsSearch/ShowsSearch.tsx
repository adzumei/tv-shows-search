import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setQuery } from "../../features/shows/showsSlice";

const ShowsSearch = () => {
    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.shows.query);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(e.target.value));
    };

    return (
        <div className="search-container">
            <label htmlFor="search">Search for TV Show:</label>
            <input
                id="search"
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Enter show name..."
            />
        </div>
    );
};

export default ShowsSearch;
