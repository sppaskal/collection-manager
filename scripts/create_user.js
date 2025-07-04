import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../config/config.js'

const uri = config.dbFullUri
const username = 'user1' // enter new username
const password = 'password123' // enter new user password

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})
const User = mongoose.model('user', userSchema)

async function createUser () {
  await mongoose.connect(uri)
  const hash = await bcrypt.hash(password, 10)
  await User.create({ username, password: hash })
  console.log('User created:', username)
  await mongoose.disconnect()
}

createUser()
