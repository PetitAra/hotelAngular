export class Hotel {
    
    id ?: number
    nom ?: string
    etoiles ?: number
    adresse ?: string
    telephone ?: number
    email ?: string
    ville ?: string

    constructor(_id ?: number,_nom ?: string, _etoiles ?: number, _adresse ?: string, _telephone ?: number, _email ?: string, _ville ?: string){
        this.id= _id
        this.nom=_nom
        this.etoiles=_etoiles
        this.adresse = _adresse
        this.telephone=_telephone
        this.email=_email
        this.ville=_ville
    }


}
