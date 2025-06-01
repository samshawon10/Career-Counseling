import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet";


const ITEMS_PER_PAGE = 5;

const useUserRole = (uid) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!uid) return setRole(null);
    const fetchRole = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        setRole(docSnap.exists() ? docSnap.data().role : null);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        setRole(null);
      }
    };
    fetchRole();
  }, [uid]);

  return role;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.03, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const BlogPage = () => {
  const { user } = useContext(AuthContext);
  const role = useUserRole(user?.uid);
  const isAdmin = role === "admin";

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingForm, setEditingForm] = useState({ title: "", content: "" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return toast.error("Only admins can post blogs");
    const { title, content } = form;
    if (!title.trim() || !content.trim())
      return toast.error("Title and content are required");

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        author: user.displayName || "Anonymous",
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      setForm({ title: "", content: "" });
      setCurrentPage(1);
      toast.success("Blog added");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add blog");
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return toast.error("Only admins can delete blogs");
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteDoc(doc(db, "blogs", id));
      toast.success("Blog deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  const startEditing = (blog) => {
    if (!isAdmin) return;
    setEditingBlogId(blog.id);
    setEditingForm({ title: blog.title, content: blog.content });
  };

  const cancelEditing = () => {
    setEditingBlogId(null);
    setEditingForm({ title: "", content: "" });
  };

  const handleEditChange = (valueOrEvent) => {
    if (typeof valueOrEvent === "string") {
      setEditingForm({ ...editingForm, content: valueOrEvent });
    } else {
      const e = valueOrEvent;
      setEditingForm({ ...editingForm, [e.target.name]: e.target.value });
    }
  };

  const saveEdit = async () => {
    if (!editingForm.title.trim() || !editingForm.content.trim()) {
      return toast.error("Title and content are required");
    }

    try {
      await updateDoc(doc(db, "blogs", editingBlogId), {
        title: editingForm.title,
        content: editingForm.content,
      });
      toast.success("Blog updated");
      cancelEditing();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
        <Helmet>
        <title>Blog | Career Counsel+</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        Blog Articles
      </h1>

      {isAdmin ? (
        <Motion.form
          onSubmit={handleSubmit}
          className="mb-10 bg-white p-6 rounded-lg shadow border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Blog Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-4 p-3 border border-gray-300 rounded"
          />
          <SimpleMDE
            value={form.content}
            onChange={(value) => setForm({ ...form, content: value })}
            options={{
              spellChecker: false,
              placeholder: "Write your blog content in Markdown...",
              status: false,
            }}
          />
          <Motion.button
            type="submit"
            className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Post Blog
          </Motion.button>
        </Motion.form>
      ) : (
        <p className="text-center text-gray-600 mb-8 italic">
          {user
            ? "You are not authorized to post blogs."
            : "Please log in to post blogs."}
        </p>
      )}

      <Motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((blog) => (
            <Motion.div
              key={blog.id}
              className="bg-white p-6 rounded-lg shadow relative border"
              variants={itemVariants}
              whileHover="hover"
              layout
            >
              {editingBlogId === blog.id ? (
                <>
                  <input
                    name="title"
                    value={editingForm.title}
                    onChange={handleEditChange}
                    className="w-full mb-4 p-3 border rounded"
                    autoFocus
                  />
                  <SimpleMDE
                    value={editingForm.content}
                    onChange={(value) =>
                      setEditingForm({ ...editingForm, content: value })
                    }
                    options={{
                      spellChecker: false,
                      placeholder: "Edit your blog content...",
                      status: false,
                    }}
                  />
                  <div className="flex gap-4 mt-4">
                    <Motion.button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Save
                    </Motion.button>
                    <Motion.button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Cancel
                    </Motion.button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-indigo-700">
                    {blog.title}
                  </h2>
                  <div className="prose prose-lg max-w-none mt-3">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    By {blog.author} | {formatDate(blog.timestamp)}
                  </p>
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Motion.button
                        onClick={() => startEditing(blog)}
                        className="text-indigo-600 hover:text-indigo-800"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Edit
                      </Motion.button>
                      <Motion.button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Delete
                      </Motion.button>
                    </div>
                  )}
                </>
              )}
            </Motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs yet.</p>
        )}
      </Motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <Motion.button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            variants={buttonVariants}
            whileHover={currentPage === 1 ? undefined : "hover"}
            whileTap="tap"
          >
            Prev
          </Motion.button>
          {[...Array(totalPages)].map((_, i) => (
            <Motion.button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-800 text-white"
                  : "bg-indigo-200 hover:bg-indigo-400"
              }`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {i + 1}
            </Motion.button>
          ))}
          <Motion.button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            variants={buttonVariants}
            whileHover={currentPage === totalPages ? undefined : "hover"}
            whileTap="tap"
          >
            Next
          </Motion.button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
