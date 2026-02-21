import { logger } from "../config/logger.js"
import Group from "../models/Group.js"

const createGroup = async (id, body) => {
    const members = [...new Set ([id, ...body.members])];
    try{
        const group = await Group.create({
            createdBy: id,
            name: body.name,
            type: body.type,
            image: body.image,
            members,
        })
        return group;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

export const groupService = {
    createGroup,
}