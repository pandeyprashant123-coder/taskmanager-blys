import { useAuth } from "@/app/context/AuthContext";
import { TaskData } from "@/app/dashboard/layout";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiArrowLineLeftBold } from "react-icons/pi";
import DeletePopup from "./DeletePopup";
import axios from "@/app/axios";
import { toast, ToastContainer } from "react-toastify";

const SideNav = ({
  hideSideNav,
  sethideSideNav,
  task,
  setTask,
  taskDatas,
  setTaskDatas,
}: {
  hideSideNav: boolean;
  sethideSideNav: Dispatch<SetStateAction<boolean>>;
  task: TaskData;
  setTask: Dispatch<SetStateAction<TaskData>>;
  taskDatas: TaskData[] | undefined;
  setTaskDatas: Dispatch<SetStateAction<TaskData[]>>;
}) => {
  const { userData, logout } = useAuth();
  const [taskId, settaskId] = useState();
  const [inputEnable, setInputEnable] = useState<Record<string, boolean>>({});

  // #todo 1: The doule click functionality is not working here
  useEffect(() => {
    if (taskDatas) {
      setInputEnable((prev) => {
        const newState = { ...prev };
        taskDatas.forEach((task) => {
          if (newState[task.id] === undefined) {
            newState[task.id] = false;
          }
        });
        return newState;
      });
    }
  }, [taskDatas]);
  // Function to add a new task
  const addNewTask = async () => {
    const newTask: TaskData = {
      id: 0,
      title: "",
      body: "",
      created_at: "",
    };
    try {
      const res = await axios.post(
        `/tasks`,
        { title: "", body: "" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              process.env.NEXT_PUBLIC_AUTH_PREFIX!
            )}`,
          },
        }
      );
      toast("New task created");
      newTask.id = res.data.task.insertId;
    } catch (error) {
      console.log(error);
    } finally {
      setTaskDatas((prevTasks) => {
        const updatedTasks = prevTasks ? [...prevTasks, newTask] : [newTask];
        setTask(newTask);
        return updatedTasks;
      });
    }

    // Update taskDatas with the new task
  };

  // Function to handle task deletion
  const deleteTask = async (taskId: number) => {
    setTaskDatas((prevTasks) => {
      const updatedTasks = prevTasks
        ? prevTasks.filter((task) => task.id !== taskId)
        : [];
      if (task.id === taskId) {
        if (updatedTasks.length > 0) {
          setTask(updatedTasks[0]);
        } else {
          setTask({ id: 0, title: "", body: "", created_at: "" });
        }
      }
      return updatedTasks;
    });
    try {
      await axios.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            process.env.NEXT_PUBLIC_AUTH_PREFIX!
          )}`,
        },
      });
      toast("Task Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskTitle = (taskId: number, newTitle: string) => {
    setTaskDatas((prevTasks) =>
      prevTasks
        ? prevTasks.map((taskItem) =>
            taskItem.id === taskId ? { ...taskItem, title: newTitle } : taskItem
          )
        : []
    );

    // If this is the currently selected task, update it too
    if (task.id === taskId) {
      setTask((prev) => ({ ...prev, title: newTitle }));
    }
  };

  // Function to handle clicking on a task
  const handleTaskClick = (taskItem: TaskData) => {
    setTask(taskItem);
  };

  const handleLogout = () => {
    logout();
    setTaskDatas((prev) => []);
  };

  const getDateDifference = (dateStr: string) => {
    const inputDate = new Date(dateStr);
    const now = new Date();

    const diffMs = now.getTime() - inputDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const years =
      now.getFullYear() -
      inputDate.getFullYear() -
      (now.getMonth() < inputDate.getMonth() ||
      (now.getMonth() === inputDate.getMonth() &&
        now.getDate() < inputDate.getDate())
        ? 1
        : 0);

    if (years >= 1) {
      return `${years} year${years !== 1 ? "s" : ""}`;
    }

    const months =
      (now.getFullYear() - inputDate.getFullYear()) * 12 +
      (now.getMonth() - inputDate.getMonth()) -
      (now.getDate() < inputDate.getDate() ? 1 : 0);

    if (months >= 1) {
      return `${months} month${months !== 1 ? "s" : ""}`;
    }

    if (diffDays >= 1) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    }

    if (diffHours >= 1) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    }

    if (diffMinutes >= 1) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
    }

    return `just now`;
  };

  return (
    <div
      className={`h-screen fixed z-50 lg:sticky top-0 transition-all duration-300 ease-in-out ${
        hideSideNav ? "w-16" : "lg:w-1/5"
      }`}
    >
      <ToastContainer />
      {/* <DeletePopup/> */}
      <div className="z-50 h-16 sticky top-0 flex gap-3 justify-between items-center bg-white p-2 border-b text-gray-800 font-semibold">
        {!hideSideNav && (
          <div className="flex gap-2 items-center">
            <FaRegUserCircle className="text-2xl" />
            <h1>{userData?.username}</h1>
            <button
              className=" flex items-center ml-5 py-1 px-2 rounded-xl text-xs font-light shadow-xs gap-2 hover:bg-green-50 bg-gray-200 text-green-500 hover:cursor-pointer"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        )}
        <PiArrowLineLeftBold
          className={`font-bold hover:text-blue-500 cursor-pointer ${
            hideSideNav && "rotate-180 mx-3"
          } `}
          onClick={() => sethideSideNav((prev) => !prev)}
        />
      </div>
      <div
        className={`h-[91vh] overflow-y-auto bg-white flex flex-col ${
          hideSideNav ? "" : "px-6"
        } py-3`}
      >
        <button
          className="bg-[#f4f5f9] text-sm p-2 font-semibold mx-3 rounded-xl flex justify-around items-center cursor-pointer"
          onClick={addNewTask}
        >
          {!hideSideNav && <h1>Create New Task</h1>}{" "}
          <FaCirclePlus className="text-3xl text-green-600" />
        </button>
        <ul className="p-4 flex flex-col gap-3">
          {taskDatas &&
            taskDatas.map((taskItem, index) => {
              return (
                <li key={taskItem.id}>
                  <div
                    className={`flex justify-between hover:bg-gray-200 items-center py-1 px-3 rounded-2xl cursor-pointer ${
                      task.id === taskItem.id ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleTaskClick(taskItem)}
                  >
                    {/*#1: The doule click functionality is not working here */}
                    {!hideSideNav ? (
                      <>
                        <input
                          type="text"
                          value={taskItem.title}
                          placeholder="Add title.."
                          className="m-2 font-semibold w-24 focus:outline-none bg-transparent"
                          disabled={inputEnable[taskItem.id]}
                          onChange={(e) =>
                            updateTaskTitle(taskItem.id, e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          onDoubleClick={() => {
                            setInputEnable((prev) => ({
                              ...prev,
                              [taskItem.id]: true,
                            }));
                          }}
                          onBlur={() => {
                            setInputEnable((prev) => ({
                              ...prev,
                              [taskItem.id]: false,
                            }));
                          }}
                        />
                        <h1 className="text-[.6rem]">
                          {getDateDifference(taskItem.created_at.toString())}
                        </h1>
                      </>
                    ) : (
                      <h1 className="font-bold text-xl">{index}</h1>
                    )}

                    <MdOutlineDeleteOutline
                      className="hover:text-red-400 text-xl"
                      onClick={(e) => {
                        // Preventing triggering the parent div onClick
                        e.stopPropagation();
                        deleteTask(taskItem.id);
                      }}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
