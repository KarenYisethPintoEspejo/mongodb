# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
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
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
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
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
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
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
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
   ```

5. **Encontrar el actor con más premios:**

   ```javascript
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
       $sort: {
         total: -1
       }
     },
     {
       $limit: 1
     }
   ]
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
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
   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
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
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
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
   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
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
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    [
      {
        $group: {
          _id: null,
          numero_total: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id: 0,
          numero_total: 1
        }
      }
    ]
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    [
      {
          $addFields: {
            age: {
              $dateDiff: {
                startDate: { $dateFromString: {
                  dateString: '$date_of_birth',
                  format: '%Y-%m-%d'
                }},
                endDate: new Date(),
                unit: "year"
              }
            }
          }
      },
        {
          $group: {
            _id: null,
            avg_age_actors: {$avg: '$age'}
          }
        }
    ]
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    [
          {
            $match: {
              "social_media.instagram":{$exists:1}
            }
          }
    ]
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    [
          {
            $match: {
              "character.rol":"principal"
            }
          }
    ]
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
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
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
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
    ```

16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    ```javascript
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
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
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
    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    [
          {
            $unwind: "$awards"
          },
          {
            $match: {
              "awards.year":{$gt:2015}
            }
          }
    ]
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
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
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    [
          {
            $match: {
              "character.id_actor":2
            }
          }
    ]
    ```

