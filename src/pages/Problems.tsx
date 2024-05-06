import Auth from '../middleware/Auth.tsx';

interface ProblemsProps {
  username: string;
}

function Problems({ username }: ProblemsProps) {
  const problemList = () => {
    return <div>
      <h1>문제 목록</h1>
      <ul>
        <li>문제 1</li>
        <li>문제 2</li>
        <li>문제 3</li>
      </ul>
    </div>
  }

  return <Auth username={username}> {problemList()}</Auth>;
}

export default Problems;
