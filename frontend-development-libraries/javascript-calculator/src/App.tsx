import { useEffect, useState } from "react";
import Numpad from "./components/Numpad";
import OperationSymbol from "./components/OperationSymbol";

const NONE = 0
const ADD = 1
const SUBTRACT = 2
const MULTIPLY = 3
const DIVIDE = 4

export default function App() {
  const [stack, setStack] = useState(0)
  const [fixStack, setFixStack] = useState(0)
  const [operation, setOperation] = useState(NONE)
  const [isFloating, setIsFloating] = useState(false)
  const [floatingPosition, setFloatingPosition] = useState(0)
  const [extraZeros, setExtraZeros] = useState("")
  const [negative, setNegative] = useState(false)

  const handlerClickPad = (number:number) => {
    if( stack.toString().length > 7 ) return
    setStack( prev => prev*(isFloating ? 1 : 10 ) + (negative ? -1 : 1)*number*Math.pow(10, -floatingPosition))
    setNegative(false)
    if( isFloating ) setFloatingPosition( prev => prev + 1 )
  }

  const handlerClear = () => {
    setStack(0)
    setFixStack(0)
    setOperation(NONE)
    setIsFloating(false)
    setFloatingPosition(0)
  }

  const handlerOperation = (typeOperation:number) => {
    if( operation !== NONE ){
      if( typeOperation===SUBTRACT && stack === 0 ) setNegative(true)
      else if(stack!==0){
        const [resultFixStack, resultStack] = evaluate(fixStack, stack, typeOperation)
        setFixStack( resultFixStack )
        setStack( resultStack )
      }
      else {
        setOperation(typeOperation)
        setNegative(false)
      }
    } else {
      setFixStack(stack)
      setStack(0)
      setOperation(typeOperation)
    }
    setIsFloating(false)
    setFloatingPosition(0)

  }

  const handlerEvaluate = ()=>{
    const [resultStack, resultFixStack] = evaluate(fixStack, stack, NONE)
    setFixStack( resultFixStack )
    setStack( resultStack )
    setIsFloating(false)
    setFloatingPosition(0)
  }


  const evaluate = (firstNumber:number, secondNumber:number, newOperation:number) => {
    const firstResult= (()=>{
      switch(operation) {
        case ADD: return firstNumber + secondNumber
        case SUBTRACT: return firstNumber - secondNumber
        case MULTIPLY: return firstNumber * secondNumber
        case DIVIDE: return firstNumber / secondNumber
        default: return firstNumber
      }
    })()
    const secondResult = operation===NONE ? secondNumber : 0
    setOperation(newOperation)
    return [firstResult, secondResult]
  }

  const handlerFloating = () => {
    setIsFloating( true )
    setFloatingPosition( prev => prev===0 ? 1 : prev )
  }


  useEffect(() => {

    const isFloatingNumber = stack.toString().includes('.')
    const countNumberAfterDot = isFloatingNumber ? stack.toString().split('.')[1].length : 0
    const maxNumberAfterDot = floatingPosition
    const zeroCount = maxNumberAfterDot - countNumberAfterDot

    const dot = isFloatingNumber ? "" : "."
    try{
      setExtraZeros( zeroCount ? dot + Array(zeroCount-1).fill("0").join("") : "" )
    }catch(err) {
      // nothing that see
    }
  },[floatingPosition, stack])


  return <div className="w-screen h-screen flex items-center justify-center">
    <div>
      <div>
        <div id="display" className="border-indigo-800 border-t-4 border-l-4 border-r-4 text-right w-full bg-slate-800 text-yellow-400 font-mono px-4 py-2 text-lg">
          {fixStack!==0 && fixStack.toString().slice(0,7)}
          <OperationSymbol operation={operation}/>
          { stack.toString().slice(0,7) }
          { extraZeros }
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-5 border-4 border-indigo-800 shadow-indigo-800 shadow-md">
        <button id="clear" onClick={handlerClear} className="col-span-2 bg-white text-indigo-800 hover:bg-indigo-500">Clear</button>
        <button
          id="divide"
          className="btn-second"
          onClick={()=>handlerOperation(DIVIDE)}
        >/</button>
        <button
          id="multiply"
          className="btn-second"
          onClick={()=>handlerOperation(MULTIPLY)}
        >*</button>
        <Numpad onClick={handlerClickPad} />
        <button
          id="subtract"
          className="btn-second"
          onClick={()=>handlerOperation(SUBTRACT)}
        >-</button>
        <button
          id="add"
          className="btn-second"
          onClick={()=>handlerOperation(ADD)}
        >+</button>
        <button
          id="equals"
          className="row-span-2 bg-green-700 hover:bg-green-600 text-white"
          onClick={handlerEvaluate}
        >=</button>
        <button id="zero" className="col-span-2 btn-main" onClick={()=>handlerClickPad(0)}>0</button>
        <button id="decimal" className="btn-main" onClick={handlerFloating}>.</button>
      </div>
    </div>
  </div>
}


