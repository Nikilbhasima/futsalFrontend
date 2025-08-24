import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch } from "react-redux";
import { getBargraphData } from "../../redux/graphData/GraphDataThunks";
import PieChartDiagram from "./PieChartDiagram";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const dispatch = useDispatch();

  // Initialize state before using it
  const [barGraphData, setBarGraphData] = useState({});
  const [label, setLabel] = useState([]);
  const [value, setValues] = useState([]);

  useEffect(() => {
    getBarGraphDatas();
  }, [barGraphData]);

  const getBarGraphDatas = async () => {
    try {
      const response = await dispatch(getBargraphData());
      if (response.meta.requestStatus === "fulfilled") {
        const payload = response.payload;

        const labels = Object.keys(payload).reverse();
        const values = Object.values(payload).reverse();

        setLabel(labels);
        setValues(values);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: label,
    datasets: [
      {
        label: "Bookings",
        data: value,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Weekly Booking" },
    },
  };
  console.log("===date--", label);
  return (
    <div className="h-[100%]">
      <div className="grid grid-cols-3 gap-[24px]">
        <div className="bg-tertary rounded-[10px] p-[24px] grid gap-[8px]">
          <h2 className="text-[18px]">Todays Game</h2>
          <p className="text-[32px]">10</p>
        </div>
        <div className="bg-tertary rounded-[10px] p-[24px] grid gap-[8px]">
          <h2 className="text-[18px]">Total Bookings</h2>
          <p className="text-[32px]">100</p>
        </div>
        <div className="bg-tertary rounded-[10px] p-[24px] grid gap-[8px]">
          <h2 className="text-[18px]">Queue Booking</h2>
          <p className="text-[32px]">20</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-[24px]">
        <div style={{ width: "600px", margin: "auto" }}>
          <Bar data={data} options={options} />
        </div>
        <PieChartDiagram />
      </div>
    </div>
  );
}

export default Dashboard;
