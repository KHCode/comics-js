import React from 'react';
import styled from 'styled-components';

const CharacterForm = styled.form`
    margin: 3rem;
    font: 'Roboto';

`;

export default function NameSearch (props) {
    return (
        <CharacterForm className="character-search" onSubmit={props.handleSubmit(props.onSubmit)}>
            <h1>Find a Character</h1>

            <label>Name:</label>
            <input type="text" name="characterName" placeholder="enter character name" ref={props.register} />
            <input type="submit" />
        </CharacterForm>
        
    );
}