import { ObjectId } from "mongodb";
import {connect} from "../../helpers/db/connect.js"

export const getCountDvd = async() => { 

    let {db, conexion} = await connect.getinstance();
    const collection = db.collection('movis');
    const data = await collection.find([
        {
            format: {
                $elemMatch: 
                {name: {$eq: "dvd"}}
            }
        }
    ]).toArray();
    conexion.close();
    return {countByMoviDVD: data.length};
}