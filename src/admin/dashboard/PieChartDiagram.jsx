import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useDispatch } from "react-redux";
import { getPieChartData } from "../../redux/graphData/GraphDataThunks";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
function PieChartDiagram() {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    getPieChartDatas();
  }, []);
  const getPieChartDatas = async () => {
    try {
      const response = await dispatch(getPieChartData());
      console.log("response of pie chart:", response.payload);
      setLabels(Object.keys(response.payload));
      setValues(Object.values(response.payload));
    } catch (error) {
      console.log(error);
    }
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Booking Status",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Booking Detail of week",
      },
    },
  };
  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChartDiagram;
