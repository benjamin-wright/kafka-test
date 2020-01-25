import React from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  background-color: ${props => props.color};
  width: ${props => props.value}px;
  height: ${props => props.value}px;
`;

export default function({ color, value }) {
  return (
    <Cell color={color.replace(" ", "")} value={value}>
      <span> </span>
    </Cell>
  )
}