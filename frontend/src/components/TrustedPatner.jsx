import React from "react";

export default function TrustedPatners() {
  const Patners = [
    {
      name: "MIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
    },
    {
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      },
      {
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      },
      {
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      },
      {
        name: "Tesla",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      },
      {
        name: "Spotify",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      },
      
  ];

return (
  <section className="py-16 px-6 bg-gray-50">
    <div className="max-w-6xl mx-auto text-center">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Trusted by Top Universities Worldwide
      </h2>

      {/* Partners Logos */}
      <div className="mt-10 flex flex-wrap justify-center items-center gap-8 sm:gap-12">
        {Patners.map((partner, index) => (
          <img
            key={index}
            src={partner.logo}
            alt={partner.name || `Partner ${index + 1}`}
            className="max-h-12 sm:max-h-16 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </div>
  </section>
);

}
