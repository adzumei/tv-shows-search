import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchShowById } from "../../features/shows/showsSlice";
import ShowsSearch from "../../components/ShowsSearch/ShowsSearch";

const ShowDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const show = useSelector((state: RootState) => state.shows.selectedShow);
    const loading = useSelector((state: RootState) => state.shows.detailsLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchShowById(id));
        }
    }, [dispatch, id]);

    return (
        <div className="details-page">
            <h1>TV Shows</h1>
            <ShowsSearch />

            {loading && <div className="loader">Loading show...</div>}

            {show && (
                <div className="show-card">
                    <img src={show.image?.medium} alt={show.name} />
                    <div className="show-info">
                        <h2>{show.name}</h2>
                        <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
                        <p><strong>Genres:</strong> {show.genres.join(", ")}</p>
                        <p><strong>Premiered:</strong> {show.premiered}</p>
                        <p><strong>Rating:</strong> {show.rating.average || "N/A"}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowDetails;
