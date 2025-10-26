import Post from "../models/Post.js";
import User from "../models/User.js";

// ✅ Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username email");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// ✅ Get single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "username email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

// ✅ Create new post
export const createPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPost = new Post({
      user: userId,
      title,
      content,
      likes: [],
      comments: [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// ✅ Update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

// ✅ Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

// ✅ Like / Unlike post
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.includes(userId);
    if (hasLiked) {
      post.likes = post.likes.filter((uid) => uid.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Failed to toggle like" });
  }
};

// ✅ Add comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = { user: userId, text, createdAt: new Date() };
    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
