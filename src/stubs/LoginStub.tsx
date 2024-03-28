function LoginStub() {
    const Login = () => {
        document.cookie = 'session=sessiondummydata;';
        window.location.href = '/';
    };

    return (
        <>
            <button onClick={Login}>Login</button>
        </>
    )
}

export default LoginStub;