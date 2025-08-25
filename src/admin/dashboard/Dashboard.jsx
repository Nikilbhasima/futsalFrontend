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
import { useDispatch, useSelector } from "react-redux";
import { getBargraphData } from "../../redux/graphData/GraphDataThunks";
import PieChartDiagram from "./PieChartDiagram";
import { useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
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
  const navigate = useNavigate();
  const { userDetail } = useSelector((state) => state.account);
  console.log("user detail:", userDetail);
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
  return (
    <div className="h-[100%]">
      <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-[2rem]">
        <div className="grid grid-cols-2 gap-[12px] ">
          <div className="bg-tertary rounded-[10px] p-[24px] grid gap-[4px]">
            <h2 className="text-[18px]">Todays Game</h2>
            <p className="text-[32px]">10</p>
          </div>
          <div className="bg-tertary rounded-[10px] p-[24px] grid gap-[4px]">
            <h2 className="text-[18px]">Total Bookings</h2>
            <p className="text-[32px]">100</p>
          </div>
          <div className="bg-tertary rounded-[10px] p-[24px] grid gap-[4px] col-span-2">
            <h2 className="text-[18px]">Queue Booking</h2>
            <p className="text-[32px]">20</p>
          </div>
        </div>
        {/*    part */}
        <section className="bg-tertary rounded-[10px] p-[24px]">
          <div className="flex justify-between">
            <h2 className="text-primary text-[32px] font-semibold">
              Owner Detail
            </h2>
            <button
              className="rounded-[10px] flex items-center gap-[8px]  p-[8px] hover:bg-primary hover:-translate-y-1 duration-300 transition-all ease-in"
              onClick={() => navigate("/profile")}
            >
              <TbListDetails />
              Profile Detail
            </button>
          </div>
          <div>
            <div className="flex justify-between border-b-[1px] border-b-[#27D483] p-[12px] text-[16px]">
              <span className="font-semibold">Username:</span>
              <span className="font-light">{userDetail?.username}</span>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-[#27D483] p-[12px] text-[16px]">
              <span className="font-semibold">Phone Number:</span>
              <span className="font-light">{userDetail?.phoneNumber}</span>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-[#27D483] p-[12px] text-[16px]">
              <span className="font-semibold">Email Address:</span>
              <span className="font-light">{userDetail?.email}</span>
            </div>
          </div>
        </section>
      </section>

      {/* graph part */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[24px]">
        <div style={{ width: "600px", margin: "auto" }}>
          <Bar data={data} options={options} />
        </div>
        <PieChartDiagram />
      </div>
    </div>
  );
}

export default Dashboard;
