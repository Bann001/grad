/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MonthFolders from './components/MonthWheel';
import Header from './components/Header';
import Tulips from './components/Tulip';
import LetterModal from './components/LetterModal';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <MonthFolders />
      <LetterModal />
      <Tulips />
    </AppContainer>
  );
};

export default App;
