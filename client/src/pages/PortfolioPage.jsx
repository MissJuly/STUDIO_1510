export default function PortfolioPage() {
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
      `}</style>

      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-center mt-10 mb-8">Our Portfolio</h1>
          <p className="text-lg text-center mb-12 leading-loose">
            A curated selection of architectural and interior design projects that reflect our commitment to timeless, functional, and inspiring spaces.
          </p>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-center">Architecture Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeIn">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gray-200 h-48 flex items-center justify-center text-gray-500 text-sm rounded-lg shadow-sm">
                  Coming Soon { /* <img src="/image.jpg" alt="Project Name" className="object-cover w-full h-full rounded-lg" /> */}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center">Interior Design Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeIn">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gray-200 h-48 flex items-center justify-center text-gray-500 text-sm rounded-lg shadow-sm">
                  Coming Soon { /* <img src="/image.jpg" alt="Project Name" className="object-cover w-full h-full rounded-lg" /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="text-center text-sm text-gray-500 pb-4">
        <p>Studio 1510 — Designing spaces that inspire, since 2024.</p>
      </div>
    </div>
  );
}
