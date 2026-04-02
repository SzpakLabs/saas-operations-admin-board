<script setup lang="ts">
import { customers } from '~/data/customers'
import { invoices } from '~/data/invoices'
import { tickets as ticketData } from '~/data/tickets'
import { notes as noteData } from '~/data/notes'
import type { BadgeColor, CustomerStatus, InvoiceStatus, TicketPriority, TicketStatus } from '~/types'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const { formatCurrency, formatDate, timeAgo } = useFormatters()
const { t } = useI18n()

const customer = computed(() => customers.find(c => c.id === route.params.id))
const customerInvoices = computed(() => invoices.filter(i => i.customerId === route.params.id))
const customerTickets = computed(() => ticketData.filter(ticket => ticket.customerId === route.params.id))
const customerNotes = computed(() => noteData.filter(n => n.customerId === route.params.id))

const newNote = ref('')

if (!customer.value) {
  throw createError({ statusCode: 404, statusMessage: 'Customer not found' })
}

function statusColor(status: CustomerStatus) {
  const map: Record<CustomerStatus, BadgeColor> = {
    active: 'success', at_risk: 'warning', onboarding: 'info', churned: 'neutral'
  }
  return map[status]
}

function invoiceStatusColor(status: InvoiceStatus) {
  const map: Record<InvoiceStatus, BadgeColor> = {
    paid: 'success', pending: 'warning', overdue: 'error', void: 'neutral'
  }
  return map[status]
}

function ticketPriorityColor(priority: TicketPriority) {
  const map: Record<TicketPriority, BadgeColor> = {
    low: 'neutral', medium: 'info', high: 'warning', urgent: 'error'
  }
  return map[priority]
}

function ticketStatusColor(status: TicketStatus) {
  const map: Record<TicketStatus, BadgeColor> = {
    open: 'info', in_progress: 'warning', waiting: 'neutral', resolved: 'success', closed: 'neutral'
  }
  return map[status]
}

const planLabel = computed(() => {
  if (!customer.value) return ''
  return t(`customers.planFilter.${customer.value.plan}`)
})

const healthLabel = computed(() => {
  if (!customer.value) return ''
  const score = customer.value.healthScore
  if (score >= 70) return t('customers.detail.healthy')
  if (score >= 40) return t('customers.detail.needsAttention')
  return t('customers.detail.critical')
})
</script>

