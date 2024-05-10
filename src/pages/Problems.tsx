import axios from 'axios';
import Auth from '../middleware/Auth.tsx';

function Problems() {
  const problemList = () => {
    axios.get("http://server.icewall.org:9999/api/problem?contest=0")
    .then((res) => {
      console.log(res);
    });

    // sample data
    const data = [
      {
        "_id" : 1123,         // Id created from mongo DB
        "id": 1,             // Problem id
        "name" : "A+B",          // Problem name
        "description": "what is A+B",    // Problem description
        "source" : "www.naver.com",           // Problem source (download)
        "link" : "www.instagram.com",          // Problem link (ex. web, pwn)
        "score" : "1000",          // Problem score
        "category" : 0       // 0 : Web, 1 : Pwn, 2 : Reversing, 3 : Forensic, 4 : Misc...
      },
      {
        "_id" : 1223,         // Id created from mongo DB
        "id": 2,             // Problem id
        "name" : "A-B",          // Problem name
        "description": "what is A-B",    // Problem description
        "source" : "www.naver.com",           // Problem source (download)
        "link" : "www.instagram.com",          // Problem link (ex. web, pwn)
        "score" : "1000",          // Problem score
        "category" : 0       // 0 : Web, 1 : Pwn, 2 : Reversing, 3 : Forensic, 4 : Misc...
      }
    ]

    return <div>
      <h1>문제 목록</h1>
      {
        data.map((problem) => {
          return <div key={problem.id}>
            <h2>{problem.name}</h2>
            <p>{problem.description}</p>
            </div>
        })
      }
    </div>
  }

  return <Auth> {problemList()}</Auth>;
}

export default Problems;
