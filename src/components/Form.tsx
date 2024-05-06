import "../styles/Form.css";

interface FormProps {
  children: React.ReactNode;
  submitHandler: React.FormEventHandler<HTMLFormElement>;
}

function Form(props: FormProps) {
  return (
    <>
      <form action="/" method="get" onSubmit={props.submitHandler}>
        {props.children}
      </form>
    </>
  );
}

export default Form;
