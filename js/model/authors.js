import { connect } from "../../helpers/db/connect.js"


export class authors extends connect{
    static instanceauthors;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof authors.instanceauthors === 'object') {
            return authors.instanceauthors;
        }
        authors.instanceauthors = this;
        return this;
    }


    destructor() {
      authors.instanceauthors=undefined
      connect.instanceConnect= undefined
}


// 2)Encontrar todos los actores que han ganado premios Oscar:
    async getAuthorsAwards(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  $unwind: "$awards"
                },
                {
                  $match: {
                    "awards.name": "Oscar Award"
                  }
                },
                {
                  $project: {
                    nombre: "$full_name"
                  }
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

// 3) Encontrar la cantidad total de premios que ha ganado cada actor:

 async getAwardsAuthors(){
    await this.conexion.connect();
    const collection = this.db.collection('authors');
    const data = await collection.aggregate(
        [
            {
              $unwind: "$awards"
            },
            {
              $group: {
                _id: "$_id",
                nombre: { $first: "$full_name" },
                total: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 1,
                name: "$nombre",
                total: 1
              }
            }
        ]
    ).toArray();
    await this.conexion.close();
    return data;
}


// 4) Obtener todos los actores nacidos después de 1980:
    async getAuthorWasBorn1980(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  $match: {
                    date_of_birth: { $gt: "1980-12-30" }
                  }
                },
                {
                  $project: {
                    full_name: 1
                  }
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

}