import { MongoClient } from "mongodb"

const uri = "mongodb+srv://Banco:senha@cluster0.rjwmleo.mongodb.net/"
const options = {}

let client
let clientPromise

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("PIG21") //  banco
    const collection = db.collection("doencas") // coleção

    if (req.method === "GET") {
      const doencas = await collection.find().toArray()
      res.status(200).json(doencas)
    } else {
      res.status(405).json({ error: "Método não permitido" })
    }
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error)
    res.status(500).json({ error: "Erro interno do servidor" })
  }
}