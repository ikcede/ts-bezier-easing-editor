import React from 'react';
import './App.css';
import { BezierEditor, CubicBezier } from '../src/components';

function App() {
  const [bezier, setBezier] = 
      React.useState(new CubicBezier(0.25, 0.25, 0.75, 0.75));

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
            onBezierChange={onBezierChange}></BezierEditor>
      </div>
      <div>
        {renderBezier()}
      </div>
    </div>
  );
}

export default App;
