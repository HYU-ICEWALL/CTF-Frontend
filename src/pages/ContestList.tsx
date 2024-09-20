import { useEffect, useState } from "react";
import { ContestConditions, ContestHeaderResponseDto, ContestPageResponseDto } from "../dto/contest.dto";
import { dateToString } from "../scripts/date";
import { useNavigate } from "react-router-dom";
import { getContestByConditions } from "../middlewares/user/contest.middleware";

const initQuery: ContestConditions = {
  page: 1,
  limit: 10,
  order: "asc",
};

function ContestList() {
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
    }).catch((err) => {
      console.log(err);
      alert("대회를 불러오는데 실패했습니다.");
    });
  };

  const refresh = async () => {
    setQuery(initQuery);
    await search();
  };
  const navigate = useNavigate();


  return (
    <>

      <div className="bar">
        <label htmlFor="name">이름</label>
        <input type="search" name="name" placeholder="name" value={query.name} onChange={onChange} />
        <button onClick={search}>검색</button>
        <button onClick={refresh}>새로고침</button>
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
                  <tr 
                    key={contest._id} 
                    onClick={() => {navigate(`/contest/${contest._id}`)}}
                    style={{cursor: "pointer"}}
                  >
                    <td>{contest.name}</td>
                    <td>{dateToString(contest.startTime)}</td>
                    <td>{dateToString(contest.endTime)}</td>
                    <td>{contest.host}</td>
                    <td>{contest.status}</td>
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
          <button
            onClick={() => {
              if (query.page > 1) {
                setQuery({
                  ...query,
                  page: query.page - 1,
                });
              }
            }}
          >이전</button>
          <span>{query.page} / {Math.ceil(page.total / query.limit)}</span>
          <button
            onClick={() => {
              if (query.page < Math.ceil(page.total / query.limit)) {
                setQuery({
                  ...query,
                  page: query.page + 1,
                });
              }
            }}
          >다음</button>
        </div>
      </div>
    </>
  );
}

export default ContestList;