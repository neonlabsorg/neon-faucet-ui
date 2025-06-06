import { defineStore } from 'pinia';

interface ICardsState {
  _currentCard: ECards,
  _notification: Notification | null,
  _isButtonDisabled: boolean
}

type Notification = {
  type: ENotificationType,
  title: string,
  subtitle?: string,
  description: string,
}

export enum ECards {
  notification = 'Notification',
  form = 'Form',
  pending = 'Pending',
  connect = 'WalletConnect'
}

export enum ENotificationType {
  error = 'Error',
  success = 'Success'
}

const initialState = {
  _currentCard: ECards.connect,
  _notification: null,
  _isButtonDisabled: false,
}

export const useCardsStore = defineStore('cards', {
  state: (): ICardsState => initialState,
  actions: {
    setCurrentCard(card: ECards) {
      this._currentCard = card
    },
    setNotification(notification: Notification) {
      this._notification = notification
    },
    setIsButtonDisabled(isButtonDisabled: boolean) {
      this._isButtonDisabled = isButtonDisabled
    }
  },
  getters: {
    currentCard: ({ _currentCard }) => _currentCard,
    notification: ({ _notification }) => _notification,
    isButtonDisabled: ({ _isButtonDisabled }) => _isButtonDisabled,
  }
})