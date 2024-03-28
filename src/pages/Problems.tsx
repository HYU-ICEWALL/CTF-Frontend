interface ProblemsProps {
  username: string;
}

function Problems({ username }: ProblemsProps) {
  // change to what I shared with lake later
  return <>(
    {(username === "Guest" ?
      <div>
        <p>인증된 사용자만 이용 가능합니다. 로그인 후 이용해 주세요</p>
      </div> :
      <div>
        <p>문제 목록</p>
      </div>)}
    )
  </>
}

export default Problems;
