import { Injectable } from '@nestjs/common'
import { NotificationGateway } from './gateway'

export const donationNotificationSelect = {
  id: true,
  status: true,
  currency: true,
  amount: true,
  createdAt: true,
  extPaymentMethodId: true,
  person: {
    select: {
      firstName: true,
      lastName: true,
      picture: true,
    },
  },
}

@Injectable()
export class NotificationService {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  sendNotification(eventName: string, notificationData: any) {
    this.notificationGateway.server.emit(eventName, notificationData)
  }
}
