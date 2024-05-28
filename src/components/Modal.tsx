import "../styles/Modal.css";

interface ModalProps {
    children: React.ReactNode;
    hidden: any;
    setHidden: any;
}

function Modal(props : ModalProps) {
    const clickHandler = () => {
        props.setHidden(true);
    }

  return (
    <>
    <div className="wrapper" hidden={props.hidden}>
        <div className="modal">
            {props.children}

            <div className="buttonwrapper">
                <form>
                    <input type="text" placeholder="답안을 입력하세요"></input>
                    <button>제출</button>
                </form>
                <button onClick={clickHandler} >닫기</button>
            </div>
        </div>
    </div>
    </>
  );
}

export default Modal;
