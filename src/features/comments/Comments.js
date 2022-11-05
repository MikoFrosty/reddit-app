import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { selectCommentsStatus } from "../../app/redditSlice";
import commentsStyles from "./Comments.module.css";

export default function Comments({ comments = [] }) {
  const commentsStatus = useSelector(selectCommentsStatus) || "idle";

  if (commentsStatus === "loading") {
    return (
      <div id={commentsStyles["comments-container"]}>
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
      <div id={commentsStyles["comments-container"]}>
        <p>Failed to load comments | Please try again later</p>
      </div>
    );
  }

  return (
    <div id={commentsStyles["comments-container"]}>
      {comments.map((comment) => (
        <p className={commentsStyles.comment} key={comment.id}>
          {comment.body}
        </p>
      ))}
    </div>
  );
}
