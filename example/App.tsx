import React from 'react';
import './App.css';
import { BezierEditor, CubicBezier } from '../src/components';

function App() {
  const [bezier, setBezier] = React.useState(['0.25', '0.25', '0.75', '0.75']);

  const onBezierChange = (newBezier?: CubicBezier) => {
    if (newBezier !== undefined) {
      setBezier([...newBezier.toStringArray()]);
    }
  };

  const changeBezierValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    bezier[index] = e.target.value;
    setBezier([...bezier]);
  }

  return (
    <div className='App'>
      <div className='component-wrapper'>
        <BezierEditor 
            bezier={CubicBezier.fromStringArray(bezier) ?? undefined}
            onChange={onBezierChange}></BezierEditor>
      </div>
      <div>
        {bezier.map((val, index) => 
          <input type='text'
                 value={val}
                 key={index}
                 onChange={(e) => changeBezierValue(e, index)}></input>
        )}
      </div>
    </div>
  );
}

export default App;
