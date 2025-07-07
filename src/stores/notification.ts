import { defineStore } from 'pinia'
import { debounce } from '@/utils'

export type Notification = {
  isVisible?: boolean
  title: string
  type?: 'Error' | 'Success'
  closable?: boolean
  timeout?: number
}

export interface NotificationStore {
  _notification: Notification
}

const defaultValue = {
  color: 'text-blue-600',
  isVisible: false,
  title: 'Something went wrong'
}

export const useNotificationStore =  defineStore('notification',{
  state: (): NotificationStore => ({
    _notification: defaultValue
  }),
  actions: {
    setNotification(notification: Notification) {
      this._notification = {
        ...notification,
        isVisible: true
      }

      this.closeDebounceNotification(notification.timeout)
    },
    closeDebounceNotification(timeout?: number) {
      const debouncedClose = debounce(() => {
        this._notification = { ...this._notification, isVisible: false }
      }, timeout || 2000)

      debouncedClose()
    },
    closeNotification() {
      this._notification = { ...this._notification, isVisible: false }
    }
  },
  getters: {
    notification: (state) => state._notification
  }
})