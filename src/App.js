import React from 'react';
import Character from './Character';
import NameSearch from './NameSearch';
import styled from 'styled-components';

const Layout = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

function App() {
  return (
    <Layout>
      <NameSearch />
      <Character />
    </Layout>
  );
}

export default App;
