import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import brainstormImg from "../assets/brainstrom.png";
import team from "../assets/team.png";
import sticky from "../assets/sticky.jpg";
import collaboration from "../assets/collaboration.png";
import join from "../assets/join.png";
import socket from "../socket.js";
const Home = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  const [userName, setUserName] = useState("");
  const [isRoomIDGenerated, setIsRoomIDGenerated] = useState(false);

  const handleDialogClose = () => {
    setRoomID("");
    setIsRoomIDGenerated(false);
  };

  const handleJoinRoom = () => {
    if (!roomID || !userName) {
      toast.error("Room ID and Name must be filled.");
    } else {
      socket.emit("setUserName", userName);
      navigate(`/dashboard/${roomID}`, {
        state: {
          userName,
        },
      });
    }
  };

  const createRoom = (e) => {
    e.preventDefault();
    if (!isRoomIDGenerated) {
      const id = nanoid();
      setRoomID(id);
      setIsRoomIDGenerated(true);
    }
  };

  const shareRoom = () => {
    navigator.clipboard.writeText(roomID);
    toast.success("Room ID copied to clipboard!");
  };

  return (
    <div className="relative flex flex-col min-h-full">
      <ToastContainer />
      <header className="flex h-16 items-center border-b px-4 lg:h-20 navbar  sm:w-[750px] lg:w-full w-[550px]">
        <div
          className="flex items-center gap-2 text-lg font-semibold lg:text-xl"
          style={{ color: "#0353a4", fontFamily: "Space Grotesk, sans-serif" }}
        >
          InkFlow.
        </div>
        <nav className="ml-auto flex gap-4 text-sm">
          <Dialog onOpenChange={handleDialogClose}>
            <DialogTrigger>
              <Button variant="secondary">Create</Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none w-[350px]">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Create Room</CardTitle>
                  <CardDescription>
                    Share the code to collaborate with others.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Room ID</Label>
                        <Input id="room-id" value={roomID} readOnly />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                  <Button onClick={createRoom} disabled={isRoomIDGenerated}>
                    Create
                  </Button>
                  <Button onClick={shareRoom} disabled={!isRoomIDGenerated}>
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button variant="secondary">Join</Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none w-[350px]">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Join Room</CardTitle>
                  <CardDescription>Enter the code to join.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Collaborator Name</Label>
                        <Input
                          id="name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Room ID</Label>
                        <Input
                          id="room-id"
                          value={roomID}
                          onChange={(e) => setRoomID(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" onClick={handleJoinRoom}>
                    Join
                  </Button>
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>
        </nav>
      </header>
      <main className="lg:flex-1 w-full flex  lg:items-center mt-20 flex-col gap-4 relative">
        <p
          className=" w-[750px] lg:w-[900px] text-3xl text-center lg:text-5xl dark:text-gray-400 relative z-10"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: 0.2,
            fontWeight: 500,
            color: "#303030",
            lineHeight: "80px",
            wordSpacing: "0.5rem",
          }}
        >
          An Intuitive Online
          <span
            className="bg-yellow-200 mx-3"
            style={{
              backgroundImage:
                "linear-gradient(to top, transparent 50%, rgba(255,255,255,0.5) 50%)",
            }}
          >
            Whiteboard
          </span>
          For Teams To Ideate And Collaborate In
          <span
            className="bg-pink-300 mx-3"
            style={{
              backgroundImage:
                "linear-gradient(to top, transparent 50%, rgba(255,255,255,0.5) 50%)",
            }}
          >
            Real Time
          </span>
          [BETA] .
        </p>
        <img
          src={team}
          alt="team"
          className="lg:w-[900px] lg:h-200 mt-10 w-[300px]"
        />
      </main>
      <div className="bg-slate-950 py-20 flex flex-col lg:w-full w-[550px]">
        <h1
          className="text-4xl text-center text-white "
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Delightfully Intuitive. Remarkably Zen.
        </h1>

        <div
          className="flex flex-col lg:flex-row justify-evenly mt-10 lg:mt-20"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <div className="flex flex-col justify-center items-center">
            <img src={join} alt="join" className="w-40 h-40" />
            <h1 className="text-white lg:text-2xl text-2xl">
              So Anyone Can Join.
            </h1>
            <p className="text-white lg:text-1xl text-center text-sm">
              We Simplified The Experience So That You Can Get Started Right
              Away.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img src={collaboration} alt="join" className="w-40 h-40" />
            <h1
              className="text-white text-2xl"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Instant collaboration
            </h1>
            <p className="text-white lg:text-1xl text-center text-sm">
              Invite Your Team With Single Click For Instant collaboration.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 my-40">
        <div className="col-span-8">
          <img src={sticky} alt="sticky" className="w-400" />
        </div>
        <div
          className="flex flex-col justify-center items-start p-8 sm:col-span-4"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <span
            className="bg-red-200 text-4xl"
            style={{
              backgroundImage:
                "linear-gradient(to top, transparent 50%, rgba(255,255,255,0.5) 50%)",
            }}
          >
            Real Time Meeting Notes
          </span>
          <p className="text-base mt-8">
            Urged for instant note-taking to fuel creativity and collaboration
            seamlessly.
          </p>
        </div>
      </div>
      <div className="grid grid-col-2 lg:grid-cols-12 bg-blue-50 lg:w-full w-[550px] p-4 mt-28">
        <div
          className="flex flex-col justify-center items-start p-8 sm:col-span-4"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <span
            className="bg-yellow-200 text-4xl"
            style={{
              backgroundImage:
                "linear-gradient(to top, transparent 50%, rgba(255,255,255,0.5) 50%)",
            }}
          >
            Brainstrom
          </span>
          <p className="text-base mt-8">
            Unleash Your Creative Ideas On Canvas And Collaborate In Real Time
            From Anywhere.
          </p>
        </div>
        <div className=" sm:col-span-8 flex justify-evenly">
          <img src={brainstormImg} alt="brainstorm" className="w-100 h-100" />
        </div>
      </div>
      <footer
        className="my-10 lg:w-full w-[550px] text-center lg:text-center text-lg text-gray-500"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        2024 InkFlow, Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
