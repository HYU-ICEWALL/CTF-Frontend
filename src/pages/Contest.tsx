import { useContext, useEffect, useState } from "react";
import { PopulateContestResponseDto } from "../dto/contest.dto";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { dateToString } from "../scripts/date";
import { AuthContext } from "../contexts/auth.context";
import { getPopulatedContestById, registerContest, unregisterContest } from "../middlewares/user/contest.middleware";

function Contest() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [contest, setContest] = useState<PopulateContestResponseDto>({
    _id: "",
    name: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    problems: [],
    status: "UPCOMING",
    host: "",
    participants: [],
  });

  const showProblems = () => {
    switch (contest.status) {
      case "UPCOMING":
        return <p>대회가 시작되지 않았습니다.</p>;
      case "FINISHED":
        return <p>대회가 종료되었습니다.</p>;
      case "RUNNING":
        if (contest.problems.length === 0) {
          return <p>문제가 없습니다.</p>;
        }
        return contest.problems.map((problem) => {
          return (
            <div key={problem._id} onClick={() => { navigate(`/contest/${id}/${problem._id}`) }}>
              <h3>{problem.name}</h3>
              <p>{problem.difficulty}</p>
            </div>
          );
        });
    }
  }

  const showRegister = () => {
    switch (contest.status) {
      case "UPCOMING":
        if (auth && auth.profile && auth.role && contest.participants.some((participant) => participant._id === auth.profile)) {
          return (
            <button
              onClick={() => {
                unregisterContest(contest._id).then(() => {
                  alert("참가 취소에 성공했습니다.");
                  getPopulatedContestById(contest._id).then((res) => {
                    setContest(res);
                  }).catch((err) => {
                    console.log(err);
                    alert("대회 정보를 불러오는데 실패했습니다.");
                  });

                }).catch((err) => {
                  console.log(err);
                  alert("참가 취소에 실패했습니다.");
                });
              }}
            >참가 취소</button>
          );
        } else{
          return (
            <button
              onClick={() => {
                registerContest(contest._id).then(() => {
                  alert("참가에 성공했습니다.");
                  getPopulatedContestById(contest._id).then((res) => {
                    setContest(res);
                  }).catch((err) => {
                    console.log(err);
                    alert("대회 정보를 불러오는데 실패했습니다.");
                  });
                }).catch((err) => {
                  console.log(err);
                  alert("참가에 실패했습니다.");
                });
              }}
            >참가</button>
          );
        }
    }
  }

  const showParticipants = () => {
    if (contest.participants.length > 0) {
      return (
        <div className="participants">
          {
            contest.participants.map((participant) => {
              return (
                <div key={participant._id}>{participant.name}</div>
              );
            })
          }
        </div>
      ) 
    }
  }

  useEffect(() => {
    if (!id) {
      alert("잘못된 경로입니다.");
      redirect("/contests");
      return;
    }
    getPopulatedContestById(id).then((res) => {
      setContest(res);
      console.log(res);
      
    }).catch((err) => {
      console.log(err);
      alert("대회 정보를 불러오는데 실패했습니다.");
      redirect("/contests");
    });
  }, []);

  return (
    <div className="container">
      <div className="info">
        <h1>{contest.name}</h1>
        <p>{contest.description}</p>
        <p>시작 시간: {dateToString(contest.startTime)}</p>
        <p>종료 시간: {dateToString(contest.endTime)}</p>
        <p>참가자 수: {contest.participants.length}</p>
        <p>주최자: {contest.host}</p>
      </div>
      {showRegister()}
      {showProblems()}
      {showParticipants()}
    </div>
  )
}

export default Contest;