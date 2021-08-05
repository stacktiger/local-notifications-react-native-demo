import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, SafeAreaView, Button } from "react-native";
import { Modalize } from "react-native-modalize";
import { Show, shows } from "./src/utils/shows";
import { ShowItem } from "./src/ShowItem";
import { ShowOptions } from "./src/ShowOptions";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import { newEpisodeNotification } from "./src/utils/notifications";

const App = () => {
  const modalizeRef = useRef<Modalize>(null);

  const [selectedShow, setSelectedShow] = useState<Show>();
  const [bookmarks, setBookmarks] = useState<number[]>([0, 2, 4, 6, 8, 10]);

  useEffect(() => {
    (async () => {
      await notifee.setNotificationCategories([
        {
          id: "new-episode",
          actions: [
            { id: "default", title: "Watch Now", foreground: true },
            { id: "bookmark", title: "Save For Later" },
          ],
        },
      ]);
    })();

    return notifee.onForegroundEvent(async ({ type, detail }) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === "bookmark"
      ) {
        setBookmarks([
          ...bookmarks,
          parseInt(detail.notification?.data?.showId as string),
        ]);
      } else if (
        detail.pressAction?.id === "dismiss" &&
        detail.notification?.id
      ) {
        await notifee.cancelNotification(detail.notification.id);
      }
    });
  }, []);

  const onSelectShow = (show: Show) => {
    setSelectedShow(show);
    modalizeRef.current?.open();
  };

  const toggleBookmark = (show: Show, bookmarked: boolean) => {
    if (bookmarked) {
      const updatedBookmark = bookmarks.filter((id) => id !== show.id);
      setBookmarks(updatedBookmark);
    } else {
      setBookmarks([...bookmarks, show.id]);
    }
  };

  async function onDisplayNotification() {
    await notifee.requestPermission();
    await notifee.createChannel({
      id: "general",
      name: "General",
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification(newEpisodeNotification);
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
      <ScrollView
        style={{ marginVertical: 10 }}
        contentContainerStyle={{
          flexDirection: "row", // arrange posters in rows
          flexWrap: "wrap",
          backgroundColor: "#fff",
        }}
      >
        {shows.map((show) => (
          <ShowItem
            key={show?.id}
            show={show}
            bookmarked={bookmarks.includes(show?.id)}
            onSelectShow={onSelectShow}
            toggleBookmark={toggleBookmark}
          />
        ))}
      </ScrollView>
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <ShowOptions show={selectedShow} />
      </Modalize>
    </SafeAreaView>
  );
};

export default App;
