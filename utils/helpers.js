import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'mobilecards:notification';

const createNotification = () => {
    return {
        title: 'Pass the quiz!',
        // eslint-disable-next-line quotes
        body: `🙏 Please pass the quiz today!`,
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
            badge: true
        }
    };
};

export const clearLocalNotification = async () => {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    Notifications.cancelAllScheduledNotificationsAsync();
};

export const setLocalNotification = async (nextDay) => {
    const data = JSON.parse(await (AsyncStorage.getItem(NOTIFICATION_KEY)));
    if (data === null || nextDay) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync();

                    let today = new Date();
                    today.setDate(nextDay ? (today.getDate() + 1) : today.getDate());
                    today.setHours(18);
                    today.setMinutes(0);

                    const notificationObject = createNotification();

                    Notifications.scheduleLocalNotificationAsync(
                        notificationObject,
                        {
                            time: today,
                            repeat: 'day',
                        }
                    );

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                }
            });
    }
};