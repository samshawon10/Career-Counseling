import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Modal from "react-modal";
import { auth, db } from "../firebase/firebase.config";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    top: "50%", left: "50%", right: "auto", bottom: "auto",
    marginRight: "-50%", transform: "translate(-50%, -50%)",
    padding: "30px", borderRadius: "15px", maxWidth: "400px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
  },
};

const EnrollButton = ({ course, courses, setCourses }) => {
  const [user] = useAuthState(auth);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleEnroll = async () => {
    if (!user) {
      setModalMessage("Please log in to enroll.");
      setModalIsOpen(true);
      return;
    }

    const enrollmentRef = doc(db, `users/${user.uid}/enrollments/${course.id}`);
    const enrollmentSnap = await getDoc(enrollmentRef);

    if (enrollmentSnap.exists()) {
      setModalMessage("You are already enrolled in this course.");
      setModalIsOpen(true);
      return;
    }

    await setDoc(enrollmentRef, {
      courseId: course.id,
      title: course.title,
      enrolledAt: new Date().toISOString(),
      isFree: course.price?.toLowerCase() === "free",
    });

    // Optional: Update enrollment count globally
    const updatedCourses = courses.map((c) =>
      c.id === course.id
        ? { ...c, enrollmentCount: (c.enrollmentCount || 0) + 1 }
        : c
    );
    setCourses(updatedCourses);

    setModalMessage("Successfully enrolled!");
    setModalIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleEnroll}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
      >
        Enroll
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Enrollment Status"
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">
            {modalMessage}
          </h2>
          <button
            onClick={() => setModalIsOpen(false)}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EnrollButton;
