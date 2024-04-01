import { FormEventHandler } from "react";
import "../styles/Form.css";

interface FormProps {
  action: FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

function Form(props: FormProps) {
  return (
    <>
      <form onSubmit={props.action}>
        {props.children}
      </form>
    </>
  );
}

export default Form;
