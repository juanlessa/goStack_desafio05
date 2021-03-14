import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    //transaction type = "income" or "outcome"
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid.');
    }
    // outcome should not be able to bigger then total balance
    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    ) {
      throw new Error('You do not have enough balance.');
    }
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
