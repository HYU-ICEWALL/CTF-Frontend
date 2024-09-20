import React, { useState } from "react";
import { CreateProblemDto, ProblemDifficultyArr, ProblemDomainArr } from "../../../dto/problem.dto";
import { createProblem as createContest } from "../../../middlewares/manager/problem.middleware";


interface ModalProps {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}

function CreateContestModal(props: ModalProps) {
  const [problem, setProblem] = useState<CreateProblemDto>({
    name: "",
    description: "",
    difficulty: ProblemDifficultyArr[0],
    score: 0,
    domain: ProblemDomainArr[0],
    uri: "",
    flag: "",
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    problem.score = parseInt(problem.score.toString());

    createContest(problem).then(() => {
      alert("문제 생성에 성공했습니다.");
      props.setHidden(true);
      props.refresh();
    }).catch((err) => {
      console.log(err);
      alert("문제 생성에 실패했습니다.");
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProblem({
      ...problem,
      [name]: value,
    });
  };

  const { name, description, score, uri } = problem;


  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <label htmlFor="name">문제 이름</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChange}
        />
        <label htmlFor="description">문제 설명</label>
        <input
          required
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={onChange}
        />
        <label htmlFor="difficulty">난이도</label>
        <select
          name="difficulty"
          id="difficulty"
          onChange={onChange}
          value={problem.difficulty}
        >
          {ProblemDifficultyArr.map((difficulty) => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
        <label htmlFor="score">점수</label>
        <input
          required
          type="number"
          name="score"
          id="score"
          value={score}
          onChange={onChange}
        />
        <label htmlFor="domain">도메인</label>
        <select
          name="domain"
          id="domain"
          onChange={onChange}
          value={problem.domain}
        >
          {ProblemDomainArr.map((domain) => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
        <label htmlFor="uri">URI</label>
        <input
          required
          type="text"
          name="uri"
          id="uri"
          value={uri}
          onChange={onChange}
        />
        <label htmlFor="flag">플래그</label>
        <input
          required
          type="text"
          name="flag"
          id="flag"
          value={problem.flag}
          onChange={onChange}
        />
        <button type="submit">생성</button>
        <button
          onClick={() => { props.setHidden(true) }}
        >취소</button>
      </form>
    </div>
  );
}

export default CreateContestModal;