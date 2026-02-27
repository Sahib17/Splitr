const equalSplit = (paidBy, members) => {

    // BASIC LOGIC
  const count = members.length;                             // count, totalAmount => baseAmount, remainder => membersWithBase => membersWithOwed, membersWithPaid => membersWithBalance => creditors, debitors, => settlements
  const totalAmount = paidBy.reduce((sum, e) => {
    return sum + e.amount;
  }, 0);

  const baseAmount = Math.floor(totalAmount / count);
  let remainder = totalAmount % count;
  const membersWithBase = members.map((m) => ({
    ...m,
    amountOwed: baseAmount,
  }));

  // common from here
  const withOwed = distributeRemainder(remainder, membersWithBase);
  const withPaid = attachPayments(withOwed, paidBy);
  const withBalance = attachBalances(withPaid)
  const creditors = withBalance.filter((m) => m.balance > 0);
  const debtors = withBalance.filter((m) => m.balance < 0);


  // settlements function
  const settlements = settlement(creditors, debtors);

  return {
    settlements,
    creditors,
    debtors,
    withBalance,
  };
};

// ******HELPER FUNCTIONS******
const attachBalances = (membersWithPaid) => {
    return membersWithPaid.map((member) => ({
    ...member,
    balance: member.amountPaid - member.amountOwed,
  }));
}

const attachPayments = (membersWithOwed, paidBy) => {
    return membersWithOwed.map((member) => {
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

const distributeRemainder = (remainder, members) => {
  let remaining = remainder;

  return members.map((member) => {
    const extra = remaining > 0 ? 1 : 0;
    if (remaining > 0) remaining--;

    return {
      ...member,
      amountOwed: member.amountOwed + extra,
    };
  });
};

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
      });

      ((creditor.balance -= amount), (debt -= amount));
      if (debt === 0) break;
    }
  }
  return settlements;
};
