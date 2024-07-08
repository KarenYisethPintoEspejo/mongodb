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

}