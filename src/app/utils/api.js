// api.js
export const fetchData = async (endpoint) => {
  try {
      const response = await fetch(`https://api.openf1.org/v1${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok.');
      const jsonContent = await response.json();
      return jsonContent;
  } catch (error) {
      console.error("Fetch Error: ", error);
      return [];
  }
};

export const dynamicBorderColor = (driverNumber) => {
  // Map of driver numbers to colors
  const colorMap = {
    44: '#419CFF', // Lewis Hamilton
    63: '#7BB9FD', // George Russell

    1: '#1B00FF', // Max Verstappen
    11: '#6387FF', // Sergio Perez

    55: '#FE7F7F', // Carlos Sainz
    16: '#FF0000', // Charles Leclerc
    
    4: '#FFAD21', // Lando Norris
    81: '#FFBF76', // Piastri

    31: '#FF84FB', // Esteban Ocon
    10: '#FE00F6', // Pierre Gasly

    14: '#00872B', // Fernando Alonso
    18: '#70E394', // Lance Stroll

    3: '#34546D', // Daniel Ricciardo
    22: '#56626B', // Yuki Tsunoda
    
    77: '#3F0412', // Valtteri Bottas
    24: '#3F0412', // Zhou
    
    20: '#FFD9D9', // Kevin Magnussen
    27: '#FBFAFA', // Hulkingberg 

    23: '#31FFFA', // Albon
    2: '#91FFFD', // Sargent

    21: '#31FFFA', //Debris
  };

  // Return the corresponding color or a default color if not found
  return colorMap[driverNumber] || '#CCCCCC'; // Default color
};


export const dynamicBackgroundColors = (teams) => {
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Object to cache colors for teams so the same team always gets the same color
  const teamColors = {};

  teams.forEach((team) => {
    // Assign a color if it hasn't been assigned yet
    if (!teamColors[team]) {
      teamColors[team] = getRandomColor();
    }
  });

  // Map the teams to their colors
  return teams.map(team => teamColors[team]);
};
