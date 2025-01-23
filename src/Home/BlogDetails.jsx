import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../Hoooks/useAxiosSecure';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axiosSecure.get(`/add-blog/${id}`);
                setBlog(response.data);
            } catch (err) {
                console.error('Error fetching blog details:', err);
            }
        };

        fetchBlogDetails();
    }, [id, axiosSecure]);

    if (!blog) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div
                key={blog._id}
                className="bg-white relative shadow-lg rounded-lg max-w-4xl w-full overflow-hidden group"
            >
                {/* Hover effect bar */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>

                {/* Blog Content */}
                <div className="text-center p-6">
                    {/* Blog Title */}
                    <h1 className="text-3xl text-center font-semibold text-red-600">{blog.title}</h1>

                    {/* Category */}
                    <p className="text-gray-600 mt-5">
                        <span className="text-red-600 font-bold">Category:</span> {blog.category}
                    </p>

                    {/* Image (if available) */}
                    {blog.imageUrl && (
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-60 object-cover mb-8 rounded-md"
                        />
                    )}

                    {/* Blog Description */}
                    <p className="text-gray-600 mt-3">
                        <span className="text-red-600 font-bold">Description:</span> {blog.description}
                    </p>

                    {/* Blog Content (HTML) */}
                    <div
                        className="prose max-w-none text-gray-800 mt-4"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
