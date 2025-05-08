import { useState } from 'react';

function PlayerManagement({ players, setPlayers }) {
  const [playerName, setPlayerName] = useState('');
  
  const handleAddPlayer = (e) => {
    // Prevent default behavior if it's a button click
    if (e) {
      e.preventDefault();
    }
    
    // Trim the player name and check if it's not empty
    const trimmedName = playerName.trim();
    
    if (trimmedName) {
      // Create a new player object with a unique id
      const newPlayer = {
        id: Date.now(),
        name: trimmedName
      };
      
      // Add the new player to the list
      setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
      
      // Reset the input field
      setPlayerName('');
    } else {
      // Alert if name is empty
      alert('Please enter a player name');
    }
  };
  
  const handleRemovePlayer = (id) => {
    // Filter out the player with the matching id
    setPlayers(prevPlayers => 
      prevPlayers.filter(player => player.id !== id)
    );
  };

  const handleKeyPress = (e) => {
    // Add player when Enter key is pressed
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleAddPlayer();
    }
  };
  
  return (
    <div className="player-management">
      <div className="player-list">
        {players.length === 0 ? (
          <p>No players added</p>
        ) : (
          players.map((player) => (
            <div className="player-item" key={player.id}>
              <span>{player.name}</span>
              <button 
                className="remove-player"
                onClick={() => handleRemovePlayer(player.id)}
                type="button"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="add-player-container">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter player name"
        />
        <button 
          type="button"
          onClick={handleAddPlayer}
        >
          Add Player
        </button>
      </div>
    </div>
  );
}

export default PlayerManagement;