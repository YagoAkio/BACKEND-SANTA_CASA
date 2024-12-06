import mysql from "mysql2/promise";
export default async function conectar(){
    if (global.poolConexoes) {
        return await global.poolConexoes.getConnection();//Código tratado como sincrono, será tratado na camada de controle
    }
    else {
        const pool = mysql.createPool({
            host: 'autorack.proxy.rlwy.net',
            port: '17615',
            user: 'root',
            password: 'zLFlVoikctGPfTNMMOgdxQSgJpbnQTCv',
            database: 'santa_casa',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // Máximo de conexões inativas; o valor padrão é o mesmo que "connectionLimit"
            idleTimeout: 60000, // Tempo limite das conexões inativas em milissegundos; o valor padrão é "60000"
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
        global.poolConexoes = pool;
        return await pool.getConnection();
    }
}