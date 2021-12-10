import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { css } from '@emotion/react'
import Icon from '@mdi/react'
import { mdiClipboardMultiple } from '@mdi/js'
import CustomSlider from './Slider'
import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import { useAppSelector } from '/@/store/hooks'
import { wsSend } from '/@/websocket'

import FlatButton from '/@/components/FlatButton'

const GameSetting = () => {
  const [time, setTime] = useState(1)
  const handleChange = (event: Event, newValue: number | number[]) => {
    // TODO
    setTime(newValue as number)
  }
  const isHost = true // TODO
  const roomId = useAppSelector((state) => state.room.roomId)
  const [inviteUrl, setInviteUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  useEffect(() => {
    const url = location.protocol + '//' + location.host + '?c=' + roomId
    setInviteUrl(url)
    setShortUrl(location.host + '?c=' + roomId)
  }, [roomId])

  const inputField = useRef<HTMLInputElement>(null)
  const inputFocus = useCallback(() => {
    inputField.current?.select()
  }, [])

  const requestGameStart = useCallback(() => {
    wsSend.requestGameStart()
  }, [])

  const handleCopy = () => {
    inputField.current?.select()
    document.execCommand('copy')
  }

  const marks = [
    {
      value: 0,
      label: 'みじかい',
    },
    {
      value: 1,
      label: 'ふつう',
    },
    {
      value: 2,
      label: 'ながい',
    },
  ]
  return (
    <div css={[containerStyle, card]}>
      <div>
        <h2 css={titleStyle}>ゲーム設定</h2>
        <div>
          <p css={subTitleStyle}>時間設定</p>
          <CustomSlider
            defaultValue={1}
            max={2}
            min={0}
            marks={marks}
            value={time}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h2 css={titleStyle}>招待</h2>
        <div css={inviteWrapStyle}>
          <input
            type="text"
            value={shortUrl}
            readOnly={true}
            ref={inputField}
            onFocus={inputFocus}
          />
          <div css={inviteButtonStyle}>
            <button onClick={handleCopy}>
              <Icon path={mdiClipboardMultiple} size={1.8} />
            </button>
          </div>
        </div>
      </div>
      {isHost && (
        <div css={startButtonStyle}>
          <FlatButton text="スタート" onClick={requestGameStart} color="blue" />
        </div>
      )}
    </div>
  )
}

const titleStyle = css`
  font-size: 2rem;
  line-height: 6rem;
`
const subTitleStyle = css`
  font-size: 1.5rem;
  line-height: 2rem;
`

const containerStyle = css`
  width: 100%;
  background-color: ${colorToRgb.red};
  padding: 36px 48px;
  padding-top: 12px;
`

const inviteWrapStyle = css`
  display: flex;
  font-size: 1.5rem;
  text-align: center;
  line-height: 64px;
  vertical-align: baseline;
  & input {
    background-color: ${colorToRgb.yellow};
    border: solid 3px ${colorToRgb.black};
    font-size: 1.5rem;
    height: 64px;
    width: 100%;
    margin-right: 20px;
  }
`

const startButtonStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`

const inviteButtonStyle = css`
  position: relative;
  & button {
    backgronud-color: ${colorToRgb.blue};
    width: 64px;
    height: 64px;
    &::after {
      position: absolute;
      content: '';
      width: 64px;
      height: 64px;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 0);
      transition: all 0.2s ease-out;
    }
    &:hover::after {
      background-color: rgba(255, 255, 255, 0.15);
    }
    &:active::after {
      background-color: rgba(0, 0, 0, 0.15);
    }
    :before {
      position: absolute;
      content: '';
      transition: all 0.2s ease-out;
    }
  }
`

export default GameSetting