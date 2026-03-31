<script setup lang="ts">
import type { BadgeColor } from '~/types'

definePageMeta({ layout: 'dashboard' })

const notificationSettings = reactive({
  emailAlerts: true,
  slackAlerts: false,
  criticalOnly: false,
  weeklyDigest: true,
  trialExpiry: true,
  paymentFailures: true,
  churnRisk: true
})

const tabs = [
  { label: 'Organization', slot: 'org', icon: 'i-lucide-building' },
  { label: 'Notifications', slot: 'notifications', icon: 'i-lucide-bell' },
  { label: 'Team & Roles', slot: 'team', icon: 'i-lucide-users' },
  { label: 'Integrations', slot: 'integrations', icon: 'i-lucide-plug' }
]

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

const integrations = [
  { name: 'Slack', description: 'Send alerts and notifications to Slack channels', icon: 'i-simple-icons-slack', connected: false, color: 'bg-purple-100 dark:bg-purple-950/30' },
  { name: 'Stripe', description: 'Sync billing data and payment events', icon: 'i-lucide-credit-card', connected: true, color: 'bg-blue-100 dark:bg-blue-950/30' },
  { name: 'HubSpot', description: 'Sync customer data with your CRM', icon: 'i-lucide-users', connected: false, color: 'bg-orange-100 dark:bg-orange-950/30' },
  { name: 'PagerDuty', description: 'Escalate critical alerts to on-call team', icon: 'i-lucide-phone', connected: false, color: 'bg-green-100 dark:bg-green-950/30' }
]

const savedNotifications = ref(false)
function saveNotifications() {
  savedNotifications.value = true
  setTimeout(() => { savedNotifications.value = false }, 2000)
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)]">Settings</h1>
      <p class="text-[var(--ui-text-muted)] text-sm mt-1">Manage your organization, team, and notification preferences.</p>
    </div>

    <UTabs :items="tabs" class="w-full">
      <template #org>
        <div class="space-y-6 pt-6">
          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Organization Details</h2>
            </template>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="Organization Name">
                  <UInput model-value="OpsBoard Inc" class="w-full" />
                </UFormField>
                <UFormField label="Domain">
                  <UInput model-value="opsboard.io" class="w-full" icon="i-lucide-globe" />
                </UFormField>
                <UFormField label="Industry">
                  <UInput model-value="SaaS / Software" class="w-full" />
                </UFormField>
                <UFormField label="Time Zone">
                  <UInput model-value="America/New_York (EST)" class="w-full" icon="i-lucide-clock" />
                </UFormField>
              </div>
              <UFormField label="Support Email">
                <UInput model-value="support@opsboard.io" class="w-full" icon="i-lucide-mail" />
              </UFormField>
            </div>
            <div class="flex justify-end mt-4">
              <UButton color="primary" size="sm">Save Changes</UButton>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Plan & Billing</h2>
            </template>
            <div class="flex items-center justify-between p-4 rounded-lg bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)]">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <p class="font-semibold text-[var(--ui-text-highlighted)]">Business Plan</p>
                  <UBadge color="success" variant="soft" size="sm">Active</UBadge>
                </div>
                <p class="text-sm text-[var(--ui-text-muted)]">Up to 10 team members · Unlimited customers · All features</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-[var(--ui-text-highlighted)]">$299<span class="text-sm font-normal text-[var(--ui-text-muted)]">/mo</span></p>
                <UButton size="xs" color="neutral" variant="outline" class="mt-1">Manage billing</UButton>
              </div>
            </div>
          </UCard>
        </div>
      </template>

      <template #notifications>
        <div class="space-y-6 pt-6">
          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Alert Delivery</h2>
            </template>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-[var(--ui-border)]">
                <div>
                  <p class="text-sm font-medium text-[var(--ui-text)]">Email Alerts</p>
                  <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">Receive alerts via email</p>
                </div>
                <USwitch v-model="notificationSettings.emailAlerts" />
              </div>
              <div class="flex items-center justify-between py-3 border-b border-[var(--ui-border)]">
                <div>
                  <p class="text-sm font-medium text-[var(--ui-text)]">Slack Notifications</p>
                  <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">Post to a Slack channel (requires integration)</p>
                </div>
                <USwitch v-model="notificationSettings.slackAlerts" />
              </div>
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="text-sm font-medium text-[var(--ui-text)]">Critical Alerts Only</p>
                  <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">Only notify for critical severity issues</p>
                </div>
                <USwitch v-model="notificationSettings.criticalOnly" />
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Event Triggers</h2>
            </template>
            <div class="space-y-4">
              <div
                v-for="(item, key) in { weeklyDigest: 'Weekly summary digest', trialExpiry: 'Trial expiring (5 days)', paymentFailures: 'Payment failures', churnRisk: 'Churn risk detected' }"
                :key="key"
                class="flex items-center justify-between py-3"
                :class="key !== 'churnRisk' ? 'border-b border-[var(--ui-border)]' : ''"
              >
                <p class="text-sm font-medium text-[var(--ui-text)]">{{ item }}</p>
                <USwitch v-model="notificationSettings[key as keyof typeof notificationSettings]" />
              </div>
            </div>
          </UCard>

          <div class="flex justify-end">
            <UButton
              color="primary"
              :icon="savedNotifications ? 'i-lucide-check' : undefined"
              @click="saveNotifications"
            >
              {{ savedNotifications ? 'Saved!' : 'Save Preferences' }}
            </UButton>
          </div>
        </div>
      </template>

      <template #team>
        <div class="space-y-6 pt-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Team Members</h2>
                <UButton size="sm" color="primary" icon="i-lucide-plus">Invite Member</UButton>
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
                    <UBadge v-if="member.status === 'invited'" color="warning" variant="soft" size="xs">Invited</UBadge>
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
              <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">Role Permissions</h2>
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
                <UBadge v-if="integration.connected" color="success" variant="soft" size="xs">Connected</UBadge>
              </div>
              <p class="text-sm text-[var(--ui-text-muted)] mt-0.5">{{ integration.description }}</p>
            </div>
            <UButton
              :color="integration.connected ? 'neutral' : 'primary'"
              :variant="integration.connected ? 'outline' : 'solid'"
              size="sm"
            >
              {{ integration.connected ? 'Disconnect' : 'Connect' }}
            </UButton>
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>
