import { useState } from "react";
import Auth from "../middleware/Auth";
import { LineChart } from "@mui/x-charts";

import "../styles/Scoreboard.css";
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';

function Scoreboard() {
  const [fetched, setFetched] = useState(false);
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([] as any[]);

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
      return data["data"][0]["submissions"];
    })
    .then((submissions) => {
      let accounts = submissions.map((submission: any) => {
        return submission["account"];
      });
      let timestamps = submissions.map((submission: any) => {
        return (new Date(submission["timestamp"])).getMilliseconds();
      });

      console.log(accounts);
      console.log(timestamps);
      
      setXAxis(timestamps);

      let series = [] as any[];
      
      for(let i = 0; i < accounts.length; i++){
        let data = {
          data: [] as Number[],
        }
        let cumulative = 0;
        let account = accounts[i];
        for(let j = 0; j < submissions.length; j++){
          if(submissions[j]["account"] === account){
            cumulative += submissions[j]["score"];
          }
          data.data.push(cumulative);
        }
      }

      console.log(series);

      setSeries(series);
      

    })
  }

  const newTheme = createTheme({ palette: { mode: "dark" } });

  return <Auth>{
    <>
      <div className="scoreboard">
        <ThemeProvider theme={newTheme}>
          <LineChart
            // xAxis={[{ data: [1, 2, 3, 5, 8, 10]}]}
            xAxis={[{ data: xAxis }]}
            // series={[
            //   {
            //     data: [1, 3, 5, 7, 9 , 11],
            //   },
            //   {
            //     data: [0, 0, 1, 1, 3, 6],
            //   },
            //   {
            //     data: [0, 2, 5, 8, 8, 10],
            //   },
            // ]}
            series={series}
          />
        </ThemeProvider>
      </div>
    </>
  }
  </Auth>;
}

export default Scoreboard;
