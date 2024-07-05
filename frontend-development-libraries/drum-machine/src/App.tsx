import { useEffect, useState } from "react"

interface EventWithKey extends Event {
  key: string
}

export default function App() {
  const [current, setCurrent] = useState<{ label:string, src:string, description:string }>()

  useEffect(()=>{
    function keyListener(event:EventWithKey) {
      const key = event?.key as string
      const button = document.querySelector(`#${key.toUpperCase()}`) as HTMLButtonElement
      button.click()
    }
    document.body.addEventListener('keypress',keyListener)

    return () => document.body.removeEventListener('keypress', keyListener)
  },[])

  const pads = [
    { label:"Q", src:'./Heater-1.mp3', description:'Heater 1' },
    { label:"W", src:'./Heater-2.mp3', description:'Heater 2' },
    { label:"E", src:'./Heater-3.mp3', description:'Heater 3' },
    { label:"A", src:'./Heater-4_1.mp3', description:'Heater 4' },
    { label:"S", src:'./Heater-6.mp3', description:'Clap' },
    { label:"D", src:'./Dsc_Oh.mp3', description:'Open-HH' },
    { label:"Z", src:'./Kick_n_Hat.mp3', description:'Kick-n\'-Hat' },
    { label:"X", src:'./RP4_KICK_1.mp3', description:'Kick' },
    { label:"C", src:'./Cev_H2.mp3', description:'Close-HH' },
  ]

  const handlerPlay = (key:string) => {
    setCurrent( pads.find( pad => pad.label===key) )
    const audio = document.querySelector(`#${key} audio`) as HTMLAudioElement
    audio.play()
  }

  return <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
    <div id="drum-machine" className="flex flex-row gap-4 border border-blue-200 shadow-md shadow-blue-400 bg-white items-center p-2">
      <div className="grid grid-cols-3 grid-rows-3 p-4 gap-4">
        {pads.map( pad => <button key={pad.label} id={pad.label} className="drum-pad bg-blue-500 text-white p-2 rounded w-20 h-20 hover:shadow-blue-400 shadow-lg shadow-slate-400 active:bg-blue-600 active:shadow active:shadow-blue-800" onClick={()=>handlerPlay(pad.label)}>
          { pad.label }
          <audio src={pad.src} className="clip" id={pad.label}/>
        </button> )}
      </div>
      <div className="h-full block ">
        <div id="display" className="py-2 px-5 h-12 w-60 text-lg flex items-center justify-center text-center rounded bg-blue-200 shadow-inner shadow-blue-400 text-blue-950">{current?.description}</div>
      </div>
    </div>

  </div>
}