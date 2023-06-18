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
};