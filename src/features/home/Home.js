import Skeleton from "react-loading-skeleton";
import Card from "../card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRedditResults,
  fetchReddit,
  selectRedditStatus,
} from "../../app/redditSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const [subreddit, setSubreddit] = useState("top");
  const status = useSelector(selectRedditStatus);
  // remember when setting new subreddits to prefix with r/

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReddit(subreddit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subreddit]);
  const redditResults = useSelector(selectRedditResults);

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
  };

  function handleLoadClick() {
    setPage(page + 1);
  }

  if (status === "loading") {
    return (
      <div style={homeContainerStyle}>
        <Skeleton count={5} containerClassName="skeleton-container" height="100px"/>
      </div>
    );
  }

  return (
    <div style={homeContainerStyle}>
      {currentPosts.map((result) => (
        <Card key={result.id} result={result} />
      ))}
      {redditResults.length > currentPosts.length ? (
        <button onClick={handleLoadClick}>Load More</button>
      ) : (
        <p style={{ fontWeight: "bold" }}>End of Feed</p>
      )}
    </div>
  );
}
