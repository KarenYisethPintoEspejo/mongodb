// movis.js

import { ObjectId } from "mongodb";
import { connect } from "../../helpers/db/connect.js"


export class movis extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof movis.instance === 'object') {
            return movis.instance;
        }
        movis.instance = this;
        return this;
    }

    destructor() {
        movis.instancemovis=undefined
        connect.instanceConnect= undefined
    }


// 1)Contar el número total de copias de DVD disponibles en todos los registros:

async getCountDvd(){
    await this.conexion.connect();
    const collection = this.db.collection('movis');
    const data = await collection.aggregate(
        [
            {
              $unwind: "$format"
            },
            {
              $match: {
                "format.name": "dvd"
              }
            },
            {
              $group: {
                _id: "$format.name",
                cantidad: { $sum: "$format.copies" }
              }
            }
        ]
    ).toArray();
    await this.conexion.close();
    return {countByMoviDVD: data.length};
}

// 6)Listar todos los géneros de películas distintos:

    async getAllGenre(){
    await this.conexion.connect();
    const collection = this.db.collection('movis');
    const data = await collection.aggregate(
        [
            { $unwind: "$genre" },
            {
              $group: {
                _id: null,
                generos: { $addToSet: "$genre" }
              }
            },
            {
              $project: {
                _id: 0,
                generos: 1
              }
            }
        ]
    ).toArray();
    await this.conexion.close();
    return data;
}
}