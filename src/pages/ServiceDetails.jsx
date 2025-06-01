import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthProvider";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((item) => item.id === id);
        setService(match);
      })
      .catch(() => setService(null));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("serviceId", "==", id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedComments = [];
      snapshot.forEach((doc) => {
        loadedComments.push({ id: doc.id, ...doc.data() });
      });
      loadedComments.sort((a, b) => new Date(b.date) - new Date(a.date));
      setComments(loadedComments);
    });
    return () => unsubscribe();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Please login to comment.");
      return;
    }
    if (!comment.trim()) return;

    const newComment = {
      serviceId: id,
      text: comment.trim(),
      date: new Date().toISOString(),
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      likes: 0,
      replies: [],
    };

    try {
      await addDoc(collection(db, "comments"), newComment);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const toggleLike = async (commentId) => {
    const commentDoc = doc(db, "comments", commentId);
    const commentObj = comments.find((c) => c.id === commentId);
    if (!commentObj) return;

    try {
      await updateDoc(commentDoc, { likes: (commentObj.likes || 0) + 1 });
    } catch (error) {
      console.error("Failed to update likes:", error);
    }
  };

  const addReply = async (commentId, replyText) => {
    if (!replyText.trim() || !user) return;

    const commentDoc = doc(db, "comments", commentId);
    const commentObj = comments.find((c) => c.id === commentId);
    if (!commentObj) return;

    const newReply = {
      text: replyText.trim(),
      userName: user.displayName || "Anonymous",
      userId: user.uid,
      date: new Date().toISOString(),
    };

    try {
      await updateDoc(commentDoc, {
        replies: [...(commentObj.replies || []), newReply],
      });
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < filledStars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  if (service === null) {
    return (
      <div className=" min-h-screen flex justify-center items-center p-6 text-xl font-semibold text-indigo-700 dark:text-indigo-300 px-4 text-center">
        Unable to load service details. Please try again later.
      </div>
    );
  }

  if (!service) {
    return (
      <div className=" min-h-screen flex justify-center items-center p-6 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
        Loading service details...
      </div>
    );
  }

  return (
    <div className=" min-h-screen p-6">
      <div className="max-w-4xl mx-auto mt-6 mb-6 p-12 md:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-indigo-200 dark:border-indigo-700 transition-colors">
        {/* Service Card */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <img
            src={service.image}
            alt={service.serviceName}
            className="w-full md:w-1/2 rounded-xl shadow-lg object-cover max-h-72 md:max-h-96"
          />
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-3">
              {service.serviceName}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-5 leading-relaxed">
              {service.description}
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-base mb-6">
              <li>
                <strong>Category:</strong> {service.category}
              </li>
              <li>
                <strong>Pricing:</strong> {service.pricing}
              </li>
              <li>
                <strong>Duration:</strong> {service.duration}
              </li>
              <li>
                <strong>Counselor:</strong> {service.counselor}
              </li>
              <li className="flex items-center gap-2">
                <strong>Rating:</strong>
                <div className="flex">{renderStars(service.rating || 4.8)}</div>
                <span className="ml-2 font-semibold text-indigo-600 dark:text-indigo-400">
                  {service.rating || "4.8"}
                </span>
              </li>
            </ul>

            <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-xl shadow-md border border-indigo-300 dark:border-indigo-700">
              <img
                src={service.counselorAvatar || "/default-avatar.png"}
                alt={service.counselor}
                className="w-16 h-16 rounded-full border-2 border-indigo-400 shadow-md"
              />
              <div>
                <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                  {service.counselor}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                  {service.counselorBio ||
                    "Certified career counselor with years of experience helping students & professionals."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
            Leave a Comment
          </h3>
          {user ? (
            <>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts or feedback..."
                rows={4}
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg resize-none shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                onClick={handleCommentSubmit}
                disabled={!comment.trim()}
                className={`mt-4 px-8 py-3 rounded-lg text-white font-semibold transition ${
                  comment.trim()
                    ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                Submit Comment
              </button>
            </>
          ) : (
            <p className="italic text-gray-500 dark:text-gray-400">
              Please{" "}
              <a href="/login" className="text-indigo-600 underline">
                login
              </a>{" "}
              to leave a comment.
            </p>
          )}
        </div>

        {/* Comments List */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
            Comments
          </h3>
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No comments yet. Be the first to share!
            </p>
          ) : (
            <ul className="space-y-6 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
              {comments.map((c) => (
                <li
                  key={c.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-indigo-200 dark:border-indigo-700 p-5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-indigo-800 dark:text-indigo-300 font-semibold text-base">
                      {c.userName}
                    </p>
                    <time className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(c.date).toLocaleString()}
                    </time>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-4">{c.text}</p>
                  <div className="flex items-center gap-6 text-indigo-600 dark:text-indigo-400 text-sm">
                    <button
                      onClick={() => toggleLike(c.id)}
                      className="flex items-center gap-1 hover:underline focus:outline-none"
                      aria-label="Like comment"
                    >
                      <ThumbsUp className="w-5 h-5" /> {c.likes || 0}
                    </button>

                    <details className="group">
                      <summary className="cursor-pointer hover:underline flex items-center gap-1 select-none">
                        <MessageSquare className="w-5 h-5" /> Reply
                      </summary>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const reply = e.target.reply.value;
                          addReply(c.id, reply);
                          e.target.reset();
                        }}
                        className="mt-3"
                      >
                        <input
                          name="reply"
                          type="text"
                          placeholder="Write a reply..."
                          className="w-full p-3 mt-1 rounded-md border dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                          disabled={!user}
                        />
                        <button
                          type="submit"
                          className="mt-2 text-sm bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!user}
                        >
                          Send
                        </button>
                      </form>

                      {/* Replies */}
                      {c.replies && c.replies.length > 0 && (
                        <ul className="mt-4 ml-6 border-l border-indigo-300 dark:border-indigo-600 pl-4 space-y-3">
                          {c.replies.map((r, idx) => (
                            <li
                              key={idx}
                              className="text-gray-700 dark:text-gray-300 text-sm"
                            >
                              <p className="font-semibold text-indigo-500 dark:text-indigo-400">
                                {r.userName}{" "}
                                <span className="text-gray-500 dark:text-gray-400 text-xs">
                                  ({new Date(r.date).toLocaleString()})
                                </span>
                              </p>
                              <p>{r.text}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </details>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
