export interface WidgetInfo {
  icon?: any
  id: string
  label: string
}

export interface RouletteProps extends WidgetInfo { position?: number }

export enum ShortcutKeys {
  ctrl = 'ctrlKey',
  alt = 'altKey',
  shift = 'shiftKey'
}
