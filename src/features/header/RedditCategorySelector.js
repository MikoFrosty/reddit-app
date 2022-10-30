import { useDispatch, useSelector } from "react-redux";
import { selectSubreddit, setSubreddit } from "../../app/redditSlice";

export default function RedditCategorySelector() {
    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);

    const handleChange = (event) => {
        dispatch(setSubreddit(event.target.value));
    }

    return (
        <div>
            <select value={subreddit} onChange={handleChange}>
                <option value="top">Top</option>
                <option value="r/aww">Aww</option>
                <option value="r/funny">Funny</option>
                <option value="r/gaming">Gaming</option>
                <option value="r/gifs">Gifs</option>
                <option value="r/pics">Pics</option>
                <option value="r/science">Science</option>
                <option value="r/todayilearned">Today I Learned</option>
                <option value="r/videos">Videos</option>
            </select>
        </div>
    )
}