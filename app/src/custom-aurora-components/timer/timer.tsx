import React, { useState, useEffect } from 'react'
import {
  WidgetWrapper,
  CircularProgress,
  Flexbox,
  Text,
  IconButton
} from '@leon-ai-ai/aurora'

interface TimerProps {
  initialTime: number
  initialProgress: number
  interval: number
  totalTimeContent: string
  onEnd: () => void
  onCheck: () => void
}

function formatTime(seconds: number): string {
  const minutes = seconds >= 60 ? Math.floor(seconds / 60) : 0
  const remainingSeconds = seconds % 60
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

  return `${formattedMinutes}:${formattedSeconds}`
}

export const Timer = (props: TimerProps): JSX.Element => {
  const [progress, setProgress] = useState(props.initialProgress || 0)
  const [timeLeft, setTimeLeft] = useState(props.initialTime)

  useEffect(() => {
    setTimeLeft(props.initialTime)
    setProgress(progress)
  }, [props.initialTime])

  useEffect(() => {
    if (timeLeft <= 0) {
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1

        if (newTime <= 0 && props.onEnd) {
          props.onEnd()
        }

        return newTime
      })
      setProgress((prevProgress) => prevProgress + 100 / props.initialTime)
    }, props.interval)

    return () => clearInterval(timer)
  }, [props.initialTime, props.interval, timeLeft])

  return (
    <WidgetWrapper>
      <Flexbox
        gap="xs"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress value={progress} />
        <IconButton
          icon="refresh"
          aria-label="Refresh"
          tooltip="Refresh"
          variant="ghost"
          onClick={props.onCheck}
        />
      </Flexbox>
      <Flexbox direction="column" gap="xs" alignItems="center">
        <Text fontSize="lg" fontWeight="semi-bold">
          {formatTime(timeLeft)}
        </Text>
        <Text fontSize="xs" secondary>
          {props.totalTimeContent}
        </Text>
      </Flexbox>
    </WidgetWrapper>
  )
}
