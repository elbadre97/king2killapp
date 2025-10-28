import React from 'react';
import { User, EventType } from '../types';
import { LEADERBOARDS } from '../constants';

interface LeaderboardPageProps {
  t: any;
  user: User;
  eventType: EventType;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ t, user, eventType }) => {
  const rankIcons = ['🥇', '🥈', '🥉'];
  
  const leaderboardData = LEADERBOARDS[eventType] || [];
  
  const eventDetails = {
    weekly: {
        title: t.leaderboardTitleWeekly,
        desc: t.eventsWeeklyDesc,
    },
    weekend: {
        title: t.leaderboardTitleWeekend,
        desc: t.eventsWeekendDesc,
    },
    marathon: {
        title: t.leaderboardTitleMarathon,
        desc: t.eventsMarathonDesc,
    }
  };

  const details = eventDetails[eventType];
  
  const currentUserData = leaderboardData.find(p => p.name === user?.name);

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg mb-6">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-center text-lg mb-1">{details.title}</h3>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">{details.desc}</p>
        <div className="space-y-3">
          {leaderboardData.map((player) => {
            const isCurrentUser = player.name === user?.name;
            return (
              <div key={player.rank} className={`flex items-center p-3 rounded-lg transition-all duration-300 ${isCurrentUser ? 'bg-purple-100 dark:bg-purple-900/50 ring-2 ring-purple-500' : 'bg-gray-50 dark:bg-gray-800'}`}>
                <div className="w-10 text-center text-lg font-bold text-gray-700 dark:text-gray-300">
                  {player.rank <= 3 ? rankIcons[player.rank - 1] : player.rank}
                </div>
                <img src={player.picture} alt={player.name} className="w-12 h-12 rounded-full mx-3 border-2 border-white dark:border-gray-600" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">{player.name}</h4>
                </div>
                <div className="text-purple-600 dark:text-purple-300 font-bold text-lg">
                  ⭐ {player.points.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-4 text-white shadow-lg text-center">
        <h4 className="font-bold mb-2">{t.leaderboardYourRank}</h4>
        {currentUserData ? (
           <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-bold">#{currentUserData.rank}</span>
              <div>
                <p className="font-bold">{currentUserData.name}</p>
                <p className="text-sm">⭐ {currentUserData.points.toLocaleString()}</p>
              </div>
           </div>
        ) : (
            <p className="text-sm">{t.leaderboardNotInTop}</p>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;