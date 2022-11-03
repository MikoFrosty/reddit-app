import moment from "moment";
import shortenNumber from "../../utils/shortenNumber";
import { useInView } from "react-intersection-observer";
import Comments from "../comments/Comments";
import { useSelector, useDispatch } from "react-redux";
import {
  selectComments,
  selectCommentsId,
  setCommentsId,
  fetchComments,
} from "../../app/redditSlice";
import { useState, useEffect } from "react";

export default function Card({ result }) {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments) || [];
  const commentsId = useSelector(selectCommentsId) || "none";
  const [showComments, setShowComments] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.65,
  });
  const [ref2, inView2] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    forceVideoPlay(inView);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (inView2 && !mediaLoaded) {
      setMediaLoaded(true);
    }
  }, [inView2, mediaLoaded]);

  function getImage() {
    if (result.is_gallery) {
      return result.media_metadata[
        result.gallery_data.items[0].media_id
      ].s.u.replace(/&amp;/g, "&");
    } else if (result.is_video) {
      return result.media.reddit_video.fallback_url;
    } else if (result.url.match(/gifv$/)) {
      return result.url.replace(/gifv$/, "gif");
    } else if (result.url.match(/(jpg|png|gif)$/)) {
      return result.url;
    } else {
      return "https://www.redditstatic.com/icon.png";
    }
  }

  function isTypeVideo() {
    if (result.is_video) {
      return true;
    }
    /*
    if (result.url.match(/gifv$/)) {
      return true;
    }
    */
    return false;
  }

  function handleCommentsButtonClick() {
    if (commentsId !== result.id) {
      setShowComments(true);
      dispatch(setCommentsId(result.id));
      dispatch(fetchComments(result.permalink));
    } else {
      setShowComments(!showComments);
    }
  }

  function forceVideoPlay(play) {
    const video = document.querySelector(`#video-${result.id}`);
    play ? video?.play() : video?.pause();
  }

  const mediaStyle = {
    maxWidth: "100%",
    width: "auto",
    height: "auto",
    maxHeight: "75vh",
    margin: "1% 3%",
  };

  const cardContainerStyle = {
    width: "100%",
    fontSize: "0.8rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    marginBottom: 10,
    border: "1px solid #494949",
    borderRadius: 5,
    boxShadow: "0 0 5px #000",
    backgroundColor: "#181818",
    maxWidth: 700,
  };

  const textBoxStyle = {
    width: "100%",
    height: "auto",
    padding: "10 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const h2Style = {
    fontSize: "1.4rem",
    fontWeight: "bold",
    margin: 0,
    padding: "20px 5px",
  };

  const spanStyle = {
    fontSize: "0.6rem",
    flexBasis: "50%",
  };

  const commentsContainer = {
    width: "100%",
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <div style={cardContainerStyle} ref={ref2} data-testid="redditPost">
        <h2 style={h2Style}>{result.title}</h2>
        <span>
          <a
            className="link-to-reddit"
            rel="noopener noreferrer"
            href={`http://reddit.com${result.permalink}`}
            target="_blank"
          >
            See post on Reddit
          </a>
        </span>
        {(inView2 || mediaLoaded) && (isTypeVideo() ? (
          <video
            ref={ref}
            src={getImage()}
            id={`video-${result.id}`}
            controls
            autoPlay={true}
            playsInline
            muted
            style={mediaStyle}
          />
        ) : (
          <img
            src={getImage()}
            alt={result.title}
            style={mediaStyle}
          />
        ))}
        <div style={textBoxStyle}>
          <span style={spanStyle}>
            Posted by: {result.author} (
            {moment.unix(result.created_utc).fromNow()})
          </span>
          <button onClick={() => handleCommentsButtonClick()}>
            <span style={spanStyle}>
              Comments: {shortenNumber(result.num_comments, 1)}
            </span>
          </button>
          <span style={spanStyle}>
            Upvotes: {shortenNumber(result.score, 1)}
          </span>
        </div>
      </div>
      {commentsId === result.id && showComments && (
        <div id={result.id} style={commentsContainer}>
          <Comments comments={comments} />
        </div>
      )}
    </>
  );
}
