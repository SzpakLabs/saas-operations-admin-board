<script setup lang="ts">
import { subscriptions as allSubs } from '~/data/subscriptions'
import type { BadgeColor, SubscriptionStatus, PlanTier } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { formatCurrency, formatDate } = useFormatters()
const { t } = useI18n()

const search = ref('')
const statusFilter = ref<SubscriptionStatus | 'all'>('all')
const planFilter = ref<PlanTier | 'all'>('all')

const statusOptions = computed(() => [
  { label: t('subscriptions.statusFilter.all'), value: 'all' },
  { label: t('subscriptions.statusFilter.active'), value: 'active' },
  { label: t('subscriptions.statusFilter.trial'), value: 'trial' },
  { label: t('subscriptions.statusFilter.pastDue'), value: 'past_due' },
  { label: t('subscriptions.statusFilter.paused'), value: 'paused' },
  { label: t('subscriptions.statusFilter.canceled'), value: 'canceled' }
])

const planOptions = computed(() => [
  { label: t('subscriptions.planFilter.all'), value: 'all' },
  { label: t('subscriptions.planFilter.starter'), value: 'starter' },
  { label: t('subscriptions.planFilter.professional'), value: 'professional' },
  { label: t('subscriptions.planFilter.enterprise'), value: 'enterprise' },
  { label: t('subscriptions.planFilter.custom'), value: 'custom' }
])

const filtered = computed(() => {
  let result = [...allSubs]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(s =>
      s.customerName.toLowerCase().includes(q) ||
      s.company.toLowerCase().includes(q)
    )
  }
  if (statusFilter.value !== 'all') result = result.filter(s => s.status === statusFilter.value)
  if (planFilter.value !== 'all') result = result.filter(s => s.plan === planFilter.value)
  return result
})

const totalMRR = computed(() => filtered.value.filter(s => s.status === 'active').reduce((sum, s) => sum + s.mrr, 0))
const activeCount = computed(() => filtered.value.filter(s => s.status === 'active').length)
const trialCount = computed(() => filtered.value.filter(s => s.status === 'trial').length)
const pastDueCount = computed(() => filtered.value.filter(s => s.status === 'past_due').length)

function statusColor(status: SubscriptionStatus) {
  const map: Record<SubscriptionStatus, BadgeColor> = {
    active: 'success',
    trial: 'info',
    past_due: 'error',
    paused: 'warning',
    canceled: 'neutral'
  }
  return map[status]
}

function statusLabel(status: SubscriptionStatus) {
  const map: Record<SubscriptionStatus, string> = {
    active: t('subscriptions.status.active'),
    trial: t('subscriptions.status.trial'),
    past_due: t('subscriptions.status.pastDue'),
    paused: t('subscriptions.status.paused'),
    canceled: t('subscriptions.status.canceled')
  }
  return map[status]
}

function planColor(plan: PlanTier) {
  const map: Record<PlanTier, BadgeColor> = {
    starter: 'neutral', professional: 'info', enterprise: 'primary', custom: 'warning'
  }
  return map[plan]
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">{{ $t('subscriptions.title') }}</h1>
        <p class="text-[var(--ui-text-muted)] text-sm mt-1">{{ $t('subscriptions.count', { n: filtered.length }) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <UCard>
        <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">{{ $t('subscriptions.kpi.totalMrr') }}</p>
        <p class="text-xl font-bold text-[var(--ui-text-highlighted)]">{{ formatCurrency(totalMRR) }}</p>
      </UCard>
      <UCard>
        <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">{{ $t('subscriptions.kpi.active') }}</p>
        <p class="text-xl font-bold text-green-500">{{ activeCount }}</p>
      </UCard>
      <UCard>
        <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">{{ $t('subscriptions.kpi.onTrial') }}</p>
        <p class="text-xl font-bold text-blue-500">{{ trialCount }}</p>
      </UCard>
      <UCard>
        <p class="text-xs font-medium text-[var(--ui-text-muted)] mb-1">{{ $t('subscriptions.kpi.pastDue') }}</p>
        <p class="text-xl font-bold text-red-500">{{ pastDueCount }}</p>
      </UCard>
    </div>

    <UCard class="mb-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <UInput
          v-model="search"
          :placeholder="$t('subscriptions.searchPlaceholder')"
          icon="i-lucide-search"
          class="flex-1"
        />
        <USelect v-model="statusFilter" :items="statusOptions" value-key="value" label-key="label" class="w-44" />
        <USelect v-model="planFilter" :items="planOptions" value-key="value" label-key="label" class="w-44" />
      </div>
    </UCard>

    <UCard>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[var(--ui-border)]">
              <th class="text-left py-3 px-4 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('subscriptions.columns.customer') }}</th>
              <th class="text-left py-3 px-4 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('subscriptions.columns.plan') }}</th>
              <th class="text-left py-3 px-4 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('subscriptions.columns.status') }}</th>
              <th class="text-left py-3 px-4 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('subscriptions.columns.mrr') }}</th>
              <th class="text-left py-3 px-4 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('subscriptions.columns.billing') }}</th>
              <th class="text-left py-3 px-4 text-xs font-semibold text-[var(--ui-text-muted)] uppercase">{{ $t('subscriptions.columns.renewal') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="py-16 text-center text-[var(--ui-text-muted)]">
                <UIcon name="i-lucide-credit-card" class="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>{{ $t('subscriptions.empty') }}</p>
              </td>
            </tr>
            <tr
              v-for="sub in filtered"
              :key="sub.id"
              class="border-b border-[var(--ui-border)] last:border-0 hover:bg-[var(--ui-bg-elevated)] transition-colors"
            >
              <td class="py-3 px-4">
                <NuxtLink :to="`/customers/${sub.customerId}`" class="flex items-center gap-3 group" @click.stop>
                  <UAvatar :text="sub.customerName.split(' ').map((n: string) => n[0]).join('')" size="sm" />
                  <div>
                    <p class="font-medium text-[var(--ui-text-highlighted)] group-hover:text-[var(--ui-primary)]">{{ sub.company }}</p>
                    <p class="text-xs text-[var(--ui-text-muted)]">{{ sub.customerName }}</p>
                  </div>
                </NuxtLink>
              </td>
              <td class="py-3 px-4">
                <UBadge :color="planColor(sub.plan)" variant="soft" size="sm" class="capitalize">
                  {{ sub.plan }}
                </UBadge>
              </td>
              <td class="py-3 px-4">
                <div>
                  <UBadge :color="statusColor(sub.status)" variant="soft" size="sm">
                    {{ statusLabel(sub.status) }}
                  </UBadge>
                  <p v-if="sub.status === 'trial' && sub.trialEndsAt" class="text-xs text-[var(--ui-text-muted)] mt-0.5">
                    {{ $t('subscriptions.trialEnds', { date: formatDate(sub.trialEndsAt) }) }}
                  </p>
                </div>
              </td>
              <td class="py-3 px-4 font-semibold text-[var(--ui-text)]">
                {{ sub.status === 'canceled' ? '—' : formatCurrency(sub.mrr) }}
              </td>
              <td class="py-3 px-4 text-[var(--ui-text-muted)] capitalize">{{ sub.billingCycle }}</td>
              <td class="py-3 px-4 text-[var(--ui-text-muted)]">{{ formatDate(sub.renewalDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>
