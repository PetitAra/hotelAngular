import { Client } from "./client";
import { Hotel } from "./hotel";

export class Resa {

    id ?: number
    datedeb ?: Date
    datefin ?: Date
    numChambre ?: number
    client ?: Client
    hotel ?: Hotel

    constructor(_id ?: number,_datedeb ?: Date,_datefin ?: Date, _numChambre ?: number,_client ?: Client, _hotel ?: Hotel){
        this.id=_id
        this.datedeb=_datedeb
        this.datefin=_datefin
        this.numChambre=_numChambre
        this.client=_client
        this.hotel=_hotel
    }
}
