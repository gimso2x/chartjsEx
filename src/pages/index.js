import BarForm from "./component/bar";
import HorizonBar from "./component/horizonBar";
import LineForm from "./component/line";

export default function Home() {
  return (
    <div style={{ overflow: "auto" }}>
      <h1>horizonBar</h1>
      <HorizonBar />
      <h1>Bar</h1>
      <BarForm />
      <h1>Line</h1>
      <LineForm />
    </div>
  );
}
