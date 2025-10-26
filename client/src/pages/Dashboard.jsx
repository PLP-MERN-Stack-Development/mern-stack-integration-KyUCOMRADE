import React, { useEffect, useState } from "react";
import { postService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      try {
        const data = await postService.getAllPosts(); // Optionally, filter by author
        const myPosts = data.posts.filter((p) => p.author?._id === user._id);
        setPosts(myPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-8 text-red-500">
        Please login to view your dashboard.
      </p>
    );

  if (loading) return <p className="text-center mt-8">Loading your posts...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">
        Your Dashboard
      </h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/create-post"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {post.featuredImage && (
                <img
                  src={`http://localhost:5000/uploads/${post.featuredImage}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt || post.content.substring(0, 100) + "..."}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
