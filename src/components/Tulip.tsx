import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const stemBloom = keyframes`
  0% { transform: scaleY(0.2); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
`;

const petalBloom = keyframes`
  0% { transform: scaleY(0.1) scaleX(0.7); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: scaleY(1) scaleX(1); opacity: 1; }
`;

const leftPetalBloom = keyframes`
  0% { transform: rotate(-30deg) scaleY(0.1) scaleX(0.7); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: rotate(-15deg) scaleY(1) scaleX(1); opacity: 1; }
`;

const rightPetalBloom = keyframes`
  0% { transform: rotate(30deg) scaleY(0.1) scaleX(0.7); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: rotate(15deg) scaleY(1) scaleX(1); opacity: 1; }
`;

const TulipWrapper = styled.div<{ side: 'left' | 'right' }>`
  position: fixed;
  bottom: 0;
  ${props => props.side}: 2vw;
  z-index: 100;
  pointer-events: none;
  width: 120px;
  height: 220px;
`;

const AnimatedStem = styled.rect`
  transform-origin: 60px 200px;
  animation: ${stemBloom} 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.1s both;
`;
const AnimatedLeaf = styled.ellipse`
  transform-origin: 60px 200px;
  animation: ${stemBloom} 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.1s both;
`;

type PetalType = 'left' | 'right' | 'center' | 'ellipse';

const AnimatedPetal = styled.path<{ delay: number; petalType: PetalType }>`
  transform-box: fill-box;
  transform-origin: 60px 100px;
  ${({ petalType, delay }) =>
    petalType === 'left'
      ? css`
          animation: ${leftPetalBloom} 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s both;
        `
      : petalType === 'right'
      ? css`
          animation: ${rightPetalBloom} 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s both;
        `
      : css`
          animation: ${petalBloom} 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s both;
        `}
`;

const AnimatedEllipse = styled.ellipse<{ delay: number }>`
  transform-box: fill-box;
  transform-origin: 60px 60px;
  animation: ${petalBloom} 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${({ delay }) => delay}s both;
`;

const Tulip: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  // Colors for blue and pink tulip
  const main = side === 'left';
  return (
    <TulipWrapper side={side}>
      <svg width="120" height="220" viewBox="0 0 120 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Stem and leaf */}
          <AnimatedLeaf cx="60" cy="200" rx="8" ry="20" fill="#3aaf7c" />
          <AnimatedStem x="54" y="100" width="12" height="110" rx="6" fill="#3aaf7c" />
          {/* Petals: left, right, center */}
          <AnimatedPetal
            petalType="left"
            delay={0.5}
            d="M60 100 Q40 80 60 60 Q55 90 60 100 Z"
            fill={main ? '#4fc3f7' : '#f06292'}
          />
          <AnimatedPetal
            petalType="right"
            delay={0.7}
            d="M60 100 Q80 80 60 60 Q65 90 60 100 Z"
            fill={main ? '#1976d2' : '#ad1457'}
          />
          <AnimatedPetal
            petalType="center"
            delay={0.9}
            d="M60 100 Q50 70 60 50 Q70 70 60 100 Z"
            fill={main ? '#64b5f6' : '#f8bbd0'}
          />
          {/* Center ellipse for bloom */}
          <AnimatedEllipse
            cx="60"
            cy="60"
            rx="18"
            ry="28"
            fill={main ? '#64b5f6' : '#f8bbd0'}
            delay={1.1}
          />
        </g>
      </svg>
    </TulipWrapper>
  );
};

const Tulips: React.FC = () => (
  <>
    <Tulip side="left" />
    <Tulip side="right" />
  </>
);

export default Tulips; 