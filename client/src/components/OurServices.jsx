import { useState } from "react";

const servicesData = [
  {
    title: "Architecture",
    content: "We offer comprehensive architectural design services including planning, concept design, and project management tailored to your needs.",
  },
  {
    title: "Interior Design",
    content: "Our interior design services create functional and aesthetically pleasing spaces, combining creativity, innovation, and client vision.",
  },
];

export default function OurServices() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white mb-24 p-8 rounded-xl shadow-md max-w-6xl mx-auto my-6">
      <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">Our Services</h2>

      <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
        {/* Accordion Block */}
        <div className="space-y-6">
          {servicesData.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <button
                className="w-full flex justify-between items-center text-left text-gray-800 text-3xl font-medium focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>{service.title}</span>
                <span className="text-4xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-700 text-base leading-loose">
                  {service.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quote Block */}
        <div className="mt-10 md:mt-0">
          <blockquote className="italic text-xl text-gray-600 border-l-4 border-gray-300 pl-5 leading-relaxed">
            “Architecture should speak of its time and place, but yearn for timelessness.”
            <br />
            <span className="block mt-3 text-base text-gray-500">— Frank Gehry</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
