export default function Numpad({ onClick }:{ onClick:(number:number)=>void }){

    const handlerClick = (number:number) => {
        onClick && onClick(number)
    }

    return <div className="grid grid-cols-3 grid-rows-3 col-span-3 row-span-3">
        <button className="btn-main" onClick={()=>handlerClick(7)} id="seven">7</button>
        <button className="btn-main" onClick={()=>handlerClick(8)} id="eight">8</button>
        <button className="btn-main" onClick={()=>handlerClick(9)} id="nine">9</button>
        <button className="btn-main" onClick={()=>handlerClick(4)} id="four">4</button>
        <button className="btn-main" onClick={()=>handlerClick(5)} id="five">5</button>
        <button className="btn-main" onClick={()=>handlerClick(6)} id="six">6</button>
        <button className="btn-main" onClick={()=>handlerClick(1)} id="one">1</button>
        <button className="btn-main" onClick={()=>handlerClick(2)} id="two">2</button>
        <button className="btn-main" onClick={()=>handlerClick(3)} id="three">3</button>
    </div>
}