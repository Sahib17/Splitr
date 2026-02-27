// POST     /expenses
// GET      /expenses
// GET      /expenses/:expenseId
// PATCH    /expenses/:expenseId
// DELETE   /expenses/:expenseId
// POST     /expenses/:expenseId/comments

import { expenseService } from "../services/expense.service.js";
import { expenseValidator } from "../validators/expense.validator.js";

export const postExpense = async (req, res) => {
  try {
    const result = expenseValidator.postExpense.safeParse(req.body);
    console.log(result.members);
    
    if (!result.success) {
      return res
        .status(400)
        .json({ errors: result.error.flatten().fieldErrors });
    }
    const validatedData = result.data;
    const expense = expenseService.calculateSplit(validatedData.paidBy, validatedData.members, validatedData.options)


console.log("expense: ", expense);
return res.status(200).json({success: true, expense})












    // const expense = await expenseService.postExpense(req.user.userId);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const result = await expenseService.getExpenses(sampleData);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getExpense = async (req, res) => {
  try {
    const result = await expenseService.getExpense(sampleData);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const patchExpense = async (req, res) => {
  try {
    const result = await expenseService.patchExpense(sampleData);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const result = await expenseService.deleteExpense(sampleData);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const postComment = async (req, res) => {
  try {
    const result = await expenseService.postComment(sampleData);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};
