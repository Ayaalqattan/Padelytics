// // import React from 'react';
// import React from 'react';

// function AnalysisResult({ data }) {
//   if (!data) {
//     return <div>جارٍ تحميل البيانات...</div>;
//   }

//   return (
//     <div className="analysis-result">
//       <h3>Top 3 Strongest Hits</h3>
//       <ul>
//         {data.top_3_strongest_hits?.map((hit, idx) => (
//           <li key={idx}>
//             Player: {hit.player} — Speed: {hit.speed.toFixed(2)}
//           </li>
//         )) || <li>لا توجد بيانات متاحة</li>}
//       </ul>

//       <h3>Hit Count per Player</h3>
//       <ul>
//         {data.hit_count_per_player
//           ? Object.entries(data.hit_count_per_player).map(([player, count]) => (
//               <li key={player}>{player}: {count} hits</li>
//             ))
//           : <li>لا توجد بيانات متاحة</li>
//         }
//       </ul>

//       <h3>Reaction Time Efficiency</h3>
//       <ul>
//         {data.reaction_time_efficiency
//           ? Object.entries(data.reaction_time_efficiency).map(([player, time]) => (
//               <li key={player}>{player}: {time.toFixed(2)} s</li>
//             ))
//           : <li>لا توجد بيانات متاحة</li>
//         }
//       </ul>
//     </div>
//   );
// }

// export default AnalysisResult;

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight, Activity, Users } from 'lucide-react';
// REMOVE THIS LINE: import playerData from '../assets/player_analysis_fixed.json';
import './Test.css'; // Assuming your CSS is here

// Utility functions for safe data access
const safeGet = (obj, path, defaultValue = null) => {
  try {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

const safeArray = (arr) => Array.isArray(arr) ? arr : [];
const safeNumber = (num, defaultValue = 0) => {
  const parsed = typeof num === 'number' ? num : parseFloat(num);
  return isNaN(parsed) ? defaultValue : parsed;
};

// ====================================================================================
// NEW: Normalize coordinates with separate ranges for player and ball data
// IMPORTANT: Adjust min/max values below based on your actual data ranges!
// ====================================================================================
const NORM_RANGES = {
    // Example ranges for player coordinates (adjust as per your player data's actual min/max X and Y values)
    player: {
        x: { min: -5.0, max: 5.0 },
        y: { min: -10.0, max: 5.0 }
    },
    // Example ranges for ball coordinates (adjust as per your ball data's actual min/max X and Y values)
    ball: {
        x: { min: 200, max: 1800 }, // These values from your JSON seem like pixel-based coordinates
        y: { min: 100, max: 900 }   // These values from your JSON seem like pixel-based coordinates
    }
};

const normalizeCoord = (value, coordType, dataType) => {
    const numValue = safeNumber(value, 0);
    const rangeConfig = NORM_RANGES[dataType]?.[coordType];

    if (!rangeConfig) {
        console.warn(`Normalization range not configured for dataType: ${dataType}, coordType: ${coordType}`);
        return 50; // Default to center if config is missing
    }

    const { min, max } = rangeConfig;
    const range = max - min;

    if (range === 0) return 50; // Avoid division by zero
    // Ensure value is clamped within min/max before normalization
    const clampedValue = Math.max(min, Math.min(max, numValue));
    return Math.max(0, Math.min(100, ((clampedValue - min) / range) * 100));
};

// Simple Radar Chart component (unchanged)
const RadarChart = ({ data, width = 200, height = 200 }) => {
  const validData = safeArray(data).filter(item =>
    item && typeof item.A === 'number' && typeof item.fullMark === 'number'
  );

  if (validData.length === 0) {
    return <div className="no-data-message">No radar data available</div>;
  }

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;
  const angleStep = (2 * Math.PI) / validData.length;

  const points = validData.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const value = (safeNumber(item.A, 0) / safeNumber(item.fullMark, 100)) * radius;
    return {
      x: centerX + Math.cos(angle) * value,
      y: centerY + Math.sin(angle) * value,
      labelX: centerX + Math.cos(angle) * (radius + 15),
      labelY: centerY + Math.sin(angle) * (radius + 15),
      label: item.subject || `Metric ${index + 1}`
    };
  });

  const pathData = points.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <svg width={width} height={height}>
      {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
        <circle key={scale} cx={centerX} cy={centerY} r={radius * scale} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      ))}

      {validData.map((_, index) => {
        const angle = index * angleStep - Math.PI / 2;
        return (
          <line key={index}
            x1={centerX}
            y1={centerY}
            x2={centerX + Math.cos(angle) * radius}
            y2={centerY + Math.sin(angle) * radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
        );
      })}

      <path
        d={pathData}
        fill="rgba(0, 255, 136, 0.3)"
        stroke="#00ff88"
        strokeWidth="2"
      />

      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="#00ff88"
        />
      ))}

      {points.map((point, index) => (
        <text
          key={index}
          x={point.labelX}
          y={point.labelY}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
        >
          {point.label}
        </text>
      ))}
    </svg>
  );
};

