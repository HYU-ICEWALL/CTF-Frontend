import '../styles/Login.css';
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        console.log(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <div>
                <form action="submit" method="post">
                    {/* <h3>Login</h3> */}
                    <label htmlFor="username">아이디</label><input type="text" name="username" id="username" value={username} onChange={onUsernameChange} />
                    <label htmlFor="password">패스워드</label><input type="password" name="password" id="password" value={password} onChange={onPasswordChange} />
                    <input type="submit" value="로그인" />
                    <a href="/">Forgot Password?</a>
                </form>

            </div>
        </>
    )
}

export default Login