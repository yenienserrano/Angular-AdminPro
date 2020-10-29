
interface _HospitalUser{
    _id: string;
    img: string;
    nombre: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public _id?: string,
        public usuario?: _HospitalUser,
        public img?: string
    ){}
}