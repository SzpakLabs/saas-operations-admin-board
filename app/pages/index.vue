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

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

definePageMeta({ layout: 'dashboard' })

const { formatCurrency, formatDateTime, timeAgo } = useFormatters()

const colorMode = useColorMode()

const kpis = [
  { label: 'Monthly Recurring Revenue', value: '$41,698', change: 8.3, trend: 'up', icon: 'i-lucide-trending-up', color: 'text-green-500' },
  { label: 'Active Customers', value: '9', change: 2.1, trend: 'up', icon: 'i-lucide-users', color: 'text-blue-500' },
  { label: 'Open Tickets', value: '6', change: -12.5, trend: 'down', icon: 'i-lucide-ticket', color: 'text-orange-500' },
  { label: 'Churn Rate', value: '1.8%', change: -0.3, trend: 'down', icon: 'i-lucide-user-minus', color: 'text-red-500' },
  { label: 'ARR', value: '$500,376', change: 11.2, trend: 'up', icon: 'i-lucide-dollar-sign', color: 'text-purple-500' },
  { label: 'Avg Health Score', value: '72', change: -3.1, trend: 'down', icon: 'i-lucide-heart-pulse', color: 'text-pink-500' }
]

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

function severityColor(severity: string) {
  const map: Record<string, string> = {
    critical: 'error',
    high: 'warning',
    medium: 'info',
    low: 'neutral'
  }
  return map[severity] || 'neutral'
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
      <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">Operations Overview</h1>
      <p class="text-[var(--ui-text-muted)] text-sm mt-1">Tuesday, March 31, 2026</p>
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
          <span class="text-xs text-[var(--ui-text-muted)]">vs last month</span>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
      <UCard class="xl:col-span-2">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Monthly Recurring Revenue</h2>
              <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">Last 6 months</p>
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
          <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Support Tickets</h2>
          <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">Opened vs resolved</p>
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
            <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Active Alerts</h2>
            <UButton to="/alerts" variant="ghost" size="xs" color="primary" trailing-icon="i-lucide-arrow-right">
              View all
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
          <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">At-Risk Accounts</h2>
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
              <p class="text-xs text-[var(--ui-text-muted)]">Health: {{ customer.healthScore }}</p>
            </div>
            <UBadge color="error" variant="soft" size="xs">At risk</UBadge>
          </NuxtLink>
          <div v-if="atRiskCustomers.length === 0" class="text-sm text-[var(--ui-text-muted)] text-center py-4">
            No at-risk accounts
          </div>
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Recent Activity</h2>
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
