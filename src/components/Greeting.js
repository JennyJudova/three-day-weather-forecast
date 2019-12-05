import React, { useState, useEffect } from 'react';

export default function Greeting() {
  const [greeting, setGreeting] = useState('Hello');

  function getGreeting() {
    const today = new Date();
    const currentTime = today.getHours();

    let greetingYou = '';

    if (currentTime >= 6 && currentTime < 12) {
      greetingYou = 'Good Morning';
    } else if (currentTime >= 12 && currentTime < 18) {
      greetingYou = 'Good Afternoon';
    } else if (currentTime >= 18) {
      greetingYou = 'Good Evening';
    } else greetingYou = 'Good Night ';

    setGreeting(greetingYou);
    console.log('greeting', currentTime);
  }

  useEffect(() => {
    getGreeting();
  }, []);

  return (
    <div>
      <h3>{greeting}, where do you want to know the weather?</h3>
    </div>
  );
}
