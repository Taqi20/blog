import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlogs } from "../hooks/DeletePost";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface BlogProps {
    blogId: string;
    authorId: string;
}

export const BlogComponent: React.FC<BlogProps> = ({
    blogId
}) => {

    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user");

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                    headers: {
                        Authorization: token
                    }
                });
                const userId = res.data.authorId;

                if (userId === user_id) {
                    setIsOwner(true);
                }
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };
        fetchPostDetails();
    }, [blogId, token, user_id]);

    const handleDelete = async () => {
        try {
            await deleteBlogs(blogId, navigate);
            alert("Successfully blog deleted");
            navigate('/');
        } catch (error) {
            console.error("Error:", error);
            alert("Not Authorized to Delete");
        }
    };


    return (
        isOwner ? (
            <div>
                <h1>Blog Details</h1>
                <button onClick={handleDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Blog</button>
            </div>
        ) : null
    );
};