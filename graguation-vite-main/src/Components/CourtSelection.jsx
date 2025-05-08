function CourtSelection({ selectedCourt, setSelectedCourt }) {
    const courts = [
      { id: 'padel yard', name: 'Padel Yard Kafr El Sheikh' },
      { id: 'Padel Planet', name: 'Padel Planet Kafr El Sheikh' },
      { id: 'JOo Academy', name: 'JOo Academy Kafr El Sheikh' },
      { id: 'City Padel', name: 'City Padel Desouk' }
    ];
  
    return (
      <div className="grid grid-cols-2 gap-4">
        {courts.map((court) => (
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
        ))}
      </div>
    );
  }
  
  export default CourtSelection;