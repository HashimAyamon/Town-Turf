import React from "react";

function Description1(props) {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-center p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto transition-transform transform hover:scale-105 duration-300">
          <h2
            className="text-5xl font-extrabold mb-6 tracking-wider drop-shadow-xl"
            style={{ color: "#69BB4C" }}
          >
            🏟️ Town Turf
          </h2>
          <p className="text-3xl md:text-4xl font-medium leading-relaxed text-white">
            Booking a turf has never been easier.
            <br className="hidden md:inline" />
            Focus on the game —{" "}
            <span style={{ color: "#69BB4C" }} className="font-bold">
              we’ll handle the rest!
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Description1;
