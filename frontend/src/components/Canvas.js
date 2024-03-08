import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";
import ToolBar from "./ToolBar";
import socket from "../socket";

const Canvas = () => {
  const stageRef = useRef();
  const [activeTool, setActiveTool] = useState(null);
  const [objects, setObjects] = useState([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    socket.on("draw", (data) => {
      setObjects((prevObjects) => [...prevObjects, data]);
    });

    return () => {
      socket.off("draw");
    };
  }, []);

  const handleToolChange = (tool) => {
    setActiveTool(tool);
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    let newObject;
    switch (activeTool) {
      case "pencil":
        newObject = { type: "line", points: [pos.x, pos.y] };
        break;
      case "rectangle":
        newObject = { type: "rectangle", x: pos.x, y: pos.y, width: 0, height: 0 };
        break;
      case "circle":
        newObject = { type: "circle", x: pos.x, y: pos.y, radius: 0 };
        break;
      default:
        break;
    }
    if (newObject) {
      setObjects((prevObjects) => [...prevObjects, newObject]);
      socket.emit("draw", newObject); // Emit drawing data to server
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const updatedObjects = [...objects];
    const lastIndex = updatedObjects.length - 1;
    if (lastIndex >= 0) {
      const obj = updatedObjects[lastIndex];
      switch (obj.type) {
        case "line":
          obj.points = obj.points.concat([point.x, point.y]);
          break;
        case "rectangle":
          obj.width = point.x - obj.x;
          obj.height = point.y - obj.y;
          break;
        case "circle":
          obj.radius = Math.sqrt(Math.pow(point.x - obj.x, 2) + Math.pow(point.y - obj.y, 2));
          break;
        default:
          break;
      }
      updatedObjects[lastIndex] = obj;
      setObjects(updatedObjects);
      socket.emit("draw", obj); 
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="canvas-container">
      <ToolBar onToolChange={handleToolChange} />
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {objects.map((obj, index) => {
            switch (obj.type) {
              case "rectangle":
                return (
                  <Rect
                    key={index}
                    x={obj.x}
                    y={obj.y}
                    width={obj.width}
                    height={obj.height}
                    fill="red"
                   
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={index}
                    x={obj.x}
                    y={obj.y}
                    stroke="black"
                    radius={obj.radius}
                  
                  />
                );
              case "line":
                return (
                  <Line
                    key={index}
                    points={obj.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
