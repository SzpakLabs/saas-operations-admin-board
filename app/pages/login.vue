<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false })

const auth = useAuthStore()
const { t } = useI18n()

const form = reactive({ email: 'alex@opsboard.io', password: 'password' })
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 800))
  if (form.email && form.password) {
    auth.login()
    await navigateTo('/')
  } else {
    error.value = 'Please enter your email and password.'
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[var(--ui-bg)] flex">
    <div class="hidden lg:flex lg:w-1/2 bg-[var(--ui-primary)] flex-col justify-between p-12">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-activity" class="w-8 h-8 text-white" />
        <span class="text-xl font-bold text-white">OpsBoard</span>
      </div>
      <div>
        <blockquote class="text-white/90 text-xl font-medium leading-relaxed mb-6">
          {{ $t('login.testimonial') }}
        </blockquote>
        <div class="flex items-center gap-3">
          <UAvatar text="RH" size="md" class="bg-white/20 text-white" />
          <div>
            <p class="text-white font-medium text-sm">{{ $t('login.author') }}</p>
            <p class="text-white/70 text-sm">{{ $t('login.authorTitle') }}</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-6">
        <div>
          <p class="text-white text-2xl font-bold">2,400+</p>
          <p class="text-white/70 text-sm mt-1">{{ $t('login.customersManaged') }}</p>
        </div>
        <div>
          <p class="text-white text-2xl font-bold">$14.2M</p>
          <p class="text-white/70 text-sm mt-1">{{ $t('login.arrTracked') }}</p>
        </div>
        <div>
          <p class="text-white text-2xl font-bold">98.7%</p>
          <p class="text-white/70 text-sm mt-1">{{ $t('login.uptimeSLA') }}</p>
        </div>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <div class="flex items-center gap-2 lg:hidden mb-8">
          <UIcon name="i-lucide-activity" class="w-7 h-7 text-[var(--ui-primary)]" />
          <span class="text-lg font-bold">OpsBoard</span>
        </div>

        <h1 class="text-2xl font-bold text-[var(--ui-text-highlighted)] mb-2">{{ $t('login.title') }}</h1>
        <p class="text-[var(--ui-text-muted)] text-sm mb-8">{{ $t('login.subtitle') }}</p>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          class="mb-4"
        />

        <form class="space-y-4" @submit.prevent="handleLogin">
          <UFormField :label="$t('login.email')">
            <UInput
              v-model="form.email"
              type="email"
              :placeholder="$t('login.emailPlaceholder')"
              class="w-full"
              icon="i-lucide-mail"
            />
          </UFormField>

          <UFormField :label="$t('login.password')">
            <UInput
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full"
              icon="i-lucide-lock"
            />
          </UFormField>

          <div class="flex items-center justify-between">
            <UCheckbox :label="$t('login.rememberMe')" />
            <UButton variant="link" size="sm" color="primary">{{ $t('login.forgotPassword') }}</UButton>
          </div>

          <UButton
            type="submit"
            color="primary"
            class="w-full"
            :loading="loading"
            size="lg"
          >
            {{ $t('login.submit') }}
          </UButton>
        </form>

        <p class="text-xs text-[var(--ui-text-muted)] text-center mt-8">
          {{ $t('login.hint') }}
        </p>
      </div>
    </div>
  </div>
</template>
