import React from "react";

function AdminHome1(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Admin Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Manage and monitor all bookings seamlessly from one place.
        </p>
      </div>
    </div>
  );
}

export default AdminHome1;
