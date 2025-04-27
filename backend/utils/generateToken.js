import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: '30d',
    })

    res.cookie('jwt-netflix', token, {
        httpOnly: true,
        secure: ENV_VARS.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    return token;

}
