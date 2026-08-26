import { ITransaction } from "@/features/keuangan/types/keuangan";

export interface GroupedTransactions {
  date: string;
  displayDate: string;
  transactions: ITransaction[];
}

/**
 * Format tanggal dari Date object ke format yang lebih readable
 */
export function formatDisplayDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Reset time untuk perbandingan
  const dateToCompare = new Date(date);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  dateToCompare.setHours(0, 0, 0, 0);
  
  if (dateToCompare.getTime() === today.getTime()) {
    return "Hari Ini";
  } else if (dateToCompare.getTime() === yesterday.getTime()) {
    return "Kemarin";
  }
  
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  return `${day} ${months[month]} ${year}`;
}

/**
 * Group transaksi berdasarkan tanggal
 */
export function groupTransactionsByDate(transactions: ITransaction[]): GroupedTransactions[] {
  const grouped = transactions.reduce((acc, transaction) => {
    const dateKey = transaction.tanggal.toISOString().split('T')[0]; // YYYY-MM-DD format for grouping
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(transaction);
    
    return acc;
  }, {} as Record<string, ITransaction[]>);
  
  // Convert to array dan sort by date (descending)
  return Object.entries(grouped)
    .map(([dateKey, transactions]) => ({
      date: dateKey,
      displayDate: formatDisplayDate(new Date(dateKey)),
      transactions: transactions.sort((a, b) => b.id - a.id),
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Format nominal ke format Rupiah
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Hitung total saldo dari transaksi
 */
export function calculateBalance(transactions: ITransaction[]): number {
  return transactions.reduce((balance, transaction) => {
    if (transaction.type === "Penghasilan") {
      return balance + transaction.nominal;
    } else if (transaction.type === "Pengeluaran") {
      return balance - transaction.nominal;
    }
    return balance;
  }, 0);
}
