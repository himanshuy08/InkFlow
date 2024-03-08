import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import ToolBar from "./ToolBar";
import socket from '../socket';

const Canvas = () => {
  const stageRef = useRef();
  const [activeTool, setActiveTool] = useState(null);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    socket.on("draw", (data) => {
      setShapes([...shapes, data]);
    });

    return () => {
      socket.off("draw");
    };
  }, [shapes]);

  const handleToolChange = (tool) => {
    setActiveTool(tool);
  };

  const handleCanvasClick = (event) => {
    const { offsetX, offsetY } = event.evt;
    switch (activeTool) {
      case "rectangle":
        const rectangle = { type: "rectangle", x: offsetX, y: offsetY };
        setShapes([...shapes, rectangle]);
        socket.emit("mouseMove", rectangle);
        break;
      case "circle":
        const circle = { type: "circle", x: offsetX, y: offsetY };
        setShapes([...shapes, circle]);
        socket.emit("mouseMove", circle);
        break;
      default:
        break;
    }
  };

  return (
    <div className="canvas-container">
      <ToolBar onToolChange={handleToolChange} />
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleCanvasClick}
      >
        <Layer>
          {shapes.map((shape, index) => {
            switch (shape.type) {
              case "rectangle":
                return (
                  <Rect
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    width={50}
                    height={50}
                    fill="red"
                    draggable
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    stroke="black"
                    radius={50}
                    draggable
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