// ====================================================================================
// MODIFIED: TennisMatchDashboard now accepts 'data' as a prop
// ====================================================================================
function TennisMatchDashboard({ data }) { // Renamed from 'playerData' to 'data' for consistency with AnalysisResult prop
  const [ballChartIndex, setBallChartIndex] = useState(0);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Use the 'data' prop directly
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="dashboard">
        <div className="no-data-message">
          <h2>No analysis data available to display.</h2>
          <p>Please upload a video and run the analysis to see results.</p>
        </div>
      </div>
    );
  }

  // Use the 'data' prop throughout the component
  const getPlayerIds = () => {
    const allPlayerIds = new Set();
    const sections = ['trajectories', 'heatmaps', 'ball_hit_locations', 'role',
                      'role_advice', 'reaction_time_efficiency', 'reaction_advice',
                      'shot_effectiveness', 'shot_advice', 'player_contribution',
                      'player_contribution_advice', 'stamina_drop_time', 'stamina_advice'];

    sections.forEach(section => {
        const sectionData = safeGet(data, section, {}); // Use 'data' prop
        if (typeof sectionData === 'object' && sectionData !== null) {
            Object.keys(sectionData).forEach(key => {
                if (section === 'zone_presence_percentages') {
                    const subData = sectionData[key];
                    if (typeof subData === 'object' && subData !== null) {
                        Object.keys(subData).forEach(playerKey => {
                            if (playerKey.startsWith('player')) {
                                allPlayerIds.add(playerKey);
                            }
                        });
                    }
                } else if (key.startsWith('player')) {
                    allPlayerIds.add(key);
                }
            });
        }
    });

    safeArray(safeGet(data, 'animation', [])).forEach(frame => { // Use 'data' prop
        if (typeof frame === 'object' && frame !== null) {
            Object.keys(frame).forEach(key => {
                if (key.startsWith('player')) {
                    allPlayerIds.add(key);
                }
                // Check for 'ball' key in animation frame for existence, no need to add to playerIds
            });
        }
    });

    return Array.from(allPlayerIds).sort();
  };

  const transformPlayerData = (playerId) => {
    const playerName = playerId.replace(/^player/i, 'Player ').replace(/player(\d+)/i, 'Player $1') || playerId;
    const getZonePercentage = (zone) => {
      const zoneData = safeGet(data, 'zone_presence_percentages', {}); // Use 'data' prop
      for (const [zoneKey, zonePlayersData] of Object.entries(zoneData)) {
        if (zoneKey.toLowerCase().includes(zone.toLowerCase()) && zonePlayersData && zonePlayersData[playerId] !== undefined) {
          return safeNumber(zonePlayersData[playerId]);
        }
      }
      return 0;
    };

    return {
      id: playerId,
      name: playerName,
      level: safeGet(data, `role.${playerId}`, "Unknown"), // Use 'data' prop
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(playerName)}&background=00ff88&color=000&size=100`,
      trajectories: {
        x: safeArray(safeGet(data, `trajectories.${playerId}.x`)), // Use 'data' prop
        y: safeArray(safeGet(data, `trajectories.${playerId}.y`))  // Use 'data' prop
      },
      heatmap: {
        x: safeArray(safeGet(data, `heatmaps.${playerId}.x`)), // Use 'data' prop
        y: safeArray(safeGet(data, `heatmaps.${playerId}.y`))  // Use 'data' prop
      },
      ballHits: {
        x: safeArray(safeGet(data, `ball_hit_locations.${playerId}.x`)), // Use 'data' prop
        y: safeArray(safeGet(data, `ball_hit_locations.${playerId}.y`))  // Use 'data' prop
      },
      positioningHeatmap: [
        { zone: 'attack', intensity: getZonePercentage('attack') },
        { zone: 'defense', intensity: getZonePercentage('defense') }
      ],
      stats: {
        distance: safeNumber(safeGet(data, `distance_total.${playerId}`)), // Use 'data' prop
        avgSpeed: safeNumber(safeGet(data, `average_speed.${playerId}`)),    // Use 'data' prop
        avgAcceleration: safeNumber(safeGet(data, `average_acceleration.${playerId}`)), // Use 'data' prop
        maxSpeed: safeNumber(safeGet(data, `max_speed.${playerId}`)),      // Use 'data' prop
        reactionEfficiency: safeNumber(safeGet(data, `reaction_time_efficiency.${playerId}`)), // Use 'data' prop
        shotEffectiveness: safeNumber(safeGet(data, `shot_effectiveness.${playerId}`)),    // Use 'data' prop
        contribution: safeNumber(safeGet(data, `player_contribution.${playerId}`)),      // Use 'data' prop
        staminaDrop: safeGet(data, `stamina_drop_time.${playerId}`),           // Use 'data' prop
        attackZone: getZonePercentage('attack'),
        defenseZone: getZonePercentage('defense'),
        hitCount: safeNumber(safeGet(data, `hit_count_per_player.${playerId}`)) // Use 'data' prop
      },
      advice: {
        role: safeGet(data, `role_advice.${playerId}`, "No advice available"), // Use 'data' prop
        reaction: safeGet(data, `reaction_advice.${playerId}`, "No advice available"), // Use 'data' prop
        shot: safeGet(data, `shot_advice.${playerId}`, "No advice available"),       // Use 'data' prop
        participation: safeGet(data, `player_contribution_advice.${playerId}`, "No advice available"), // Use 'data' prop
        stamina: safeGet(data, `stamina_advice.${playerId}`, "No advice available")  // Use 'data' prop
      }
    };
  };

  const playerIds = getPlayerIds();
  const players = playerIds.map(transformPlayerData);
  const currentPlayer = players[playerIndex] || {};

  useEffect(() => {
    const animationData = safeArray(safeGet(data, 'animation')); // Use 'data' prop
    if (animationData.length === 0) {
      setAnimationFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % animationData.length);
    }, 50); // Adjust interval as needed, currently 50ms for faster animation
    return () => clearInterval(interval);
  }, [data]); // Depend on 'data' prop, not local playerData

  const ballCharts = [
    {
      title: "Ball Hit Locations (All Players)",
      component: () => {
        const ballHitData = safeGet(data, 'ball_hit_locations', {}); // Use 'data' prop
        const hasData = Object.keys(ballHitData).some(playerId => {
          const hits = ballHitData[playerId];
          return hits && safeArray(hits.x).length > 0;
        });

        if (!hasData) {
          return <div className="no-data-message">No ball hit data available for any player.</div>;
        }

        return (
          <div className="court-visualization">
            <div className="court-grid">
              {Object.entries(ballHitData).map(([playerId, hits]) => {
                if (!hits) return null;
                const xCoords = safeArray(hits.x);
                const yCoords = safeArray(hits.y);

                return xCoords.map((x, i) => {
                  const y = yCoords[i];
                  if (x == null || y == null || isNaN(safeNumber(x)) || isNaN(safeNumber(y))) return null;
                  return (
                    <div
                      key={`<span class="math-inline">\{playerId\}\-</span>{i}`}
                      className="ball-hit-dot"
                      style={{
                        left: `${normalizeCoord(x, 'x', 'ball')}%`,
                        top: `${normalizeCoord(y, 'y', 'ball')}%`,
                        backgroundColor: (playerId.includes('1') || playerId.includes('2')) ? '#00ff88' : '#ffaa00'
                      }}
                    />
                  );
                });
              })}
            </div>
          </div>
        );
      }
    },
    {
      title: "Ball Trajectory",
      component: () => {
        const trajectory = safeGet(data, 'ball_trajectory', {}); // Use 'data' prop
        const xCoords = safeArray(trajectory.x);
        const yCoords = safeArray(trajectory.y);

        if (xCoords.length < 2 || yCoords.length < 2) {
          return <div className="no-data-message">No complete ball trajectory data available.</div>;
        }

        const validTrajectoryPoints = xCoords.map((x, i) => {
            const y = yCoords[i];
            if (x == null || y == null || isNaN(safeNumber(x)) || isNaN(safeNumber(y))) {
                return null;
            }
            return { x: normalizeCoord(x, 'x', 'ball'), y: normalizeCoord(y, 'y', 'ball') };
        }).filter(Boolean);

        if (validTrajectoryPoints.length < 2) {
            return <div className="no-data-message">Not enough valid points for ball trajectory.</div>;
        }

        const pathData = validTrajectoryPoints.map((point, i) =>
          `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        ).join(' ');

        return (
          <div className="court-visualization">
            <div className="court-grid">
              <svg className="trajectory-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d={pathData}
                  stroke="#00ff88"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        );
      }
    },
    {
      title: "Top Speeds",
      component: () => {
        const topHits = safeArray(safeGet(data, 'top_3_strongest_hits')); // Use 'data' prop

        if (topHits.length === 0) {
          return <div className="no-data-message">No top hit speed data available.</div>;
        }

        const transformedHits = topHits.map(hit => ({
            ...hit,
            speed: safeNumber(hit.speed)
        }));

        const maxSpeed = Math.max(...transformedHits.map(hit => hit.speed));

        return (
          <div className="top-speeds-container">
            {transformedHits.map((hit, index) => {
              const speed = hit.speed;
              const playerName = hit.player || `Player ${index + 1}`;
              const heightPercent = maxSpeed > 0 ? (speed / maxSpeed) * 100 : 0;

              return (
                <div key={index} className="speed-bar">
                  <div className="speed-info">
                    <span className="player-name">{playerName}</span>
                    <span className="speed-value">{speed.toFixed(1)} unit/s</span>
                  </div>
                  <div className="speed-rank">{index + 1}</div>
                  <div
                    className="speed-bar-fill"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              );
            })}
          </div>
        );
      }
    },
    {
      title: "Number of Ball Hits",
      component: () => {
        const hitCounts = safeGet(data, 'hit_count_per_player', {}); // Use 'data' prop

        if (Object.keys(hitCounts).length === 0) {
          return <div className="no-data-message">No hit count data available.</div>;
        }

        const chartData = Object.entries(hitCounts).map(([playerId, count]) => ({
          name: playerId.replace(/^player/i, 'P'),
          hits: safeNumber(count)
        }));

        return (
          <div className="hits-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Bar dataKey="hits" fill="#00ff88" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }
    }
  ];

  const getRadarData = () => {
    const metrics = safeArray(safeGet(data, 'radar_performance.metrics')); // Use 'data' prop
    const playerPerformance = safeGet(data, `radar_performance.players.${currentPlayer.id}`, {}); // Use 'data' prop

    return metrics.map(metric => ({
      subject: metric || 'Unknown',
      A: safeNumber(playerPerformance[metric]),
      fullMark: 100
    })).filter(item => item.subject && item.A !== null);
  };

  return (
    <div className="dashboard">
      {/* Match Results */}
      <div className="section match-results">
        <h2 className="section-title">Match Results</h2>
        <div className="teams-container">
          <div className="team">
            {players.slice(0, 2).map((player) => (
              <React.Fragment key={player.id}>
                <div className="player-circle">
                  <img src={player.image} alt={player.name} />
                </div>
                <span className="player-name">{player.name}</span>
              </React.Fragment>
            ))}
          </div>

          <span className="vs-text">VS</span>

          <div className="team">
            {players.slice(2, 4).map((player) => (
              <React.Fragment key={player.id}>
                <div className="player-circle">
                  <img src={player.image} alt={player.name} />
                </div>
                <span className="player-name">{player.name}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* About The Ball */}
      <div className="section about-ball">
        <div className="section-header">
          <Activity size={20} />
          <h2 className="section-title">About The Ball</h2>
          <div className="ball-indicator" />
        </div>

        <div className="swiper-container">
          <button
            className="swiper-arrow left"
            onClick={() => setBallChartIndex(prev => prev === 0 ? ballCharts.length - 1 : prev - 1)}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="chart-content">
            <h3 className="chart-title">{ballCharts[ballChartIndex]?.title}</h3>
            {ballCharts[ballChartIndex]?.component()}
          </div>

          <button
            className="swiper-arrow right"
            onClick={() => setBallChartIndex(prev => (prev + 1) % ballCharts.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Match Animation */}
      <div className="section match-animation">
        <h2 className="section-title">Match Animation</h2>
        <div className="court-visualization">
          <div className="court-grid">
            {(() => {
              const animationData = safeArray(safeGet(data, 'animation')); // Use 'data' prop
              const currentFrame = animationData[animationFrame];

              if (!currentFrame) {
                return <div className="no-data-message">No animation data available for current frame.</div>;
              }

              const validPositions = Object.entries(currentFrame).filter(([, position]) =>
                position && typeof position.x === 'number' && typeof position.y === 'number'
              );

              return validPositions.map(([key, position]) => {
                if (key === 'ball') {
                  return (
                    <div
                      key={key}
                      className="animated-ball"
                      style={{
                        left: `${normalizeCoord(position.x, 'x', 'ball')}%`,
                        top: `${normalizeCoord(position.y, 'y', 'ball')}%`
                      }}
                    />
                  );
                } else if (key.startsWith('player')) {
                  const playerInfo = players.find(p => p.id === key);
                  return (
                    <div
                      key={key}
                      className="animated-player"
                      style={{
                        left: `${normalizeCoord(position.x, 'x', 'player')}%`,
                        top: `${normalizeCoord(position.y, 'y', 'player')}%`
                      }}
                    >
                      <div className="player-dot" />
                      <span className="player-label">{playerInfo?.name || key}</span>
                    </div>
                  );
                }
                return null;
              });
            })()}
          </div>
        </div>
      </div>

      {/* Player Analysis */}
      <div className="section player-analysis">
        <div className="section-header">
          <Users size={20} />
          <h2 className="section-title">Player Analysis</h2>
        </div>

        <div className="player-swiper">
          <button
            className="player-nav left"
            onClick={() => setPlayerIndex(prev => prev === 0 ? players.length - 1 : prev - 1)}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="player-content">
            {playerIds.length === 0 ? (
              <div className="no-data-message">No player data to display.</div>
            ) : (
              <>
                <div className="player-header">
                  <div className="player-avatar">
                    <img src={currentPlayer.image} alt={currentPlayer.name} />
                  </div>
                  <div className="player-info">
                    <h3 className="player-name-large">{currentPlayer.name}</h3>
                    <span className="player-level">{currentPlayer.level}</span>
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">Max Speed</span>
                    <span className="stat-value">{currentPlayer.stats?.maxSpeed?.toFixed(2) || 'N/A'} m/s</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Avg Acceleration</span>
                    <span className="stat-value">{currentPlayer.stats?.avgAcceleration?.toFixed(2) || 'N/A'} m/s²</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Distance</span>
                    <span className="stat-value">{currentPlayer.stats?.distance?.toFixed(2) || 'N/A'} m</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Total Hits</span>
                    <span className="stat-value">{currentPlayer.stats?.hitCount || 'N/A'}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Attack Zone %</span>
                    <span className="stat-value">{currentPlayer.stats?.attackZone?.toFixed(2) || 'N/A'}%</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Defense Zone %</span>
                    <span className="stat-value">{currentPlayer.stats?.defenseZone?.toFixed(2) || 'N/A'}%</span>
                  </div>
                </div>

                <div className="insights">
                  <div className="insight-item">
                    <span className="insight-label">Reaction Time Efficiency</span>
                    <span className="insight-value">
                      {currentPlayer.stats?.reactionEfficiency !== undefined ?
                        `${currentPlayer.stats.reactionEfficiency.toFixed(2)}%` : 'N/A'}
                    </span>
                    <span className="insight-advice">— {currentPlayer.advice?.reaction}</span>
                  </div>

                  <div className="insight-item">
                    <span className="insight-label">Shot Effectiveness</span>
                    <span className="insight-value">
                      {currentPlayer.stats?.shotEffectiveness !== undefined ?
                        `${currentPlayer.stats.shotEffectiveness.toFixed(2)}%` : 'N/A'}
                    </span>
                    <span className="insight-advice">— {currentPlayer.advice?.shot}</span>
                  </div>

                  <div className="insight-item">
                    <span className="insight-label">Role Detection</span>
                    <span className="insight-value">{currentPlayer.level}</span>
                    <span className="insight-advice">— {currentPlayer.advice?.role}</span>
                  </div>

                  <div className="insight-item">
                    <span className="insight-label">Team Imbalance (Hit Share)</span>
                    <span className="insight-value">
                      {currentPlayer.stats?.contribution !== undefined ?
                        `${currentPlayer.stats.contribution.toFixed(2)}%` : 'N/A'}
                    </span>
                    <span className="insight-advice">— {currentPlayer.advice?.participation}</span>
                  </div>

                  <div className="insight-item">
                    <span className="insight-label">Fatigue Detection Over Time</span>
                    <span className="insight-value">
                      {currentPlayer.stats?.staminaDrop === null ? "No drop" :
                        currentPlayer.stats?.staminaDrop ? `${currentPlayer.stats.staminaDrop} min` : "Unknown"}
                    </span>
                    <span className="insight-advice">— {currentPlayer.advice?.stamina}</span>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="charts-grid">
                  <div className="chart-container">
                    <h4>Player Trajectory</h4>
                    <div className="mini-court">
                      <div className="court-grid">
                        {/* Player Trajectory: Use 'player' dataType for player coordinates */}
                        {currentPlayer.trajectories?.x?.map((x, i) => {
                          const y = currentPlayer.trajectories.y[i];
                          if (x == null || y == null || isNaN(safeNumber(x)) || isNaN(safeNumber(y))) return null;
                          return (
                            <div
                              key={i}
                              className="trajectory-point"
                              style={{
                                left: `${normalizeCoord(x, 'x', 'player')}%`,
                                top: `${normalizeCoord(y, 'y', 'player')}%`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="chart-container">
                    <h4>Positioning Heatmap</h4>
                    <div className="mini-court">
                      <div className="court-grid">
                        {/* Positioning Heatmap: Use 'player' dataType for player coordinates */}
                        {currentPlayer.heatmap?.x?.map((x, i) => {
                          const y = currentPlayer.heatmap.y[i];
                          if (x == null || y == null || isNaN(safeNumber(x)) || isNaN(safeNumber(y))) return null;
                          return (
                            <div
                              key={i}
                              className="heatmap-point"
                              style={{
                                left: `${normalizeCoord(x, 'x', 'player')}%`,
                                top: `${normalizeCoord(y, 'y', 'player')}%`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="chart-container">
                    <h4>Hit Points</h4>
                    <div className="mini-court">
                      <div className="court-grid">
                        {/* Hit Points: Use 'ball' dataType for ball hit coordinates */}
                        {currentPlayer.ballHits?.x?.map((x, i) => {
                          const y = currentPlayer.ballHits.y[i];
                          if (x == null || y == null || isNaN(safeNumber(x)) || isNaN(safeNumber(y))) return null;
                          return (
                            <div
                              key={i}
                              className="hit-point"
                              style={{
                                left: `${normalizeCoord(x, 'x', 'ball')}%`,
                                top: `${normalizeCoord(y, 'y', 'ball')}%`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="chart-container">
                    <h4>Attack vs Defence</h4>
                    <div className="zone-chart">
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={(() => {
                          const attackValue = currentPlayer.stats?.attackZone || 0;
                          const defenseValue = currentPlayer.stats?.defenseZone || 0;

                          const totalPoints = 20;
                          const dataPoints = [];

                          for (let i = 0; i <= totalPoints; i++) {
                            const progress = i / totalPoints;
                            let value;

                            if (progress <= 0.3) {
                              value = attackValue * (0.3 + progress * 0.7);
                            } else if (progress <= 0.7) {
                              const peakVariation = Math.sin((progress - 0.3) * Math.PI * 3) * 0.1;
                              value = attackValue * (0.8 + 0.2 + peakVariation);
                            } else {
                              const decline = (progress - 0.7) / 0.3;
                              value = attackValue * (1 - decline * 0.6) + defenseValue * decline * 0.8;
                            }

                            dataPoints.push({
                              x: i,
                              value: Math.max(0, value)
                            });
                          }

                          return dataPoints;
                        })()}>
                          <XAxis dataKey="x" hide />
                          <YAxis hide />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#ff6b35"
                            strokeWidth={3}
                            dot={false}
                            strokeLinecap="round"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="chart-container">
                    <h4>Radar Performance</h4>
                    <div className="radar-chart-container">
                      <RadarChart data={getRadarData()} width={200} height={200} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            className="player-nav right"
            onClick={() => setPlayerIndex(prev => (prev + 1) % players.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TennisMatchDashboard;