import React, { useState } from 'react';
import './App.css';
import BezierEditor from './components/BezierEditor';
import { CubicBezier } from './model/cubic-bezier';

function App() {

  const [rows, setRows] = useState(4);
  const [bezier, setBezier] = 
      useState(new CubicBezier(0.25, 0.25, 0.75, 0.75));

  const onBezierChange = (newBezier?: CubicBezier) => {
    setBezier(newBezier ?? bezier);
  };

  const renderBezier = () => {
    return '(' +
      Math.round(bezier.x1 * 1000) / 1000 + ', ' +
      Math.round(bezier.y1 * 1000) / 1000 + ', ' +
      Math.round(bezier.x2 * 1000) / 1000 + ', ' +
      Math.round(bezier.y2 * 1000) / 1000 + ')';
  };

  return (
    <div className='App'>
      <div className='component-wrapper'>
        <BezierEditor 
            initialBezier={bezier}
            rows={rows}
            onBezierChange={onBezierChange}></BezierEditor>
      </div>
      <div>
        {renderBezier()}
      </div>
    </div>
  );
}

export default App;
