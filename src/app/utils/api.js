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
    44: '#00D2BE', // Lewis Hamilton
    1: '#1E41FF', // Max Verstappen
    55: '#FF8700', // Carlos Sainz
    11: '#0600EF', // Sergio Perez
    63: '#0090FF', // George Russell
    16: '#FF0000', // Charles Leclerc
    4: '#FFF500', // Lando Norris
    31: '#F0D787', // Esteban Ocon
    14: '#FF8700', // Fernando Alonso
    3: '#C4C4C4', // Daniel Ricciardo
    18: '#00BFFF', // Lance Stroll
    5: '#FFFFFF', // Sebastian Vettel
    47: '#FF00FF', // Mick Schumacher
    10: '#00FF00', // Pierre Gasly
    22: '#007F00', // Yuki Tsunoda
    77: '#0000FF', // Valtteri Bottas
    99: '#9B0000', // Antonio Giovinazzi
    6: '#000000', // Nicholas Latifi
    20: '#FF69B4', // Kevin Magnussen
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


export default async function handler(req, res) {
  // Your Twitter API bearer token
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  const usernames = "f1trollofficial,F1,FDataAnalysis"; // Twitter usernames separated by commas

  const url = `https://api.twitter.com/2/tweets/search/recent?query=from:${usernames}&max_results=10&expansions=author_id`;

  try {
    const twitterResponse = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${bearerToken}`,
        "User-Agent": "v2RecentSearchJS",
      },
    });

    if (!twitterResponse.ok) {
      throw new Error('Failed to fetch tweets');
    }

    const data = await twitterResponse.json();
    const tweets = data.data.filter((tweet, index, self) => 
      self.findIndex(t => t.author_id === tweet.author_id) === index);

    res.status(200).json({ tweets });
  } catch (error) {
    console.error("There was an error fetching tweets:", error);
    res.status(500).json({ error: "Error fetching tweets" });
  }
}
