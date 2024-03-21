import '../styles/Form.css';

function Form(props: any) {

  return (
    <>
        <form action="/api/login" method="post">
            {props.children}
        </form>
    </>
  );
}

export default Form;