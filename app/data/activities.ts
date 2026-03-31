import type { Activity } from '~/types'

export const activities: Activity[] = [
  {
    id: 'act-001',
    type: 'payment',
    message: 'Payment of $1,200 received from Vertex Solutions',
    timestamp: '2026-03-31T09:30:00Z',
    actor: 'System'
  },
  {
    id: 'act-002',
    type: 'ticket',
    message: 'New urgent ticket TK-1040 opened by NovaTech Industries',
    timestamp: '2026-03-30T16:45:00Z',
    actor: 'Priya Patel'
  },
  {
    id: 'act-003',
    type: 'customer',
    message: 'Ahmed Hassan from Orion Software started trial',
    timestamp: '2026-03-30T14:00:00Z',
    actor: 'System'
  },
  {
    id: 'act-004',
    type: 'alert',
    message: 'Critical alert: API error rate spike detected',
    timestamp: '2026-03-30T22:15:00Z',
    actor: 'API Monitor'
  },
  {
    id: 'act-005',
    type: 'subscription',
    message: 'CloudBridge Systems subscription canceled',
    timestamp: '2026-03-28T11:00:00Z',
    actor: 'Lisa Tanaka'
  },
  {
    id: 'act-006',
    type: 'note',
    message: 'Internal note added for NovaTech Industries regarding churn risk',
    timestamp: '2026-03-29T15:20:00Z',
    actor: 'Morgan Davis'
  },
  {
    id: 'act-007',
    type: 'ticket',
    message: 'Ticket TK-1037 resolved - webhook configuration for Vertex Solutions',
    timestamp: '2026-03-24T11:30:00Z',
    actor: 'Jordan Lee'
  },
  {
    id: 'act-008',
    type: 'payment',
    message: 'Invoice INV-2024-0102 overdue for NovaTech Industries ($98,400)',
    timestamp: '2026-03-29T00:00:00Z',
    actor: 'System'
  },
  {
    id: 'act-009',
    type: 'customer',
    message: 'David Kim from Streamline Labs completed onboarding step 2/5',
    timestamp: '2026-03-29T10:45:00Z',
    actor: 'David Kim'
  },
  {
    id: 'act-010',
    type: 'subscription',
    message: 'Pinnacle Group renewed custom plan for another year',
    timestamp: '2026-03-27T16:00:00Z',
    actor: 'Robert Hughes'
  }
]
