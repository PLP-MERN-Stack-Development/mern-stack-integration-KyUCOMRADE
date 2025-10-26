import React, { useEffect, useState } from "react";
import { postService } from "../services/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data.post);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const data = await postService.addComment(id, { content: comment });
      setPost((prev) => ({ ...prev, comments: data.comments }));
      setComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading post...</p>;
  if (!post) return <p className="text-center mt-8 text-red-500">Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      {post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        By {post.author?.username || "Unknown"} |{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mb-6">{post.content}</p>

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="space-y-4 mb-6">
        {post.comments?.length === 0 && <p>No comments yet.</p>}
        {post.comments?.map((c) => (
          <div key={c._id} className="p-2 border rounded">
            <p className="text-sm text-gray-700">{c.content}</p>
            <p className="text-xs text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {user && (
        <form onSubmit={handleComment} className="space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Add a comment..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default PostDetails;
