
interface ButtonProps{
    text:string,
    onClick?: ()=> void,
    variant?: "primary" | "secondary",
    rounded?: boolean  
}


export function Button({text, onClick, variant, rounded}: ButtonProps){
    const variantStyles = variant === "primary" ? "bg-[#5f259f] text-white" : "bg-green-400 text-black";
    return <div className={`${rounded? "rounded-full w-full" : "rounded-xl "} ${variantStyles}` +" w-fit px-12 py-3 rounded-xl text-center text-xl font-semibold cursor-pointer"} onClick={onClick}>
        {text}
    </div>
}