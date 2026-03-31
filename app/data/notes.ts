import type { InternalNote } from '~/types'

export const notes: InternalNote[] = [
  {
    id: 'note-001',
    customerId: 'cust-003',
    content: 'Spoke with Priya about the overdue invoice. She mentioned budget approval delays on their end. Follow up by April 5 or escalate to VP Finance.',
    author: 'Morgan Davis',
    createdAt: '2026-03-29T15:20:00Z'
  },
  {
    id: 'note-002',
    customerId: 'cust-003',
    content: 'Health score has been declining since February. Low login frequency and support ticket volume increasing. Consider scheduling a QBR.',
    author: 'Alex Thompson',
    createdAt: '2026-03-20T10:00:00Z'
  },
  {
    id: 'note-003',
    customerId: 'cust-001',
    content: 'Sarah mentioned interest in upgrading to custom plan if we can offer dedicated support SLA. Passing to account management.',
    author: 'Jordan Lee',
    createdAt: '2026-03-25T14:30:00Z'
  },
  {
    id: 'note-004',
    customerId: 'cust-006',
    content: 'Marcus confirmed they want to proceed with SSO integration. Engineering to provide timeline by next week.',
    author: 'Alex Thompson',
    createdAt: '2026-03-28T09:15:00Z'
  },
  {
    id: 'note-005',
    customerId: 'cust-009',
    content: 'Anna has not responded to last 3 outreach emails. May need to try phone contact before renewal date.',
    author: 'Morgan Davis',
    createdAt: '2026-03-27T11:00:00Z'
  },
  {
    id: 'note-006',
    customerId: 'cust-008',
    content: 'Robert is happy with the platform overall. Main concern is data import reliability. We have TK-1035 open for this.',
    author: 'Sam Wilson',
    createdAt: '2026-03-30T16:00:00Z'
  },
  {
    id: 'note-007',
    customerId: 'cust-012',
    content: 'Ahmed needs more time to evaluate. His team lead has been on PTO. Trial extension approved for 14 days.',
    author: 'Jordan Lee',
    createdAt: '2026-03-29T10:00:00Z'
  }
]
