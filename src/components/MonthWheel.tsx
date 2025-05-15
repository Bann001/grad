import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Sample data structure for memories
const monthMemories: { [key: string]: { image: string; description: string }[] } = {
  January: [
    { image: '/imgs/january/1.jpg', description: 'New Year Celebration' },
    { image: '/imgs/january/2.jpg', description: 'Winter Wonderland' }
  ],
  February: [
    { image: '/imgs/february/1.heic', description: 'Valentine\'s Day' },
    { image: '/imgs/february/2.heic', description: 'Winter Adventures' },
    { image: '/imgs/february/3.heic', description: 'Winter Adventures' },
    { image: '/imgs/february/4.heic', description: 'Winter Adventures' }
  ],

  March: [
    { image: '/imgs/march/1.jpg', description: 'Valentine\'s Day' },
    { image: '/imgs/march/2.heic', description: 'Winter Adventures' },
    { image: '/imgs/march/3.heic', description: 'Winter Adventures' },
    { image: '/imgs/march/4.heic', description: 'Winter Adventures' },
    { image: '/imgs/march/5.heic', description: 'Winter Adventures' },
    { image: '/imgs/march/6.heic', description: 'Winter Adventures' },
    { image: '/imgs/march/7.heic', description: 'Winter Adventures' },
    { image: '/imgs/march/8.heic', description: 'Winter Adventures' },
    { image: '/imgs/march/9.heic', description: 'Winter Adventures' }
  ],

  April: [
    { image: '/imgs/april/1.jpg', description: 'Valentine\'s Day' },
    { image: '/imgs/april/2.jpg', description: 'Winter Adventures' },
    { image: '/imgs/april/3.jpg', description: 'Winter Adventures' },
    { image: '/imgs/april/4.jpg', description: 'Winter Adventures' }
  ],

  May: [
    { image: '/imgs/may/1.jpg', description: 'Valentine\'s Day' },
    { image: '/imgs/may/2.jpg', description: 'Winter Adventures' },
    { image: '/imgs/may/3.jpg', description: 'Winter Adventures' },
    { image: '/imgs/may/4.jpg', description: 'Winter Adventures' },
    { image: '/imgs/may/8.jpg', description: 'Winter Adventures' },
    { image: '/imgs/may/9.jpg', description: 'Winter Adventures' },
    { image: '/imgs/may/10.jpg', description: 'Winter Adventures' }
  ],
  // Add more months as needed
};

const FoldersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Folder = styled(motion.div)`
  background: linear-gradient(45deg, #3498db, #2c3e50);
  border-radius: 10px;
  padding: 2rem;
  cursor: pointer;
  color: white;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: rgba(255, 255, 255, 0.2);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const FolderTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  font-family: 'Playfair Display', serif;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2100;
  pointer-events: none;
`;

const MonthContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  width: 90vw;
  max-width: 1100px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: all;
`;

const MonthTitle = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Playfair Display', serif;
`;

const MemoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  flex: 1;
`;

const MemoryCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MemoryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

const MemoryDescription = styled.p`
  padding: 1.5rem;
  color: #2c3e50;
  font-size: 1.1rem;
  text-align: center;
  background: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: #c0392b;
  }
`;

const NoMemories = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 2rem 0;
`;

const MonthFolders: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleMonthClick = (month: string) => {
    setSelectedMonth(month);
  };

  const handleClose = () => {
    setSelectedMonth(null);
  };

  return (
    <>
      <FoldersContainer>
        {months.map((month) => (
          <Folder
            key={month}
            onClick={() => handleMonthClick(month)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FolderTitle>{month}</FolderTitle>
          </Folder>
        ))}
      </FoldersContainer>

      <AnimatePresence>
        {selectedMonth && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            <ModalWrapper>
              <MonthContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <MonthTitle>{selectedMonth}</MonthTitle>
                <MemoryGrid>
                  {monthMemories[selectedMonth]?.map((memory, index) => (
                    <MemoryCard
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MemoryImage src={memory.image} alt={memory.description} />
                      <MemoryDescription>{memory.description}</MemoryDescription>
                    </MemoryCard>
                  )) || (
                    <NoMemories>No memories added for {selectedMonth} yet.</NoMemories>
                  )}
                </MemoryGrid>
                <CloseButton onClick={handleClose}>Close</CloseButton>
              </MonthContent>
            </ModalWrapper>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MonthFolders; 