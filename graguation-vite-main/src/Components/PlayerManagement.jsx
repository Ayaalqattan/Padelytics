// // import { useState } from 'react';

// // function PlayerManagement({ players, setPlayers }) {
// //   const [playerName, setPlayerName] = useState('');
  
// //   const handleAddPlayer = (e) => {
// //     // Prevent default behavior if it's a button click
// //     if (e) {
// //       e.preventDefault();
// //     }
    
// //     // Trim the player name and check if it's not empty
// //     const trimmedName = playerName.trim();
    
// //     if (trimmedName) {
// //       // Create a new player object with a unique id
// //       const newPlayer = {
// //         id: Date.now(),
// //         name: trimmedName
// //       };
      
// //       // Add the new player to the list
// //       setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
      
// //       // Reset the input field
// //       setPlayerName('');
// //     } else {
// //       // Alert if name is empty
// //       alert('Please enter a player name');
// //     }
// //   };
  
// //   const handleRemovePlayer = (id) => {
// //     // Filter out the player with the matching id
// //     setPlayers(prevPlayers => 
// //       prevPlayers.filter(player => player.id !== id)
// //     );
// //   };

// //   const handleKeyPress = (e) => {
// //     // Add player when Enter key is pressed
// //     if (e.key === 'Enter') {
// //       e.preventDefault(); // Prevent form submission
// //       handleAddPlayer();
// //     }
// //   };
  
// //   return (
// //     <div className="player-management">
// //       <div className="player-list">
// //         {players.length === 0 ? (
// //           <p>No players added</p>
// //         ) : (
// //           players.map((player) => (
// //             <div className="player-item" key={player.id}>
// //               <span>{player.name}</span>
// //               <button 
// //                 className="remove-player"
// //                 onClick={() => handleRemovePlayer(player.id)}
// //                 type="button"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           ))
// //         )}
// //       </div>
      
// //       <div className="add-player-container">
// //         <input
// //           type="text"
// //           value={playerName}
// //           onChange={(e) => setPlayerName(e.target.value)}
// //           onKeyPress={handleKeyPress}
// //           placeholder="Enter player name"
// //         />
// //         <button 
// //           type="button"
// //           onClick={handleAddPlayer}
// //         >
// //           Add Player
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default PlayerManagement;

// import React, { useState } from 'react';
// import './PlayerManagement.css';

// function CourtLayout({ players }) {
//   const [courtPositions, setCourtPositions] = useState({
//     topLeft: null,
//     topRight: null,
//     bottomLeft: null,
//     bottomRight: null
//   });
  
//   const [showPlayerSelector, setShowPlayerSelector] = useState(null);
  
//   // Handle assigning a player to a position
//   const handleAssignPlayer = (position, player) => {
//     setCourtPositions(prev => ({
//       ...prev,
//       [position]: player
//     }));
//     setShowPlayerSelector(null);
//   };
  
//   // Handle removing a player from a position
//   const handleRemovePlayer = (position) => {
//     setCourtPositions(prev => ({
//       ...prev,
//       [position]: null
//     }));
//   };
  
//   // Component for player selector popup
//   const PlayerSelector = ({ position, onSelect, onClose }) => {
//     const availablePlayers = players.filter(player => 
//       !Object.values(courtPositions).some(pos => pos && pos.id === player.id)
//     );
    
//     return (
//       <div className="player-selector">
//         <div className="player-selector-content">
//           <h3>Select Player</h3>
//           {availablePlayers.length === 0 ? (
//             <p>No available players. Add players first.</p>
//           ) : (
//             <ul>
//               {availablePlayers.map(player => (
//                 <li key={player.id} onClick={() => onSelect(position, player)}>
//                   {player.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//           <button className="close-selector" onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     );
//   };
  
//   // Render a position on the court
//   const renderPosition = (position) => {
//     const player = courtPositions[position];
    
//     return (
//       <div className={`court-position ${position}`}>
//         {player ? (
//           <div className="assigned-player">
//             <img 
//               src={player.profilePicture || "https://via.placeholder.com/40"} 
//               alt={player.name} 
//               className="player-avatar" 
//             />
//             <span className="player-name">{player.name}</span>
//             <button 
//               className="remove-player-btn" 
//               onClick={() => handleRemovePlayer(position)}
//             >
//               ×
//             </button>
//           </div>
//         ) : (
//           <button 
//             className="add-player-btn" 
//             onClick={() => setShowPlayerSelector(position)}
//           >
//             +
//           </button>
//         )}
//       </div>
//     );
//   };
  
//   return (
//     <div className="court-layout">
//       <div className="court">
//         <div className="top-row">
//           {renderPosition('topLeft')}
//           {renderPosition('topRight')}
//         </div>
//         <div className="bottom-row">
//           {renderPosition('bottomLeft')}
//           {renderPosition('bottomRight')}
//         </div>
//       </div>
      
//       {showPlayerSelector && (
//         <PlayerSelector 
//           position={showPlayerSelector}
//           onSelect={handleAssignPlayer}
//           onClose={() => setShowPlayerSelector(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default CourtLayout;

