// ******HELPER FUNCTIONS******
/**
 * 
 * @param {*} membersWithPaid 
 * @returns
 */
export const attachBalances = (withPaid) => {
    return withPaid.map((member) => ({
    ...member,
    balance: member.amountPaid - member.amountOwed,
  }));
}

export const attachPayments = (withOwed, paidBy) => {
    return withOwed.map((member) => {
    const paidEntry = paidBy.find(
      (p) => p.user.toString() === member.user.toString(),
    );

    const amountPaid = paidEntry ? paidEntry.amount : 0;

    return {
      ...member,
      amountPaid,
    };
  });
}

export const distributeRemainder = (remainder, membersWithBase) => {
  let remaining = remainder;

  return membersWithBase.map((member) => {
    const extra = remaining > 0 ? 1 : 0;
    if (remaining > 0) remaining--;

    return {
      ...member,
      amountOwed: member.amountOwed + extra,
    };
  });
};

export const settlement = (creditors, debtors) => {
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
      });

      ((creditor.balance -= amount), (debt -= amount));
      if (debt === 0) break;
    }
  }
  return settlements;
};
