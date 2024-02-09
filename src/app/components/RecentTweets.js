// components/RecentTweets.js or a similar file

import React, { useEffect, useState } from 'react';

const RecentTweets = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch('/api/getRecentTweets');
      if (response.ok) {
        const data = await response.json();
        setTweets(data.tweets);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h2>Recent Tweets</h2>
      {tweets.map(tweet => (
        <div key={tweet.id}>
          <p>{tweet.text}</p>
          <small>By: {tweet.author_id}</small>
        </div>
      ))}
    </div>
  );
};

export default RecentTweets;