import { useState } from 'react';

export function useKeuangan()
{
    const [transactions, setTransactions] = useState<Transaction[]>([]);
}