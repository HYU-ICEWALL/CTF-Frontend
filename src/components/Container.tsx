import React, { useState } from "react";

export interface ContainerChild {
  [key: string]: React.ReactNode;
}

export interface ContainerProps {
  children : ContainerChild[];
}


function Container(props: ContainerProps) {
  const [currentNode, setCurrentNode] = useState<ContainerChild>(props.children[0]);
  
  return (
    <div className="container">
      <div className="nav">
        {
          props.children.map((child: ContainerChild) => {
            const key = Object.keys(child)[0];
            return (
              <button className="nav-button" key={key} onClick={() => setCurrentNode(child)}>{key}</button>
            );
          })
        }
      </div>
      <div className="content">
        {
          currentNode[Object.keys(currentNode)[0]]
        }
      </div>
    </div>
  );
}

export default Container;