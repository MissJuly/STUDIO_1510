import NavigationMenu from "../components/NavigationMenu";
import kenImage from "../assets/ken.jpg"; // Adjust the path as needed

export default function AboutPage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col text-[#333333]">
      <NavigationMenu />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-center mt-10 mb-12">
            About Studio 1510
          </h1>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
            <img
              src={kenImage}
              alt="Kenlewis Ndirangu Nderitu"
              className="w-64 h-auto rounded-xl shadow-md object-cover"
            />

            <div className="text-lg leading-relaxed">
              <p className="mb-4">
                <strong>Studio 1510</strong> curates modern, meaningful & functional architecture that reflects your personality.
              </p>
              <p className="mb-4">
                Founded by <strong>Kenlewis Ndirangu Nderitu</strong> — or simply <strong>Ken</strong>, an architectural designer, with half a decade of experience, passionate about creating meaningful spaces that blend functionality with soul.
              </p>
              <p>
                Based in Nairobi, I work across residential, commercial and institutional projects, guided by an idea-driven + collaborative design process resulting in work that celebrates fine craftsmanship + detail.
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
