import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa'; // ✅ Correct icon import

// 👇 Optional type casting for safety (some builds need this)
const EnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Wrapper = styled.div`
  position: relative;
  text-align: center;
  margin-top: 2rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 3rem;
  color: #333;

  &:hover {
    color: #0077cc;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  text-align: left;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background: #ff4d4d;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #e60000;
  }
`;

const LetterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <IconButton onClick={() => setIsOpen(true)} aria-label="Open Letter">
        <EnvelopeIcon />
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <Modal
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Graduation Gift</h2>
              <p>
                Dear Pretty Gorgeous Princess Babi,
                <br />
                <br />
                Alam mo ba na ikaw ang pinaka-maganda at pinaka-mahusay na tao sa buong mundo? Ikaw ang dahilan kung bakit ako bumangon sa umaga at nagpatuloy sa buhay. Ang iyong ngiti ay parang araw na nagbibigay liwanag sa aking madilim na mundo.
                Importante ka masyado sakin at wala nako mahihiling na iba kasi sure na sure na ako sayo. I love you very much babi mwaaaps.
                <br />
                <br />
                Congrats in completing your College Journey Babi, <br />
                💌 Yours truly beloved pogi babi, Eli
              </p>
              <CloseButton onClick={() => setIsOpen(false)}>Close</CloseButton>
            </Modal>
          </Backdrop>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default LetterModal;
