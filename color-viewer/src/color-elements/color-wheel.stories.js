import React from 'react';
import ColorWheel from '../color-elements/color-wheel';

export default {
  title: 'Color Components/Color Wheel',
  component: ColorWheel,
};

export const Values = () => (<>
    <ColorWheel color="red" value={0} />
    <ColorWheel color="red" value={0.25} />
    <ColorWheel color="red" value={0.5} />
    <ColorWheel color="red" value={0.75} />
    <ColorWheel color="red" value={1} />
</>);

export const Colors = () => (<>
    <ColorWheel color="black" value={0.75} />
    <ColorWheel color="green" value={0.75} />
    <ColorWheel color="red" value={0.75} />
    <ColorWheel color="blue" value={0.75} />
    <ColorWheel color="silver" value={0.75} />
</>);