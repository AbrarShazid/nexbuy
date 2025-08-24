import { clientPromise } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)
    const users = db.collection("users")

    const existing = await users.findOne({ email })
    if (existing) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 422 })
    }

    const hashed = await bcrypt.hash(password, 12)
    await users.insertOne({
      name,
      email,
      password: hashed,      // extra field (adapter ignores it)
      emailVerified: null,   // adapter-compatible
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return new Response(JSON.stringify({ message: "User created" }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}
