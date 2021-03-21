import React, { useState, useRef, useEffect } from 'react';

const CHARACTER_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_API_KEY}`;

export default function NameSearch() {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [charObject, setCharObject] = useState({});
    const characterNameRef = useRef();  
    function handleSearch(e){
        e.preventDefault();
        setName(characterNameRef.current.value);
        alert(name);
        characterNameRef.current.value = '';
    }
    useEffect(() => {
        if(name === '') return;
        fetch(`${CHARACTER_URL}&name=${name}`)
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setCharObject(result.data.results);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
    }, [name])

    return (
        <div>
            <input type="text" ref={characterNameRef} placeholder="enter character name"></input>
            <button type="submit" onClick={handleSearch}>Find Character</button>
            <div>{charObject.name}</div>
        </div>
        
    );
}