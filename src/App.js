import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import _ from 'underscore';
import GlobalStyle from './GlobalStyle';
import Character from './Character';
import NameSearch from './NameSearch';


const CHARACTER_URL = `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_API_KEY}`;

const Layout = styled.main`
  display: flex;
  flex-wrap: wrap;
  ${'' /* flex-direction: column; */}
  align-items: center;
  justify-content: space-between;
`;

function App() {
  const { register, handleSubmit, reset } = useForm();//form handlers, from react-hook-form
  const [ searchName, setSearchName ] = useState('spider-man');//set after user clicks submit
  const [ charObject, setCharObject ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  // const [ error, setError ] = useState();
  const [ characterName, setCharacterName ] = useState('');
  const [ characterDesc, setCharacterDescription ] = useState('');
  const [ characterImgPath, setCharacterImgPath ] = useState('');
  const [ characterImgExt, setCharacterImgExt ] = useState('');
  const [ isEmpty, setIsEmpty ] = useState(false);
  const [ searchType, setSearchType ] = useState('exactName');

  const onSubmit = data => {  //when user clicks submit, characterName is set
    console.log(data)
    setSearchName(data.searchName);
    reset();
  }

  const onChange = useCallback(
    e => setSearchType(e.target.value),
    []
  );

  useEffect(() => {   //this useQuery hook used for initial call on page load
    let queryKey;
    searchType === 'exactName' ? queryKey = `name` : queryKey = `nameStartsWith`;
    fetch(`${CHARACTER_URL}&${queryKey}=${searchName}`)
    .then(res => res.json())
    .then((result) => {
      console.log(`json-ed response: ${result}`);
      setIsLoading(false);
      if ( _.isEmpty(result.data.results[0] ) ) {
        setIsEmpty(true);
        return;
      }
      setIsEmpty(false);
      setCharObject(result.data.results[0]);
      setCharacterName(result.data.results[0].name);
      setCharacterDescription(result.data.results[0].description);
      setCharacterImgPath(result.data.results[0].thumbnail.path);
      setCharacterImgExt(result.data.results[0].thumbnail.extension);
    })
    .catch((err) => {
        setIsError(true);
        console.log(err);
        setIsLoading(false);
    })},
    []
  ) 

  useEffect(() => {   //this useEffect hook used for calls made when a user clicks submit
    let queryKey;
    searchType === 'exactName' ? queryKey = `name` : queryKey = `nameStartsWith`;
    fetch(`${CHARACTER_URL}&${queryKey}=${searchName}`)
      .then(res => res.json())
      .then((result) => {
        setIsLoading(false);
        if ( _.isEmpty(result.data.results[0]) ) {
          setIsEmpty(true);
          return;
        }
        setIsEmpty(false);
        setCharObject(result.data.results[0]);//sets charObject with data returned from API
        setCharacterName(result.data.results[0].name);
        setCharacterDescription(result.data.results[0].description);
        setCharacterImgPath(result.data.results[0].thumbnail.path);
        setCharacterImgExt(result.data.results[0].thumbnail.extension);
      })
      .catch(err => {
        setIsError(true);
        console.log(err);
        console.log(err.stack);
        setIsLoading(false);
      })},
    [searchName]
  )

  useEffect(() => {   //b/c charObject is dependency, this will run after API call returns 
    console.log(charObject);
  }, [charObject]);  


  if (isLoading) return <span>Loading...</span>;

  if (isError) return <span>Error: Something went wrong</span>;

  return (
    <>
      <GlobalStyle />
      <Layout>
        <NameSearch 
          name={searchName} 
          handleSubmit={handleSubmit} 
          onSubmit={onSubmit} 
          register={register}
          onChange={onChange}
          searchType={searchType}
          isEmpty={isEmpty} />
        <Character
          characterName={characterName}
          characterDesc={characterDesc}
          characterImgUrl = {`${characterImgPath}.${characterImgExt}`}  />
      </Layout>
    </>
  );
}

export default App;
