<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { alerts } from '~/data/alerts'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const { t, locale, setLocale } = useI18n()

const localeList = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
]

const navigation = computed(() => [
  { label: t('nav.dashboard'), icon: 'i-lucide-layout-dashboard', to: '/' },
  { label: t('nav.customers'), icon: 'i-lucide-users', to: '/customers' },
  { label: t('nav.subscriptions'), icon: 'i-lucide-credit-card', to: '/subscriptions' },
  { label: t('nav.tickets'), icon: 'i-lucide-ticket', to: '/tickets' },
  { label: t('nav.alerts'), icon: 'i-lucide-bell-ring', to: '/alerts' },
  { label: t('nav.settings'), icon: 'i-lucide-settings', to: '/settings' }
])

const userMenuItems = computed(() => [
  [{
    label: auth.user.name,
    slot: 'account',
    disabled: true
  }],
  [{
    label: t('userMenu.settings'),
    icon: 'i-lucide-settings',
    onSelect: () => router.push('/settings')
  }],
  [{
    label: t('userMenu.signOut'),
    icon: 'i-lucide-log-out',
    onSelect: () => {
      auth.logout()
      router.push('/login')
    }
  }]
])

const langMenuItems = computed(() => [
  localeList.map(l => ({
    label: l.name,
    icon: locale.value === l.code ? 'i-lucide-check' : undefined,
    onSelect: () => setLocale(l.code)
  }))
])

const searchQuery = ref('')
const mobileMenuOpen = ref(false)

const unreadAlerts = computed(() =>
  alerts.filter(a => a.status === 'active' || a.status === 'investigating').slice(0, 5)
)

const severityColor: Record<string, string> = {
  critical: 'text-red-500',
  high: 'text-orange-500',
  medium: 'text-yellow-500',
  low: 'text-blue-500'
}

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
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

    <USlideover v-model:open="mobileMenuOpen" side="left" class="lg:hidden">
      <template #content>
        <div class="flex flex-col h-full bg-[var(--ui-bg-elevated)]">
          <div class="flex items-center justify-between px-6 h-16 border-b border-[var(--ui-border)]">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-activity" class="w-6 h-6 text-[var(--ui-primary)]" />
              <span class="font-semibold text-[var(--ui-text-highlighted)]">OpsBoard</span>
            </div>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="mobileMenuOpen = false" />
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
        </div>
      </template>
    </USlideover>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="flex items-center justify-between h-16 px-4 border-b border-[var(--ui-border)] bg-[var(--ui-bg)]">
        <div class="flex items-center gap-3 lg:hidden">
          <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="mobileMenuOpen = true"
          />
          <UIcon name="i-lucide-activity" class="w-5 h-5 text-[var(--ui-primary)]" />
          <span class="font-semibold text-[var(--ui-text-highlighted)]">OpsBoard</span>
        </div>

        <div class="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <UInput
            v-model="searchQuery"
            :placeholder="$t('nav.searchPlaceholder')"
            icon="i-lucide-search"
            class="w-full"
            size="sm"
          />
        </div>

        <div class="flex items-center gap-1">
          <UPopover>
            <UButton
              icon="i-lucide-bell"
              color="neutral"
              variant="ghost"
              size="sm"
              class="relative"
            >
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </UButton>

            <template #content>
              <div class="w-80 max-h-96 overflow-y-auto">
                <div class="px-4 py-3 border-b border-[var(--ui-border)] flex items-center justify-between">
                  <span class="text-sm font-semibold text-[var(--ui-text)]">{{ $t('notifications.title') }}</span>
                  <UBadge :label="String(unreadAlerts.length)" color="error" size="xs" />
                </div>
                <div v-if="unreadAlerts.length === 0" class="px-4 py-6 text-center text-sm text-[var(--ui-text-muted)]">
                  {{ $t('notifications.empty') }}
                </div>
                <div
                  v-for="alert in unreadAlerts"
                  :key="alert.id"
                  class="px-4 py-3 border-b border-[var(--ui-border)] last:border-0 hover:bg-[var(--ui-bg-accented)] cursor-pointer"
                  @click="router.push('/alerts')"
                >
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-alert-circle" class="w-4 h-4 mt-0.5 shrink-0" :class="severityColor[alert.severity]" />
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-[var(--ui-text)] truncate">{{ alert.title }}</p>
                      <p class="text-xs text-[var(--ui-text-muted)] mt-0.5 line-clamp-2">{{ alert.description }}</p>
                      <p class="text-xs text-[var(--ui-text-muted)] mt-1">{{ alert.customerName }}</p>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-2 border-t border-[var(--ui-border)]">
                  <UButton
                    :label="$t('notifications.viewAll')"
                    variant="ghost"
                    color="neutral"
                    size="xs"
                    class="w-full justify-center"
                    @click="router.push('/alerts')"
                  />
                </div>
              </div>
            </template>
          </UPopover>

          <UDropdownMenu :items="langMenuItems">
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              class="font-medium text-xs w-9"
            >
              {{ locale.toUpperCase() }}
            </UButton>
          </UDropdownMenu>

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
        <div class="p-4 lg:p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
