import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: calc(100% - 60px);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  > h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  > h2 {
    font-size: 1rem;
    font-weight: 300;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export interface ModalProps {
  title: string;
  subtitle: string;
  open: boolean;
  onDismiss: () => unknown;
}

export function Modal(props: React.PropsWithChildren<ModalProps>) {
  if (!props.open) {
    return null;
  }

  return (
    <Outer onClick={props.onDismiss}>
      <Inner onClick={(e) => e.stopPropagation()}>
        <Header>
          <h1>{props.title}</h1>
          <h2>{props.subtitle}</h2>
        </Header>
        <Main>{props.children}</Main>
      </Inner>
    </Outer>
  );
}
