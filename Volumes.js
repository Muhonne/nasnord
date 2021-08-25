import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { realNames } from "./utils";

const BAR_ELEMENT_WIDTH = 200;

export default function Volumes({ refined }) {
  let data = Object.keys(refined).map((participant) => {
    if(participant !== 'miscRows') {
      return {
        name: realNames[participant] || participant,
        bought: refined[participant].buyVolume,
        sold: refined[participant].sellVolume,
        cost: refined[participant].buyTotal,
        gain: refined[participant].sellTotal,
      };
    }
  });

  const sortedBuys = data.sort((a, b) => b.bought - a.bought);
  const sortedCost = data.sort((a, b) => b.buyVolume - a.buyVolume);
  return (
    <>
      <div className="block">
        <h2>Volume by participant</h2>
        <div className="horizontalScroll">
          <BarChart
            width={data.length * BAR_ELEMENT_WIDTH}
            height={300}
            data={sortedBuys}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="bought" />
            <Tooltip />
            <Legend />
            <Bar dataKey="bought" fill="green" />
            <Bar dataKey="sold" fill="red" />
          </BarChart>
        </div>
      </div>
      <div className="block">
        <h2>Cost by participant in euro</h2>
        <div className="horizontalScroll">
          <BarChart
            width={data.length * BAR_ELEMENT_WIDTH}
            height={300}
            data={sortedCost}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="cost" />
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" fill="red" />
            <Bar dataKey="gain" fill="green" />
          </BarChart>
        </div>
      </div>
    </>
  );
}
