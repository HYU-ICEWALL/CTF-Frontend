import { useEffect, useState } from "react";
import { ContestInfoDto } from "../dto/contest.dto";
import { Link } from "react-router-dom";
import { getAllContests } from "../middlewares/user/contest.middleware";

function ContestList(){
  const [contest, setContest] = useState<ContestInfoDto[]>([]);
  useEffect(() => {
    getAllContests().then((res) => {
      setContest(res); 
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      {
        contest.length === 0 ? <div>No Contests</div> :
        contest.map((item:ContestInfoDto) => {
          return (
            <Link to={`${item._id}`}>
              <div key={item._id}>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default ContestList;