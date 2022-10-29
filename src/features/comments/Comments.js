import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { selectCommentsStatus } from "../../app/redditSlice";

export default function Comments({ comments = [] }) {
    const commentsStatus = useSelector(selectCommentsStatus) || "idle";
    
    const commentsContainerStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 700,
        width: '100%',
        zIndex: '100',
    };

    const commentStyle = {
        backgroundColor: '#f5f5f5',
        padding: 10,
        margin: 5,
        width: '100%',
        height: 'auto',
        textAlign: 'left',
        border: '1px solid #ccc',
        borderRadius: 5,
        boxShadow: '0 0 5px #ccc',
        overflowWrap: 'break-word',
    };

    if (commentsStatus === "loading") {
        return (
            <div style={commentsContainerStyle}>
                <Skeleton count={5} containerClassName="skeleton-container" />
            </div>
        );
    };

    return (
        <div style={commentsContainerStyle}>
            {commentsStatus === "idle" && comments.map((comment) => (
                <p style={commentStyle} key={comment.id}>{comment.body}</p>
            ))}
        </div>
    )
}