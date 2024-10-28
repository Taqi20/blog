import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface blogs {
    id: string,
    title: string,
    content: string,
    author: {
        id: string,
        name: string
    },
    createdAt: Date
}


interface blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    },
    comments: {
        id: string,
        name: string,
        content: string,
        createdAt: Date
    }[],
    createdAt: Date
}

export const useBlogs = (reference: string, refreshKey?: string) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blogs[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token:", token); // Check if token exists
        axios.get(`${BACKEND_URL}/api/v1/blog/${reference}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                console.log("Raw API Response:", response.data); // Log full response
                console.log("Blogs array:", response.data.posts); // Log blogs array
                setBlogs(response.data.posts);
                setLoading(false);
            })
            .catch(error => {
                console.error("Status:", error.response?.status);
    console.error("Headers:", error.response?.headers);
    console.error("Data:", error.response?.data);
                setLoading(false);
            });
    }, [refreshKey])

    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<blog>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                setBlog(response.data);
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