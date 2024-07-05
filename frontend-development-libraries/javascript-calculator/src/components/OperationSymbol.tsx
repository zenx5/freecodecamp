export default function OperationSymbol({ operation }:{ operation:number }) {
    const symbol = [
        '',
        '+',
        '-',
        '*',
        '/',
    ]

    return operation>0 && <span>{symbol[operation]}</span>
}