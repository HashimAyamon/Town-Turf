import React from "react";
import { BASE_URL } from "../../../url";

function FetchTurfDtls(props) {
  let alertboxcontentfunc = (title, body) => {
    props.setalertboxcontent({
      title: title,
      body: body,
    });
  };

  let schdatechange = (event) => {
    props.setschdate(event.target.value);
  };

  let fetchdtls = () => {
    props.setturfdtlslist([]);
    fetch(BASE_URL + "/turfhistory/fetchdtls", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokenid: props.cred.tokenid,
        schdate: props.schdate,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.Status === "Failed") {
          alertboxcontentfunc("Admin - HISTORY", data.Message);
          document.getElementById("alertboxhit").click();
        } else {
          props.setturfdtlslist(data.Data);
        }
      })
      .catch((err) => {
        alertboxcontentfunc("Admin - HISTORY", "Error in processing the data");
        document.getElementById("alertboxhit").click();
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        {/* Date Input and Search Button */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={props.schdate}
            onChange={schdatechange}
          />
          <button
            type="button"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            onClick={fetchdtls}
            disabled={props.schdate === "yyyy-mm-dd"}
          >
            🔍 Search
          </button>
        </div>

        {/* Turf Details Table */}
        {props.turfdtlslist.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-pink-100 text-gray-700">
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Mobile</th>
                </tr>
              </thead>
              <tbody>
                {props.turfdtlslist.map((obj, i) => (
                  <tr key={i} className="bg-gray-50 hover:bg-gray-100">
                    <td className="border p-2">{obj.time}</td>
                    <td className="border p-2">{obj.price}</td>
                    <td className="border p-2">{obj.status}</td>
                    <td className="border p-2">{obj.name}</td>
                    <td className="border p-2">{obj.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
export default FetchTurfDtls;
