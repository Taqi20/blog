import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

export async function deleteBlogs(blogId: string, navigate: ReturnType<typeof useNavigate>): Promise<string> {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/signin");
        return "redirecting to signin";
    }
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blogId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data.message;
    } catch (error) {
        console.error('Error while deleting the blog: ', error);
        return 'Failed to delete the blog';
    }
}