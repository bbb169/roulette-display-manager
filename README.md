## Demo
![XIBQ@XLO3D$4`J3O1SKIXH5](https://user-images.githubusercontent.com/102608263/219395888-6c229fee-f2ca-440a-aacf-0b2df1e685ce.png)
![M_K~~R~0QW(C M94{EW)0(8](https://user-images.githubusercontent.com/102608263/219396020-8e8b9932-b815-4a4f-85c5-368cd1900ce5.png)

## Start
```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```
To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## 🔨 Usage

```jsx
import React from 'react';
import { Roulette } from '../.'

interface WidgetInfo {
  icon?: any
  id: string
  label: string
}

const App = () => {
  return (
    <div>
      <Roulette allwidget={[{ icon: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png', id: '1', label: 'first', position: 0 }]} radius={500} onShow={() => {
        console.log('wheel showed')
      }} onHide={() => {
        console.log('wheel hided')
      }} onSelect={(position: Number, widget: WidgetInfo, toHide: boolean) => {
        console.log('selected', position, widget, toHide)
      }} onMouseEnter={(position: Number, widget: WidgetInfo | undefined, hided: boolean | undefined) => {
        console.log('entered', position, widget, hided)
      }} onMouseLeave={(position: Number, widget: WidgetInfo | undefined, hided: boolean | undefined) => {
        console.log('left', position, widget, hided)
      }}/>
    </div>
  )
}
```
