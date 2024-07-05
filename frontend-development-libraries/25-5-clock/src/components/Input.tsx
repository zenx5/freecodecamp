
interface PropInput {
    id: string,
    label: string,
    value: number,
    min?: number,
    max?: number,
    disabled?: boolean,
    onChange: (value:number) => void
}

export default function Input({ id, label, value, onChange, disabled }:PropInput) {

    const handlerStep = (step:number) => () => {
        onChange && onChange( value + step )
    }

    return <div className="border border-white rounded flex flex-col gap-2 px-4 py-2 text-white">
        <div id={`${id}-label`}>{ label }</div>
        <div className="flex flex-row items-center justify-center">
            <button id={`${id}-decrement`} disabled={disabled} onClick={handlerStep(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
            </button>
            <span  id={`${id}-length`} className="bg-transparent text-white font-extrabold text-xl w-10 text-center">{ value }</span>
            <button id={`${id}-increment`} disabled={disabled} onClick={handlerStep(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    </div>
}