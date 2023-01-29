import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from '../node_modules/react-dom/client.js';
import { Roulette } from '../.';

const App = () => {
  return (
    <div>
      <Roulette allwidget={[{icon:'',id:'1',label:'first',position:0}]}/>
    </div>
  );
};

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<App />);
