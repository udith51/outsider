export type TRegForm={
    name:string,
    phone:string,
    email:string,
    password:string,
    category?:string
}

export type TLogForm={
    email:string,
    password:string
}

export type TContextType = {
    path: string;
    setPath: React.Dispatch<React.SetStateAction<string>>,
    accMode:string,
    setAccMode:React.Dispatch<React.SetStateAction<string>>,
    userType:string,
    setUserType:React.Dispatch<React.SetStateAction<string>>
    activeTab:string,
    setActiveTab:React.Dispatch<React.SetStateAction<string>>
};

export type TInfoProvider={
    _id?:Number,
    id?:number,
    name?:string,
    city?:string,
    state?:string,
    assured?:number

    add1?:string,
    add2?:string,
    zipcode?:number,
    accomodation?:number,
    price?:number,
    facilities?: string[],
    pictures?:string[],

    basicAmt?:number,
    premiumAmt?: number,
    premiumPlusAmt?: number,
    mocktailAmt?: number,

    standardAmt?: number,
    deluxeAmt?: number,
    standardRooms?: number,
    deluxeRooms?:number
}   