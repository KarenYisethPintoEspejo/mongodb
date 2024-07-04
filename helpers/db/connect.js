import {MongoClient} from 'mongodb';

export class connect {
    static instance = null;
    db = null;
    #host = null;
    #pass
    #dbName
    static async getinstance({host, user, pass, port,cluster, dbName}=
        {host: "mongodb://", 
            user: "mongo", 
            pass: "PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF", 
            port: 47797, 
            cluster: "monorail.proxy.rlwy.net", 
            dbName: "test"}
        ){
        if(connect.instance === null){
            connect.instance = new connect();
            connect.instance.host = host;
            connect.instance.user = user;
            connect.instance.pass = pass;
            connect.instance.port = port;
            connect.instance.cluster = cluster;
            connect.instance.dbName = dbName;
        }
        await connect.instance.#open();
        return connect.instance;
    }
    set host(host){
        this.#host = host;
    }
    set pass(pass){
        this.#pass = pass;
    }
    set dbName(dbName){
        this.#dbName = dbName;
    }
    async #open(){
        console.log("Entre");
        // mongodb://mongo:PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF@monorail.proxy.rlwy.net:47797/
        let url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
        this.conexion = new MongoClient(url);
        await this.conexion.connect();
        console.log("Mensaje de la coexion ");
        this.db = this.conexion.db(this.dbName);
    }
}