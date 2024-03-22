import "../styles/Form.css";

interface FormProps {
  children: React.ReactNode;
}

function Form(props: FormProps) {
  return (
    <>
      <form action="/api/login" method="post">
        {props.children}
      </form>
    </>
  );
}

export default Form;
