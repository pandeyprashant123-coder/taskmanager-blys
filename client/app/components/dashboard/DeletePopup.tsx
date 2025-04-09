import React from "react";

const DeletePopup = () => {
  return (
    <div className="w-screen h-screen z-auto fixed top-0 left-0 flex items-center justify-center bg-[#07070767] ">
      <div className="w-2/5 h-4/5  shadow rounded-lg bg-white p-10">
        <h1>Are you sure you want to delete the task</h1>
      </div>
    </div>
  );
};

export default DeletePopup;
