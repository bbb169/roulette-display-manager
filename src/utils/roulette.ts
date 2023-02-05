export interface WidgetInfo {
    icon?: any,
    id: string,
    label: string
}

export interface RouletteProps extends WidgetInfo { position?:number }