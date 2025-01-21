
interface InputProps {
    label: string,
    className?: string,
    placeholder?: string,
    reference: any
}

export function LabelledInput({label, className, placeholder, reference}: InputProps){
    return<div>
        <div className="w-full flex flex-col gap-1">
        <label className="text-gray-600">{label}</label>
        <input type="text" className="px-3 py-3 border-black border-[1px] rounded-md" ref={reference} placeholder={placeholder} />
        </div>
    </div>
}