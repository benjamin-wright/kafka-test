import React from 'react';
import ColorWheel from './color-wheel';
import '../index.css';

export default {
  title: 'Color Components/Color Wheel',
  component: ColorWheel,
};

export const Values = () => (<>
    <ColorWheel color="red" value={-1} />
    <ColorWheel color="red" value={0} />
    <ColorWheel color="red" value={0.25} />
    <ColorWheel color="red" value={0.5} />
    <ColorWheel color="red" value={0.7549317564} />
    <ColorWheel color="red" value={1} />
    <ColorWheel color="red" value={1.5} />
</>);

export const Colors = () => (<>
    <ColorWheel color="black" value={0.75} />
    <ColorWheel color="green" value={0.75} />
    <ColorWheel color="red" value={0.75} />
    <ColorWheel color="blue" value={0.75} />
    <ColorWheel color="ivory" value={0.75} />
    <ColorWheel color="silver" value={0.75} />
</>);