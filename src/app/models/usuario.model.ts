import { environment } from 'src/environments/environment'

const base_url = environment.base_url

export class Usuario {
    map: any

    constructor(
        public email: string,
        public nombre: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public _id?: string,
    ){}

    get imgUrl(){

        if( !this.img ){
            return `${ base_url }/upload/usuarios/no-image`
        }

        if( this.img.includes( 'https' )){
            return this.img
        }
        
        if( this.img ){
            return `${ base_url }/upload/usuarios/${ this.img }`
        }
    }
}
    