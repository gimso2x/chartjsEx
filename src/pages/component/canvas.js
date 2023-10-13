import { useRef, useState } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [pattern, setPattern] = useState();

  useEffect(() => {
    if (!canvasRef) return;
    canvasRef.current.width = 10;
    canvasRef.current.height = 10;
    // get the context for drawing
    let c = canvasRef.current.getContext("2d");
    // draw 1st line of the shape
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(2, 0);
    c.lineTo(10, 8);
    c.stroke();
    // draw 2nd line of the shape
    c.beginPath();
    c.moveTo(0, 8);
    c.lineTo(2, 10);
    c.stroke();
    // create the pattern from the shape
    c.createPattern(shape, "repeat");
    // setPattern(c.createPattern(shape, "repeat"));
  }, [canvasRef]);

  return <canvas ref={canvasRef}></canvas>;
}
