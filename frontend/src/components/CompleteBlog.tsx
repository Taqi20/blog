import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

import { BlogComponent } from "../pages/Delete"
export const CompleteBlog = ({ blog }: { blog: Blog }) => {

    // const { Id } = useParams<{ Id: string }>();

    return <div>
        <AppBar />
        <div className="flex justify-center">

            <div className="grid grid-cols-6 px-20 w-full max-w-screen-xl py-10">
                <div className="col-span-4">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-400 py-2">
                        Posted on December 2023
                    </div>
                    <div>
                        {blog.content}
                    </div>
                    <BlogComponent blogId={blog.id} authorId={blog.author.name}></BlogComponent>
                </div>
                <div className="col-span-2">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic a nihil sit praesentium sequi dolorem rem possimus amet, vel eveniet.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}