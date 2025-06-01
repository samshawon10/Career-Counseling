import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { db } from '../firebase/firebase.config'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { motion as Motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

const formVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 bg-gradient-to-tr from-purple-100 via-indigo-50 to-white">
      <Helmet>
        <title>Contact Us | Career Counsel+</title>
      </Helmet>
      <Toaster position="top-right" />

      <Motion.div 
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Left - Contact Info */}
        <Motion.div variants={sectionVariants} className="space-y-8">
          <h2 className="text-5xl font-extrabold text-indigo-900 tracking-tight leading-tight">
            Get in <span className="text-purple-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-md">
            We'd love to hear from you! Whether you have a question about services, pricing, or anything else — our team is ready to help.
          </p>

          <ul className="space-y-6 text-gray-700">
            <li className="flex items-center gap-4 text-lg font-medium">
              <MapPin className="text-purple-600 w-6 h-6" />
              <span>123 Career St, Opportunity City, 45678</span>
            </li>
            <li className="flex items-center gap-4 text-lg font-medium">
              <Mail className="text-purple-600 w-6 h-6" />
              <span>support@careercounselplus.com</span>
            </li>
            <li className="flex items-center gap-4 text-lg font-medium">
              <Phone className="text-purple-600 w-6 h-6" />
              <span>+1 (234) 567-8901</span>
            </li>
          </ul>
        </Motion.div>

        {/* Right - Contact Form */}
        <Motion.form 
          onSubmit={handleSubmit} 
          className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl space-y-8 border border-purple-100"
          aria-label="Contact Form"
          variants={formVariants}
        >
          <div>
            <label className="block text-indigo-900 font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-purple-300 focus:ring-4 focus:ring-purple-300 outline-none transition"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-indigo-900 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-purple-300 focus:ring-4 focus:ring-purple-300 outline-none transition"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-indigo-900 font-semibold mb-2" htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="6"
              required
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-purple-300 focus:ring-4 focus:ring-purple-300 outline-none transition resize-none"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transform transition-transform active:scale-95
              ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800'}`}
            aria-live="polite"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </Motion.form>
      </Motion.div>
    </section>
  );
};

export default ContactUs;
