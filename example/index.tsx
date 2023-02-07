import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from '../node_modules/react-dom/client.js';
import { Roulette } from '../.';

const App = () => {
  return (
    <div>
      <Roulette allwidget={[{icon:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',id:'1',label:'first',position:0}]} radius={500}/>
    </div>
  );
};

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<App />);
