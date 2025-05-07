export default function ShopPage() {
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
          <h1 className="text-4xl font-semibold text-center mt-10 mb-8">Studio 1510 Shop</h1>
          <p className="text-lg text-center mb-12 leading-loose">
            A curated collection of design objects, architectural prints, and bespoke pieces that reflect our studio's aesthetic sensibilities.
          </p>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center">Coming Soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeIn">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-gray-200 h-64 flex flex-col items-center justify-center text-gray-500 text-sm rounded-lg shadow-sm transition transform duration-300 hover:scale-105 hover:bg-gray-300"
                >
                  <div className="w-16 h-16 bg-gray-300 rounded mb-4 transition duration-300"></div>
                  <p className="mb-1">Product Title</p>
                  <p className="text-xs text-gray-400">Available Soon</p>
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
