interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <div className="p-4 border-b border-slate-200 pb-4 w-screen sm:max-w-xl md:max-w-2xl">
        <div className="flex pb-2">
            <div className="flex justify-center flex-col">
                <Avatar size="small" name={authorName} />
            </div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col"> {authorName}</div>
            <div className="flex justify-center flex-col pl-2">
                <Circle />
            </div>
            <div className="font-thin pl-2 text-slate-400 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0, 50) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">{Math.ceil(content.length / 100)} minutes read</div>
    </div>
}

function Circle() {
    return <div className=" h-1 w-1 rounded-full bg-slate-500">
    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-7 h-7" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600`}>{name[0]}</span>
    </div>
}