import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import styled from 'styled-components';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/main';

function Root() {
  const router = createBrowserRouter([{ path: '/', element: <MainPage /> }]);
  return (
    <div className="App">
      <RecoilRoot>
        <ChakraProvider>
          <MainWrap>
            <Header />
            <RouterProvider router={router} />
          </MainWrap>
        </ChakraProvider>
      </RecoilRoot>
    </div>
  );
}

const MainWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  overflow: hidden;
`;

export default Root;
