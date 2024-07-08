import { movis } from "./js/model/movis.js";
let objMovis = new movis();

console.log(`-1. **Contar el número total de copias de DVD disponibles en todos los registros:**`,await objMovis.getDvdCopies()); //1
console.log(`-6. **Listar todos los géneros de películas distintos:**`,await objMovis.getAllGenreDistinc());//6
console.log(`-7. **Encontrar películas donde el actor con id 1 haya participado:**`,await objMovis.getMoviesAuthorId1());//7
console.log(`-8. **Calcular el valor total de todas las copias de DVD disponibles:**`,await objMovis.getValueCopiesDvd()) //8
console.log(`-9. **Encontrar todas las películas en las que John Doe ha actuado:**`,await objMovis.getAllMovisJohnDae() ) // 9
console.log(`-13. **Encontrar todas las películas en las que participan actores principales:**`,await objMovis.getMovisRolMajor())//13
console.log(`-14. **Encontrar el número total de premios que se han otorgado en todas las películas:**`,await objMovis.getAllAwards())//14
console.log(`-15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**`,await objMovis.getAllMovisJohnDaeBluray())//15
console.log(`-16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**`,await objMovis.getMovisScienceFictionAuthorId3()) //16
console.log( `-17. **Encontrar la película con más copias disponibles en formato DVD:**`,await objMovis.getMovieMostCopieDvd()) //17
console.log( `-19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**`,await objMovis.getValueCopiesBluray())//19
console.log(`-20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**`,await objMovis.getAllMovisAuthorId2()) //20
 
objMovis.destructor()





import {authors} from './js/model/authors.js'
let objAuthors = new authors();

console.log(`-2. **Encontrar todos los actores que han ganado premios Oscar:** `,await objAuthors.getAuthorsAwards())//2
console.log(`-3. **Encontrar la cantidad total de premios que ha ganado cada actor:**`,await objAuthors.getAwardsAuthors())//3
console.log(`-4. **Obtener todos los actores nacidos después de 1980:**`,await objAuthors.getAuthorWasBorn1980())//4
console.log(`-5. **Encontrar el actor con más premios:**`,await objAuthors.getAuthorMostAwards())//5
console.log(`-10. **Encontrar el número total de actores en la base de datos:**`,await objAuthors.getAuthorsDataBase())//10
console.log(`-11. **Encontrar la edad promedio de los actores en la base de datos:**`,await objAuthors.getAuthorsAverageAge())//11
console.log(`-12. **Encontrar todos los actores que tienen una cuenta de Instagram:**`,await objAuthors.getAuthorsWithInstragram())//12
console.log( `-18. **Encontrar todos los actores que han ganado premios después de 2015:**`,await objAuthors.getAllAuthorsAwardsAfter2015()) //18

objAuthors.destructor();