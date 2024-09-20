import React, { useEffect, useState } from "react";
import { ProblemHeaderResponseDto } from "../../../dto/problem.dto";
import { getAllProblems } from "../../../middlewares/manager/problem.middleware";
import { updateProblemInContest } from "../../../middlewares/manager/contest.middleware";
import { PopulateContestResponseDto } from "../../../dto/contest.dto";
import { getPopulatedContestById } from "../../../middlewares/user/contest.middleware";

interface ModalProps {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
  initContestId: string;
}

function UpdateProblemInContestModal(props: ModalProps) {
  const [problems, setProblems] = useState<ProblemHeaderResponseDto[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<ProblemHeaderResponseDto[]>([]);
  const [contestWithProblems, setContestWithProblems] = useState<PopulateContestResponseDto>({
    _id: "",
    name: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    problems: [],
    status: "PENDING",
    host: "",
    participants: [],
  });

  useEffect(() => {
    getAllProblems().then((res: ProblemHeaderResponseDto[]) => {
      setProblems(res);
      getPopulatedContestById(props.initContestId).then((contest: PopulateContestResponseDto) => {
        setContestWithProblems(contest);
        setSelectedProblems(contest.problems);
        console.log(contest);
      })
    })
  }, []);

  const submitHandler = async () => {
    updateProblemInContest(props.initContestId, selectedProblems.map((problem) => problem._id)).then(() => {
      alert("대회 문제 수정에 성공했습니다.");
      props.setHidden(true);
      props.refresh();
    }).catch((err) => {
      console.log(err);
      alert("대회 문제 수정에 실패했습니다.");
    });
  }

  return (
    <div className="selectForm">
      <table className="selectedProblems">
        <thead>
          <tr>
            <th>문제 이름</th>
            <th>난이도</th>
            <th>도메인</th>
          </tr>
        </thead>
        <tbody>
          {selectedProblems.map((problem) => {
            return (
              <tr key={problem._id}>
                <td>{problem.name}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.domain}</td>
                <td
                  onClick={() => {
                    setSelectedProblems(selectedProblems.filter((p) => p._id !== problem._id));
                  }}
                >삭제</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="Problems">
        <thead>
          <tr>
            <th>문제 이름</th>
            <th>난이도</th>
            <th>도메인</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => {
            return (
              <tr key={problem._id}>
                <td>{problem.name}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.domain}</td>
                <td
                  onClick={() => {
                    setSelectedProblems([...selectedProblems, problem]);
                  }}
                >추가</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={submitHandler}
      >확인</button>
      <button
        onClick={() => {
          props.setHidden(true);
        }}
      >취소</button>
    </div>
  );
}

export default UpdateProblemInContestModal;