import type { Invoice } from '~/types'

export const invoices: Invoice[] = [
  {
    id: 'INV-2024-0089',
    customerId: 'cust-001',
    customerName: 'Sarah Chen',
    amount: 54000,
    status: 'paid',
    issuedAt: '2025-09-01',
    dueDate: '2025-09-30',
    paidAt: '2025-09-15'
  },
  {
    id: 'INV-2024-0102',
    customerId: 'cust-003',
    customerName: 'Priya Patel',
    amount: 98400,
    status: 'overdue',
    issuedAt: '2026-03-01',
    dueDate: '2026-03-15',
    paidAt: null
  },
  {
    id: 'INV-2024-0098',
    customerId: 'cust-002',
    customerName: 'James Morton',
    amount: 1200,
    status: 'paid',
    issuedAt: '2026-03-01',
    dueDate: '2026-03-15',
    paidAt: '2026-03-10'
  },
  {
    id: 'INV-2024-0105',
    customerId: 'cust-006',
    customerName: 'Marcus Rivera',
    amount: 81600,
    status: 'paid',
    issuedAt: '2026-01-01',
    dueDate: '2026-01-31',
    paidAt: '2026-01-20'
  },
  {
    id: 'INV-2024-0110',
    customerId: 'cust-008',
    customerName: 'Robert Hughes',
    amount: 144000,
    status: 'paid',
    issuedAt: '2025-08-01',
    dueDate: '2025-08-31',
    paidAt: '2025-08-25'
  },
  {
    id: 'INV-2024-0111',
    customerId: 'cust-005',
    customerName: 'Emily Walsh',
    amount: 14400,
    status: 'paid',
    issuedAt: '2025-11-01',
    dueDate: '2025-11-30',
    paidAt: '2025-11-18'
  },
  {
    id: 'INV-2024-0115',
    customerId: 'cust-009',
    customerName: 'Anna Kowalski',
    amount: 299,
    status: 'overdue',
    issuedAt: '2026-03-01',
    dueDate: '2026-03-15',
    paidAt: null
  },
  {
    id: 'INV-2024-0118',
    customerId: 'cust-010',
    customerName: 'Tom Nakamura',
    amount: 1200,
    status: 'pending',
    issuedAt: '2026-03-25',
    dueDate: '2026-04-25',
    paidAt: null
  },
  {
    id: 'INV-2024-0120',
    customerId: 'cust-011',
    customerName: 'Claire Dubois',
    amount: 66000,
    status: 'paid',
    issuedAt: '2025-10-01',
    dueDate: '2025-10-31',
    paidAt: '2025-10-22'
  }
]
