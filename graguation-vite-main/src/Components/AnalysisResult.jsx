// import React from 'react';
import React from 'react';

function AnalysisResult({ data }) {
  if (!data) {
    return <div>جارٍ تحميل البيانات...</div>;
  }

  return (
    <div className="analysis-result">
      <h3>Top 3 Strongest Hits</h3>
      <ul>
        {data.top_3_strongest_hits?.map((hit, idx) => (
          <li key={idx}>
            Player: {hit.player} — Speed: {hit.speed.toFixed(2)}
          </li>
        )) || <li>لا توجد بيانات متاحة</li>}
      </ul>

      <h3>Hit Count per Player</h3>
      <ul>
        {data.hit_count_per_player
          ? Object.entries(data.hit_count_per_player).map(([player, count]) => (
              <li key={player}>{player}: {count} hits</li>
            ))
          : <li>لا توجد بيانات متاحة</li>
        }
      </ul>

      <h3>Reaction Time Efficiency</h3>
      <ul>
        {data.reaction_time_efficiency
          ? Object.entries(data.reaction_time_efficiency).map(([player, time]) => (
              <li key={player}>{player}: {time.toFixed(2)} s</li>
            ))
          : <li>لا توجد بيانات متاحة</li>
        }
      </ul>
    </div>
  );
}

export default AnalysisResult;
