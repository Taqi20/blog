import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { CompleteBlog } from "../components/CompleteBlog";
import { AppBar } from "../components/AppBar";
import { PostSkeleton } from "../components/PostSkeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if (loading || !blog) {
        return <div>
            <AppBar />
            <PostSkeleton />
        </div>
    }

    return <div>
        <CompleteBlog blog={blog} />
    </div>
}