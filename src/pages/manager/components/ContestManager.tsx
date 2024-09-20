import { useEffect, useRef, useState } from "react";
import { ContestConditions, ContestHeaderResponseDto, ContestPageResponseDto } from "../../../dto/contest.dto";
import { deleteContest } from "../../../middlewares/manager/contest.middleware";
import CreateContestModal from "./CreateContestModal";
import { dateToString } from "../../../scripts/date";
import UpdateContestModal from "./UpdateContestModal";
import UpdateProblemInContestModal from "./UpdateProblemInContestModal";
import { getContestByConditions } from "../../../middlewares/user/contest.middleware";

const initQuery: ContestConditions = {
  page: 1,
  limit: 10,
  order: "asc",
};

function ContestManager() {
  const [createModalHidden, setCreateModalHidden] = useState<boolean>(true);
  const [updateModalHidden, setUpdateModalHidden] = useState<boolean>(true);
  const [updateProblemInContestModalHidden, setUpdateProblemToContestModalHidden] = useState<boolean>(true);
  const initContestId = useRef<string>("");
  const [page, setPage] = useState<ContestPageResponseDto>({
    total: 0,
    page: 1,
    limit: 10,
    contests: [],
  });
  const [query, setQuery] = useState<ContestConditions>(initQuery);

  useEffect(() => {
    search();
  }, [query.page]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const search = async () => {
    console.log(query);
    getContestByConditions(query).then((res) => {
      setPage(res);
    });
  };

  const refresh = async () => {
    setQuery(initQuery);
    await search();
  };

  const keyDownEventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      {
        createModalHidden && updateModalHidden && updateProblemInContestModalHidden && <>
          <div className="bar" onKeyDown={keyDownEventHandler}>
            <label htmlFor="name">이름</label>
            <input type="search" name="name" placeholder="name" value={query.name} onChange={onChange} />
            <button onClick={search}>검색</button>
            <button onClick={refresh}>새로고침</button>
            <button onClick={() => { setCreateModalHidden(false) }}>추가</button>
          </div>
          <div className="list">
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>시작 시간</th>
                  <th>종료 시간</th>
                  <th>주최자</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {
                  page.total > 0 ? page.contests.map((contest: ContestHeaderResponseDto) => {
                    return (
                      <tr key={contest._id}>
                        <td>{contest.name}</td>
                        <td>{dateToString(contest.startTime)}</td>
                        <td>{dateToString(contest.endTime)}</td>
                        <td>{contest.host}</td>
                        <td>{contest.status}</td>
                        <td onClick={() => {
                          initContestId.current = contest._id;
                          setUpdateProblemToContestModalHidden(false);
                        }}>문제수정</td>
                        <td onClick={() => {
                          initContestId.current = contest._id;
                          setUpdateModalHidden(false);
                        }}>수정</td>
                        <td onClick={() => {
                          deleteContest(contest._id).then(() => {
                            alert("삭제되었습니다.");
                            refresh();
                          }).catch((err) => {
                            console.log(err);
                            alert("삭제에 실패했습니다.");
                          });
                        }}>삭제</td>
                      </tr>
                    );
                  }) :
                    <tr>
                      <td colSpan={5}>대회가 없습니다.</td>
                    </tr>
                }
              </tbody>
            </table>
            <div className="page">
              <button onClick={() => {
                if (query.page > 1) {
                  setQuery({
                    ...query,
                    page: query.page - 1,
                  });
                }
              }}>이전</button>
              <button onClick={() => {
                if (page.total > query.page * query.limit) {
                  setQuery({
                    ...query,
                    page: query.page + 1,
                  });
                }
              }}>다음</button>
            </div>
          </div>
        </>
      }
      {
        !createModalHidden && <CreateContestModal setHidden={setCreateModalHidden} refresh={refresh} />
      }
      {
        !updateModalHidden && <UpdateContestModal setHidden={setUpdateModalHidden} refresh={refresh} initContestId={initContestId.current} />
      }
      {
        !updateProblemInContestModalHidden && <UpdateProblemInContestModal setHidden={setUpdateProblemToContestModalHidden} refresh={refresh} initContestId={initContestId.current} />
      }
    </>
  );
}

export default ContestManager;