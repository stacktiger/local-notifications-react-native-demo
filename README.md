# Local Notifications React Native Demo

<p align="center">
  <img src="https://user-images.githubusercontent.com/14185925/131724969-f90eeda8-dc23-46f7-9ecb-ddfb0899bb5e.jpg" />
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/2313895/131730180-83445a74-5727-46d4-9b01-ed45b47c4cc3.png" />
</p>



# Overview

Most apps on your phone send user notifications; they are straightforward to integrate and apply to the most basic of use cases. However, most of these apps aren’t exploiting their full power to increase user engagement and retention.

There are two types of notifications used to inform users, local and remote (aka push). For example, a messaging app might let the user know when a new message has arrived, or a calendar app might inform the user of a scheduled appointment.

In this talk, we walked through how to integrate local notifications in a React Native app and demonstrated how they can be elevated beyond the basic title and body, to enhance the overall user experience.

- Getting set up with Notifee
- Media support
- Quick Actions
- Scheduling using Trigger Notifications

To follow along with this demo from scratch, watch the talk hosted by React Native EU.

[Invertase](https://invertase.io/) have been kind enough to offer the first **100 attendees** of React Native EU, a free [Notifee](https://notifee.app/) license using code `RNEU2021`.

# Getting Started

- Install required packages:
  - `yarn add @notifee/react-native`
- Install pods on iOS:
  - `npx pod install`
- Run app on ios:
  - `yarn ios`
- Run app on Android:
  - `yarn android`

# Media Support

Enhance the appearance of the notification by attaching images and videos to the notification.

## Android

```js
{
 // ...
 largeIcon:
      "https://b.thumbs.redditmedia.com/ss0L-8MRW23gOdqu_hEAqs7MgGLZgE3j4N-ur4eRK7A.png",
 style: {
   type: AndroidStyle.BIGPICTURE,
    // Remote or local - can also overwrite large icon
    picture: require("../../assets/new-episode-ga-image.png"),
  }
}
```

## iOS

```js
{
 // ...
 attachments: [{
  // Local file path.
  // url: require("./assets/new-episode-ga-image.png"),
  url: require("../../assets/trailer-greys.mp4"), // Video
 }],
}
```

# Quick Actions

Add the ability to interact with your notifications by including quick actions on the notification.

## Android

```js
    actions: [
      {
        pressAction: { id: "default" },
        title: "Watch Now",
      },
      { pressAction: { id: "bookmark" }, title: "Save For Later" },
    ],
```

## iOS

- Create the category first
```js
    await notifee.setNotificationCategories([
        {
            id: "new-episode",
            actions: [
            { id: "default", title: "Watch Now", foreground: true },
            { id: "bookmark", title: "Save For Later" },
            ],
        },
    ]);
```

- Set the category on the notification payload

```js
  categoryId: "new-episode",
```


# Scheduling using Trigger Notifications

Using Trigger Notifications, we can create reminders to remind the user when their favourite tv show is about to air.

```js
    await notifee.createTriggerNotification(reminderNotification, {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    });
```
