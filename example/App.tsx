import React from 'react';
import './App.css';
import { BezierEditor, CubicBezier } from '../src/components';

function App() {
  const [bezier, setBezier] = 
      React.useState(new CubicBezier(0.25, 0.25, 0.75, 0.75));

  const [x1, setX1] = React.useState('0.25');
  const [y1, setY1] = React.useState('0.25');
  const [x2, setX2] = React.useState('0.75');
  const [y2, setY2] = React.useState('0.75');

  const onBezierChange = (newBezier?: CubicBezier) => {
    if (newBezier !== undefined) {
      setBezier(newBezier);
      setX1(newBezier.x1.toString());
      setY1(newBezier.y1.toString());
      setX2(newBezier.x2.toString());
      setY2(newBezier.y2.toString());
    }
  };

  const changeX1 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setX1(e.target.value);
    let floatValue = parseFloat(e.target.value);
    if (!Number.isNaN(floatValue)) {
      bezier.x1 = floatValue;
      setBezier(new CubicBezier(...bezier.toArray()));
    }
  }

  const changeY1 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setY1(e.target.value);
    let floatValue = parseFloat(e.target.value);
    if (!Number.isNaN(floatValue)) {
      bezier.y1 = floatValue;
      setBezier(new CubicBezier(...bezier.toArray()));
    }
  }

  const changeX2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setX2(e.target.value);
    let floatValue = parseFloat(e.target.value);
    if (!Number.isNaN(floatValue)) {
      bezier.x2 = floatValue;
      setBezier(new CubicBezier(...bezier.toArray()));
    }
  }

  const changeY2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setY2(e.target.value);
    let floatValue = parseFloat(e.target.value);
    if (!Number.isNaN(floatValue)) {
      bezier.y2 = floatValue;
      setBezier(new CubicBezier(...bezier.toArray()));
    }
  }

  return (
    <div className='App'>
      <div className='component-wrapper'>
        <BezierEditor 
            bezier={bezier}
            onChange={onBezierChange}></BezierEditor>
      </div>
      <div>
        <input type='text'
                value={x1}
                onChange={changeX1}></input>
        <input type='text'
                value={y1}
                onChange={changeY1}></input>
        <input type='text'
                value={x2}
                onChange={changeX2}></input>
        <input type='text'
                value={y2}
                onChange={changeY2}></input>
      </div>
    </div>
  );
}

export default App;
