// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { postService } from "../services/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postService.getAll();
        setPosts(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Latest Posts
        </h1>

        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md mb-8 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-center px-4 py-3">
                <img
                  className="h-11 w-11 rounded-full object-cover border border-gray-300"
                  src={post.author?.profilePic || "https://via.placeholder.com/40"}
                  alt="Profile"
                />
                <div className="ml-3">
                  <p className="font-semibold text-gray-800 text-sm">
                    @{post.author?.username || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Image / Content */}
              {post.image ? (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full max-h-[500px] object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              ) : (
                <div className="px-4 py-3">
                  <p className="text-gray-700 text-base leading-relaxed">
                    {post.content || "No content provided"}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                <div className="flex items-center space-x-6 text-gray-600 text-sm">
                  <button className="hover:text-red-500 transition">
                    ❤️ Like
                  </button>
                  <button className="hover:text-blue-500 transition">
                    💬 Comment
                  </button>
                  <button className="hover:text-green-500 transition">
                    🔁 Share
                  </button>
                </div>
              </div>

              {/* Caption */}
              {post.title && (
                <div className="px-5 pb-4 text-sm text-gray-800">
                  <p className="leading-snug">
                    <span className="font-semibold">
                      @{post.author?.username || "user"}:
                    </span>{" "}
                    {post.title}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-12 text-lg">
            No posts yet 😔
          </p>
        )}
      </div>
    </div>
  );
}
