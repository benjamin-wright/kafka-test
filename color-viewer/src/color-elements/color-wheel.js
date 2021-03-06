import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: inline-block;
    position: relative;
    height: ${props => props.height}px;
    width: ${props => props.width}px;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${props => props.color};
    border-radius: 50px;
    opacity: 0.15;
`;

const ShadowSVG = styled.svg`
    filter: drop-shadow(0px 0px 2px lightgray);
`;

const NumberContainer = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;
`;

const NumberText = styled.p`
    color: ${props => props.color};
    text-shadow: 0 0 3px rgba(0.8, 0.8, 0.8, 0.4);
`;

const Circle = styled.circle`
    stroke: ${props => props.color};
    stroke-width: 2;
    fill: none;
`;

const Path = styled.path`
    stroke: ${props => props.color};
    stroke-width: 2;
    fill: none;
`;

function polarToCartesian(centerX, centerY, radius, angle) {
    var radians = (angle - 90) * Math.PI / 180.0;

    return {
        x: centerX + radius * Math.cos(radians),
        y: centerY + radius * Math.sin(radians)
    }
}

function getArcString(center, radius, angle) {
    const start = polarToCartesian(center.x, center.y, radius, 0);
    const end = polarToCartesian(center.x, center.y, radius, angle);

    const rightQuad = angle > 180 ? 1 : 0;

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${rightQuad} 1 ${end.x} ${end.y}`;
}

function getSVG(color, value, size) {
    const radius = size / 2.5;
    const center = {
        x: size / 2,
        y: size / 2
    };

    if (value === 1) {
        return (
            <ShadowSVG height={size} width={size}>
                <Circle id="border" cx={center.x} cy={center.y} r={size/2 - 1} color={color} />
                <Circle id="counter" cx={center.x} cy={center.y} r={radius} color={color} />
            </ShadowSVG>
        )
    }

    return (
        <ShadowSVG height="100" width="100">
            <Circle id="border" cx={center.x} cy={center.y} r={size/2 - 1} color={color} />
            <Path id="counter" d={getArcString(center, radius, value * 360)} color={color} />
        </ShadowSVG>
    )
}

function getValueString(value) {
    return (value * 100).toFixed(0) + "%"
}

export default function({ size = 100, color, value }) {
    if (value < 0) {
        value = 0
    }
    if (value > 1) {
        value = 1
    }

    return <Container width={size} height={size}>
        <Background color={color} />
        { getSVG(color, value, size) }
        <NumberContainer>
            <NumberText color={color}>{ getValueString(value) }</NumberText>
        </NumberContainer>
    </Container>
}