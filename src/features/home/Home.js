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
} from "../../app/redditSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const subreddit = useSelector(selectSubreddit);
  const status = useSelector(selectRedditStatus);
  const searchTerm = useSelector(selectSearchTerm);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReddit(subreddit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subreddit]);
  
  const redditResults = useSelector(selectRedditResults).filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = page * postsPerPage;
  //const indexOfFirstPost = indexOfLastPost - postsPerPage; // not used
  const currentPosts = redditResults.slice(0, indexOfLastPost);
  //const paginate = (pageNumber) => setPage(pageNumber); // not used

  const homeContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };

  function handleLoadClick() {
    setPage(page + 1);
  }

  if (status === "loading") {
    return (
      <div style={homeContainerStyle}>
        <Skeleton
          count={5}
          containerClassName="skeleton-container"
          height="100px"
          baseColor="#252525"
          highlightColor="#505050"
          style={{ border: "1px solid #505050", marginBottom: 10 }}
        />
      </div>
    );
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
      {currentPosts.map((result) => (
        <Card key={result.id} result={result} />
      ))}
      {redditResults.length > currentPosts.length ? (
        <button type="button" onClick={handleLoadClick}>Load More</button>
      ) : (
        <p style={{ fontWeight: "bold" }}>End of Feed</p>
      )}
    </div>
  );
}
