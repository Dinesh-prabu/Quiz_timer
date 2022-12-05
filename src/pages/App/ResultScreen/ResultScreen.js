import react from "react";
import "../App.css";

import { PieChart } from "react-minimal-pie-chart";

const ResultScreen = ({ score, total }) => {
  return (
    <div>
      {`Score :  ${score}`}
      <div className="piechart">
        <PieChart
          data={[
            {
              title: "Correct",
              value: score,
              color: "green",
              label: "teee",
              reveal: "50%"
            },
            { title: "Wrong", value: total - score, color: "red" },
            { title: "Total", value: total, color: "blue" }
          ]}
        />
      </div>
    </div>
  );
};

export default ResultScreen;
