
interface ButtonProps{
    text:string,
    onClick: ()=> void,
    variant: "primary" | "secondary"  
}

export function Button({text, onClick, variant}: ButtonProps){
    return <div className="px-3 py-3 rounded-xl bg-blue-400 text-center text-xl font-semibold cursor-pointer" onClick={onClick}>
        {text}
    </div>
}