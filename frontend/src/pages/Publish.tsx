import axios from "axios"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    return <div>
        <div className="flex flex-col justify-center gap-4 w-full max-w-2xl mx-auto mt-3">
            <div className="relative w-full">
                <textarea onChange={(e) => {
                    setTitle(e.target.value)
                }}
                    className="h-full w-full overflow-hidden resize-none border-b border-gray-300 bg-transparent pt-6 font-sans text-3xl font-normal text-gray-700 outline-none transition-all placeholder-shown:border-gray-300 focus:border-black focus:outline-none"
                    placeholder=" Title">
                </textarea>
            </div>
            <TextEditor onChange={(e) => {
                setDescription(e.target.value)
            }} />
            <button onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content: description
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                navigate(`/blog/${response.data.id}`)
            }} className="w-2/4 mx-auto bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full">
                Button
            </button>
        </div>

    </div>
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div>
        <div className="relative w-full h-80">
            <textarea
                onChange={onChange}
                className=" h-full  w-full resize-none border-b border-gray-300 bg-transparent pt-6 font-sans text-lg font-normal text-gray-700 outline-none overflow-hidden transition-all placeholder-shown:border-gray-300 focus:border-black focus:outline-none"
                placeholder="Content ">
            </textarea>

        </div>
    </div>
}