import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { selectCommentsStatus } from "../../app/redditSlice";

export default function Comments({ comments = [] }) {
  const commentsStatus = useSelector(selectCommentsStatus) || "idle";

  const commentsContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 700,
    width: "100%",
    zIndex: "100",
  };

  const commentStyle = {
    backgroundColor: "#202020",
    padding: 10,
    margin: 5,
    width: "100%",
    height: "auto",
    textAlign: "left",
    border: "1px solid #505050",
    borderRadius: 5,
    boxShadow: "0 0 5px #000",
    overflowWrap: "break-word",
  };

  if (commentsStatus === "loading") {
    return (
      <div style={commentsContainerStyle}>
        <Skeleton
          count={5}
          containerClassName="skeleton-container"
          height="40px"
          baseColor="#252525"
          highlightColor="#505050"
          style={{ border: "1px solid #505050", marginBottom: 5 }}
        />
      </div>
    );
  }

  if (commentsStatus === "rejected") {
    return (
      <div style={commentsContainerStyle}>
        <p>Failed to load comments | Please try again later</p>
      </div>
    );
  }

  return (
    <div style={commentsContainerStyle}>
      {comments.map((comment) => (
        <p style={commentStyle} key={comment.id}>
          {comment.body}
        </p>
      ))}
    </div>
  );
}
