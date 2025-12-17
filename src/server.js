import http from "node:http"
import { database } from "./middlewares/database.js"
import { Pet } from "./middlewares/pet-schedules.js"


const port = 3000

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': 2592000,
    'Access-Control-Allow-Headers': '*'
}

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    if (url === '/petSchedules' && method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
        return
    }

    if (method === "GET" && url === "/petSchedules") {
        try {
            const petSchedules = await Pet.find()

            return res
                .writeHead(200, headers)
                .end(JSON.stringify(petSchedules))

        } catch (error) {
            console.log(error)
            return res
                .writeHead(400, { "Content-type": "application/json" })
                .end(JSON.stringify({ error: "Erro ao buscar lista de agendamentos" }))
        }
    } else if (method === "POST" && url === "/petSchedules") {
        try {
            const buffers = []

            for await (const chunk of req) {
                buffers.push(chunk)
            }

            let body = JSON.parse(Buffer.concat(buffers).toString())

            const newPetSchedules = await Pet.create(body)

            return res
                .writeHead(201, headers)
                .end(JSON.stringify(newPetSchedules))

        } catch (error) {
            return res
                .writeHead(400, { "Content-type": "application/json" })
                .end(JSON.stringify({ error: "Não foi possível criar novo agendamento" }))
        }
    } else if (method === "DELETE" && url.startsWith("/petSchedules")) {

        try {
            const [, , id] = url.split("/")

            const deletPetSchedule = await Pet.findByIdAndDelete(id)

            if (!deletPetSchedule) {
                return res
                    .writeHead(400, { "Contet-type": "application/json" })
                    .end(JSON.stringify({ error: "Agendamento não encontrado" }))
            }

            return res
                .writeHead(200, { "Contet-type": "application/json" })
                .end()
        } catch (error) {
            return res
                .writeHead(400, { "Contet-type": "application/json" })
                .end(JSON.stringify({ error: "Não foi possível excluir o agendamento" }))
        }


    } else if (method === "PUT" && url.startsWith("/petSchedules")) {

        try {

            const buffers = []

            for await (const chunk of req) {
                buffers.push(chunk)
            }

            let body = JSON.parse(Buffer.concat(buffers).toString())

            const [, , id] = url.split("/")

            const putPetSchedule = await Pet.findByIdAndUpdate(id, body, { new: true })

            if (!putPetSchedule) {
                return res
                    .writeHead(400, { "Contet-type": "application/json" })
                    .end(JSON.stringify({ error: "Agendamento não encontrado" }))
            }

            return res
                .writeHead(200, { "Contet-type": "application/json" })
                .end(JSON.stringify(putPetSchedule))
        } catch (error) {
            return res
                .writeHead(400, { "Contet-type": "application/json" })
                .end(JSON.stringify({ error: "Não foi possível editar o agendamento" }))
        }

    } else {
        return res
            .writeHead(404, { "Contet-type": "application/json" })
            .end(JSON.stringify({ error: "Página não encontrada" }))
    }

})

const startServer = () => {
    server.listen(port, async () => {

        await database()
        console.log("Servidor rodando")
    })
}

startServer()