import React, { useState } from 'react';
import './PlayerManagement.css';

function CourtLayout({ players }) {
  const [courtPositions, setCourtPositions] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  });
  
  const [showPlayerSelector, setShowPlayerSelector] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Handle assigning a player to a position
  const handleAssignPlayer = (position, player) => {
    setCourtPositions(prev => ({
      ...prev,
      [position]: player
    }));
    setShowPlayerSelector(null);
  };
  
  // Handle removing a player from a position
  const handleRemovePlayer = (position) => {
    setCourtPositions(prev => ({
      ...prev,
      [position]: null
    }));
  };
  
  // Component for player selector popup
  const PlayerSelector = ({ position, onSelect, onClose }) => {
    const availablePlayers = players.filter(player => 
      !Object.values(courtPositions).some(pos => pos && pos.id === player.id)
    );
    
    return (
      <div className="player-selector">
        <div className="player-selector-content">
          <h3>Select Player for Position {position}</h3>
          {availablePlayers.length === 0 ? (
            <p>No available players. Add players first.</p>
          ) : (
            <ul>
              {availablePlayers.map(player => (
                <li key={player.id} onClick={() => onSelect(position, player)}>
                  {player.name}
                </li>
              ))}
            </ul>
          )}
          <button className="close-selector" onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };
  
  // Render a position on the court
  const renderPosition = (position) => {
    const player = courtPositions[position];
    const isTopRow = position === 1 || position === 2;
    
    return (
      <div className={`court-position position-${position} ${isTopRow ? 'top-position' : 'bottom-position'}`}>
        <div className="position-circle">
          <span className="position-number">{position}</span>
        </div>
        {player && (
          <div className="assigned-player">
            <img 
              src={player.profilePicture || "https://via.placeholder.com/40"} 
              alt={player.name} 
              className="player-avatar" 
            />
            <span className="player-name">{player.name}</span>
            <button 
              className="remove-player-btn" 
              onClick={() => handleRemovePlayer(position)}
            >
              ×
            </button>
          </div>
        )}
        {!player && (
          <button 
            className="add-player-btn" 
            onClick={() => setShowPlayerSelector(position)}
          >
            +
          </button>
        )}
      </div>
    );
  };
  
  return (
    <div className="court-layout">
      <div className="help-section">
        <div 
          className="info-icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ℹ️
        </div>
        {showTooltip && (
          <div className="tooltip">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMkE1NEE5Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxMDAiIHkxPSIyMCIgeDI9IjEwMCIgeTI9IjEwMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIyMCIgeTE9IjYwIiB4Mj0iMTgwIiB5Mj0iNjAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSI2MCIgY3k9IjQwIiByPSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkY2NjY2IiBzdHJva2Utd2lkdGg9IjMiLz4KPHN0eWxlPi50ZXh0e2ZvbnQtZmFtaWx5OkFyaWFsLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtmaWxsOndoaXRlO308L3N0eWxlPgo8dGV4dCB4PSI1NiIgeT0iNDUiIGNsYXNzPSJ0ZXh0Ij4xPC90ZXh0Pgo8Y2lyY2xlIGN4PSIxNDAiIGN5PSI0MCIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGNjY2NiIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjx0ZXh0IHg9IjEzNiIgeT0iNDUiIGNsYXNzPSJ0ZXh0Ij4yPC90ZXh0Pgo8Y2lyY2xlIGN4PSI2MCIgY3k9IjgwIiByPSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjZGRjY2IiBzdHJva2Utd2lkdGg9IjMiLz4KPHN0eWxlPi50ZXh0LWdyZWVue2ZvbnQtZmFtaWx5OkFyaWFsLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtmaWxsOiM2NkZGNjY7fTwvc3R5bGU+Cjx0ZXh0IHg9IjU2IiB5PSI4NSIgY2xhc3M9InRleHQiPjM8L3RleHQ+CjxjaXJjbGUgY3g9IjE0MCIgY3k9IjgwIiByPSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjZGRjY2IiBzdHJva2Utd2lkdGg9IjMiLz4KPHRleHQgeD0iMTM2IiB5PSI4NSIgY2xhc3M9InRleHQiPjQ8L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSIxMzAiIGNsYXNzPSJ0ZXh0IiBmb250LXNpemU9IjEwIj5Ib3cgdG8gYXNzaWduPC90ZXh0Pgo8L3N2Zz4=" 
              alt="Court Layout Guide" 
              className="tooltip-image"/>
          </div>
        )}
      </div>
      
      <div className="court">
        <div className="court-net"></div>
        <div className="top-row">
          {renderPosition(1)}
          {renderPosition(2)}
        </div>
        <div className="bottom-row">
          {renderPosition(3)}
          {renderPosition(4)}
        </div>
      </div>
      
      {showPlayerSelector && (
        <PlayerSelector 
          position={showPlayerSelector}
          onSelect={handleAssignPlayer}
          onClose={() => setShowPlayerSelector(null)}
        />
      )}
      

    </div>
  );
}

export default CourtLayout;