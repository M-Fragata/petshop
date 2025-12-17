import mongoose from 'mongoose'

export const database = async () => {

    const uri = "mongodb+srv://Fragata:m4th3us1@cluster0.bdixruu.mongodb.net/?appName=Cluster0"

    try {
        await mongoose.connect(uri)   
        console.log("Conectado ao banco de dados MongoDB") 
    } catch (error) {
        console.log(error)
    }


}