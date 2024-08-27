import { useEffect, useState } from "react";
import { ProblemConditions, ProblemPageResponseDto, ProblemResponseDto } from "../../../dto/problem.dto";
import { deleteProblem, getProblemsWithConditions, getProblemWithId } from "../../../middlewares/manager/problem.middleware";
import ProblemModal from "./ProblemModal";

const initQuery: ProblemConditions = {
  page: 1,
  limit: 10,
  order: "asc",
};


function Problem() {
  const [modalHidden, setModalHidden] = useState<boolean>(true);
  const [initProblem, setInitProblem] = useState<ProblemResponseDto | null>(null);
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  }; 

  const search = async () => {
    getProblemsWithConditions(query).then((res) => {
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
      <div className="bar" onKeyDown={keyDownEventHandler}>
        <label htmlFor="name">name</label>
        <input type="search" name="name" placeholder="name" value={query.name} onChange={onChange}/>
        <label htmlFor="domain">domain</label>
        <input type="search" name="domain" placeholder="domain" value={query.domain} onChange={onChange}/>
        <label htmlFor="difficulty">difficulty</label>
        <input type="search" name="difficulty" placeholder="difficulty" value={query.difficulty} onChange={onChange}/>
        <button onClick={search}>검색</button>
        <button onClick={refresh}>새로고침</button>
        <button onClick={() => {setModalHidden(false)}}>추가</button>
      </div>
      <div className="list">
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>domain</th>
              <th>difficulty</th>
              <th>status</th>
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
                    getProblemWithId(problem._id).then((res) => {
                      setInitProblem(res);
                      setModalHidden(false);
                    }).catch((err) => {
                      console.log(err);
                      alert("문제를 불러오는데 실패했습니다.");
                    });
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
          {
            Array.from({length: Math.ceil(page.total / page.limit)}, (_, index) => index + 1).map((num) => (
              <span key={num} onClick={() => setQuery({
                ...query,
                page: num,
              })}>{num}</span>
            ))
          }
        </div>
      </div>
      {
        modalHidden ? null : <ProblemModal setHidden={setModalHidden} initProblem={initProblem}/>
      }
    </>
  );
}

export default Problem;