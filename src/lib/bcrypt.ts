import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)

    return isMatch
}

