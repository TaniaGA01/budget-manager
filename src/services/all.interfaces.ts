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
    id:string,
    name:string,
    quantity:number,
    category:string,
    date:number
}

export interface IIconsCollection  {
    id:number,
    name:string,
    icon:any
}
