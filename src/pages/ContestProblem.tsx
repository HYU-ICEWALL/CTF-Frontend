import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProblemInfoResponseDto } from "../dto/problem.dto";
import { getContestProblemById } from "../middlewares/user/contest.middleware";

function ContestProblem(){
  const { id, problemId } = useParams();

  const [problem, setProblem] = useState<ProblemInfoResponseDto>({
    _id: "",
    name: "",
    description: "",
    difficulty: "",
    domain: "",
    score: 0,
    status: "",
    uri: "",
  });

  useEffect(() => {
    if(!id || !problemId){
      alert("잘못된 접근입니다.");
      return;
    }
    getContestProblemById(id, problemId).then((res) => {
      setProblem(res);
    }).catch((err) => {
      console.log(err);
      alert("문제를 불러오는데 실패했습니다.");
    });
  });



  return (
    <>
      <h1>{problem.name}</h1>
      <p>{problem.description}</p>
      <p>{problem.difficulty}</p>
      <p>{problem.domain}</p>
      <p>{problem.score}</p>

      {/* TODO : 절대경로 */}
      <a href={problem.uri}>문제 링크</a>
    </>
  )
}

export default ContestProblem;