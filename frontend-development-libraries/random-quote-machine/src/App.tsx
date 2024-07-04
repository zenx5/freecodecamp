import { useEffect, useState } from "react"

interface QuoteType {
  content: string,
  author: string
}


export default function App() {
  const [quote, setQuote] = useState<QuoteType>()
  const [share, setShare] = useState("")

  useEffect(()=>{

    setQuote({
      content: "I'm Batman",
      author: "Batman"
    })


  },[])

  useEffect(()=>{
    setShare(`"${quote?.content}" ${quote?.author}`)
  },[quote])

  const handlerNewQuote = () => {
    setQuote({
      content: "Save to Martha",
      author: "Batman"
    })
  }


  return <div className="w-screen h-screen flex items-center justify-center bg-slate-900 relative">
    <div id="quote-box" className="bg-black text-white p-10 rounded-lg w-1/2 flex flex-col gap-2 relative">
      <span id="text">"{quote?.content}"</span>
      <small id="author" className="w-full text-right italic">{quote?.author}</small>
      <div className="flex flex-row justify-between mt-5 items-center">
        <span className="relative group p-1">
          <a href={"https://twitter.com/intent/tweet?text=" + share } id="tweet-quote" target="_blank" className="border border-white py-2 px-4 rounded hover:bg-white hover:text-black">Tweet</a>
          <a href="" className="absolute hidden group-hover:block group-hover:blur opacity-30 top-9 left-0 border py-1 px-4 rounded bg-white text-black">Tweet</a>
        </span>
        <button id="new-quote" className="bg-green-500 py-1 px-4 text-white rounded hover:bg-green-400 shadow-lg shadow-green-800 hover:shadow-xl hover:shadow-green-700" onClick={handlerNewQuote}>New quote</button>
      </div>
    </div>
  </div>
}
