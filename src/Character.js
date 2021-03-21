import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CHARACTER_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_API_KEY}`;

const SmallImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100px;
`;

const FlexList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
`;

const FlexCardCol = styled.li`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const NameTitle = styled.h1`
    font-size: 2rem;
    text-align: center;
    padding: 5px;
`;

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
          <FlexList>
            {items.map(item => {
                const imgSrc = `${item.thumbnail.path}.${item.thumbnail.extension}`;
                return <FlexCardCol key={item.id}>
                    <NameTitle>{item.name}</NameTitle>
                    <SmallImage src={imgSrc} alt={`${item.name}`} />
                </FlexCardCol>
            })}
          </FlexList>

      );
    }
  }