import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "author": {
        "name": string
    }
}

export type BlogArray = Blog[];

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch blogs: ", error);
                setLoading(false);
            });
    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}

export async function deleteBlog(blogId: string) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/signin");
    }
    const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blogId}`, {
        headers: {
            Authorization: token,
        },
    });

    return res.data.message;
}