import styled, { css } from 'styled-components';

interface ActiveProps {
  readonly isActive?: boolean;
}

interface ColorProps {
  readonly color?: string;
}

export const ControlContainer = styled.div<ActiveProps>`
  max-width: 25rem;
  height: 100%;

  padding: 1.4rem 1.2rem;

  display: flex;
  align-items: center;

  border-left: 2px solid white;
  background-color: ${(props) => (props.isActive ? '#0B7D96' : '#282929')};

  & :hover {
    background-color: #0b7d96;
    cursor: pointer;
  }
`;

export const Avatar = styled.img`
  width: 4rem;
  height: 4rem;

  margin-right: 0.5rem;

  border-radius: 100%;
`;

export const Image = styled.img<ActiveProps>`
  width: 0.7rem;
  height: 0.7rem;

  ${(props) =>
    props.isActive &&
    css`
      transform: rotate(180deg);
    `}
`;

export const Text = styled.div<ColorProps>`
  color: ${(props) => props.color};
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
`;

export const DropdownMenu = styled.div<ActiveProps>`
  min-width: 20rem;
  max-height: 30rem;

  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  flex-direction: column;

  position: absolute;
  right: 0;
  z-index: 3;

  background-color: white;
  border: 1px solid #c4c4c4;

  overflow: scroll;

  & > :not(:last-child) {
    border-bottom: 1px solid #9b9696;
  }
`;

export const DropdownRow = styled.div`
  width: 100;
  height: 5rem;

  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  & :hover {
    background-color: #0b7d96;
    cursor: pointer;
  }
`;
