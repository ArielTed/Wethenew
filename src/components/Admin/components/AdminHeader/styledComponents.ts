import styled, { css } from 'styled-components';

interface CursorProps {
  cursor?: string;
}

export const Container = styled.div`
  height: 7.5rem;

  display: flex;
  flex-direction: column;
`;

export const InfoDiv = styled.div`
  width: 100%;

  padding: 2px 4px;

  background-color: #21b3d3;
`;

export const MenuContainer = styled.div`
  height: 6rem;

  display: flex;
`;

export const Menu = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  background-color: black;
`;

export const LogoContainer = styled.div`
  height: 100%;

  margin-left: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MessageCounter = styled.div`
  width: 6rem;
  height: 3rem;

  margin: 1rem 1.5rem 0 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #21b3d3;

  & > :last-child {
    margin-left: 1rem;
  }
`;

export const Text = styled.div`
  color: ${(props) => props.color};
  font-size: 0.9rem;
  font-weight: bold;
`;

export const Notif = styled.div`
  color: white;
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Image = styled.img<CursorProps>`
  ${(props) =>
    props.cursor &&
    css`
      cursor: ${props.cursor};
    `}
`;
