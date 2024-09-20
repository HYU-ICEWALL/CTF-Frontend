import React, { useEffect, useState } from "react";
import { ContestStatusArr, UpdateContestDto } from "../../../dto/contest.dto";
import { getContestById, updateContest } from "../../../middlewares/manager/contest.middleware";
import { dateToString } from "../../../scripts/date";

interface ModalProps {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
  initContestId: string;
}

function UpdateContestModal(props: ModalProps) {
  const [contest, setContest] = useState<UpdateContestDto>({
    name: "",
    description: "",
    endTime: "",
    startTime: "",
    status: "PENDING",
  });

  useEffect(() => {
    getContestById(props.initContestId).then((contestResponseDto) => {
      setContest({
        name: contestResponseDto.name,
        description: contestResponseDto.description,
        startTime: dateToString(contestResponseDto.startTime),
        endTime: dateToString(contestResponseDto.endTime),
        status: contestResponseDto.status,
      });
    });
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateContest(props.initContestId, contest).then(() => {
      alert("콘테스트 수정에 성공했습니다.");
      props.setHidden(true);
      props.refresh();
    }).catch((err) => {
      console.log(err);
      alert("콘테스트 수정에 실패했습니다.");
    });
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <label htmlFor="status">상태</label>
        <select
          name="status"
          id="status"
          onChange={onChange}
          value={contest.status}
        >
          {
            ContestStatusArr.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))
          }
        </select>
        <button type="submit">수정</button>
        <button
          onClick={() => { props.setHidden(true) }}
        >취소</button>
      </form>
    </div>
  );
}

export default UpdateContestModal;