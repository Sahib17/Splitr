// POST   /expenses
// GET    /expenses
// GET    /expenses/:expenseId
// PUT    /expenses/:expenseId
// DELETE /expenses/:expenseId
// POST   /expenses/:expenseId/comments

const postExpense = async (req, res) => {};

const getExpenses = async (req, res) => {};

const getExpense = async (req, res) => {};

const patchExpense = async (req, res) => {};

const deleteExpense = async (req, res) => {};

const postComment = async (req, res) => {};

const distributeRemainder = (remainder, members) => {
  const remaining = remainder;
  return members.map((member, index) => {
    const extra = remaining > 0 ? 1 : 0;
    if (remaining > 0) remaining--;
    return {
      ...member,
      amountOwed: member.amountOwed + extra,
    };
  });
};

const splitWholeAmount = (totalAmount, members) => {
  const count = members.length;
  const baseAmount = Math.floor(totalAmount / count);
  let remainders = totalAmount % count;
  return members.map((member, index) => {
    const extra = remainder > 0 ? 1 : 0;
    if (remainder > 0) remainder--;
    return {
      ...member,
      amountOwed: baseAmount + extra,
    };
  });
};

const calculateSplit = (data) => {
  switch (data.options) {
    case "EQUALLY":
      const count = data.members.length;
      const baseAmount = Math.floor(totalAmount / count);
      let remainder = totalAmount % count;
      const membersWithBase = data.members.map((member) => ({
        ...member,
        amountOwed: baseAmount,
      }));
      const updatedMembers = distributeRemainder(remainder, membersWithBase);
      return {
        ...data,
        members: updatedMember,
      };
      break;

    case "UNEQUALLY":
      const totalAmountOwed = data.members.reduce(
        (sum, member) => sum + member.amountOwed,
        0,
      );
      if (totalAmountOwed !== data.totalAmount) {
        const error = new Error("Amounts in UNEQUALLY don't match totalAmount");
        error.statusCode = 400;
        throw error;
      }
      return {
        ...data,
        members: data.members.mao((member) => ({
          ...member,
          amountOwed: member.amountOwed,
        })),
      };

      break;

    case "PERCENTAGE":
      break;

    case "SHARES":
      break;

    case "ADJUSTMENT":
      break;

    default:
      break;
  }
};

export const expenseService = {
  postExpense,
  getExpenses,
  getExpense,
  patchExpense,
  deleteExpense,
  postComment,
  calculateSplit,
};
