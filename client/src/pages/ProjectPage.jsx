import NavigationMenu from "../components/NavigationMenu";
import { useState } from 'react';
import { toast } from 'sonner';


export default function ProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/start-project/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Your inquiry has been submitted successfully!');
        setFormData({
          name: '',
          email: '',
          project_type: '',
          message: '',
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

    return (
      <div className="bg-[#f5f5f5] min-h-screen text-[#333333]">
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
        <main className="flex-grow">
          <div className="max-w-3xl mx-auto px-6 py-16 animate-fadeIn">
            <h1 className="text-4xl font-semibold text-center mt-10 mb-8">Start Your Project</h1>
            <p className="text-lg text-center mb-12 leading-loose">
              Ready to bring your vision to life? We’d love to hear about your project. Share your ideas, aspirations, and requirements — and we will get in touch to explore how we can collaborate.
            </p>

            {/* Beginning of Form */}
            <>
              {/* <ToastContainer position="top-center" autoClose={4000} /> */}
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded px-4 py-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded px-4 py-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Type</label>
                  <input
                    type="text"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    placeholder="e.g. Residential, Commercial, Interior Design..."
                    className="w-full border border-gray-300 rounded px-4 py-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full border border-gray-300 rounded px-4 py-3"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full flex justify-center items-center gap-2 bg-[#333333] text-white py-3 rounded transition-colors ${
                    submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#555555]'
                  }`}
                >
                  {submitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 010 16v4l-3.5-3.5L12 20v-4a8 8 0 01-8-8z"
                      ></path>
                    </svg>
                  )}
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </>
                    {/* End of form */}
          </div>
        </main>

        <div className="text-center text-sm text-gray-500 pb-4">
          <p>Studio 1510 — Designing spaces that inspire.</p>
        </div>
      </div>
    );
  }

