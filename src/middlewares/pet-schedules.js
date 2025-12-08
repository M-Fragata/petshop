import mongoose from "mongoose"

const petSchema = mongoose.Schema({
    clientName:{
        type: String,
        require: true
    },
    petName:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    service: {
        type: String,
        require: true
    },
    when: {
        type: String,
        require: true
    },
    hour: {
        type: String,
        require: true
    }
})

export const Pet = mongoose.model("Pet", petSchema)