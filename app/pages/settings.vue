<script setup lang="ts">
import type { BadgeColor } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { t } = useI18n()

const notificationSettings = reactive({
  emailAlerts: true,
  slackAlerts: false,
  criticalOnly: false,
  weeklyDigest: true,
  trialExpiry: true,
  paymentFailures: true,
  churnRisk: true
})

const tabs = computed(() => [
  { label: t('settings.tabs.organization'), slot: 'org', icon: 'i-lucide-building' },
  { label: t('settings.tabs.notifications'), slot: 'notifications', icon: 'i-lucide-bell' },
  { label: t('settings.tabs.team'), slot: 'team', icon: 'i-lucide-users' },
  { label: t('settings.tabs.integrations'), slot: 'integrations', icon: 'i-lucide-plug' }
])

const eventTriggers = computed(() => [
  { key: 'weeklyDigest', label: t('settings.notifications.weeklyDigest') },
  { key: 'trialExpiry', label: t('settings.notifications.trialExpiry') },
  { key: 'paymentFailures', label: t('settings.notifications.paymentFailures') },
  { key: 'churnRisk', label: t('settings.notifications.churnRisk') }
])

const team = [
  { name: 'Alex Thompson', email: 'alex@opsboard.io', role: 'Operations Manager', status: 'active' },
  { name: 'Jordan Lee', email: 'jordan@opsboard.io', role: 'Customer Success', status: 'active' },
  { name: 'Morgan Davis', email: 'morgan@opsboard.io', role: 'Support Lead', status: 'active' },
  { name: 'Sam Wilson', email: 'sam@opsboard.io', role: 'Technical Support', status: 'active' },
  { name: 'Casey Rivera', email: 'casey@opsboard.io', role: 'Billing Admin', status: 'invited' }
]

const rolePermissions: Array<{ role: string; color: BadgeColor; permissions: string[] }> = [
  {
    role: 'Operations Manager',
    color: 'primary',
    permissions: ['View all data', 'Edit customers', 'Manage subscriptions', 'Resolve alerts', 'View analytics', 'Export data', 'Manage team']
  },
  {
    role: 'Customer Success',
    color: 'info',
    permissions: ['View all data', 'Edit customers', 'Add notes', 'Manage tickets', 'View analytics']
  },
  {
    role: 'Support Lead',
    color: 'warning',
    permissions: ['View customers', 'Manage tickets', 'Add notes', 'View alerts']
  },
  {
    role: 'Billing Admin',
    color: 'neutral',
    permissions: ['View customers', 'View subscriptions', 'Manage invoices', 'Export data']
  }
]

const integrations = computed(() => [
  { name: 'Slack', description: t('settings.integrations.slackDesc'), icon: 'i-simple-icons-slack', connected: false, color: 'bg-purple-100 dark:bg-purple-950/30' },
  { name: 'Stripe', description: t('settings.integrations.stripeDesc'), icon: 'i-lucide-credit-card', connected: true, color: 'bg-blue-100 dark:bg-blue-950/30' },
  { name: 'HubSpot', description: t('settings.integrations.hubspotDesc'), icon: 'i-lucide-users', connected: false, color: 'bg-orange-100 dark:bg-orange-950/30' },
  { name: 'PagerDuty', description: t('settings.integrations.pagerdutyDesc'), icon: 'i-lucide-phone', connected: false, color: 'bg-green-100 dark:bg-green-950/30' }
])

