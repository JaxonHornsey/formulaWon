// api.js
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`https://api.openf1.org/v1${endpoint}`);
    if (!response.ok) throw new Error("Network response was not ok.");
    const jsonContent = await response.json();
    return jsonContent;
  } catch (error) {
    console.error("Fetch Error: ", error);
    return [];
  }
};

export function dynamicColorForCompound(compound) {
  switch (compound.toLowerCase()) {
    case "soft":
      return "#FF0000"; // Red for soft
    case "medium":
      return "#FFFF00"; // Yellow for medium
    case "hard":
      return "#FFFFFF"; // White for hard
    case "intermediate":
      return "#00FF00"; // Green for intermediate
    case "wet":
      return "#0000FF"; // Blue for wet
    default:
      return "#CCCCCC"; // Grey for unknown compounds
  }
}

export const dynamicBorderColor = (driverNumber) => {
  // Map of driver numbers to colors
  const colorMap = {
    44: "#1e6589", // Lewis Hamilton
    63: "#7cbfe2", // George Russell

    1: "#5e00e3", // Max Verstappen
    11: "#ae74ff", // Sergio Perez

    55: "#ff598c", // Carlos Sainz
    16: "#c1003b", // Charles Leclerc

    4: "#dc5600", // Lando Norris
    81: "#ff9e5f", // Piastri

    31: "#bc0fa8", // Esteban Ocon
    10: "#f36ee3", // Pierre Gasly

    14: "#39816e", // Fernando Alonso
    18: "#86cab8", // Lance Stroll

    3: "#6e7e6c", // Daniel Ricciardo
    22: "#aeb8ad", // Yuki Tsunoda

    77: "#96375c", // Valtteri Bottas
    24: "#cc7295", // Zhou

    20: "#a4ad52", // Kevin Magnussen
    27: "#ccd19f", // Hulkingberg

    23: "#137bff", // Albon
    2: "#a0caff", // Sargent

    21: "#877d78", //Debris
  };

  // Return the corresponding color or a default color if not found
  return colorMap[driverNumber] || "#CCCCCC"; // Default color
};

export const dynamicBackgroundColors = (teams) => {
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
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
  return teams.map((team) => teamColors[team]);
};
