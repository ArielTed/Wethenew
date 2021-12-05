import React from 'react';
import type { NextPage } from 'next';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: black;
`;

const Text = styled.h1`
  color: white;
`;

const Error404: NextPage = (): JSX.Element => {
  return (
    <Container>
      <Text>404 - Page Not Found</Text>
    </Container>
  );
};

export default Error404;
