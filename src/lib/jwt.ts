import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY

export const generateToken = (username: string) => {
    const token = jwt.sign({ username }, SECRET_KEY!, { expiresIn: "7d" })

    return token
}

export const decodeToken = (token: string) => {
    const data = jwt.decode(token)

    return data
}