import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    margin: 0;
    padding: 0;
`;

const Background = styled.header`
    display: flex;
    align-items: center;
    background-color: gray;
    width: 100%;
    height: 8em;
    padding: 2em;
`;

export default function({ title }) {
    return <Background>
        <Title>{ title }</Title>
    </Background>
}