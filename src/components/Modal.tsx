interface ModalProps {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function Modal(props: ModalProps) {
  return (
    <>
      {
        props.hidden ? <></> : 
        <>
          {props.children}
          <button onClick={() => {props.setHidden(true)}}>
            닫기
          </button>
        </>
      }
    </>
  );
}

export default Modal;
