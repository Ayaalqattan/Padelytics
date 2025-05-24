import { useState, useEffect } from 'react';

function CourtSelection({ selectedCourt, setSelectedCourt }) {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('home/api/courts');
        
        if (!response.ok) {
          throw new Error(`Error fetching courts: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API data:", data);
        setCourts(data.court_names);

;
      } catch (err) {
        console.error("Failed to fetch courts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading courts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <p>Failed to load courts: {error}</p>
        <button 
          className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md text-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
console.log('courts:', courts);
  return (
    <div className="grid grid-cols-2 gap-4">
      {courts.length === 0 ? (
        <p className="col-span-2 text-center text-gray-500">No courts available</p>
      ) : (
        

        courts.map((court) => (
          <button
            key={court.id}
            type="button"
            onClick={() => setSelectedCourt(court.id)}
            className={`
              py-3 px-4 
              border-2 rounded-lg 
              font-medium text-sm 
              transition-all duration-200
              ${selectedCourt === court.id 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 text-gray-700 hover:border-blue-300'}
            `}
          >
            {court.name}
          </button>
        ))
      )}
    </div>
  );
}

export default CourtSelection;