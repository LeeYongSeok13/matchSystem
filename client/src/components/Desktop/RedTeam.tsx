import none from "./../../assets/line_img/line-none.png";
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

  // 숫자를 1,000과 같은 형식으로 변환
  const formatNumberWithCommas = (number: number): string => {
    return number.toLocaleString();
  };

  return (
    <div
      className={`w-[18%] max-h-[100%] border-2 border-solid border-[#8A2922] rounded-2xl flex flex-col items-center p-2 ${backgroundClass}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {/* 유저 정보가 있을 경우 */}
        {user ? (
          <div
            key={user.id}
            className="flex flex-col items-center justify-between h-full"
          >
            <img
              src={line}
              alt="라인 이미지"
              className="w-5 h-5"
              onClick={() => setIsLine(!isLine)}
            />
            <div className="w-[100%]">
              {user.MostChamp.map((champ, index) => (
                <div key={index} className="flex w-[100%] justify-between">
                  <img src={champ.champInfo.champ_img} className="w-[1.5vw]" />
                  <p className="text-xs font-bold self-center font-blackHanSans">
                    {champ.champInfo.name}
                  </p>
                  <p className="text-xs font-bold self-center point font-blackHanSans">
                    {formatNumberWithCommas(champ.championPoints)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-md font-bold font-blackHanSans">
              {user.gameName}
            </p>
            <img src={user.tierImg.rankImg} alt="tier" className="w-[35%]" />
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
          </div>
        ) : (
          // 유저 정보가 없을 경우
          <li className="flex flex-col items-center justify-center text-gray-500 xs:h-[20vh] lg:h-full">
            <img src={PlusIcon} alt="Add" className="" />
          </li>
        )}
      </div>
    </div>
  );
};

export default RedTeam;
