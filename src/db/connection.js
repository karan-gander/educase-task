import mysql from 'mysql2/promise'


const connectToDB = async()=>{
    
    try {
        const connetion = await mysql.createConnection({
            host:'localhost',
            user:'school',
            password:'school@123',
            database:'school'
        })
        
        return connetion;

        // console.log(connetion);
    } catch (error) {
        console.log(error);
        throw error;
    }


}


export default connectToDB