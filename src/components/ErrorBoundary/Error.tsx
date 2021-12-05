import React from 'react';

import { Container, Text } from './styledComponents';

export interface ErrorProps {
  errorText?: string;
}

export const Error = ({ errorText = 'Une erreur est survenue.' }: ErrorProps): JSX.Element => {
  return (
    <Container>
      <Text>{errorText}</Text>
    </Container>
  );
};
