import axios from 'axios';
import Auth from '../middleware/Auth.tsx';
import Modal from '../components/Modal.tsx';
import "../styles/Problems.css";


function Problems() {
  const problemList = () => {
    axios.get("http://server.icewall.org:9999/api/problem?contest=0")
    .then((res) => {
      console.log(res);
    });
    
    let category = ['Web', 'Pwn', 'Reversing', 'Forensic', 'Misc'];

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
      },
      {
        "_id" : 1223,         // Id created from mongo DB
        "id": 3,             // Problem id
        "name" : "A*B",          // Problem name
        "description": "what is A-B",    // Problem description
        "source" : "www.naver.com",           // Problem source (download)
        "link" : "www.instagram.com",          // Problem link (ex. web, pwn)
        "score" : "1000",          // Problem score
        "category" : 0       // 0 : Web, 1 : Pwn, 2 : Reversing, 3 : Forensic, 4 : Misc...
      },
      {
        "_id" : 1223,         // Id created from mongo DB
        "id": 4,             // Problem id
        "name" : "A/B",          // Problem name
        "description": "what is A-B",    // Problem description
        "source" : "www.naver.com",           // Problem source (download)
        "link" : "www.instagram.com",          // Problem link (ex. web, pwn)
        "score" : "1000",          // Problem score
        "category" : 1       // 0 : Web, 1 : Pwn, 2 : Reversing, 3 : Forensic, 4 : Misc...
      }
    ]

    const clickHandler = (e : any) => {
      let modal = e.currentTarget.querySelector('.modal');
      modal.style.display = 'block';
    }

    const Problems = function(){
      let children = [];
      for(let i = 0; i < 4; i++){
        
        let child = data.filter((problem) => problem.category === i)
        .map((problem) => {
            return <div className='problem' onClick={clickHandler}>
              <h2>{problem.name}</h2>
              <Modal>
                <p>{problem.description}</p>
                <a href={problem.source}>source</a>
                <a href={problem.link}>link</a>
              </Modal>
              <p className='score'>{problem.score}</p>
            </div>
        });
        if(child.length == 0) continue;
        
        children.push(
          <h3>{category[i]}</h3>
        );
        children.push(
          <div className='problems'>
            {
              child
            }
          </div>
        );
      }
      
      return children;
    }

    return <div className='problemlist'>
      <h1>문제 목록</h1>
      {
        Problems()
      }
    </div>
  }

  return <Auth> {problemList()}</Auth>;
}

export default Problems;
