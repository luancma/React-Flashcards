import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
export const notKey = 'FlashCards:Not'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(notKey)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
} 

function createNotification() {
    return {
        title: 'Hi!!',
        body: 'Remember your cards',
        ios: {
            sound: true,
        },
        android: {
            sound: true, 
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(notKey)
    .then(JSON.parse)
    .then(data => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if(status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync()
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(12)
                    tomorrow.setMinutes(30)

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day',
                        }
                    )
                    AsyncStorage.setItem(notKey, JSON.stringify(true))
                }
            })
        }
    })
}