
interface AccountCardProps{
    accountName: string,
    accountType: string
}

export function AccountCard({accountName, accountType}: AccountCardProps){
    return<div>
        <div className="bg-green-400 rounded-xl h-52 w-52 p-4 flex flex-col justify-between cursor-pointer">
            <div className="rounded-full w-10 h-10 bg-gray-300 flex justify-center items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/924/924961.png" className="w-7" alt="" />
            </div>
            <div>
                <h2 className="text-2xl font-semibold">{accountName}</h2>
                <span className="text-black">{accountType}</span>
            </div>
        </div>
    </div>
}