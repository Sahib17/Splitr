import jwt from "jsonwebtoken"
import env from "../config/env"

const auth = (email, userId) => {
    const token = jwt.sign({email, userid}, env.JWT_SECRET);
    return token;
}

export const authValidator = [

]