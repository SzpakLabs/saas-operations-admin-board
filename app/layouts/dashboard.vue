<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const navigation = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/' },
  { label: 'Customers', icon: 'i-lucide-users', to: '/customers' },
  { label: 'Subscriptions', icon: 'i-lucide-credit-card', to: '/subscriptions' },
  { label: 'Tickets', icon: 'i-lucide-ticket', to: '/tickets' },
  { label: 'Alerts', icon: 'i-lucide-bell-ring', to: '/alerts' },
  { label: 'Settings', icon: 'i-lucide-settings', to: '/settings' }
]

const userMenuItems = [
  [{
    label: auth.user.name,
    slot: 'account',
    disabled: true
  }],
  [{
    label: 'Settings',
    icon: 'i-lucide-settings',
    click: () => router.push('/settings')
  }],
  [{
    label: 'Sign out',
    icon: 'i-lucide-log-out',
    click: () => {
      auth.logout()
      router.push('/login')
    }
  }]
]

const searchQuery = ref('')
</script>

<template>
  <div class="flex h-screen bg-[var(--ui-bg)]">
    <aside class="hidden lg:flex flex-col w-64 border-r border-[var(--ui-border)] bg-[var(--ui-bg-elevated)]">
      <div class="flex items-center gap-2 px-6 h-16 border-b border-[var(--ui-border)]">
        <UIcon name="i-lucide-activity" class="w-7 h-7 text-[var(--ui-primary)]" />
        <span class="text-lg font-semibold text-[var(--ui-text-highlighted)]">OpsBoard</span>
      </div>

      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="[
            route.path === item.to || (item.to !== '/' && route.path.startsWith(item.to))
              ? 'bg-[var(--ui-primary)] text-white'
              : 'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] hover:bg-[var(--ui-bg-accented)]'
          ]"
        >
          <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="px-3 py-4 border-t border-[var(--ui-border)]">
        <div class="flex items-center gap-3 px-3 py-2">
          <UAvatar
            :text="auth.user.name.split(' ').map(n => n[0]).join('')"
            size="sm"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-[var(--ui-text)] truncate">{{ auth.user.name }}</p>
            <p class="text-xs text-[var(--ui-text-muted)] truncate">{{ auth.user.role }}</p>
          </div>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="flex items-center justify-between h-16 px-6 border-b border-[var(--ui-border)] bg-[var(--ui-bg)]">
        <div class="flex items-center gap-4 lg:hidden">
          <UIcon name="i-lucide-activity" class="w-6 h-6 text-[var(--ui-primary)]" />
          <span class="font-semibold">OpsBoard</span>
        </div>

        <div class="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <UInput
            v-model="searchQuery"
            placeholder="Search customers, tickets, alerts..."
            icon="i-lucide-search"
            class="w-full"
            size="sm"
          />
        </div>

        <div class="flex items-center gap-2">
          <UTooltip text="Notifications">
            <UButton
              icon="i-lucide-bell"
              color="neutral"
              variant="ghost"
              size="sm"
            >
              <template #trailing>
                <UChip color="error" size="sm" />
              </template>
            </UButton>
          </UTooltip>

          <UColorModeButton size="sm" />

          <UDropdownMenu :items="userMenuItems">
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
            >
              <UAvatar
                :text="auth.user.name.split(' ').map(n => n[0]).join('')"
                size="2xs"
              />
            </UButton>
          </UDropdownMenu>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto">
        <div class="p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
