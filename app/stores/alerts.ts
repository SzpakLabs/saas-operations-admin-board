import { defineStore } from 'pinia'
import type { Alert, AlertStatus } from '~/types'
import { alerts as alertData } from '~/data/alerts'

export const useAlertsStore = defineStore('alerts', {
  state: () => ({
    alerts: [...alertData] as Alert[]
  }),

  actions: {
    updateStatus(alertId: string, status: AlertStatus) {
      const alert = this.alerts.find(a => a.id === alertId)
      if (alert) {
        alert.status = status
        if (status === 'resolved' || status === 'dismissed') {
          alert.resolvedAt = new Date().toISOString()
        }
      }
    }
  }
})
