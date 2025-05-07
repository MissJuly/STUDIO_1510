// pages/ContactPage.jsx

import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just show confirmation (we’ll wire backend later)
    console.log('Form submitted:', formData);

    // Clear form + show message
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(true);

    // Hide confirmation after 5 sec
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-6 py-20">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-semibold text-[#333333] mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-[#333333] text-center mb-8 text-lg">
          We’d love to hear from you. Send us an enquiry below.
        </p>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl text-center">
            Thank you! Your enquiry has been sent successfully.
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#333333] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-[#bbbbbb] rounded-xl p-3 focus:outline-none focus:border-[#333333]"
              required
            />
          </div>

          <div>
            <label className="block text-[#333333] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full border border-[#bbbbbb] rounded-xl p-3 focus:outline-none focus:border-[#333333]"
              required
            />
          </div>

          <div>
            <label className="block text-[#333333] mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject of enquiry"
              className="w-full border border-[#bbbbbb] rounded-xl p-3 focus:outline-none focus:border-[#333333]"
              required
            />
          </div>

          <div>
            <label className="block text-[#333333] mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full border border-[#bbbbbb] rounded-xl p-3 h-32 focus:outline-none focus:border-[#333333]"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#333333] text-white rounded-xl py-3 text-lg hover:bg-[#555555] transition duration-200"
          >
            Send Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
