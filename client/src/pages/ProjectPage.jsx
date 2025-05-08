function ProjectPage() {
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

        <main className="flex-grow">
          <div className="max-w-3xl mx-auto px-6 py-16 animate-fadeIn">
            <h1 className="text-4xl font-semibold text-center mt-10 mb-8">Start Your Project</h1>
            <p className="text-lg text-center mb-12 leading-loose">
              Ready to bring your vision to life? We’d love to hear about your project. Share your ideas, aspirations, and requirements — and we will get in touch to explore how we can collaborate.
            </p>

            {/* Beginning of Form */}
            <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <input
                  type="text"
                  name="project_type"
                  placeholder="e.g. Residential, Commercial, Interior Design..."
                  className="w-full border border-gray-300 rounded px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full border border-gray-300 rounded px-4 py-3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#333333] text-white py-3 rounded hover:bg-[#555555] transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
            {/* End of form */}
          </div>
        </main>

        <div className="text-center text-sm text-gray-500 pb-4">
          <p>Studio 1510 — Designing spaces that inspire.</p>
        </div>
      </div>
    );
  }

  export default ProjectPage;
