import { LegacyRef, useEffect, useRef, useState } from "react"
import Input from "./components/Input"
import ClockNumber from "./components/ClockNumber"


export default function App() {
  const [isBreak, setIsBreak] = useState(false)
  const [idInterval, setIdInterval] = useState(-1)
  const [breakValue, setBreakValue] = useState(5)
  const [sessionValue, setSessionValue] = useState(25)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const refAudio = useRef<HTMLAudioElement>()

  useEffect(()=>{
    if( minutes===0 && seconds===0 ) {
      setIsBreak( prev => {
        setMinutes( prev ? sessionValue : breakValue )
        refAudio?.current?.play()
        return !prev
      })
    }
  },[minutes, seconds, sessionValue, breakValue])

  useEffect(()=>{
    setMinutes( sessionValue )
  },[sessionValue])

  const handlerReset = () => {
    setBreakValue(5)
    setSessionValue(25)
    setMinutes(25)
    setSeconds(0)
    clearInterval( idInterval )
    setIdInterval( -1 )
  }

  const downValue = (chain:()=>void) => (prevValue:number) => {
    const newValue = prevValue - 1
    if( newValue===-1 ) {
      if( chain ) chain()
      return 59
    }
    return newValue
  }

  const handlerStartStop = () => {
    if( idInterval===-1 ){
      setIdInterval(
        setInterval(()=>{
          setSeconds(downValue(()=>{
            setMinutes(downValue(()=>null))
        })
      )
      },1000) )
    }
    else {
      clearInterval(idInterval)
      setIdInterval(-1)
    }
  }

  const handlerPlay = () => {
    setTimeout(()=>{
      refAudio.current?.pause()
    },700)
  }

  const handlerChangeCount = (setter:(number:number)=>void) => (value:number) => {
    if( value <=0 ) setter(59)
    else if( value >= 60 ) setter(0)
    else setter(value)
  }

  return <div className="w-screen h-screen flex items-center justify-center bg-slate-800">
    <div className="w-1/2 bg-indigo-600 rounded shadow-2xl shadow-indigo-300 flex flex-col gap-4 p-10">
      <div className="flex flex-row gap-2 justify-around">
        <Input id="break" label="Break Length" value={breakValue} onChange={handlerChangeCount(setBreakValue)} disabled={idInterval!==-1}/>
        <Input id="session" label="Session Length" value={sessionValue} onChange={handlerChangeCount(setSessionValue)}  disabled={idInterval!==-1}/>
      </div>
      <div className="flex flex-col gap-2 text-white">
        <label className="text-center text-2xl" id="timer-label">{isBreak ? 'Break' : 'Session'}</label>
        <div id="time-left" className="text-4xl text-center">
          <ClockNumber value={minutes} />:<ClockNumber value={seconds} />
        </div>
        <div className="flex flex-row items-center justify-around">
          <button className="bg-transparent w-40 py-1 border border-white hover:bg-white hover:bg-opacity-30 text-white rounded" id="start_stop" onClick={handlerStartStop}>{ idInterval===-1 ? 'Start' : 'Stop' }</button>
          <button className="bg-transparent w-40 py-1 border border-white hover:bg-white hover:bg-opacity-30 text-white rounded" id="reset" onClick={handlerReset}>Reset</button>
        </div>
      </div>
      <audio id="beep" src="./beep.wav" ref={refAudio as LegacyRef<HTMLAudioElement>} onPlay={handlerPlay} />
    </div>
  </div>
}


