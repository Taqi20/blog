import moment from "moment-timezone"
import badgeIcon from '../assets/Badge.svg'
import { useEffect, useState } from 'react'

interface CommentProps {
    id: string
    name: string
    content: string
    createdAt: Date
}

export const Comment = ({
    name,
    content,
    createdAt
}: CommentProps) => {
    const [showBadge, setShowBadge] = useState(false)

    useEffect(() => {
        if (name === "Taqi") {
            setShowBadge(true)
        } else {
            setShowBadge(false)
        }
    }, [name]) // Added name to dependency array

    const createdAtIndiaTime = moment(createdAt).tz('Asia/Kolkata').format('MMMM D, YYYY [at] hh:mm A')

    return (
        <div className="flex gap-3 mb-4 items-center border p-2 rounded">
            <div className="flex">
                <div className="relative w-8 h-8 overflow-hidden bg-slate-200 rounded-full cursor-pointer">
                    <svg
                        className="absolute w-10 h-10 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>
            <div className="w-4/5">
                <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm sm:text-md">{name}</p>
                    {showBadge && (
                        <div className="flex items-center">
                            <div className="h-4 w-4">
                                <img src={badgeIcon} alt="Badge" />
                            </div>
                        </div>
                    )}
                    <p className="font-md text-xs text-slate-600 pt-0.5">
                        {createdAtIndiaTime}
                    </p>
                </div>
                <p className="text-sm">{content}</p>
            </div>
        </div>
    )
}