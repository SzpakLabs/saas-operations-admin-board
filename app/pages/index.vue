<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { customers } from '~/data/customers'
import { alerts } from '~/data/alerts'
import { activities } from '~/data/activities'
import type { AlertSeverity, BadgeColor } from '~/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

definePageMeta({ layout: 'dashboard' })

const { formatCurrency, formatDateTime, timeAgo } = useFormatters()
const { t } = useI18n()

const colorMode = useColorMode()

const kpis = computed(() => [
  { label: t('dashboard.kpi.mrr'), value: '$41,698', change: 8.3, trend: 'up', icon: 'i-lucide-trending-up', color: 'text-green-500' },
  { label: t('dashboard.kpi.activeCustomers'), value: '9', change: 2.1, trend: 'up', icon: 'i-lucide-users', color: 'text-blue-500' },
  { label: t('dashboard.kpi.openTickets'), value: '6', change: -12.5, trend: 'down', icon: 'i-lucide-ticket', color: 'text-orange-500' },
  { label: t('dashboard.kpi.churnRate'), value: '1.8%', change: -0.3, trend: 'down', icon: 'i-lucide-user-minus', color: 'text-red-500' },
  { label: t('dashboard.kpi.arr'), value: '$500,376', change: 11.2, trend: 'up', icon: 'i-lucide-dollar-sign', color: 'text-purple-500' },
  { label: t('dashboard.kpi.avgHealth'), value: '72', change: -3.1, trend: 'down', icon: 'i-lucide-heart-pulse', color: 'text-pink-500' }
])

const isDark = computed(() => colorMode.value === 'dark')

const gridColor = computed(() => isDark.value ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')
const textColor = computed(() => isDark.value ? '#94a3b8' : '#64748b')

const mrrChartData = computed(() => ({
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'MRR',
    data: [34200, 36500, 37800, 39200, 38500, 41698],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59,130,246,0.1)',
    tension: 0.4,
    fill: true,
    pointRadius: 4,
    pointBackgroundColor: '#3b82f6'
  }]
}))

const ticketChartData = computed(() => ({
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Opened',
      data: [18, 22, 15, 20, 17, 14],
      backgroundColor: '#3b82f6'
    },
    {
      label: 'Resolved',
      data: [16, 19, 18, 18, 20, 12],
      backgroundColor: '#10b981'
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: { color: gridColor.value },
      ticks: { color: textColor.value, font: { size: 11 } },
      border: { display: false }
    },
    y: {
      grid: { color: gridColor.value },
      ticks: { color: textColor.value, font: { size: 11 } },
      border: { display: false }
    }
  }
}))

const barChartOptions = computed(() => ({
  ...chartOptions.value,
  plugins: {
    legend: {
      display: true,
      labels: { color: textColor.value, font: { size: 11 }, boxWidth: 12 }
    }
  }
}))

const recentAlerts = computed(() => alerts.filter(a => a.status === 'active' || a.status === 'investigating').slice(0, 5))
const recentActivities = computed(() => activities.slice(0, 8))

const atRiskCustomers = computed(() => customers.filter(c => c.riskFlag || c.status === 'at_risk'))

function severityColor(severity: AlertSeverity) {
  const map: Record<AlertSeverity, BadgeColor> = {
    critical: 'error',
    high: 'warning',
    medium: 'info',
    low: 'neutral'
  }
  return map[severity]
}

