import React from 'react';

function AnalysisResult({ data }) {
  return (
    <div className="analysis-result">
      <h3>Top 3 Strongest Hits</h3>
      <ul>
        {data.top_3_strongest_hits.map((hit, idx) => (
          <li key={idx}>
            Player: {hit.player} — Speed: {hit.speed.toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Hit Count per Player</h3>
      <ul>
        {Object.entries(data.hit_count_per_player).map(([player, count]) => (
          <li key={player}>{player}: {count} hits</li>
        ))}
      </ul>

      <h3>Reaction Time Efficiency</h3>
      <ul>
        {Object.entries(data.reaction_time_efficiency).map(([player, time]) => (
          <li key={player}>{player}: {time.toFixed(2)} s</li>
        ))}
      </ul>

      {/* Add more fields as needed */}
    </div>
  );
}

export default AnalysisResult;
