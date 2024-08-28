import React from 'react';
import './App.css';
import { BezierEditor, CubicBezier } from '../src/components';

const textTimingMap: {
  [key: string]: [string, string, string, string]
} = {
  'linear': ['0.25', '0.25', '0.75', '0.75'],
  'ease': ['0.25', '0.1', '0.25', '1'],
  'ease-in': ['0.42', '0', '1', '1'],
  'ease-out': ['0', '0', '0.58', '1'],
  'ease-in-out': ['0.42', '0', '0.58', '1']
};

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

  const setType = (key: string) => {
    setBezier(textTimingMap[key]);
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
      <div style={{marginTop: '16px'}}>
        {Object.keys(textTimingMap).map(key => (
          <button key={key} onClick={() => setType(key)}>{key}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
