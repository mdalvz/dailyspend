import React from 'react';
import styled from 'styled-components';

const Outer = styled.input`
  display: none;
`;

export function Submit() {
  return <Outer type={'submit'} />;
}
