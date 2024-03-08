// ToolBar.js
import React, { useState } from "react";
import {
  Circle as LucideCircle,
  Diamond,
  Eraser,
  Image,
  Minus,
  MousePointer,
  MoveRight,
  Pencil,
  Square,
  TextCursor,
  RectangleVerticalIcon,
} from "lucide-react";

const ToolBar = ({ onToolChange }) => {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    onToolChange(tool);
  };

  const ToolCard = ({ children, onClick, active }) => {
    return (
      <div
        className={`tool-card p-2 rounded-lg cursor-pointer transition-colors ${
          active ? "bg-purple-100" : ""
        }`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };

  const tools = [
    { name: "mousePointer", icon: <MousePointer size={20} /> },
    { name: "square", icon: <Square size={20} /> },
    { name: "rectangle", icon: <RectangleVerticalIcon size={20} /> },
    { name: "diamond", icon: <Diamond size={20} /> },
    { name: "circle", icon: <LucideCircle size={20} /> },
    { name: "moveRight", icon: <MoveRight size={20} /> },
    { name: "minus", icon: <Minus size={20} /> },
    { name: "pencil", icon: <Pencil size={20} /> },
    { name: "textCursor", icon: <TextCursor size={20} /> },
    { name: "eraser", icon: <Eraser size={20} /> },
    { name: "image", icon: <Image size={20} /> },
  ];

  return (
    <div className="tools-container">
      <div className="main-container flex justify-center">
        <div className="tools flex flex-row justify-around items-center border w-[500px] h-[50px] rounded-lg bg-white">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              onClick={() => handleToolClick(tool.name)}
              active={activeTool === tool.name}
            >
              {tool.icon}
            </ToolCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
