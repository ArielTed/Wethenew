import styled, { css } from 'styled-components';

interface ColorProps {
  color?: string;
}

interface FlexProps {
  flex?: number;
}

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 7.5rem);

  display: flex;

  background-color: #f3f3f3;
`;

export const LoaderContainer = styled.div`
  width: 100%;
  min-height: calc(100% - 7.5rem);

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f3f3f3;
`;

export const MessageContainer = styled.div`
  height: 100%;

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 1rem 2rem;
`;

export const MessageBloc = styled.div<FlexProps>`
  width: 100%;

  padding: 2rem;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  ${(props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `}

  position: relative;

  background-color: white;
  border: 1px solid #e3e3e3;
  border-radius: 3px;

  overflow-y: hidden;

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Title = styled.div`
  color: black;
  font-size: 1.8rem;
  font-weight: bold;
`;

export const SubTitle = styled.div<ColorProps>`
  color: ${(props) => props.color || 'black'};
  font-size: 1rem;
`;

export const MessageInfos = styled.div`
  width: 100%;

  padding-left: 3rem;

  & > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const Body = styled.div`
  width: 100%;

  margin-top: 2rem;

  color: #777777;
  font-size: 1.5rem;
  font-weight: 300;
  text-align: justify;

  overflow-y: scroll;
`;

export const Icon = styled.img`
  height: 1.8rem;
  width: 1.8rem;

  position: absolute;
  left: 2.5rem;
`;

export const Button = styled.div`
  width: 18rem;
  height: 6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #cef0ff;
  border: 1px solid #7bdef3;

  color: #0b7d96;
  font-size: 1.6rem;
  font-weight: bold;
`;
