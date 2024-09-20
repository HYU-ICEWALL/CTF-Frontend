import { useEffect, useRef, useState } from "react";
import { ProblemConditions, ProblemDifficultyArr, ProblemDomainArr, ProblemPageResponseDto } from "../../../dto/problem.dto";
import { deleteProblem, getProblemPageWithConditions } from "../../../middlewares/manager/problem.middleware";
import CreateContestModal from "./CreateProblemModal";
import UpdateProblemModal from "./UpdateProblemModal";

const initQuery: ProblemConditions = {
  page: 1,
  limit: 10,
  order: "asc",
  domain: undefined,
  difficulty: undefined,
  sort: "name",
};

const allDifficulty = "*";
const allDomain = "*";

function ProblemManager() {
  const [createModalHidden, setCreateModalHidden] = useState<boolean>(true);
  const [updateModalHidden, setUpdateModalHidden] = useState<boolean>(true);
  const initProblemId = useRef<string>("");
  const [page, setPage] = useState<ProblemPageResponseDto>({
    problems: [],
    total: 0,
    page: 1,
    limit: 10,
  });
  const [query, setQuery] = useState<ProblemConditions>(initQuery);

  useEffect(() => {
    search();
  }, [query.page]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "difficulty" && value === allDifficulty || name === "domain" && value === allDomain) {
      setQuery({
        ...query,
        [name]: undefined,
      });

      return;
    }

    setQuery({
      ...query,
      [name]: value,
    });
  };

  const search = async () => {
    console.log(query);
    
    getProblemPageWithConditions(query).then((res) => {
      setPage(res);
    }).catch((err) => {
      console.log(err);
      alert("문제를 불러오는데 실패했습니다.");
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
        createModalHidden && updateModalHidden && <>
          <div className="bar" onKeyDown={keyDownEventHandler}>
            <label htmlFor="name">이름</label>
            <input type="search" name="name" placeholder="name" value={query.name} onChange={onChange} />
            <label htmlFor="domain">도메인</label>
            <select 
              name="domain"
              id="domain" 
              value={query.domain}
              onChange={onChange}
            >
              <option key={allDomain} value={allDomain}>모든 도메인</option>
              {
                ProblemDomainArr.map((domain) => (
                  <option key={domain} value={domain}>{domain}</option>
                ))
              }
            </select>
            <label htmlFor="difficulty">난이도</label>
            <select 
              name="difficulty"
              id="difficulty"
              value={query.difficulty}
              onChange={onChange}
              defaultValue={undefined}
            >
              <option key={allDifficulty} value={allDifficulty}>모든 난이도</option>
              {
                ProblemDifficultyArr.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))
              }
            </select>
            <button onClick={search}>검색</button>
            <button onClick={refresh}>새로고침</button>
            <button onClick={() => { setCreateModalHidden(false) }}>추가</button>
          </div>
          <div className="list">
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>도메인</th>
                  <th>난이도</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {
                  page.problems.length > 0 ? page.problems.map((problem) => (
                    <tr key={problem._id}>
                      <td>{problem.name}</td>
                      <td>{problem.domain}</td>
                      <td>{problem.difficulty}</td>
                      <td>{problem.status}</td>
                      <td onClick={() => {
                        initProblemId.current = problem._id;
                        setUpdateModalHidden(false);
                      }}>수정</td>
                      <td onClick={() => {
                        deleteProblem(problem._id).then(() => {
                          alert("삭제되었습니다.");
                          refresh();
                        }).catch((err) => {
                          console.log(err);
                          alert("삭제에 실패했습니다.");
                        });
                      }}>삭제</td>
                    </tr>
                  ))
                    : <tr><td colSpan={4}>문제가 없습니다.</td></tr>
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
        !updateModalHidden && <UpdateProblemModal setHidden={setUpdateModalHidden} refresh={refresh} initProblemId={initProblemId.current} />
      }
    </>
  );
}

export default ProblemManager;