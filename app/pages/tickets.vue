<script setup lang="ts">
import { useTicketsStore } from '~/stores/tickets'
import type { Ticket, TicketPriority, TicketStatus } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { formatDateTime, timeAgo } = useFormatters()
const ticketsStore = useTicketsStore()

const search = ref('')
const priorityFilter = ref<TicketPriority | 'all'>('all')
const statusFilter = ref<TicketStatus | 'all'>('all')
const selectedTicket = ref<Ticket | null>(null)

const priorityOptions = [
  { label: 'All priorities', value: 'all' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' }
]

const statusOptions = [
  { label: 'All statuses', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Waiting', value: 'waiting' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' }
]

const statusChangeOptions = [
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Waiting', value: 'waiting' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' }
]

const filtered = computed(() => {
  let result = [...ticketsStore.tickets]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(t =>
      t.subject.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
    )
  }
  if (priorityFilter.value !== 'all') result = result.filter(t => t.priority === priorityFilter.value)
  if (statusFilter.value !== 'all') result = result.filter(t => t.status === statusFilter.value)
  return result
})

function priorityColor(priority: TicketPriority) {
  const map: Record<TicketPriority, string> = {
    low: 'neutral', medium: 'info', high: 'warning', urgent: 'error'
  }
  return map[priority]
}

function statusColor(status: TicketStatus) {
  const map: Record<TicketStatus, string> = {
    open: 'info', in_progress: 'warning', waiting: 'neutral', resolved: 'success', closed: 'neutral'
  }
  return map[status]
}

function statusLabel(status: TicketStatus) {
  const map: Record<TicketStatus, string> = {
    open: 'Open', in_progress: 'In Progress', waiting: 'Waiting', resolved: 'Resolved', closed: 'Closed'
  }
  return map[status]
}

function updateStatus(ticketId: string, status: string) {
  ticketsStore.updateStatus(ticketId, status as TicketStatus)
  if (selectedTicket.value?.id === ticketId) {
    selectedTicket.value = ticketsStore.tickets.find(t => t.id === ticketId) || null
  }
}
</script>

<template>
  <div class="flex h-full">
    <div :class="selectedTicket ? 'hidden lg:block lg:w-1/2 xl:w-3/5' : 'w-full'">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">Support Tickets</h1>
          <p class="text-[var(--ui-text-muted)] text-sm mt-1">{{ filtered.length }} tickets</p>
        </div>
      </div>

      <UCard class="mb-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <UInput
            v-model="search"
            placeholder="Search by subject, company or ID..."
            icon="i-lucide-search"
            class="flex-1"
          />
          <USelect v-model="priorityFilter" :items="priorityOptions" value-key="value" label-key="label" class="w-44" />
          <USelect v-model="statusFilter" :items="statusOptions" value-key="value" label-key="label" class="w-44" />
        </div>
      </UCard>

      <div class="space-y-2">
        <div v-if="filtered.length === 0" class="text-center py-16 text-[var(--ui-text-muted)]">
          <UIcon name="i-lucide-ticket" class="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p>No tickets match your filters.</p>
        </div>
        <div
          v-for="ticket in filtered"
          :key="ticket.id"
          class="border border-[var(--ui-border)] rounded-xl p-4 cursor-pointer transition-colors"
          :class="selectedTicket?.id === ticket.id
            ? 'bg-[var(--ui-bg-accented)] border-[var(--ui-primary)]'
            : 'bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-elevated)]'"
          @click="selectedTicket = ticket"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="text-xs font-mono text-[var(--ui-text-muted)]">{{ ticket.id }}</span>
                <UBadge :color="priorityColor(ticket.priority)" variant="solid" size="xs" class="capitalize">
                  {{ ticket.priority }}
                </UBadge>
                <UBadge :color="statusColor(ticket.status)" variant="soft" size="xs">
                  {{ statusLabel(ticket.status) }}
                </UBadge>
              </div>
              <p class="font-medium text-[var(--ui-text-highlighted)] truncate">{{ ticket.subject }}</p>
              <div class="flex items-center gap-3 mt-1.5">
                <span class="text-xs text-[var(--ui-text-muted)]">{{ ticket.company }}</span>
                <span class="text-xs text-[var(--ui-text-muted)]">·</span>
                <span class="text-xs text-[var(--ui-text-muted)]">{{ ticket.assignee }}</span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <UBadge color="neutral" variant="outline" size="xs">{{ ticket.category }}</UBadge>
              <p class="text-xs text-[var(--ui-text-muted)] mt-1.5">{{ timeAgo(ticket.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selectedTicket"
      class="w-full lg:w-1/2 xl:w-2/5 lg:ml-6 border border-[var(--ui-border)] rounded-xl bg-[var(--ui-bg)] overflow-y-auto"
    >
      <div class="p-4 border-b border-[var(--ui-border)] flex items-center justify-between">
        <h3 class="font-semibold text-[var(--ui-text-highlighted)]">Ticket Detail</h3>
        <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xs" @click="selectedTicket = null" />
      </div>

      <div class="p-5 space-y-5">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-mono text-[var(--ui-text-muted)]">{{ selectedTicket.id }}</span>
            <UBadge :color="priorityColor(selectedTicket.priority)" variant="solid" size="xs" class="capitalize">
              {{ selectedTicket.priority }}
            </UBadge>
          </div>
          <h2 class="text-lg font-semibold text-[var(--ui-text-highlighted)] leading-snug">
            {{ selectedTicket.subject }}
          </h2>
        </div>

        <p class="text-sm text-[var(--ui-text)] leading-relaxed">{{ selectedTicket.description }}</p>

        <div class="grid grid-cols-2 gap-4 py-4 border-y border-[var(--ui-border)]">
          <div>
            <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">Customer</p>
            <NuxtLink :to="`/customers/${selectedTicket.customerId}`" class="text-sm font-medium text-[var(--ui-primary)] hover:underline">
              {{ selectedTicket.company }}
            </NuxtLink>
            <p class="text-xs text-[var(--ui-text-muted)]">{{ selectedTicket.customerName }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">Assignee</p>
            <div class="flex items-center gap-2">
              <UAvatar :text="selectedTicket.assignee.split(' ').map((n: string) => n[0]).join('')" size="xs" />
              <span class="text-sm text-[var(--ui-text)]">{{ selectedTicket.assignee }}</span>
            </div>
          </div>
          <div>
            <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">Category</p>
            <p class="text-sm text-[var(--ui-text)]">{{ selectedTicket.category }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">Opened</p>
            <p class="text-sm text-[var(--ui-text)]">{{ formatDateTime(selectedTicket.createdAt) }}</p>
          </div>
        </div>

        <div>
          <p class="text-xs font-semibold text-[var(--ui-text-muted)] uppercase mb-2">Change Status</p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="opt in statusChangeOptions"
              :key="opt.value"
              size="xs"
              :color="selectedTicket.status === opt.value ? 'primary' : 'neutral'"
              :variant="selectedTicket.status === opt.value ? 'solid' : 'outline'"
              @click="updateStatus(selectedTicket.id, opt.value)"
            >
              {{ opt.label }}
            </UButton>
          </div>
        </div>

        <div class="flex gap-2 pt-2">
          <UButton size="sm" color="neutral" variant="outline" icon="i-lucide-user-plus" class="flex-1">
            Reassign
          </UButton>
          <UButton size="sm" color="neutral" variant="outline" icon="i-lucide-link" class="flex-1">
            Link Account
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
