import React from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from './ErrorBoundary';

interface LayoutProps {}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Container>
  );
};
