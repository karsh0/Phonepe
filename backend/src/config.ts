import { accountModel } from "./db";


export async function randomNumber(){
    const number = Math.floor(Math.random()*10);

    const accounts = await accountModel.find();
    accounts.map(x => {
        if(x.accountNumber == number){
            randomNumber();
        }
    })
    return number;
}