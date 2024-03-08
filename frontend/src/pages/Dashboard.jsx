import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../socket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Canvas from "components/Canvas";
import Navbar from "components/Navbar";


const Dashboard = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUpdateUserList = (userList) => {
      setUsers(userList);
    };

    socket.on("updateUserList", handleUpdateUserList);

    return () => {
      socket.off("updateUserList", handleUpdateUserList);
    };
  }, []);

  useEffect(() => {
    socket.on("userJoined", (userName) => {
      console.log(`${userName} joined the room`);
      toast.success(`${userName} joined the room`);
    });

    return () => {
      socket.off("userJoined");
    };
  }, []);

  useEffect(() => {
    socket.on("userLeft", (userName) => {
      console.log(`${userName} left the room`);
      toast.info(`${userName} left the room`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.name !== userName)
      );
    });

    return () => {
      socket.off("userLeft");
    };
  }, []);

  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomId });
    navigate("/");
  };

  return (
    <div className="dashboard-container h-screen overflow-hidden">
      <ToastContainer className="mt-12" />
      <Navbar users={users} leaveRoom={leaveRoom} style={{outerHeight:"16"}}/>
      <div className="canvas-area mt-16 h-screen">
    
        <Canvas />
      </div>
    </div>
  );
};

export default Dashboard;
