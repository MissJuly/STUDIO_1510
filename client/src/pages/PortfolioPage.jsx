import NavigationMenu from '../components/NavigationMenu';
import FadeInWrapper from '../components/FadeInWrapper';
import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);



  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/projects/')
    .then(response => response.json())
    .then(data => {
      setProjects(data);
    })
    .catch(error => {
      console.error('Error fetching projects:', error);
    });
}, []);


  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0); // reset to first image
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen text-[#333333]">
     <NavigationMenu />
     <main className="flex-grow">
        <FadeInWrapper className="max-w-5xl mx-auto px-6 py-16 ">
          <h1 className="text-4xl font-semibold text-center mt-10 mb-8">Our Portfolio</h1>
          <p className="text-lg text-center mb-12 leading-loose">
            A curated selection of architectural and interior design projects that reflect our commitment to timeless, functional, and inspiring spaces.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 cursor-pointer"
              >
                {project.images && project.images.length > 0 && (
                  <img
                    src={project.images[0].image}
                    alt={project.title}
                    className="object-cover w-full h-48 rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                <p className="text-gray-400 text-xs">Added on: {new Date(project.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </FadeInWrapper>
      </main>
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center py-10 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full mx-4 flex flex-col md:flex-row md:items-start gap-6 relative">

                {/* Image carousel */}
                <div className="relative w-full md:w-2/3 flex items-center justify-center">
                  <img
                    src={selectedProject.images[selectedImageIndex].image}
                    alt={selectedProject.title}
                    className="rounded-lg max-h-[500px] w-full object-contain"
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? selectedProject.images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-black text-3xl font-bold bg-white bg-opacity-70 px-2 py-1 rounded hover:bg-opacity-90"
                      >
                        ←
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === selectedProject.images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-3xl font-bold bg-white bg-opacity-70 px-2 py-1 rounded hover:bg-opacity-90"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>

                {/* Description section */}
                <div className="w-full md:w-1/3 flex flex-col justify-center md:justify-center md:self-center px-2">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{selectedProject.title}</h2>
                    <p className="text-gray-700 text-sm mb-4">{selectedProject.description}</p>
                    <p className="text-gray-400 text-xs mb-6">
                      Added on: {new Date(selectedProject.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}





      <div className="text-center text-sm text-gray-500 pb-4">
        <p>Studio 1510 — Designing spaces that inspire.</p>
      </div>
    </div>
  );
}
