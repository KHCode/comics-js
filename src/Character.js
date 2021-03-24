import React from 'react';
import styled from 'styled-components';

const NameTitle = styled.h1`
    font-size: 2rem;
    text-align: center;
    padding: 5px;
`;

const SearchResults = styled.div`
    border-radius: 2rem;
    box-shadow: blue 2rem 2rem;
    width: 50%;
    background: red;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
    display: flex;
    flex-direction: column;
    margin: 3rem;
`;

const CharacterAvatar = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 75px;
    align-self: center;
`;

const CharacterDesc = styled.p`
    padding: 3rem;
`;

export default function Character(props) {
    const badStateName = 'You still haven\'t gotten state to work';
    const noDescription = 'There doesn\'t seem to be any description for this character';

    return (
        <SearchResults>
                
            <NameTitle>{props.characterName ? props.characterName : badStateName}</NameTitle>
            <CharacterAvatar src={props.characterImgUrl} />
            <CharacterDesc>{`${props.characterDesc ? props.characterDesc : noDescription}`}</CharacterDesc>
                
        </SearchResults>

    );
}