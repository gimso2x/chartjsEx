import BarForm from "./component/bar";
import DoubleLineForm from "./component/doubleLine";
import HorizonBar from "./component/horizonBar";
import LineForm from "./component/line";
import StackedBarForm from "./component/stackedBar";

export default function Home() {
  return (
    <div style={{ overflow: "auto" }}>
      <h1>horizonBar</h1>
      <HorizonBar />
      <br />

      <h1>Bar</h1>
      <BarForm />
      <br />

      <h1>Line</h1>
      <LineForm />
      <br />

      <h1>Double Line</h1>
      <DoubleLineForm />
      <br />

      <h1>Stacked Bar</h1>
      <StackedBarForm />
    </div>
  );
}
