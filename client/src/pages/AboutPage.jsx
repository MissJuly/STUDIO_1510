export default function AboutPage() {
    return (
      <div className="bg-[#f5f5f5] min-h-screen flex flex-col text-[#333333]">
        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .list-diamond li {
          position: relative;
          padding-left: 1.5rem;
        }
        .list-diamond li::before {
          content: "◆";
          position: absolute;
          left: 0;
          top: 0.3rem;
          color: #333333;
          font-size: 0.7rem;
        }
      `}</style>

        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-semibold text-center mt-10 mb-8">About Studio 1510</h1>
            <p className="text-lg text-center mb-12 leading-loose">
              Studio 1510 is a multidisciplinary design studio specializing in architecture and interior design.
              Our mission is to craft spaces that inspire, endure, and seamlessly integrate form with function.
              With a commitment to creativity and precision, we deliver bespoke solutions tailored to each client's vision and lifestyle.
            </p>

            <div className="mb-16">
              <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
              <p className="text-base mb-6 leading-loose">
                We provide comprehensive design services, ranging from conceptual development to project completion.
                Our core areas of expertise include:
              </p>

              <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-2">Architecture</h3>
                <ul className="mb-4 space-y-3 pl-5 text-[#444] marker:text-[#333] list-diamond animate-fadeIn">
                  <li><strong>Residential Design</strong> – Custom homes, renovations, and extensions.</li>
                  <li><strong>Commercial Spaces</strong> – Offices, retail stores, and mixed-use developments.</li>
                  <li><strong>Civic & Cultural Projects</strong> – Community centers, galleries, and public pavilions.</li>
                </ul>
                <p className="text-base leading-loose">
                  Our architectural approach emphasizes clarity, sustainability, and contextual sensitivity, ensuring that every structure enhances its surroundings while serving its purpose.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">Interior Design</h3>
                <ul className="mb-4 space-y-3 pl-5 text-[#444] marker:text-[#333] list-diamond animate-fadeIn">
                  <li><strong>Residential Interiors</strong> – Kitchens, living spaces, and bespoke joinery.</li>
                  <li><strong>Workspace Design</strong> – Functional office layouts and collaborative environments.</li>
                  <li><strong>Hospitality & Retail</strong> – Hotels, cafés, showrooms, and boutiques.</li>
                </ul>
                <p className="text-base leading-loose">
                  Our interior design services blend materiality, texture, and light to create warm and timeless spaces that resonate with the people who use them.
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center text-sm text-gray-500 pb-4">
          <p>Studio 1510 — Designing spaces that inspire.</p>
        </footer>
      </div>
    );
  }
