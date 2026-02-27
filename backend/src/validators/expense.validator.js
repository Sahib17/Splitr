import mongoose from "mongoose";
import { z } from "zod";
import { objectId } from "./common.validator.js";

export const memberSchema = z.object({
    user: objectId,
    amountOwed: z.number().min(0).default(0),
    weight: z.number().min(0).default(0),
})

export const paidBy = z.object({
    user: objectId,
    amount: z.number().min(1)
})

const postExpense = z.object({
    name: z.string().trim().min(1, "Name is required"),
    paidBy: z.array(paidBy),
    members: z.array(memberSchema).min(1),
    // totalAmount: z.number().min(0),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    options: z.enum(["EQUALLY", "UNEQUALLY", "PERCENTAGE", "SHARES", "ADJUSTMENT"]).default("EQUALLY"),
})

export const expenseValidator = {
    postExpense,
}