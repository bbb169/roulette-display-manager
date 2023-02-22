import 'react-app-polyfill/ie11'
import * as React from 'react'
import { createRoot } from '../node_modules/react-dom/client.js'
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
      }} onSelect={(position: Number, widget: WidgetInfo, toHide: boolean, widgetDom: HTMLElement) => {
        console.log('selected', position, widget, toHide, widgetDom)
      }} onMouseEnter={(position: Number, widget: WidgetInfo | undefined, hided: boolean | undefined) => {
        console.log('entered', position, widget, hided)
      }} onMouseLeave={(position: Number, widget: WidgetInfo | undefined, hided: boolean | undefined) => {
        console.log('left', position, widget, hided)
      }}/>
    </div>
  )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)
