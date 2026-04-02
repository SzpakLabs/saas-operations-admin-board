<script setup lang="ts">
import { customers as allCustomers } from '~/data/customers'
import type { BadgeColor, Customer, CustomerStatus, PlanTier } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { formatCurrency, formatDate } = useFormatters()
const { t } = useI18n()

const search = ref('')
const statusFilter = ref<CustomerStatus | 'all'>('all')
const planFilter = ref<PlanTier | 'all'>('all')
const sortKey = ref<keyof Customer>('company')
const sortDir = ref<'asc' | 'desc'>('asc')
const page = ref(1)
const pageSize = 10

const statusOptions = computed(() => [
  { label: t('customers.statusFilter.all'), value: 'all' },
  { label: t('customers.statusFilter.active'), value: 'active' },
  { label: t('customers.statusFilter.atRisk'), value: 'at_risk' },
  { label: t('customers.statusFilter.onboarding'), value: 'onboarding' },
  { label: t('customers.statusFilter.churned'), value: 'churned' }
])

const planOptions = computed(() => [
  { label: t('customers.planFilter.all'), value: 'all' },
  { label: t('customers.planFilter.starter'), value: 'starter' },
  { label: t('customers.planFilter.professional'), value: 'professional' },
  { label: t('customers.planFilter.enterprise'), value: 'enterprise' },
  { label: t('customers.planFilter.custom'), value: 'custom' }
])

const columns = computed(() => [
  { key: 'company' as keyof Customer, label: t('customers.columns.company'), sortable: true },
  { key: 'plan' as keyof Customer, label: t('customers.columns.plan'), sortable: true },
  { key: 'status' as keyof Customer, label: t('customers.columns.status'), sortable: true },
  { key: 'mrr' as keyof Customer, label: t('customers.columns.mrr'), sortable: true },
  { key: 'healthScore' as keyof Customer, label: t('customers.columns.health'), sortable: true },
  { key: 'renewalDate' as keyof Customer, label: t('customers.columns.renewal'), sortable: true }
])

const filtered = computed(() => {
  let result = [...allCustomers]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    )
  }
  if (statusFilter.value !== 'all') {
    result = result.filter(c => c.status === statusFilter.value)
  }
  if (planFilter.value !== 'all') {
    result = result.filter(c => c.plan === planFilter.value)
  }
  result.sort((a, b) => {
    const av = a[sortKey.value]
    const bv = b[sortKey.value]
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir.value === 'asc' ? cmp : -cmp
  })
  return result
})

const total = computed(() => filtered.value.length)
const paginated = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

function setSort(key: keyof Customer) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
  page.value = 1
}

watch([search, statusFilter, planFilter], () => { page.value = 1 })

function statusColor(status: CustomerStatus) {
  const map: Record<CustomerStatus, BadgeColor> = {
    active: 'success',
    at_risk: 'warning',
    onboarding: 'info',
    churned: 'neutral'
  }
  return map[status]
}

function statusLabel(status: CustomerStatus) {
  const map: Record<CustomerStatus, string> = {
    active: t('customers.statusFilter.active'),
    at_risk: t('customers.statusFilter.atRisk'),
    onboarding: t('customers.statusFilter.onboarding'),
    churned: t('customers.statusFilter.churned')
  }
  return map[status]
}

function planLabel(plan: PlanTier) {
  return t(`customers.planFilter.${plan}`)
}

function planColor(plan: PlanTier) {
  const map: Record<PlanTier, BadgeColor> = {
    starter: 'neutral',
    professional: 'info',
    enterprise: 'primary',
    custom: 'warning'
  }
  return map[plan]
}

