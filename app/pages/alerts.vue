<script setup lang="ts">
import { useAlertsStore } from '~/stores/alerts'
import type { AlertSeverity, AlertStatus } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { timeAgo } = useFormatters()
const alertsStore = useAlertsStore()

const severityFilter = ref<AlertSeverity | 'all'>('all')
const statusFilter = ref<AlertStatus | 'all'>('all')

const severityOptions = [
  { label: 'All severities', value: 'all' },
  { label: 'Critical', value: 'critical' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' }
]

const statusOptions = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Investigating', value: 'investigating' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Dismissed', value: 'dismissed' }
]

const filtered = computed(() => {
  let result = [...alertsStore.alerts]
  if (severityFilter.value !== 'all') result = result.filter(a => a.severity === severityFilter.value)
  if (statusFilter.value !== 'all') result = result.filter(a => a.status === statusFilter.value)
  return result
})

const criticalCount = computed(() => alertsStore.alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved' && a.status !== 'dismissed').length)
const activeCount = computed(() => alertsStore.alerts.filter(a => a.status === 'active' || a.status === 'investigating').length)

function severityColor(severity: AlertSeverity) {
  const map: Record<AlertSeverity, string> = {
    critical: 'error', high: 'warning', medium: 'info', low: 'neutral'
  }
  return map[severity]
}

function statusColor(status: AlertStatus) {
  const map: Record<AlertStatus, string> = {
    active: 'error', investigating: 'warning', resolved: 'success', dismissed: 'neutral'
  }
  return map[status]
}

function statusLabel(status: AlertStatus) {
  const map: Record<AlertStatus, string> = {
    active: 'Active', investigating: 'Investigating', resolved: 'Resolved', dismissed: 'Dismissed'
  }
  return map[status]
}

function severityIcon(severity: AlertSeverity) {
  const map: Record<AlertSeverity, string> = {
    critical: 'i-lucide-octagon-x',
    high: 'i-lucide-triangle-alert',
    medium: 'i-lucide-alert-circle',
    low: 'i-lucide-info'
  }
  return map[severity]
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">Alerts & Issues</h1>
        <p class="text-[var(--ui-text-muted)] text-sm mt-1">{{ filtered.length }} alerts</p>
      </div>
      <div class="flex items-center gap-3">
        <div v-if="criticalCount > 0" class="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-200 dark:border-red-900">
          <UIcon name="i-lucide-octagon-x" class="w-4 h-4" />
          {{ criticalCount }} critical
        </div>
        <div class="flex items-center gap-1.5 bg-[var(--ui-bg-elevated)] text-[var(--ui-text-muted)] px-3 py-1.5 rounded-lg text-sm border border-[var(--ui-border)]">
          <UIcon name="i-lucide-bell" class="w-4 h-4" />
          {{ activeCount }} active
        </div>
      </div>
    </div>

    <UCard class="mb-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <USelect v-model="severityFilter" :items="severityOptions" value-key="value" label-key="label" class="w-44" />
        <USelect v-model="statusFilter" :items="statusOptions" value-key="value" label-key="label" class="w-44" />
      </div>
    </UCard>

    <div class="space-y-3">
      <div v-if="filtered.length === 0" class="text-center py-16 text-[var(--ui-text-muted)]">
        <UIcon name="i-lucide-bell-off" class="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p>No alerts match your filters.</p>
      </div>

      <div
        v-for="alert in filtered"
        :key="alert.id"
        class="border border-[var(--ui-border)] rounded-xl p-5 bg-[var(--ui-bg)]"
        :class="{
          'border-l-4 border-l-red-500': alert.severity === 'critical' && alert.status !== 'resolved' && alert.status !== 'dismissed',
          'border-l-4 border-l-yellow-500': alert.severity === 'high' && alert.status !== 'resolved' && alert.status !== 'dismissed',
        }"
      >
        <div class="flex items-start gap-4">
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            :class="{
              'bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400': alert.severity === 'critical',
              'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400': alert.severity === 'high',
              'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400': alert.severity === 'medium',
              'bg-slate-100 dark:bg-slate-800 text-slate-500': alert.severity === 'low',
            }"
          >
            <UIcon :name="severityIcon(alert.severity)" class="w-5 h-5" />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <UBadge :color="severityColor(alert.severity)" variant="soft" size="xs" class="capitalize">
                {{ alert.severity }}
              </UBadge>
              <UBadge :color="statusColor(alert.status)" variant="soft" size="xs">
                {{ statusLabel(alert.status) }}
              </UBadge>
              <span class="text-xs text-[var(--ui-text-muted)]">{{ alert.source }}</span>
            </div>
            <h3 class="font-semibold text-[var(--ui-text-highlighted)]">{{ alert.title }}</h3>
            <p class="text-sm text-[var(--ui-text-muted)] mt-1 leading-relaxed">{{ alert.description }}</p>

            <div class="flex items-center gap-4 mt-3">
              <div v-if="alert.customerName" class="flex items-center gap-1.5 text-xs text-[var(--ui-text-muted)]">
                <UIcon name="i-lucide-building" class="w-3.5 h-3.5" />
                <NuxtLink v-if="alert.customerId" :to="`/customers/${alert.customerId}`" class="hover:text-[var(--ui-primary)]">
                  {{ alert.customerName }}
                </NuxtLink>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-[var(--ui-text-muted)]">
                <UIcon name="i-lucide-user" class="w-3.5 h-3.5" />
                {{ alert.owner }}
              </div>
              <div class="flex items-center gap-1.5 text-xs text-[var(--ui-text-muted)]">
                <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
                {{ timeAgo(alert.createdAt) }}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <UButton
              v-if="alert.status === 'active'"
              size="xs"
              color="warning"
              variant="soft"
              icon="i-lucide-search"
              @click="alertsStore.updateStatus(alert.id, 'investigating')"
            >
              Investigate
            </UButton>
            <UButton
              v-if="alert.status === 'active' || alert.status === 'investigating'"
              size="xs"
              color="success"
              variant="soft"
              icon="i-lucide-check"
              @click="alertsStore.updateStatus(alert.id, 'resolved')"
            >
              Resolve
            </UButton>
            <UButton
              v-if="alert.status === 'active'"
              size="xs"
              color="neutral"
              variant="outline"
              icon="i-lucide-x"
              @click="alertsStore.updateStatus(alert.id, 'dismissed')"
            >
              Dismiss
            </UButton>
            <UBadge v-if="alert.status === 'resolved'" color="success" variant="soft" size="sm">
              Resolved
            </UBadge>
            <UBadge v-if="alert.status === 'dismissed'" color="neutral" variant="soft" size="sm">
              Dismissed
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
