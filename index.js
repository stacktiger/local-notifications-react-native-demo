/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native'

notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log('type', EventType[type], detail);
    if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'default') {
        await notifee.cancelNotification(detail.notification?.id)
    } else if (detail.pressAction?.id === "dismiss") {
        await notifee.cancelNotification(detail.notification?.id);
      }
})

AppRegistry.registerComponent(appName, () => App);
