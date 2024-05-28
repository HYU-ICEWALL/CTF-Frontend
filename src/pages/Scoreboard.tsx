import { useState } from "react";
import Auth from "../middleware/Auth";
import { LineChart } from "@mui/x-charts";

import "../styles/Scoreboard.css";
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';

function Scoreboard() {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);

  if(fetched === false){
    setFetched(true);

    fetch("/api/contest/recent", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true", // Add this line
      },
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => data["data"]["recent"])
    .then((recent) => {
      fetch("/api/contest/scoreboard?name="+recent, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true", // Add this line
        },
        credentials: "include",
      }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });
    }).then((data) => {
      console.log(data);
    });

    fetch("/api/contest/scoreboard", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true", // Add this line
      },
      credentials: "include",
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  }

  const newTheme = createTheme({ palette: { mode: "dark" } });

  return <Auth>{
    <>
      <div className="scoreboard">
        <ThemeProvider theme={newTheme}>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10]}]}
            series={[
              {
                data: [1, 3, 5, 7, 9 , 11],
              },
              {
                data: [0, 0, 1, 1, 3, 6],
              },
              {
                data: [0, 2, 5, 8, 8, 10],
              },
            ]}
          />
        </ThemeProvider>
      </div>
    </>
  }
  </Auth>;
}

export default Scoreboard;
