import axios from "@/app/axios";
import { TaskData } from "@/app/dashboard/layout";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Canvas = ({
  task,
  setTask,
  taskDatas,
}: {
  task: TaskData;
  setTask: Dispatch<SetStateAction<TaskData>>;
  taskDatas: TaskData[] | undefined;
}) => {
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEdited) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEdited]);

  // Handle case where there are no tasks
  if (!taskDatas || taskDatas.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl">
        Welcome! to Task Manager
      </div>
    );
  }

  // Handle case where no task is selected yet
  if (!task.id && taskDatas.length > 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl">
        Select a task from the sidebar
      </div>
    );
  }

  // Function to update title of the selected task
  const updateTaskTitle = (newTitle: string) => {
    setTask((prev) => ({ ...prev, title: newTitle }));
    setIsEdited(true);
  };

  // Function to update body of the selected task
  const updateTaskBody = (newBody: string) => {
    setTask((prev) => ({ ...prev, body: newBody }));
    setIsEdited(true);
  };

  const handleSave = async () => {
    const newTask = {
      title: task.title,
      body: task.body,
    };
    try {
      await axios.patch(`tasks/${task.id}`, newTask, {
        headers: { "Content-Type": "application/json" },
      });
      toast("Task Updated");
      setIsEdited(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-6">
      <ToastContainer/>
      <button
        className="fixed bottom-20 right-20 flex items-center py-3 px-6 rounded-xl shadow-2xl gap-2 hover:bg-green-50 bg-white text-green-500 hover:cursor-pointer"
        onClick={handleSave}
      >
        Save
      </button>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={(e) => updateTaskTitle(e.target.value)}
        className="m-2 font-bold text-4xl text-gray-700 focus:outline-none"
        placeholder="Task Title"
      />
      <textarea
        name="body"
        value={task.body}
        onChange={(e) => updateTaskBody(e.target.value)}
        className="m-2 text-gray-600 focus:outline-none min-h-[200px] resize-none"
        placeholder="Write task details here..."
      />
    </div>
  );
};

export default Canvas;
