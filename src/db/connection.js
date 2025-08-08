import mysql from 'mysql2/promise'


const connectToDB = async()=>{
    
    try {
        const connetion = await mysql.createConnection({
            host:'localhost'||process.env.DB_HOST,
            user:'school'||process.env.DB_USER,
            password:'school@123'||process.env.DB_PASSWORD,
            database:'school'||process.env.DB_NAME
        })
        
        return connetion;

        // console.log(connetion);
    } catch (error) {
        console.log(error);
        throw error;
    }


}


export default connectToDB