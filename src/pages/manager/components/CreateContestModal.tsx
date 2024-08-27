import React, { useEffect, useState } from "react";
import { CreateContestDto } from "../../../dto/contest.dto";


interface ModalProps {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateContestModal(props: ModalProps) {
  const [contest, setContest] = useState<CreateContestDto>({
    name: "",
    description: "",
    endTime: "",
    startTime: "",
  })

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(contest);
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContest({
      ...contest,
      [name]: value,
    });
  };

  const { name, description, startTime, endTime } = contest;

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <label htmlFor="name">이름</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChange}
        />
        <label htmlFor="description">설명</label>
        <input
          required
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={onChange}
        />
        <label htmlFor="startTime">시작 시간</label>
        <input
          required
          type="datetime-local"
          name="startTime"
          id="startTime"
          value={startTime}
          onChange={onChange}
        />
        <label htmlFor="endTime">종료 시간</label>
        <input
          required
          type="datetime-local"
          name="endTime"
          id="endTime"
          value={endTime}
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