import mysql from 'mysql2/promise'


const connectToDB = async()=>{
    
    try {
        const connetion = await mysql.createConnection({
            host:process.env.DB_HOST||'localhost',
            user:process.env.DB_USER || 'school',
            password:process.env.DB_PASSWORD||'school@123',
            database:process.env.DB_NAME||'school'
        })
        
        return connetion;

        // console.log(connetion);
    } catch (error) {
        console.log(error);
        throw error;
    }


}


export default connectToDB