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
    showCart:boolean,
    setShowCart:React.Dispatch<React.SetStateAction<boolean>>
    cartItem:TCartItem[] ,
    setCartItem:React.Dispatch<React.SetStateAction<TCartItem[] >>
};

export type TInfoProvider={
    _id?:number,
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

export type TCartItem={
    id:number,
    providerId:number
    name: string,
    category:string,
    stRooms?:number,
    dlRooms?:number,
    stStartDate?:Date,
    stEndDate?:Date,
    dlStartDate?:Date,
    dlEndDate?:Date,
    standardAmt?:number,
    deluxeAmt?:number,
    halls?:number,
    date?:Date,
    price?:number,
    bsGuests?:number,
    prGuests?:number,
    prPGuests?:number,
    basicAmt?:number,
    premiumAmt?:number,
    premiumPlusAmt?:number,
    bsStartDate?:Date,
    bsEndDate?:Date,
    prStartDate?:Date,
    prEndDate?:Date,
    prPStartDate?:Date,
    prPEndDate?:Date,
}