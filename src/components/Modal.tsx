import "../styles/Modal.css";

interface ModalProps {
    children: React.ReactNode;
}

function Modal(props : ModalProps) {
  return (
    <>
    <div className="wrapper">
        <div className="modal">
            <div className="buttonwrapper">
                <button>닫기</button>
            </div>
            {props.children}
        </div>
    </div>
    </>
  );
}

export default Modal;