const savedNotifications = ref(false)
function saveNotifications() {
  savedNotifications.value = true
  setTimeout(() => { savedNotifications.value = false }, 2000)
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">{{ $t('settings.title') }}</h1>
      <p class="text-[var(--ui-text-muted)] text-sm mt-1">{{ $t('settings.subtitle') }}</p>
    </div>

    <UTabs :items="tabs" class="w-full">
      <template #org>
        <div class="space-y-6 pt-6">
          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('settings.org.title') }}</h2>
            </template>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField :label="$t('settings.org.name')">
                  <UInput model-value="OpsBoard Inc" class="w-full" />
                </UFormField>
                <UFormField :label="$t('settings.org.domain')">
                  <UInput model-value="opsboard.io" class="w-full" icon="i-lucide-globe" />
                </UFormField>
                <UFormField :label="$t('settings.org.industry')">
                  <UInput model-value="SaaS / Software" class="w-full" />
                </UFormField>
                <UFormField :label="$t('settings.org.timezone')">
                  <UInput model-value="America/New_York (EST)" class="w-full" icon="i-lucide-clock" />
                </UFormField>
              </div>
              <UFormField :label="$t('settings.org.supportEmail')">
                <UInput model-value="support@opsboard.io" class="w-full" icon="i-lucide-mail" />
              </UFormField>
            </div>
            <div class="flex justify-end mt-4">
              <UButton color="primary" size="sm">{{ $t('settings.org.save') }}</UButton>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('settings.org.billing.title') }}</h2>
            </template>
            <div class="flex items-center justify-between p-4 rounded-lg bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)]">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <p class="font-semibold text-[var(--ui-text-highlighted)]">{{ $t('settings.org.billing.planName') }}</p>
                  <UBadge color="success" variant="soft" size="sm">{{ $t('settings.org.billing.active') }}</UBadge>
                </div>
                <p class="text-sm text-[var(--ui-text-muted)]">{{ $t('settings.org.billing.features') }}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-[var(--ui-text-highlighted)]">$299<span class="text-sm font-normal text-[var(--ui-text-muted)]">/mo</span></p>
                <UButton size="xs" color="neutral" variant="outline" class="mt-1">{{ $t('settings.org.billing.manage') }}</UButton>
              </div>
            </div>
          </UCard>
        </div>
      </template>

      <template #notifications>
        <div class="space-y-6 pt-6">
          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('settings.notifications.alertDelivery') }}</h2>
            </template>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-[var(--ui-border)]">
                <div>
                  <p class="text-sm font-medium text-[var(--ui-text)]">{{ $t('settings.notifications.emailAlerts') }}</p>
                  <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ $t('settings.notifications.emailAlertsDesc') }}</p>
                </div>
                <USwitch v-model="notificationSettings.emailAlerts" />
              </div>
              <div class="flex items-center justify-between py-3 border-b border-[var(--ui-border)]">
                <div>
                  <p class="text-sm font-medium text-[var(--ui-text)]">{{ $t('settings.notifications.slackNotifications') }}</p>
                  <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ $t('settings.notifications.slackNotificationsDesc') }}</p>
                </div>
                <USwitch v-model="notificationSettings.slackAlerts" />
              </div>
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="text-sm font-medium text-[var(--ui-text)]">{{ $t('settings.notifications.criticalOnly') }}</p>
                  <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">{{ $t('settings.notifications.criticalOnlyDesc') }}</p>
                </div>
                <USwitch v-model="notificationSettings.criticalOnly" />
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('settings.notifications.eventTriggers') }}</h2>
            </template>
            <div class="space-y-4">
              <div
                v-for="(trigger, index) in eventTriggers"
                :key="trigger.key"
                class="flex items-center justify-between py-3"
                :class="index < eventTriggers.length - 1 ? 'border-b border-[var(--ui-border)]' : ''"
              >
                <p class="text-sm font-medium text-[var(--ui-text)]">{{ trigger.label }}</p>
                <USwitch v-model="notificationSettings[trigger.key as keyof typeof notificationSettings]" />
              </div>
            </div>
          </UCard>

          <div class="flex justify-end">
            <UButton
              color="primary"
              :icon="savedNotifications ? 'i-lucide-check' : undefined"
              @click="saveNotifications"
            >
              {{ savedNotifications ? $t('settings.notifications.saved') : $t('settings.notifications.save') }}
            </UButton>
          </div>
        </div>
      </template>

      <template #team>
        <div class="space-y-6 pt-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('settings.team.title') }}</h2>
                <UButton size="sm" color="primary" icon="i-lucide-plus">{{ $t('settings.team.invite') }}</UButton>
              </div>
            </template>
            <div class="divide-y divide-[var(--ui-border)]">
              <div
                v-for="member in team"
                :key="member.email"
                class="flex items-center gap-4 py-4"
              >
                <UAvatar :text="member.name.split(' ').map((n: string) => n[0]).join('')" size="md" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-medium text-[var(--ui-text-highlighted)]">{{ member.name }}</p>
                    <UBadge v-if="member.status === 'invited'" color="warning" variant="soft" size="xs">{{ $t('settings.team.invited') }}</UBadge>
                  </div>
                  <p class="text-xs text-[var(--ui-text-muted)]">{{ member.email }}</p>
                </div>
                <UBadge color="neutral" variant="outline" size="sm">{{ member.role }}</UBadge>
                <UButton icon="i-lucide-ellipsis" color="neutral" variant="ghost" size="xs" />
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ $t('settings.team.rolePermissions') }}</h2>
            </template>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="role in rolePermissions"
                :key="role.role"
                class="p-4 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-bg-elevated)]"
              >
                <UBadge :color="role.color" variant="soft" size="sm" class="mb-3">{{ role.role }}</UBadge>
                <ul class="space-y-1.5">
                  <li
                    v-for="perm in role.permissions"
                    :key="perm"
                    class="flex items-center gap-2 text-xs text-[var(--ui-text-muted)]"
                  >
                    <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {{ perm }}
                  </li>
                </ul>
              </div>
            </div>
          </UCard>
        </div>
      </template>

      <template #integrations>
        <div class="space-y-4 pt-6">
          <div
            v-for="integration in integrations"
            :key="integration.name"
            class="flex items-center gap-4 p-5 border border-[var(--ui-border)] rounded-xl bg-[var(--ui-bg)]"
          >
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="integration.color">
              <UIcon :name="integration.icon" class="w-6 h-6" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-medium text-[var(--ui-text-highlighted)]">{{ integration.name }}</p>
                <UBadge v-if="integration.connected" color="success" variant="soft" size="xs">{{ $t('settings.integrations.connected') }}</UBadge>
              </div>
              <p class="text-sm text-[var(--ui-text-muted)] mt-0.5">{{ integration.description }}</p>
            </div>
            <UButton
              :color="integration.connected ? 'neutral' : 'primary'"
              :variant="integration.connected ? 'outline' : 'solid'"
              size="sm"
            >
              {{ integration.connected ? $t('settings.integrations.disconnect') : $t('settings.integrations.connect') }}
            </UButton>
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>
