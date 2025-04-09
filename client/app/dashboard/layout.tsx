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
  });
  const [taskDatas, setTaskDatas] = useState<TaskData[]>([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/tasks");
        setTaskDatas(res.data.tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (task.id && taskDatas?.length) {
      setTaskDatas((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
    }
  }, [task]);

  useEffect(() => {
    if (isAuthenticated === false) {
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
      <div className={`relative p-20 ${hideSideNav ? "w-full" : "w-4/5"}`}>
        {children}
        <Canvas task={task} setTask={setTask} taskDatas={taskDatas} />
      </div>
    </div>
  );
};

export default Layout;