function activityIcon(type: string) {
  const map: Record<string, string> = {
    subscription: 'i-lucide-credit-card',
    ticket: 'i-lucide-ticket',
    payment: 'i-lucide-dollar-sign',
    alert: 'i-lucide-bell',
    customer: 'i-lucide-user',
    note: 'i-lucide-file-text'
  }
  return map[type] || 'i-lucide-circle'
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">{{ $t('dashboard.title') }}</h1>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <UCard
        v-for="kpi in kpis"
        :key="kpi.label"
        class="col-span-1"
      >
        <div class="flex items-start justify-between mb-3">
          <p class="text-xs font-medium text-[var(--ui-text-muted)] leading-tight">{{ kpi.label }}</p>
          <UIcon :name="kpi.icon" class="w-4 h-4 shrink-0" :class="kpi.color" />
        </div>
        <p class="text-2xl font-bold text-[var(--ui-text-highlighted)]">{{ kpi.value }}</p>
        <div class="flex items-center gap-1 mt-1">
          <UIcon
            :name="kpi.trend === 'up' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
            class="w-3 h-3"
            :class="kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'"
          />
          <span class="text-xs" :class="kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'">
            {{ Math.abs(kpi.change) }}%
          </span>
          <span class="text-xs text-[var(--ui-text-muted)]">{{ $t('dashboard.vsLastMonth') }}</span>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
      <UCard class="xl:col-span-2">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('dashboard.mrrChart.title') }}</h2>
              <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ $t('dashboard.mrrChart.subtitle') }}</p>
            </div>
            <UBadge color="success" variant="soft" size="sm">+8.3%</UBadge>
          </div>
        </template>
        <div class="h-56">
          <Line :data="mrrChartData" :options="chartOptions" />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('dashboard.ticketChart.title') }}</h2>
          <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ $t('dashboard.ticketChart.subtitle') }}</p>
        </template>
        <div class="h-56">
          <Bar :data="ticketChartData" :options="barChartOptions" />
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
      <UCard class="xl:col-span-2">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('dashboard.activeAlerts') }}</h2>
            <UButton to="/alerts" variant="ghost" size="xs" color="primary" trailing-icon="i-lucide-arrow-right">
              {{ $t('dashboard.viewAll') }}
            </UButton>
          </div>
        </template>
        <div class="space-y-3">
          <div
            v-for="alert in recentAlerts"
            :key="alert.id"
            class="flex items-start gap-3 p-3 rounded-lg bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)]"
          >
            <UBadge :color="severityColor(alert.severity)" variant="solid" class="mt-0.5 shrink-0 capitalize text-xs">
              {{ alert.severity }}
            </UBadge>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[var(--ui-text)]">{{ alert.title }}</p>
              <p class="text-xs text-[var(--ui-text-muted)] truncate mt-0.5">{{ alert.description }}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-xs text-[var(--ui-text-muted)]">{{ timeAgo(alert.createdAt) }}</p>
              <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ alert.owner }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('dashboard.atRisk.title') }}</h2>
        </template>
        <div class="space-y-3">
          <NuxtLink
            v-for="customer in atRiskCustomers"
            :key="customer.id"
            :to="`/customers/${customer.id}`"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--ui-bg-elevated)] transition-colors"
          >
            <UAvatar :text="customer.name.split(' ').map((n: string) => n[0]).join('')" size="sm" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[var(--ui-text)] truncate">{{ customer.company }}</p>
              <p class="text-xs text-[var(--ui-text-muted)]">{{ $t('dashboard.atRisk.health') }}: {{ customer.healthScore }}</p>
            </div>
            <UBadge color="error" variant="soft" size="xs">{{ $t('dashboard.atRisk.badge') }}</UBadge>
          </NuxtLink>
          <div v-if="atRiskCustomers.length === 0" class="text-sm text-[var(--ui-text-muted)] text-center py-4">
            {{ $t('dashboard.atRisk.empty') }}
          </div>
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('dashboard.recentActivity') }}</h2>
      </template>
      <div class="space-y-0">
        <div
          v-for="(activity, index) in recentActivities"
          :key="activity.id"
          class="flex items-start gap-3 py-3"
          :class="{ 'border-b border-[var(--ui-border)]': index < recentActivities.length - 1 }"
        >
          <div class="w-8 h-8 rounded-full bg-[var(--ui-bg-accented)] flex items-center justify-center shrink-0 mt-0.5">
            <UIcon :name="activityIcon(activity.type)" class="w-4 h-4 text-[var(--ui-text-muted)]" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[var(--ui-text)]">{{ activity.message }}</p>
            <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ activity.actor }}</p>
          </div>
          <span class="text-xs text-[var(--ui-text-muted)] shrink-0">{{ timeAgo(activity.timestamp) }}</span>
        </div>
      </div>
    </UCard>
  </div>
</template>
