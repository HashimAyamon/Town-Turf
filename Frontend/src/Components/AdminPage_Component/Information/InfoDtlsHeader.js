import React from "react";

function InfoDtlsHeader(props) {
  let tabchange = (obj) => {
    props.settab(obj);
  };

  return (
    <div className="flex justify-center space-x-4 p-4 bg-gray-100">
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        onClick={() => tabchange("bd")}
      >
        Basic Details
      </button>

      <button
        type="button"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
        onClick={() => tabchange("tt")}
      >
        Slot Timings
      </button>
    </div>
  );
}
export default InfoDtlsHeader;
