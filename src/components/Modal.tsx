import "../styles/Modal.css";

interface ModalProps {
    children: React.ReactNode;
    hidden: any;
    setHidden: any;
    submitLink: any;
    probName: any;
}

function Modal(props : ModalProps) {
    const clickHandler = () => {
        props.setHidden(true);
    }

const submitHandler = (e : any) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const answer = data.get("answer");

    fetch(props.submitLink, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true", // Add this line
        },
        credentials: "include",
        body: JSON.stringify({
            name: props.probName,
            flag: answer,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.result === "correct") {
            alert("정답입니다!");
            props.setHidden(true);
        } else {
            alert("틀렸습니다!");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
};

return (
    <>
        <div className="wrapper" hidden={props.hidden}>
            <div className="modal">
                {props.children}

                <div className="buttonwrapper">
                    <form onSubmit={submitHandler}>
                        <input type="text" name="answer" placeholder="답안을 입력하세요" />
                        <button type="submit">제출</button>
                    </form>
                    <button onClick={clickHandler}>닫기</button>
                </div>
            </div>
        </div>
    </>
);
}

export default Modal;
