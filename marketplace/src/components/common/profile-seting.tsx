import boderAvatar from "../../assets/img/boder-avatar.png";
import avatar from "../../assets/img/avatar-account.png";
export interface ProfileSetingProps {
  name: string;
  id: string;
}

const ProfileSeting = ({
  name = "John Doe",
  id = "2342rnksfner3",
}: ProfileSetingProps) => {
  return (
    <div className="bg-yellow-800 bg-opacity-40  items-center justify-center relative">
      <img src={avatar} alt="avatar" className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-avarta bg-cover bg-center rounded-lg">
        <img src={boderAvatar} alt="avatar" className="w-full h-full flex" />
      </div>
      <div className="flex inline absolute w-full h-1/5 grid grid-cols-2">
        <div>
          <label>{name}</label>
          <label>{id}</label>
        </div>
      </div>
    </div>
  );
};
export default ProfileSeting;
