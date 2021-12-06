export class Client {

    id ?: number
    nomComplet ?: string
    adresse ?: string
    email ?: string
    telephone ?: number
    
    
    constructor( _id ?: number, _nomComplet ?: string, _email ?: string , _telephone ?: number, _adresse ?: string ){
        this.id = _id
        this.nomComplet = _nomComplet
        this.email = _email
        this.telephone = _telephone
        this.adresse = _adresse
    }
}
