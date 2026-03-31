export interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  plan: PlanTier
  status: CustomerStatus
  healthScore: number
  mrr: number
  arr: number
  renewalDate: string
  createdAt: string
  lastActive: string
  riskFlag: boolean
}

export type BadgeColor = 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral'

export type CustomerStatus = 'active' | 'churned' | 'at_risk' | 'onboarding'
export type PlanTier = 'starter' | 'professional' | 'enterprise' | 'custom'

export interface Subscription {
  id: string
  customerId: string
  customerName: string
  company: string
  plan: PlanTier
  status: SubscriptionStatus
  mrr: number
  billingCycle: 'monthly' | 'annual'
  startDate: string
  renewalDate: string
  trialEndsAt: string | null
}

export type SubscriptionStatus = 'active' | 'past_due' | 'trial' | 'canceled' | 'paused'

export interface Ticket {
  id: string
  subject: string
  description: string
  customerId: string
  customerName: string
  company: string
  priority: TicketPriority
  status: TicketStatus
  assignee: string
  category: string
  createdAt: string
  updatedAt: string
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed'

export interface Invoice {
  id: string
  customerId: string
  customerName: string
  amount: number
  status: InvoiceStatus
  issuedAt: string
  dueDate: string
  paidAt: string | null
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'void'

export interface Alert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  status: AlertStatus
  source: string
  owner: string
  customerId: string | null
  customerName: string | null
  createdAt: string
  resolvedAt: string | null
}

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'
export type AlertStatus = 'active' | 'investigating' | 'resolved' | 'dismissed'

export interface Activity {
  id: string
  type: 'subscription' | 'ticket' | 'payment' | 'alert' | 'customer' | 'note'
  message: string
  timestamp: string
  actor: string
}

export interface InternalNote {
  id: string
  customerId: string
  content: string
  author: string
  createdAt: string
}

export interface KpiData {
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'flat'
}
