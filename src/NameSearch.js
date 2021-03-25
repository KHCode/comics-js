import React from 'react';
import styled from 'styled-components';

const CharacterForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 3rem;
    padding: 2rem;
    font: 'Roboto';
    font-size: 2rem;
    color: white;
    width: 40%;
    height: 60rem;
    background: purple;
    border-radius: 2rem;
`;

const TextInput = styled.input`
    line-height: 1rem;
    margin-left: 1rem;
    border-radius: 1rem;
    padding: 1rem;
    width: 30rem;
`;

const TextFieldInputSection = styled.section`
    display: flex;
    align-items: center;
`;

const FlexInputLabel = styled.label`
    display: block;
`;

const SearchOptionsSection = styled.section`
    ${'' /* flex: 1; */}
    background: goldenrod;
    margin: 2rem 0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40rem;
    border-radius: 2rem;
`;

const RadioInputsGroup = styled.div`
    display: flex;
    justify-content: center;
`;

const RadioInputUnit = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid purple;
    border-radius: 1rem;
    text-align: center;
    width: 35%;
    font-size: 1.5rem;
`;

const RadioInput = styled.input`
    
`;

const TopHeader = styled.h1`
    margin-bottom: 1rem;
`;

const SubHeader = styled.h2`
    margin-bottom: 1rem;
`;

const Explainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    justify: justified;
    font-size: 1.6rem;
    letter-spacing: 0.1rem;
`;

const Blurb = styled.p`
    display: inline-block;
    padding-bottom: 2rem;
`;

const SubmitButton = styled.input`
    padding: 0.5rem;
    width: 10rem;
    border-radius: 1rem;
`;

const NoResultsMessage = (props) => {
    if (props.isEmpty) {
      return <p>Oops, no character that matches that name</p>
    }
    return <></>;
  }

export default function NameSearch (props) {
    return (
        <CharacterForm className="character-search" onSubmit={props.handleSubmit(props.onSubmit)}>
            <TopHeader>Find a Character</TopHeader>
            <TextFieldInputSection>
                <FlexInputLabel htmlFor="searchName">Name:</FlexInputLabel> 
                <TextInput id="searchName" type="text" name="searchName" placeholder="enter character name" ref={props.register} />
            </TextFieldInputSection>
            <NoResultsMessage isEmpty={props.isEmpty} />
            <SearchOptionsSection>
                <SubHeader>Search Options</SubHeader>
                <RadioInputsGroup>
                    <RadioInputUnit htmlFor="exactName">Search for an exact match to your search term(s)
                        <RadioInput id="exactName" type="radio" name="queryTerms" value="exactName" checked={props.searchType === 'exactName'} onChange={props.onChange} ref={props.register} />
                    </RadioInputUnit>

                    <RadioInputUnit htmlFor="nameStartsWith">Search for matches that start with your search term(s)
                        <RadioInput id="nameStartsWith" type="radio" name="queryTerms" value="nameStartsWith" checked={props.searchType === 'nameStartsWith'} onChange={props.onChange} ref={props.register} />
                    </RadioInputUnit>
                </RadioInputsGroup>
                <Explainer>
                    <Blurb>By default, your search will look for exact matches. However, sometimes the way Marvel spells a character's name in their API isn't obvious, or sometimes a character's name has a parenthetical to denote a version of that character. In this case, you can search for a character that starts with your search term instead.</Blurb>
                    <Blurb>Also note, if you search for a name that starts with some characters, you might get a list.</Blurb>
                </Explainer>
            </SearchOptionsSection>

            <SubmitButton type="submit" />
        </CharacterForm>
        
    );
}