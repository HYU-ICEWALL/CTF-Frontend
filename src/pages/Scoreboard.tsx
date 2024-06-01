import { useState } from "react";
import Auth from "../middleware/Auth";
import { LineChart } from "@mui/x-charts";

import "../styles/Scoreboard.css";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";

function Scoreboard() {
  const [fetched, setFetched] = useState(false);
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([] as any[]);

  if (fetched === false) {
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
        fetch("/api/contest/scoreboard?name=" + recent, {
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
          .then((data) => {
            let contestdata = data["data"];
            contestdata = JSON.parse(`
        {
          "code": 0,
          "data": {
              "_id": "665a97820fbacb4eec6d2c30",
              "contest": "km2yt248",
              "begin_at": "2000-01-01 00:00:00",
              "end_at": "2030-01-01 00:00:00",
              "submissions": [
                  {
                      "account": "test",
                      "total": 237,
                      "timestamps": [
                          {
                              "problem": "378vopt4",
                              "time": "2024-06-01 12:38:22",
                              "score": 34
                          },
                          {
                              "problem": "i4a6ugj4",
                              "time": "2024-06-01 12:38:25",
                              "score": 47
                          },
                          {
                              "problem": "sfdsossm",
                              "time": "2024-06-01 12:38:32",
                              "score": 99
                          },
                          {
                              "problem": "jnpirs1h",
                              "time": "2024-06-01 12:38:38",
                              "score": 135
                          },
                          {
                              "problem": "9nukyveu",
                              "time": "2024-06-01 12:44:55",
                              "score": 159
                          },
                          {
                              "problem": "6ffkmst7",
                              "time": "2024-06-01 12:45:00",
                              "score": 237
                          }
                      ]
                  },
                  {
                      "account": "qwe123",
                      "total": 211,
                      "timestamps": [
                          {
                              "problem": "y7334257",
                              "time": "2024-06-01 12:43:12",
                              "score": 81
                          },
                          {
                              "problem": "6ffkmst7",
                              "time": "2024-06-01 12:43:19",
                              "score": 159
                          },
                          {
                              "problem": "sfdsossm",
                              "time": "2024-06-01 12:44:17",
                              "score": 211
                          }
                      ]
                  }
              ],
              "test": true,
              "__v": 0
          }
      }`)["data"];
            console.log(contestdata);
            return contestdata;
          })
          .then((data) => {
            let submissions = data["submissions"];
            let accounts = submissions.map((submission: any) => {
              return submission["account"];
            });

            let timestamps = submissions
              .map((submission: any) => {
                console.log(submission["timestamps"]);
                return submission["timestamps"].map((timestamp: any) => {
                  return (
                    new Date(timestamp["time"]).getTime() -
                    new Date(data["begin_at"]).getTime()
                  );
                });
              })
              .flat()
              .sort()
              .filter(
                (value: any, index: any, self: any) =>
                  self.indexOf(value) === index
              );

            timestamps.push(timestamps[0]);
            timestamps.sort();

            console.log(timestamps);

            setXAxis(timestamps);

            console.log(accounts);

            let series = [] as any[];

            for (let i = 0; i < accounts.length; i++) {
              let dat = [0];

              let idx = 1;
              for (let j = 0; j < submissions[i]["timestamps"].length; j++) {
                while (true) {
                  let timestamp =
                    new Date(
                      submissions[i]["timestamps"][j]["time"]
                    ).getTime() - new Date(data["begin_at"]).getTime();
                  let curtime = timestamps[idx];

                  if (timestamp === curtime) {
                    dat.push(submissions[i]["timestamps"][j]["score"]);
                    idx++;
                    break;
                  } else {
                    dat.push(dat[dat.length - 1]);
                    idx++;
                  }
                }
              }

              while (dat.length < timestamps.length) {
                dat.push(dat[dat.length - 1]);
              }

              console.log(dat);
              console.log(timestamps.length);

              series.push({
                data: dat,
              });
            }

            console.log(series);

            setSeries(series);
          });
      });
  }

  const newTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <Auth>
      {
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
    </Auth>
  );
}

export default Scoreboard;
