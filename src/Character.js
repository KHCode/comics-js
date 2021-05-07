import React from 'react';
import styled from 'styled-components';

const NameTitle = styled.h1`
    text-align: center;
    padding: 5px;
`;

const SearchResults = styled.div`
    border-radius: 2rem;
    width: 80%;
    height: auto;
    background: red;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 3rem 2rem 3rem;
`;

const CharacterAvatar = styled.img`
    height: 75px;
    width: 75px;
    border-radius: 75px;
`;

const CharacterDesc = styled.p`
    padding: 3rem;
`;

const CharacterHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.5rem;
    width: 80%;
    padding-right: 2rem;
`;

export default function Character(props) {
    const badStateName = 'You still haven\'t gotten state to work';
    const noDescription = 'There doesn\'t seem to be any description for this character';

    return (
        <SearchResults>
            <CharacterHeader>
                <CharacterAvatar src={props.characterImgUrl} />
                <NameTitle>{props.characterName ? props.characterName : badStateName}</NameTitle>
            </CharacterHeader>   
            <CharacterDesc>{`${props.characterDesc ? props.characterDesc : noDescription}`}</CharacterDesc>
                
        </SearchResults>

    );
}