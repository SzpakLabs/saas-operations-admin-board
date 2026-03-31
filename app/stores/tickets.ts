import { defineStore } from 'pinia'
import type { Ticket, TicketStatus } from '~/types'
import { tickets as ticketData } from '~/data/tickets'

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    tickets: [...ticketData] as Ticket[]
  }),

  actions: {
    updateStatus(ticketId: string, status: TicketStatus) {
      const ticket = this.tickets.find(t => t.id === ticketId)
      if (ticket) {
        ticket.status = status
        ticket.updatedAt = new Date().toISOString()
      }
    }
  }
})