function healthColor(score: number) {
  if (score >= 70) return 'text-green-500'
  if (score >= 40) return 'text-yellow-500'
  return 'text-red-500'
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">{{ $t('customers.title') }}</h1>
        <p class="text-[var(--ui-text-muted)] text-sm mt-1">{{ $t('customers.count', { n: total }) }}</p>
      </div>
      <UButton icon="i-lucide-download" color="neutral" variant="outline" size="sm">{{ $t('customers.export') }}</UButton>
    </div>

    <UCard class="mb-6">
      <div class="flex flex-col sm:flex-row gap-3">
        <UInput
          v-model="search"
          :placeholder="$t('customers.searchPlaceholder')"
          icon="i-lucide-search"
          class="flex-1"
        />
        <USelect v-model="statusFilter" :items="statusOptions" value-key="value" label-key="label" class="w-48" />
        <USelect v-model="planFilter" :items="planOptions" value-key="value" label-key="label" class="w-44" />
      </div>
    </UCard>

    <UCard>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[var(--ui-border)]">
              <th
                v-for="col in columns"
                :key="col.key"
                class="text-left py-3 px-4 text-xs font-semibold text-[var(--ui-text-muted)] uppercase tracking-wider"
                :class="col.sortable ? 'cursor-pointer select-none hover:text-[var(--ui-text)]' : ''"
                @click="col.sortable && setSort(col.key)"
              >
                <div class="flex items-center gap-1">
                  {{ col.label }}
                  <span v-if="col.sortable" class="text-[var(--ui-text-muted)]">
                    <UIcon
                      v-if="sortKey === col.key"
                      :name="sortDir === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
                      class="w-3 h-3"
                    />
                    <UIcon v-else name="i-lucide-arrow-up-down" class="w-3 h-3 opacity-40" />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginated.length === 0">
              <td colspan="6" class="py-16 text-center text-[var(--ui-text-muted)]">
                <UIcon name="i-lucide-users" class="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>{{ $t('customers.empty') }}</p>
              </td>
            </tr>
            <tr
              v-for="customer in paginated"
              :key="customer.id"
              class="border-b border-[var(--ui-border)] hover:bg-[var(--ui-bg-elevated)] cursor-pointer transition-colors"
              @click="$router.push(`/customers/${customer.id}`)"
            >
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="customer.name.split(' ').map((n: string) => n[0]).join('')" size="sm" />
                  <div>
                    <p class="font-medium text-[var(--ui-text-highlighted)]">{{ customer.company }}</p>
                    <p class="text-xs text-[var(--ui-text-muted)]">{{ customer.name }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <UBadge :color="planColor(customer.plan)" variant="soft" size="sm">
                  {{ planLabel(customer.plan) }}
                </UBadge>
              </td>
              <td class="py-3 px-4">
                <UBadge :color="statusColor(customer.status)" variant="soft" size="sm">
                  {{ statusLabel(customer.status) }}
                </UBadge>
              </td>
              <td class="py-3 px-4 font-medium text-[var(--ui-text)]">
                {{ formatCurrency(customer.mrr) }}
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <div class="w-16 bg-[var(--ui-bg-accented)] rounded-full h-1.5">
                    <div
                      class="h-1.5 rounded-full transition-all"
                      :class="[
                        customer.healthScore >= 70 ? 'bg-green-500' :
                        customer.healthScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      ]"
                      :style="{ width: `${customer.healthScore}%` }"
                    />
                  </div>
                  <span class="text-sm font-medium" :class="healthColor(customer.healthScore)">
                    {{ customer.healthScore }}
                  </span>
                </div>
              </td>
              <td class="py-3 px-4 text-[var(--ui-text-muted)]">{{ formatDate(customer.renewalDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="total > pageSize" class="flex items-center justify-between pt-4 border-t border-[var(--ui-border)]">
        <p class="text-xs text-[var(--ui-text-muted)]">
          {{ $t('customers.showing', { from: (page - 1) * pageSize + 1, to: Math.min(page * pageSize, total), total }) }}
        </p>
        <UPagination v-model:page="page" :total="total" :items-per-page="pageSize" size="sm" />
      </div>
    </UCard>
  </div>
</template>
