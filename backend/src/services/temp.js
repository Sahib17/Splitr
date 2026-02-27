// POST   /expenses
// GET    /expenses
// GET    /expenses/:expenseId
// PUT    /expenses/:expenseId
// DELETE /expenses/:expenseId
// POST   /expenses/:expenseId/comments

const postExpense = async (req, res) => {
  
};

const getExpenses = async (req, res) => {};

const getExpense = async (req, res) => {};

const patchExpense = async (req, res) => {};

const deleteExpense = async (req, res) => {};

const postComment = async (req, res) => {};

const distributeRemainder = (remainder, members) => {
  let remaining = remainder;

  return members.map(member => {
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

const calculateSplit = (paidBy, members, options) => {
  switch (options) {
    case "EQUALLY":
      return equalSplit(paidBy, members);

    case "UNEQUALLY":
      return unequalSplit(paidBy, members);

    case "PERCENTAGE":
      return percentageSplit(paidBy, members);

    case "SHARES":
    return sharesSplit(paidBy, members);

    case "ADJUSTMENT":
      return adjustmentSplit(paidBy, members);

    default:
      break;
  }
};

const equalSplit = (paidBy, members) => {
  const count = members.length;
  const totalAmount = paidBy.reduce((sum, entry) => {
    return sum + entry.amount;
  }, 0)
  const baseAmount = Math.floor(totalAmount / count);
  let remainder = totalAmount % count;
  const membersWithBase = members.map((member) => ({
    ...member,
    amountOwed: baseAmount,
  }));
  const membersWithOwed = distributeRemainder(remainder, membersWithBase);
  const membersWithPaid = membersWithOwed.map(member => {
    const paidEntry = paidBy.find(p => p.user.toString() === member.user.toString())

    const amountPaid = paidEntry ? paidEntry.amount : 0;

    return {
      ...member,
      amountPaid
    }
  })
  const membersWithBalance = membersWithPaid.map(member => ({
    ...member,
    balance: member.amountPaid - member.amountOwed,
  }))
  const creditors = membersWithBalance.filter(m => m.balance > 0)
  const debtors = membersWithBalance.filter(m => m.balance < 0)

  const settlements = settlement(creditors, debtors)



  console.log("paidBy:", paidBy)
console.log("members:", members)
  console.log({settlement: settlements, creditors: creditors, debtors: debtors, membersWithBalance: membersWithBalance});
  return {
  settlements,
  creditors,
  debtors,
  membersWithBalance
};
}

const settlement = (creditors, debtors) => {
  const settlements = [];
  for (const debtor of debtors) {
    let debt = -debtor.balance;

    for (const creditor of creditors) {
      if (creditor.balance === 0) continue;

      const amount = Math.min(debt, creditor.balance);

      settlements.push({
        from: debtor.user,
        to: creditor.user,
        amount,
      })

      creditor.balance -= amount,
      debt -= amount
      if (debt === 0) break;
    }
  }
  return settlements;
}

const getTotalAmount = () => {

}

const unequalSplit = (data) => {
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
        members: data.members.map((member) => ({
          ...member,
          amountOwed: member.amountOwed,
        })),
      };
}

const percentageSplit = (data) => {
  
}

const sharesSplit = (data) => {

}

const adjustmentSplit = (data) => {

}

export const expenseService = {
  postExpense,
  getExpenses,
  getExpense,
  patchExpense,
  deleteExpense,
  postComment,
  calculateSplit,
};
