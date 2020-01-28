import React from 'react';
import styled from 'styled-components';

const Circle = styled.circle`
    stroke: ${props => props.color};
    stroke-width: 2;
    fill: white;
`;

const Path = styled.path`
    stroke: ${props => props.color};
    stroke-width: 2;
    fill: white;
`;

function polarToCartesian(centerX, centerY, radius, angle) {
    var radians = (angle - 90) * Math.PI / 180.0;

    return {
        x: centerX + radius * Math.cos(radians),
        y: centerY + radius * Math.sin(radians)
    }
}

function getArcString(angle) {
    const start = polarToCartesian(center.x, center.y, radius, 0);
    const end = polarToCartesian(center.x, center.y, radius, angle);

    const rightQuad = angle > 180 ? 1 : 0;

    return `M ${start.x} ${start.y} A 45 45 0 ${rightQuad} 1 ${end.x} ${end.y}`;
}

const radius = 45;
const center = {
    x: 50,
    y: 50
};

function getSVG(color, value) {
    if (value === 1) {
        return (
            <svg height="100" width="100">
                <Circle id="counter" cx={center.x} cy={center.y} r={radius} color={color} />
            </svg>
        )
    }

    return (
        <svg height="100" width="100">
            <Path id="counter" d={getArcString(value * 360)} color={color} />
        </svg>
    )
}

export default function({ color, value }) {
    return getSVG(color, value);
}