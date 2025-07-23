import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { setQuery, fetchShows, clearResults } from "../../features/shows/showsSlice";

const ShowsSearch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const query = useSelector((state: RootState) => state.shows.query);
    const results = useSelector((state: RootState) => state.shows.results);
    const loading = useSelector((state: RootState) => state.shows.loading);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setQuery(value));

        if (value.trim().length > 1) {
            dispatch(fetchShows(value));
        } else {
            dispatch(clearResults());
        }
    };

    const handleSelect = (id: number) => {
        dispatch(clearResults());
        navigate(`/shows/${id}`);
    };

    return (
        <div className="search-wrapper">
            <label htmlFor="search">Search for TV Show: </label>
            <input
                id="search"
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Enter show name..."
            />
            {loading && <div className="loader">Loading...</div>}
            {!loading && results.length > 0 && (
                <div className="autocomplete">
                    {results.map((item) => (
                        <div
                            key={item.show.id}
                            className="autocomplete-item"
                            onClick={() => handleSelect(item.show.id)}
                        >
                            {item.show.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowsSearch;
