export interface IModal {
    show:boolean,
    animate:boolean
}

export interface ICategoryOptions {
    id:number,
    text: string, 
    value: number
}

export interface IExpense {
    id:null,
    name:string,
    quantity:number,
    category:string,
    date:number
}
