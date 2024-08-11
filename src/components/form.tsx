import React from 'react';
import styled from 'styled-components';

const Outer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export interface FormProps {
  onSubmit: () => unknown;
}

export function Form(props: React.PropsWithChildren<FormProps>) {
  return (
    <Outer
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onSubmit();
      }}
    >
      {props.children}
    </Outer>
  );
}
