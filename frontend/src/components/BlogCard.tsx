import { Link } from "react-router-dom";
import moment from "moment-timezone"
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react"
import bagde from "../assets/Badge.svg"



interface BlogCardProps {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    author: string,
    authorId: string
}

export const BlogCard = ({
    id,
    title,
    description,
    createdAt,
    author,
    authorId
}: BlogCardProps) => {

    const [badge, setBadge] = useState(false)
    useEffect(() => {
        if (authorId === "4473868e-b7b4-4df9-bb61-7c17931bdbc2") {
            setBadge(true);
        } else {
            setBadge(false);
        }
    }, [author])
    const createdAtIndiaTime = moment(createdAt).tz('Asia/Kolkata').format('MMMM D, YYYY [at] hh:mm A')

    return (
        <Link to={`/blog/${id}`} >
            <div className="flex flex-col gap-2 sm:gap-3 w-full pb-4 border-b items-start justify-start">
                <div className="flex gap-1 sm:gap-2 items-center w-full">
                    <div className="flex gap-2 items-center">
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
                            <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div>
                            <p className="text-sm sm:text-lg font-bold">{author}</p>
                        </div>
                    </div>
                    {badge && (
                        <div className="flex items-center">
                            <div className="h-4 w-4 pt-0.5">
                                <img src={bagde} alt="Badge" />

                            </div>
                        </div>
                    )}
                    <p className="font-md text-xs text-slate-600 pt-0.5">{createdAtIndiaTime.toLocaleString()}</p>
                </div>
                <div>
                    <p className="font-bold text-xl sm:text-3xl">{title.length > 100 ? title.slice(0, 100) + "..." : title}</p>
                </div>
                <div>
                    <ReactMarkdown className="text-slate-500 text-xs sm:text-md">{description.length > 200 ? description.slice(0, 200) + "..." : description}</ReactMarkdown>
                </div>
                <div>
                    <div className="text-xs sm:text-sm opacity-80 w-fit rounded">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 shadow-md shadow-gray-200 gap-1">
                            <svg className="w-2 sm:w-3 h-2 sm:h-3  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                            {`${Math.ceil(description.length / 400)} minute(s) read`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export function Circle() {
    return <div className=" h-1 w-1 rounded-full bg-slate-500">
    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-7 h-7" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600`}>{name[0]}</span>
    </div>

}