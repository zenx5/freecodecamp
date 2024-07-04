import { useEffect, useState } from "react"
import { parse } from 'marked'
import textDefault from './default.txt'


export default function App() {
  const [content, setContent] = useState("")
  const [parsed, setParsed] = useState("")

  useEffect(()=>{
    fetch(textDefault)
    .then( response => response.text() )
    .then( text => setContent(text) )
  },[])

  useEffect(()=>{
    (async ()=>{
      setParsed( await parse(content, { gfm:true, breaks:true }) )
    })()
  },[content])


  const handlerChangeContent = async (event:{ target: { value:string }}) => {
    setContent( event.target.value )
    setParsed( await parse(event.target.value, { gfm:true, breaks:true }) )
  }

  return <div className="w-screen h-min-screen flex items-center flex-col justify-center gap-8 pt-20">
    <div className="bg-slate-300 max-w-4xl w-full h-60 flex flex-col border border-black shadow-xl shadow-slate-800">
      <label className="border-b border-black border-opacity-50 py-2 px-4 font-bold text-lg">Editor</label>
      <textarea id="editor" className="bg-slate-300 w-full h-60 p-4" value={content} onChange={handlerChangeContent}></textarea>
    </div>
    <div className="bg-slate-300 max-w-4xl w-full flex flex-col   shadow-xl shadow-slate-800 border border-black">
      <label className="border-b border-black border-opacity-50 py-2 px-4 font-bold text-lg">Preview</label>
      <div id="preview" className="bg-slate-300 p-4" dangerouslySetInnerHTML={{ __html:parsed }} />
      {/* <div id="preview" className="bg-slate-300 p-4">{parsed}</div> */}
    </div>
  </div>
}


