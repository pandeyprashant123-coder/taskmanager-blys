"use client";
import React, { useState, useEffect } from "react";
import SideNav from "../components/dashboard/SideNav";
import Canvas from "../components/dashboard/Canvas";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "../axios";

export interface TaskData {
  id: number;
  title: string;
  body: string;
  created_at:String
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [hideSideNav, sethideSideNav] = useState(false);
  const [task, setTask] = useState<TaskData>({
    id: 0,
    title: "",
    body: "",
    created_at:""
  });
  const [taskDatas, setTaskDatas] = useState<TaskData[]>([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        sethideSideNav(true);
      } else {
        sethideSideNav(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const res = await axios.get("/tasks", {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                process.env.AUTH_PREFIX!
              )}`,
            },
          });
          setTaskDatas(res.data.tasks);
          console.log(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (task.id && taskDatas?.length) {
      setTaskDatas((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
    }
  }, [task]);
console.log(taskDatas)
  useEffect(() => {
    if (isAuthenticated === false) {
      setTaskDatas([]);
      setTask({ id: 0, title: "", body: "",created_at:"" });
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <SideNav
        hideSideNav={hideSideNav}
        sethideSideNav={sethideSideNav}
        task={task}
        setTask={setTask}
        taskDatas={taskDatas}
        setTaskDatas={setTaskDatas}
      />
      <div
        className={`relative py-10 pl-20 lg:px-20 ${
          hideSideNav ? "w-full" : "w-4/5"
        }`}
      >
        {children}
        <Canvas task={task} setTask={setTask} taskDatas={taskDatas} />
      </div>
    </div>
  );
};

export default Layout;
