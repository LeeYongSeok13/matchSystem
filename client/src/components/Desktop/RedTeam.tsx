import none from "./../../assets/line_img/line-none.png";
import tier from "./../../assets/tier.png";
import PlusIcon from "../../assets/svg/add.svg";
import close from "../../assets/svg/close.svg";

import { useState } from "react";

import LineModal from "../Mobile/chooseUser/LineModal";
import { User } from "../../commonTypes";

interface RedTeamProps {
  user?: User;
  handleRemoveUser: (user: User) => void;
  handleAddUser: (user: User) => void;
}

const RedTeam: React.FC<RedTeamProps> = ({
  user,
  handleRemoveUser,
  handleAddUser,
}) => {
  const [isLine, setIsLine] = useState<boolean>(false);
  const [line, setLine] = useState(none);

  // 유저가 없을 경우 배경을 다르게 설정
  const backgroundClass = user ? "bg-[#D1C3C3]" : "bg-[#F0E6D2] bg-opacity-15";

  return (
    <div
      className={`w-[18%] max-h-[100%] border-2 border-solid border-[#8A2922] rounded-2xl flex flex-col items-center p-2 ${backgroundClass}`}
    >
      <ul className="flex flex-col items-center justify-center h-full">
        {/* 유저 정보가 있을 경우 */}
        {user ? (
          <li
            key={user.id}
            className="flex flex-col items-center justify-between h-full"
          >
            <img
              src={line}
              alt="라인 이미지"
              className="w-5 h-5"
              onClick={() => setIsLine(!isLine)}
            />
            <div>
              <p className="text-xs font-bold">
                {user.MostChamp.map((champ, index) => (
                  <div key={index}>{champ.champInfo.name}</div>
                ))}
              </p>
            </div>
            <p className="text-xs font-bold">{user.gameName}</p>
            <img src={user.tierImg.rankImg} alt="tier" className="h-9" />
            {isLine && <LineModal setLine={setLine} setIsLine={setIsLine} />}
            <img
              src={close}
              alt="close"
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                handleRemoveUser(user);
                handleAddUser(user);
              }}
            />
          </li>
        ) : (
          // 유저 정보가 없을 경우
          <li className="flex flex-col items-center justify-center text-gray-500 xs:h-[20vh] lg:h-full">
            <img src={PlusIcon} alt="Add" className="" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default RedTeam;
