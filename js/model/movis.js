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

async getDvdCopies(){
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

    async getAllGenreDistinc(){
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

// 7)Encontrar películas donde el actor con id 1 haya participado:
    async getMoviesAuthorId1(){
        await this.conexion.connect();
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                  $unwind: "$character"
                },
                {
                  $match: {
                    "character.id_actor": 1
                  }
                },
                {
                  $project: {
                    pelicula: "$name"
                  }
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }


// 8)Calcular el valor total de todas las copias de DVD disponibles:
    async getValueCopiesDvd(){
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
                        _id: null,
                        totalValor: {
                          $sum: {
                            $multiply: [
                              "$format.copies",
                              "$format.value"
                            ]
                          }
                        }
                      }
                    },
                    {
                      $project: {
                        _id: 0,
                        totalValor: 1
                      }
                    }
                ]
            ).toArray();
            await this.conexion.close();
            return data;
        }


// 9)Encontrar todas las películas en las que John Doe ha actuado:
     async getAllMovisJohnDae(){
        await this.conexion.connect();
          const collection = this.db.collection('movis');
          const data = await collection.aggregate(
            [
                {
                  $unwind: "$character"
                },
                {
                  $lookup: {
                    from: "actor",
                    localField: "character.id_actor",
                    foreignField: "id_actor",
                    as: "actores"
                  }
                },
                {
                  $unwind: "$actores"
                },
                {
                  $match: {
                    "actores.full_name": "John Doe"
                  }
                },
                {
                  $project: {
                    _id: 1,
                    name: "$name"
                  }
                }
            ]
          ).toArray();
          await this.conexion.close();
          return data;
      }


// 13)Encontrar todas las películas en las que participan actores principales:
    async getMovisRolMajor(){
        await this.conexion.connect();
          const collection = this.db.collection('movis');
          const data = await collection.aggregate(
            [
                {
                  $match: {
                    "character.rol":"principal"
                  }
                }
            ]
          ).toArray();
          await this.conexion.close();
          return data;
      }

// 14)**Encontrar el número total de premios que se han otorgado en todas las películas:**
async getAllAwards(){
    await this.conexion.connect();
      const collection = this.db.collection('movis');
      const data = await collection.aggregate(
        [
            {
              $unwind: "$character"
            },
            {
              $lookup: {
                from: "authors",
                localField: "character.id_actor",
                foreignField: "id_actor",
                as: "character.id_actor"
              }
            },
              {
              $unwind: "$character.id_actor"
            },
              {
              $set: {
                totalPremios: {$size:"$character.id_actor.awards"}
              }
            },
            {
              $group: {
                _id: "$_id",
                nombre:{$first:"$name"},
               totalPremios:{$sum:"$totalPremios"}
              }
            },     
        ]
      ).toArray();
      await this.conexion.close();
      return data;
  }


// 15)**Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    async getAllMovisJohnDaeBluray(){
        await this.conexion.connect();
          const collection = this.db.collection('movis');
          const data = await collection.aggregate(
            [
                {
                      $unwind: "$format"
                },
                {
                  $match: {
                    "format.name":"Bluray"
                  }
                },
                {
                  $lookup: {
                    from: "authors",
                    localField: "character.id_actor",
                    foreignField: "id_actor",
                    as: "actor"
                  }
                },
                {
                  $unwind: "$actor"
                },
                {
                  $match: {
                    "actor.full_name":"John Doe"
                  }
                }
                
                
            ]
          ).toArray();
          await this.conexion.close();
          return data;
      }
  

// 16)**Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    async getMovisScienceFictionAuthorId3(){
    await this.conexion.connect();
      const collection = this.db.collection('movis');
      const data = await collection.aggregate(
        [
            {
              $unwind: "$genre"
            },
             {
               $match: {
                 genre:"Ciencia Ficción"
               }
             },
             {
               $match: {
                 "character.id_actor":3
               }
             }
        ]
      ).toArray();
      await this.conexion.close();
      return data;
  }


// 17)Encontrar la película con más copias disponibles en formato DVD:
    async getMovieMostCopieDvd(){
        await this.conexion.connect();
          const collection = this.db.collection('movis');
          const data = await collection.aggregate(
            [
                {
                  $unwind: "$format"
                },
                {
                  $match: {
                    "format.name":"dvd"
                  }
                },
                {
                  $sort: {
                    "format.copies": -1
                  }
                },
                {
                  $limit: 1
                }
            ]
          ).toArray();
          await this.conexion.close();
          return data;
      }


// 19)Calcular el valor total de todas las copias de Blu-ray disponibles:
   async getValueCopiesBluray(){
    await this.conexion.connect();
      const collection = this.db.collection('movis');
      const data = await collection.aggregate(
        [
            {
              $unwind: "$format"
            },
            {
              $match: {
                "format.name":"Bluray"
              }
            },
            {
              $group: {
                _id: null,
                totalValorBluray:{
                  $sum:{
                    $multiply:[
                      
                      "$format.value",
                      "$format.copies"
                    ]
                    
                  }
                }
              }
            },
            {
              $project: {
                _id:0
              }
            }
            
            
        ]
      ).toArray();
      await this.conexion.close();
      return data;
  }

  // 20)Encontrar todas las películas en las que el actor con id 2 haya participado:
async getAllMovisAuthorId2(){
    await this.conexion.connect();
      const collection = this.db.collection('movis');
      const data = await collection.aggregate(
        [
            {
              $match: {
                "character.id_actor":2
              }
            }
        ]
      ).toArray();
      await this.conexion.close();
      return data;
  }


}