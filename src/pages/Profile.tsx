import { useEffect, useState } from "react";
import { UpdateProfileDto } from "../dto/profile.dto";
import { getOwnProfile, updateOwnProfile } from "../middlewares/user/profile.middleware";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState<UpdateProfileDto>({
    name: "",
    organization: "",
    department: "",
  });

  const { name, organization, department } = profile;

  const navigate = useNavigate();
  
  useEffect(() => {
    getOwnProfile().then((res) => {
      console.log(res);
      
      setProfile(res);
    }).catch((err) => {
      console.log(err);
      alert("프로필을 불러오는데 실패했습니다. 관리자에게 문의하세요.");
    });
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateOwnProfile(profile).then(() => {
      alert("프로필이 업데이트 되었습니다.");
      navigate("/");
    }).catch((err) => {
      console.log(err);
      alert("프로필 업데이트에 실패했습니다. 관리자에게 문의하세요.");
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };


  return (
    <>
      <div className="form-container">
        <form onSubmit={submitHandler} >
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            required
          />
          <label htmlFor="organization">조직/학교</label>
          <input
            type="text"
            name="organization"
            id="organization"
            value={organization}
            onChange={onChange}
            required
          />
          <label htmlFor="department">부서/학과</label>
          <input
            type="text"
            name="department"
            id="department"
            value={department}
            onChange={onChange}
            required
          />
          <input type="submit" value="프로필 저장" />
        </form>
      </div>
    </>
  );
}

export default Profile;
