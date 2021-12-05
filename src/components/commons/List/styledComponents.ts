import styled, { css } from 'styled-components';

interface IsReadProps {
  isRead: boolean;
}

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  background-color: white;
`;

export const Item = styled.div<IsActiveProps>`
  width: 100%;
  height: 12rem;

  padding: 2rem 4rem;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-bottom: 1px solid #d8d8d8;

  ${(props) =>
    props.isActive &&
    css`
      background-color: rgba(11, 125, 150, 0.2);
    `}

  & :hover {
    background-color: rgba(11, 125, 150, 0.2);
    cursor: pointer;
  }
`;

export const Title = styled.div<IsReadProps>`
  color: black;
  font-size: 1.8rem;
  font-weight: ${(props) => (props.isRead ? '300' : 'bold')};
`;

export const SubTitle = styled.div<IsReadProps>`
  margin: 0.5rem 0;

  color: ${(props) => (props.isRead ? '#777777' : 'black')};
  font-size: 1rem;
`;

export const Text = styled.div`
  color: #777777;
  font-size: 1rem;
  font-weight: 400;
  text-align: justify;

  display: -webkit-box;
  max-width: 30rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Icon = styled.img`
  height: 1.8rem;
  width: 1.8rem;

  position: absolute;
  left: 1rem;
`;

export const Date = styled.div<IsReadProps>`
  color: ${(props) => (props.isRead ? '#777777' : 'black')};
  font-size: 1rem;

  position: absolute;
  right: 1rem;
  margin-top: 2rem;
`;