<template>
  <div v-if="customer">
    <div class="flex items-center gap-2 mb-6">
      <UButton to="/customers" variant="ghost" icon="i-lucide-arrow-left" size="sm" color="neutral">
        {{ $t('customers.back') }}
      </UButton>
      <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-[var(--ui-text-muted)]" />
      <span class="text-sm text-[var(--ui-text-muted)]">{{ customer.company }}</span>
    </div>

    <div class="flex flex-col xl:flex-row gap-6">
      <div class="xl:w-80 space-y-4">
        <UCard>
          <div class="text-center pb-4 border-b border-[var(--ui-border)] mb-4">
            <UAvatar
              :text="customer.name.split(' ').map((n: string) => n[0]).join('')"
              size="xl"
              class="mx-auto mb-3"
            />
            <h2 class="font-semibold text-[var(--ui-text-highlighted)]">{{ customer.name }}</h2>
            <p class="text-sm text-[var(--ui-text-muted)]">{{ customer.company }}</p>
            <div class="flex items-center justify-center gap-2 mt-2">
              <UBadge :color="statusColor(customer.status)" variant="soft" size="sm" class="capitalize">
                {{ customer.status.replace('_', ' ') }}
              </UBadge>
              <UBadge v-if="customer.riskFlag" color="error" variant="soft" size="sm">
                {{ $t('customers.detail.riskFlag') }}
              </UBadge>
            </div>
          </div>

          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-2 text-[var(--ui-text-muted)]">
              <UIcon name="i-lucide-mail" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ customer.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-[var(--ui-text-muted)]">
              <UIcon name="i-lucide-phone" class="w-4 h-4 shrink-0" />
              <span>{{ customer.phone }}</span>
            </div>
            <div class="flex items-center gap-2 text-[var(--ui-text-muted)]">
              <UIcon name="i-lucide-calendar" class="w-4 h-4 shrink-0" />
              <span>{{ $t('customers.detail.customerSince', { date: formatDate(customer.createdAt) }) }}</span>
            </div>
            <div class="flex items-center gap-2 text-[var(--ui-text-muted)]">
              <UIcon name="i-lucide-activity" class="w-4 h-4 shrink-0" />
              <span>{{ $t('customers.detail.lastActive', { date: formatDate(customer.lastActive) }) }}</span>
            </div>
          </div>
        </UCard>

        <UCard>
          <h3 class="text-sm font-semibold text-[var(--ui-text-highlighted)] mb-4">{{ $t('customers.detail.subscription') }}</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-[var(--ui-text-muted)]">{{ $t('customers.detail.plan') }}</span>
              <UBadge color="primary" variant="soft" size="sm">{{ planLabel }}</UBadge>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[var(--ui-text-muted)]">{{ $t('customers.detail.mrr') }}</span>
              <span class="text-sm font-semibold text-[var(--ui-text)]">{{ formatCurrency(customer.mrr) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[var(--ui-text-muted)]">{{ $t('customers.detail.arr') }}</span>
              <span class="text-sm font-semibold text-[var(--ui-text)]">{{ formatCurrency(customer.arr) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[var(--ui-text-muted)]">{{ $t('customers.detail.renewal') }}</span>
              <span class="text-sm text-[var(--ui-text)]">{{ formatDate(customer.renewalDate) }}</span>
            </div>
          </div>
        </UCard>

        <UCard>
          <h3 class="text-sm font-semibold text-[var(--ui-text-highlighted)] mb-4">{{ $t('customers.detail.healthScore') }}</h3>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2" :class="[
              customer.healthScore >= 70 ? 'text-green-500' :
              customer.healthScore >= 40 ? 'text-yellow-500' : 'text-red-500'
            ]">
              {{ customer.healthScore }}
            </div>
            <div class="w-full bg-[var(--ui-bg-accented)] rounded-full h-2 mb-2">
              <div
                class="h-2 rounded-full transition-all"
                :class="[
                  customer.healthScore >= 70 ? 'bg-green-500' :
                  customer.healthScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                ]"
                :style="{ width: `${customer.healthScore}%` }"
              />
            </div>
            <p class="text-xs text-[var(--ui-text-muted)]">{{ healthLabel }}</p>
          </div>
        </UCard>
      </div>

      <div class="flex-1 min-w-0 space-y-6">
        <UCard>
          <template #header>
            <h3 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('customers.detail.invoices.title') }}</h3>
          </template>
          <div v-if="customerInvoices.length === 0" class="text-sm text-[var(--ui-text-muted)] py-4 text-center">
            {{ $t('customers.detail.invoices.empty') }}
          </div>
          <table v-else class="w-full text-sm">
            <thead>
              <tr class="border-b border-[var(--ui-border)]">
                <th class="text-left py-2 px-3 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('customers.detail.invoices.invoice') }}</th>
                <th class="text-left py-2 px-3 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('customers.detail.invoices.amount') }}</th>
                <th class="text-left py-2 px-3 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('customers.detail.invoices.status') }}</th>
                <th class="text-left py-2 px-3 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('customers.detail.invoices.dueDate') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="inv in customerInvoices"
                :key="inv.id"
                class="border-b border-[var(--ui-border)] last:border-0"
              >
                <td class="py-2.5 px-3 font-mono text-xs text-[var(--ui-text-muted)]">{{ inv.id }}</td>
                <td class="py-2.5 px-3 font-semibold text-[var(--ui-text)]">{{ formatCurrency(inv.amount) }}</td>
                <td class="py-2.5 px-3">
                  <UBadge :color="invoiceStatusColor(inv.status)" variant="soft" size="sm" class="capitalize">
                    {{ inv.status }}
                  </UBadge>
                </td>
                <td class="py-2.5 px-3 text-[var(--ui-text-muted)]">{{ formatDate(inv.dueDate) }}</td>
              </tr>
            </tbody>
          </table>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('customers.detail.tickets.title') }}</h3>
          </template>
          <div v-if="customerTickets.length === 0" class="text-sm text-[var(--ui-text-muted)] py-4 text-center">
            {{ $t('customers.detail.tickets.empty') }}
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="ticket in customerTickets"
              :key="ticket.id"
              class="flex items-start justify-between p-3 rounded-lg border border-[var(--ui-border)]"
            >
              <div class="flex-1 min-w-0 mr-3">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs font-mono text-[var(--ui-text-muted)]">{{ ticket.id }}</span>
                  <UBadge :color="ticketPriorityColor(ticket.priority)" variant="soft" size="xs" class="capitalize">
                    {{ ticket.priority }}
                  </UBadge>
                </div>
                <p class="text-sm font-medium text-[var(--ui-text)]">{{ ticket.subject }}</p>
                <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ ticket.assignee }}</p>
              </div>
              <UBadge :color="ticketStatusColor(ticket.status)" variant="soft" size="sm" class="shrink-0">
                {{ ticket.status.replace('_', ' ') }}
              </UBadge>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('customers.detail.notes.title') }}</h3>
          </template>
          <div class="space-y-4 mb-4">
            <div v-if="customerNotes.length === 0" class="text-sm text-[var(--ui-text-muted)] text-center py-4">
              {{ $t('customers.detail.notes.empty') }}
            </div>
            <div
              v-for="note in customerNotes"
              :key="note.id"
              class="p-3 rounded-lg bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)]"
            >
              <p class="text-sm text-[var(--ui-text)]">{{ note.content }}</p>
              <div class="flex items-center gap-2 mt-2">
                <UAvatar :text="note.author.split(' ').map((n: string) => n[0]).join('')" size="2xs" />
                <span class="text-xs text-[var(--ui-text-muted)]">{{ note.author }}</span>
                <span class="text-xs text-[var(--ui-text-muted)]">·</span>
                <span class="text-xs text-[var(--ui-text-muted)]">{{ timeAgo(note.createdAt) }}</span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <UTextarea v-model="newNote" :placeholder="$t('customers.detail.notes.placeholder')" class="flex-1" :rows="2" />
            <UButton
              icon="i-lucide-send"
              color="primary"
              :disabled="!newNote.trim()"
              class="self-end"
              @click="newNote = ''"
            />
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
