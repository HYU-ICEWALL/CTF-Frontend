import React, { useEffect, useState } from "react";
import { CreateProblemDto, ProblemResponseDto } from "../../../dto/problem.dto";
import { createProblem, updateProblem } from "../../../middlewares/manager/problem.middleware";


interface ModalProps {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  initProblem: ProblemResponseDto | null;
}

function ProblemModal(props: ModalProps) {
  const [problem, setProblem] = useState<CreateProblemDto>({
    name: "",
    description: "",
    difficulty: "",
    score: 0,
    domain: "",
    uri: "",
    flag: "",
  });

  useEffect(() => {
    if(props.initProblem) {
      setProblem({
        name: props.initProblem.name,
        description: props.initProblem.description,
        difficulty: props.initProblem.difficulty,
        score: props.initProblem.score,
        domain: props.initProblem.domain,
        uri: props.initProblem.uri,
        flag: props.initProblem.flag,
      });
    }
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!props.initProblem) {
      createProblem(problem).then(() => {
        alert("문제가 생성되었습니다.");
        setProblem({
          name: "",
          description: "",
          difficulty: "",
          score: 0,
          domain: "",
          uri: "",
          flag: "",
        });
        props.setHidden(true);
      }).catch((err) => {
        console.log(err);
        alert("문제 생성에 실패했습니다.");
      });
    } else{
      updateProblem(props.initProblem._id, problem).then(() => {
        alert("문제가 수정되었습니다.");
        props.setHidden(true);
      }).catch((err) => {
        console.log(err);
        alert("문제 수정에 실패했습니다.");
      });
    }
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProblem({
      ...problem,
      [name]: value,
    });
  };

  const { name, description, difficulty, score, domain, uri } = problem;


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
        <input
          required
          type="text"
          name="difficulty"
          id="difficulty"
          value={difficulty}
          onChange={onChange}
        />
        <label htmlFor="score">점수</label>
        <input
          required
          type="text"
          name="score"
          id="score"
          value={score}
          onChange={onChange}
        />
        <label htmlFor="domain">도메인</label>
        <input
          required
          type="text"
          name="domain"
          id="domain"
          value={domain}
          onChange={onChange}
        />
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

export default ProblemModal;