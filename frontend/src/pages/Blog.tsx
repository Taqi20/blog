import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { CompleteBlog } from "../components/CompleteBlog";

export const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if (loading) {
        return <div>
            loading...
        </div>
    }



    return <div>
        <CompleteBlog blog={blog} />
    </div>
}