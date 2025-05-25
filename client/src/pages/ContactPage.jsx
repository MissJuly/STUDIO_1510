import NavigationMenu from '../components/NavigationMenu';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/contact-us/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Your enquiry has been sent successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to send enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
       <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          input, textarea, select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          input:focus, textarea:focus, select:focus {
            border-color: #333333;
            box-shadow: 0 0 0 3px rgba(51, 51, 51, 0.2);
            outline: none;
          }
        `}</style>
      <NavigationMenu />
      <main className="flex-grow flex items-center justify-center mt-10 px-6 py-20">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 animate-fadeIn">
          <h1 className="text-4xl font-semibold text-[#333333] mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-[#333333] text-center mb-8 text-lg">
            We’d love to hear from you. Send us an enquiry below.
          </p>


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
                disabled={isSubmitting}
                className="w-full bg-[#333333] text-white rounded-xl py-3 text-lg hover:bg-[#555555] transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
          </form>
        </div>
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">
          <p>Studio 1510 — Designing spaces that inspire.</p>
      </footer>
    </div>
  );
}


