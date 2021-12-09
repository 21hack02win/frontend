import React, { useEffect } from 'react'
import { useAppSelector } from '/@/store/hooks'
import { setupWebSocket } from '/@/websocket'
import GameSetting from '/@/components/Lobby/GameSetting'

// 待機部屋(ROOM)
const Lobby = () => {
  const userId = useAppSelector((state) => state.user.userId)
  useEffect(() => {
    // websocket接続
    setupWebSocket(userId)
  }, [userId])

  return (
    <div>
      <h1>Lobby</h1>
      <GameSetting />
    </div>
  )
}

export default Lobby
