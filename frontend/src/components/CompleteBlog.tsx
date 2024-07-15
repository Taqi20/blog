import { Blog } from "../hooks"
import { AppBar } from "./AppBar"

export const CompleteBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <AppBar />
        <div className="grid grid-cols-6 px-10 w-full bg-yellow-400">
            <div className="bg-red-200 col-span-4">
                <div>
                    {blog.title}
                </div>
                <div>
                    {blog.content}
                </div>
            </div>
            <div className="bg-green-200 col-span-2">
                hello
            </div>
        </div>
    </div>
}