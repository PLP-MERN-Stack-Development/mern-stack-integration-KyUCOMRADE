import React, { useEffect, useState } from "react";
import { postService } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("category", post.category);
      if (post.featuredImageFile) formData.append("featuredImage", post.featuredImageFile);

      await postService.updatePost(id, formData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading post...</p>;
  if (!post) return <p className="text-center mt-8 text-red-500">Post not found</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            rows={6}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Change Featured Image</label>
          <input
            type="file"
            onChange={(e) => setPost({ ...post, featuredImageFile: e.target.files[0] })}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
