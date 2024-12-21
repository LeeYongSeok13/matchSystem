import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../components/Profile/menu";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileCharts from "../components/Profile/ProfileCharts";
import ProfileHistory from "../components/Profile/ProfileHistory";
import RankCard from "../components/Profile/RankCard"; // RankCard 컴포넌트 가져오기
import Position from "../components/Profile/Position";
import BackImg from "../assets/bg_img.jpg";
import axios from "axios";
import defaultImg from "../assets/default.png";

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const user_id = location.state.user_id;

  const [profileData, setProfileData] = useState<any>(null);
  const [rankInfo, setRankInfoData] = useState<any>([]);
  const [userInfo, setUserInfoData] = useState<any>({});
  const [masterChamp, setMasterData] = useState<any>([]);
  //@ts-ignore
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user_id) {
      const userDetailsRequest = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/noobs/UserDetilsInfo",
            {
              gameid: user_id,
            }
          );
          setProfileData(response.data);
          setRankInfoData(response.data.rankInfo);
          setUserInfoData(response.data.userInfo);
          setMasterData(response.data.MasterChamp);
        } catch (error) {
          setError("데이터 로드에 실패했습니다.");
          console.error("Error fetching data:", error);
        }
      };
      userDetailsRequest();
    }
  }, [user_id]);

  // rankInfo가 비어있을 경우를 안전하게 처리
  const leftRank = rankInfo[0] || {};
  const rightRank = rankInfo[1] || {};

  console.log(profileData);
  console.log(userInfo);
  console.log(rankInfo);
  console.log(masterChamp);

  return (
    <div
      className="bg-cover bg-center text-white min-h-screen p-6 flex justify-center"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="w-full max-w-6xl relative">
        {/* 메뉴 영역 */}
        <div className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 z-50 py-4">
          <Menu />
        </div>

        {/* 헤더 영역 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-24">
          {/* 왼쪽 카드 */}
          <RankCard
            left={{
              title: `${leftRank?.queueType || "개인2인랭"}`,
              rank: `${leftRank?.tier || "Unranked"} ${leftRank?.rank || ""}`,
              score: ` ${leftRank?.LP || ""}`,
              imgSrc: leftRank.RankImg?.rankImg || defaultImg, // 이미지 경로를 안전하게 처리
            }}
            right={{
              title: `${rightRank?.queueType || "자유랭"}`,
              rank: `${rightRank?.tier || "Unranked"} ${rightRank?.rank || ""}`,
              score: ` ${rightRank?.LP || ""}`,
              imgSrc: rightRank.RankImg?.rankImg || defaultImg, // 이미지 경로를 안전하게 처리
            }}
          />

          {/* 중앙 영역 */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between border-4 border-[rgb(200, 155, 60)]">
            <div className="text-center text-2xl font-bold w-full font-blackHanSans">
              소환사 정보
            </div>
            <ProfileHeader
              profileimg={userInfo?.Profile?.Profile_img || ""}
              gameName={`${userInfo?.gameName || ""}#${
                userInfo?.tagLine || ""
              }`}
            />
          </div>

          {/* 오른쪽 영역 */}
          <Position title="소환사의 선호 포지션" data={[10, 5, 4, 2, 1]} />
        </div>

        {/* 중간 영역 */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {/* 왼쪽 카드 */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between sm:w-1/3 border-4 border-[rgb(200, 155, 60)]">
            <ProfileStats
              soloWinRate={{
                wins: leftRank?.wins || 0,
                losses: leftRank?.losses || 0,
              }}
              freeWinRate={{
                wins: rightRank?.wins || 0,
                losses: rightRank?.losses || 0,
              }}
            />
          </div>

          {/* 오른쪽 카드들 위아래로 */}
          <div className="flex flex-col sm:w-2/3 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between min-h-[300px] border-4 border-[rgb(200, 155, 60)]">
              <ProfileCharts />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between min-h[350px] border-4 border-[rgb(200, 155, 60)]">
              <ProfileHistory champions={masterChamp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
