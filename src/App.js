import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Character from './Character';
import NameSearch from './NameSearch';


const CHARACTER_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_API_KEY}`;

const Layout = styled.main`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

function App() {
  const { register, handleSubmit } = useForm();//form handlers, from react-hook-form
  const [ characterName, setCharacterName ] = useState('spider-man');//set after user clicks submit
  const [ charObject, setCharObject ] = useState({});
  const [ isLoading, setIsLoading ] = useState();
  const [ isError, setIsError ] = useState(false);
  const [ error, setError ] = useState();
  const [ characterDesc, setCharacterDescription ] = useState('');
  const [ characterImgPath, setCharacterImgPath ] = useState('');
  const [ characterImgExt, setCharacterImgExt ] = useState('');
  // const [ marvelATag, ]

  const onSubmit = data => {  //when user clicks submit, characterName is set
    setCharacterName(data.characterName);
  }

  useEffect(() => {   //this useQuery hook used for initial call on page load
    setIsLoading(true);
    fetch(`${CHARACTER_URL}&name=${characterName}`)
    .then(res => res.json())
    .then((result) => {
        setIsLoading(false);
        setCharObject(result.data.results[0]);
        setCharacterDescription(result.data.results[0].description);
        setCharacterImgPath(result.data.results[0].thumbnail.path);
        setCharacterImgExt(result.data.results[0].thumbnail.extension);
    })
    .catch((err) => {
        setIsError(true);
        setError(err);
    })},
    []
  ) 

  useEffect(() => {   //this useEffect hook used for calls made when a user clicks submit
    setIsLoading(true);
    fetch(`${CHARACTER_URL}&name=${characterName}`)
      .then(res => res.json())
      .then((result) => {
        setIsLoading(false);
        setCharObject(result.data.results[0]);//sets charObject with data returned from API
        setCharacterDescription(result.data.results[0].description);
        setCharacterImgPath(result.data.results[0].thumbnail.path);
        setCharacterImgExt(result.data.results[0].thumbnail.extension);
      })
      .catch(err => {
        setIsError(true);
        setError(err);
      })},
    [characterName]
  )

  useEffect(() => {   //b/c charObject is dependency, this will run after API call returns 
    console.log(charObject);
  }, [charObject]);  

  if (isLoading) return <span>Loading...</span>;

  if (isError) return <span>Error: {error.message}</span>;

  return (
    <>
      <GlobalStyle />
      <Layout>
        <NameSearch name={characterName} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} />
        <Character
          characterName={characterName}
          characterDesc={characterDesc}
          characterImgUrl = {`${characterImgPath}.${characterImgExt}`}  />
      </Layout>
    </>
  );
}

export default App;
