// src/pages/MyProfile.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || "https://i.ibb.co/2n4s8LF/default-user.png", // fallback image
      });
      toast.success("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 shadow rounded bg-white">
      <Helmet><title>My Profile | Coaching Lab</title></Helmet>
      <h2 className="text-xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/2n4s8LF/default-user.png"}
          alt="User"
          className="w-24 h-24 rounded-full mb-2 border"
        />
        <p className="font-medium text-gray-700">Email: {user?.email}</p>
      </div>

      <form onSubmit={handleUpdate} className="mt-4 space-y-4">
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          className="input input-bordered w-full"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL"
        />
        <button type="submit" className="btn w-full bg-green-600 text-white hover:bg-green-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
