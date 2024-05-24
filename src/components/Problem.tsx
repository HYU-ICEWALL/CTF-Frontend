import { useState } from "react";
import Modal from "./Modal";

interface ProblemProps {
    name: string;
    description: string;
    source: string;
    link: string;
    score: string;
}

function Problem(props : ProblemProps) {

  const [hidden, setHidden] = useState(true);

  const clickHandler = () => {
    setHidden(false);
  }

  return (
    <>
        <div className='problem' onClick={clickHandler}>
            <h2>{props.name}</h2>
            <p className='score'>{props.score}</p>
        </div>

        <Modal hidden={hidden} setHidden={setHidden}>
              <p>{props.description}</p>
              <p>
              <a href={props.source}>source</a>
              </p>
              <p>
              <a href={props.link}>link</a>
              </p>
        </Modal>
    </>
  );
}

export default Problem;
