import React, { useState, useEffect } from 'react';

const CHARACTER_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_API_KEY}`;

export default function Character() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetch(CHARACTER_URL)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data.results);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
        
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <ul>
            {items.map(item => {
                const imgSrc = `${item.thumbnail.path}.${item.thumbnail.extension}`;
                return <li key={item.id}>{item.name}<img src={imgSrc} alt={`${item.name}`}></img></li>
            })}
          </ul>

      );
    }
  }