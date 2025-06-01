import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import useAuthRole from "../hooks/useAuthRole";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { Helmet } from "react-helmet";
import EnrollButton from "../pages/EnrollButton";


const initialCourseState = {
  title: "",
  description: "",
  mentor: "",
  imageUrl: "",
  level: "",
  duration: "",
  price: "",
  status: "",
  enrollmentCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  reviews: [],
  ratings: 0,
  studentsEnrolled: [],
};

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    position: "relative",
    margin: "auto",
    maxWidth: "600px",
    maxHeight: "80vh",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    border: "none",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    overflowY: "auto",
    transition: "all 0.3s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(6px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const bgVariants = {
  animate: {
    background: [
      "linear-gradient(270deg, #7f00ff, #e100ff, #7f00ff)",
      "linear-gradient(270deg, #e100ff, #7f00ff, #e100ff)",
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const Course = () => {
  const { role, loading } = useAuthRole();
  const isAdmin = role === "admin";

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [form, setForm] = useState(initialCourseState);
  const [editId, setEditId] = useState(null);

  const [selectedMentor, setSelectedMentor] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      const snapshot = await getDocs(collection(db, "courses"));
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoadingCourses(false);
    };
    fetchCourses();
  }, []);

  const refreshCourses = async () => {
    const snapshot = await getDocs(collection(db, "courses"));
    setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddCourse = async () => {
    if (!form.title || !form.description || !form.mentor || !form.imageUrl) {
      alert("All required fields must be filled!");
      return;
    }
    await addDoc(collection(db, "courses"), form);
    alert("Course added!");
    setForm(initialCourseState);
    refreshCourses();
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteDoc(doc(db, "courses", id));
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleEditCourse = (course) => {
    setEditId(course.id);
    setForm(course);
  };

  const handleUpdateCourse = async () => {
    if (!form.title || !form.description || !form.mentor || !form.imageUrl) {
      alert("All required fields must be filled!");
      return;
    }
    await updateDoc(doc(db, "courses", editId), form);
    alert("Course updated!");
    setEditId(null);
    setForm(initialCourseState);
    refreshCourses();
  };

  const mentors = ["All", ...new Set(courses.map((c) => c.mentor))];
  const filteredCourses =
    selectedMentor === "All"
      ? courses
      : courses.filter((c) => c.mentor === selectedMentor);

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  if (loading) return <p className="text-center text-xl">Loading user info...</p>;
  if (loadingCourses) return <p className="text-center text-xl">Loading courses...</p>;

  return (
    <Motion.section
      className="max-w-auto mx-auto p-6 min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white relative overflow-hidden"
      variants={bgVariants}
      animate="animate"
      style={{ backgroundSize: "600% 600%" }}
    >
      <Helmet>
        <title>Course | Career Counsel+</title>
      </Helmet>

      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-600 drop-shadow-lg select-none">
        Explore Our Courses
      </h1>

      {isAdmin && (
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 border border-indigo-400 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
            {editId ? "Edit Course" : "Add New Course"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="title" placeholder="Course Title" value={form.title} onChange={handleChange} className="input-style" />
            <input name="mentor" placeholder="Mentor" value={form.mentor} onChange={handleChange} className="input-style" />
            <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="input-style" />
            <textarea name="description" placeholder="Course Description" value={form.description} onChange={handleChange} rows="4" className="md:col-span-2 input-style resize-none" />
            <input name="level" placeholder="Level (Beginner/Intermediate/Advanced)" value={form.level} onChange={handleChange} className="input-style" />
            <input name="duration" placeholder="Duration (e.g., 4 weeks)" value={form.duration} onChange={handleChange} className="input-style" />
            <input name="price" placeholder="Price (e.g., 99.99 or Free)" value={form.price} onChange={handleChange} className="input-style" />
            <input name="status" placeholder="Status (Open/Closed)" value={form.status} onChange={handleChange} className="input-style" />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            {editId && (
              <button className="btn-red" onClick={() => { setEditId(null); setForm(initialCourseState); }}>
                Cancel Edit
              </button>
            )}
            <button className="btn-indigo" onClick={editId ? handleUpdateCourse : handleAddCourse}>
              {editId ? "Update Course" : "Add Course"}
            </button>
          </div>
        </Motion.div>
      )}

      {/* Filter */}
      <div className="mb-8 flex justify-center">
        <select
          value={selectedMentor}
          onChange={(e) => setSelectedMentor(e.target.value)}
          className="p-3 rounded-lg border border-indigo-400 bg-indigo-50 dark:bg-gray-800 dark:text-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
        >
          {mentors.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
          {currentCourses.map((course) => (
            <Motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg cursor-pointer flex flex-col justify-between"
            >
              <div onClick={() => { setSelectedCourse(course); setModalIsOpen(true); }}>
                <img src={course.imageUrl} alt={course.title} className="w-full h-40 rounded-2xl object-cover mb-4" />
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{course.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">Mentor: {course.mentor}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Level: {course.level}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Duration: {course.duration}</p>
                <p className="text-indigo-700 font-semibold mb-1">Price: {course.price}</p>
                <p className="text-green-600 font-semibold mb-1">Enrolled: {course.enrollmentCount || 0}</p>
              </div>
              {isAdmin && (
                <div className="mt-4 flex justify-between">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg" onClick={() => handleEditCourse(course)}>Edit</button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                </div>
              )}
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-3 text-indigo-700 font-semibold select-none">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="pagination-btn">Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`pagination-btn ${currentPage === i + 1 ? "bg-indigo-700 text-white" : ""}`}>
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="pagination-btn">Next</button>
      </div>
{/* Modal */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={() => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  }}
  contentLabel="Course Details Modal"
  style={modalStyles}
  ariaHideApp={false} // Make sure to configure this properly in your app root
>
  {selectedCourse && (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={selectedCourse.imageUrl}
        alt={selectedCourse.title}
        className="rounded-xl mb-6 max-h-60 w-full object-cover"
      />
      <h2 className="text-3xl font-bold mb-3 text-indigo-800">{selectedCourse.title}</h2>
      <p className="mb-2 font-semibold text-indigo-700">Mentor: {selectedCourse.mentor}</p>
      <p className="mb-2">
        <strong>Level:</strong> {selectedCourse.level}
      </p>
      <p className="mb-2">
        <strong>Duration:</strong> {selectedCourse.duration}
      </p>
      <p className="mb-2">
        <strong>Price:</strong> {selectedCourse.price}
      </p>
      <p className="mb-4 text-gray-700">{selectedCourse.description}</p>

      <div className="text-center gap-4 space-y-4">
        <EnrollButton
          course={selectedCourse}
          setCourses={setCourses}
          courses={courses}
        />
        <button
          onClick={() => {
            setModalIsOpen(false);
            setSelectedCourse(null);
          }}
          className="px-6 gap-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>

    </Motion.section>
  );
};

export default Course;
