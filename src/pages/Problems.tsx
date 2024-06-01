import axios from 'axios';
import Auth from '../middleware/Auth.tsx';
import "../styles/Problems.css";
import Problem from '../components/Problem.tsx';
import { ReactNode, useState } from 'react';

function Problems() {
  const [problems, setProblems] = useState([] as ReactNode[]);
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
    }).then((res) => res.json())
    .then((data) => data["data"]["recent"])
    .then((recent) => {
      fetch("/api/problem?name=" + recent, {
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
          data = data["data"];
          let ret = [];
          for(let i = 0; i < data.length; i++){
            ret.push(<Problem 
                name={data[i].name}
                description={data[i].description}
                source={data[i].source}
                link={data[i].link}
                score={data[i].score}
              ></Problem>);
          }
          setProblems(ret);
        });
      });
  }

  return <Auth>{
      <div className="problems">
        {problems}
      </div>
  }
  </Auth>;
}

export default Problems;
