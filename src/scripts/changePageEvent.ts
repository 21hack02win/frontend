import { NavigateFunction } from 'react-router'
import { wsListener, WsEvent, closeWebSocket } from '/@/websocket'
import { AppDispatch } from '/@/store/store'
import { setTheme } from '/@/store/slice/theme'
import { setDraw } from '/@/store/slice/draw'
import { setAnswer } from '/@/store/slice/answer'
import { leaveRoom } from '../store/slice/status'

export const addPageEventListener = (
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  const startTheme = (e: CustomEvent) => {
    dispatch(setTheme(e.detail))
    navigate('/theme', { replace: true })
  }

  const startDraw = (e: CustomEvent) => {
    dispatch(setDraw(e.detail))
    navigate('/draw', { replace: true })
  }

  const startAnswer = (e: CustomEvent) => {
    dispatch(setAnswer(e.detail))
    navigate('/answer', { replace: true })
  }

  const startResult = () => {
    navigate('/result', { replace: true })
  }

  const nextRoom = () => {
    navigate('/lobby', { replace: true })
  }

  const breakRoom = () => {
    closeWebSocket()
    dispatch(leaveRoom())
    navigate('/', { replace: true })
  }

  wsListener.addEventListener(WsEvent.GameStart, startTheme as EventListener)
  wsListener.addEventListener(WsEvent.DrawStart, startDraw as EventListener)
  wsListener.addEventListener(WsEvent.AnswerStart, startAnswer as EventListener)
  wsListener.addEventListener(WsEvent.ShowStart, startResult as EventListener)
  wsListener.addEventListener(WsEvent.NextRoom, nextRoom as EventListener)
  wsListener.addEventListener(WsEvent.BreakRoom, breakRoom as EventListener)
}
