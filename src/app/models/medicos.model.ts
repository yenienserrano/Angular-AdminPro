import { Hospital } from './hospitales.model';

interface _MedicosUser{
    _id: string;
    img: string;
    nombre: string;
}

export class Medicos {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _MedicosUser,
        public hospital?: Hospital
    ){}
}