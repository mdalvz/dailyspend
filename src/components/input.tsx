import React from 'react';
import styled, { css } from 'styled-components';

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Top = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
`;

const Bottom = styled.input<{ $size: string }>`
  padding: 5px 10px;
  border: 1px solid gray;
  border-radius: 5px;
  min-width: 0;
  ${(props) => css`
    font-size: ${props.$size};
  `}
`;

export interface InputProps {
  type: 'text' | 'number' | 'password';
  size: 'lg';
  label: string;
  value: string;
  onChange: (value: string) => unknown;
  placeholder?: string;
  autoFocus?: boolean;
}

export function Input(props: InputProps) {
  return (
    <Outer>
      <Top>{props.label}</Top>
      <Bottom
        type={props.type}
        $size={'3rem'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        step={props.type === 'number' ? '.01' : undefined}
      />
    </Outer>
  );
}
