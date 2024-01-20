import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData, setInput } from "../features/userSlice";
import '../styling/Blogs.css';

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  console.log("Search Input:", searchInput); // Add this line to log the searchInput value

  const blogUrl = `https://gnews.io/api/v4/search?q=${searchInput}&apikey=071dcb2437ca1894bd02d0cbc5fb3566`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(blogUrl);
        dispatch(setBlogData(response.data));
        setBlogs(response.data.articles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading && <h1 className="loading">Loading...</h1>}
      <div className="blogs">
        {blogs.map((blog) => (
          <a key={blog.googleId} className="blog" target="_blank" rel="noopener noreferrer" href={blog.url}>
            <img src={blog.image} alt={blog.title} />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}

        {blogs.length === 0 && (
          <h1 className="no__blogs">
            No blogs available 😞. Search something else to read blogs on the greatest platform.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
