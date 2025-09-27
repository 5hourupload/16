import type { WidgetEventMethod } from '@sdk/widget'
import { WidgetComponent } from '@sdk/widget-component'

interface TimerProps {
  initialTime: number
  initialProgress: number
  interval: number
  totalTimeContent: string
  onEnd?: () => WidgetEventMethod
  onCheck?: () => WidgetEventMethod
}

export class Timer extends WidgetComponent<TimerProps> {
  constructor(props: TimerProps) {
    super(props)
  }
}
