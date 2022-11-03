import Skeleton from "react-loading-skeleton";
import Card from "../card/Card";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRedditResults,
  fetchReddit,
  selectRedditStatus,
  selectSubreddit,
  selectSearchTerm,
  selectAfterId,
} from "../../app/redditSlice";
import { useEffect } from "react";

export default function Home() {
  const subreddit = useSelector(selectSubreddit);
  const status = useSelector(selectRedditStatus);
  const searchTerm = useSelector(selectSearchTerm);
  const afterId = useSelector(selectAfterId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReddit({ subreddit }));
  }, [dispatch, subreddit]);

  const redditResults = useSelector(selectRedditResults).filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const homeContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };

  function handleLoadClick(e) {
    e.preventDefault();
    dispatch(fetchReddit({ subreddit, useAfterId: true, afterId }));
  }

  function skeletonLoaders(numOfSkeletons = 1) {
    return (
      <Skeleton
        count={numOfSkeletons}
        containerClassName="skeleton-container"
        height="100px"
        baseColor="#252525"
        highlightColor="#505050"
        style={{ border: "1px solid #505050", marginBottom: 10 }}
      />
    );
  }

  if (status === "loading") {
    return skeletonLoaders(5);
  }

  if (status === "rejected") {
    return (
      <div style={homeContainerStyle}>
        <p>Failed to load posts | Please try again later</p>
      </div>
    );
  }

  return (
    <div style={homeContainerStyle} data-testid="redditResults">
      <SearchBar />
      {redditResults.map((result) => (
        <Card key={result.id} result={result} />
      ))}
      {status === "loadingMore" ? (
        skeletonLoaders(3)
      ) : (
        <button type="button" id="load-more-button" onClick={handleLoadClick}>
          Load More
        </button>
      )}
    </div>
  );
}
