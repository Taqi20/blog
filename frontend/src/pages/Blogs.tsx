// import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
// import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
import { Nav } from "../components/blog-nav";
import { useLocation } from "react-router-dom"


export const Blogs = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const refresh = queryParams.get('refresh') || undefined;
    const { loading, blogs } = useBlogs("bulk",refresh)

    if (loading) {
        return (

            <div className="flex justify-center items-center absolute inset-0 h-screen w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="relative inline-flex">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
            </div>

        )
    }
    else {
        return (

            <div className="absolute inset-0 max-h-fit min-h-screen max-w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <Nav />
                <div className="w-full sm:w-4/5 m-auto mb-10 p-4 rounded-t-xl h-fit mt-10 flex flex-col gap-3 backdrop-blur-xs shadow-md">
                    {blogs.map(blog => <BlogCard id={blog.id} title={blog.title} description={blog.content} createdAt={blog.createdAt} author={blog.author?.name ?? 'Anonymous'} authorId={blog.author?.id ?? 'Anonymous'} />)}
                </div>

            </div>
        )
    }
}