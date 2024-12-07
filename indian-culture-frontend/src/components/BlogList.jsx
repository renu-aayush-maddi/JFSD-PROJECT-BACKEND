import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogList.css'; // Importing the CSS file

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list-container">
      <h1 className="title">Blogs</h1>
      <ul className="blog-list">
        {blogs.map(blog => (
          <li key={blog.id} className="blog-item">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
            <div className="blog-info">
              <p className="author">Author: {blog.author}</p>
              <p className="created-at">Created At: {new Date(blog.createdAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
