export function useFormatters() {
  const { locale, t } = useI18n()

  const intlLocale = computed(() => {
    const map: Record<string, string> = {
      en: 'en-US',
      es: 'es-ES',
      it: 'it-IT',
      fr: 'fr-FR',
      de: 'de-DE'
    }
    return map[locale.value] ?? 'en-US'
  })

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat(intlLocale.value, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString(intlLocale.value, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  function formatDateTime(date: string): string {
    return new Date(date).toLocaleDateString(intlLocale.value, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  function timeAgo(date: string): string {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return t('common.timeAgo.justNow')
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return t('common.timeAgo.minutesAgo', { n: minutes })
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return t('common.timeAgo.hoursAgo', { n: hours })
    const days = Math.floor(hours / 24)
    if (days < 7) return t('common.timeAgo.daysAgo', { n: days })
    return formatDate(date)
  }

  return { formatCurrency, formatDate, formatDateTime, timeAgo }
}
