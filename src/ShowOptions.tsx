import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import type { Show } from "./utils/shows";
import RadioGroup, { Radio } from "./RadioGroup";
import notifee, { TriggerType } from "@notifee/react-native";
import { reminderNotification } from "./utils/notifications";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type ShowOptionsProps = {
  show: Show | undefined;
};

export const ShowOptions = ({ show }: ShowOptionsProps) => {
  const [selectedReminder, setSelectedReminder] = useState(0);

  if (!show) return null;

  const onReminder = async () => {
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 3);
    await notifee.createTriggerNotification(reminderNotification, {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    });
  };

  const getShowTime = () => {
    return `${show.day} at ${show.time}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.movieContainer]}>
          <View style={[styles.imageContainer]}>
            <Image source={{ uri: show.poster }} style={styles.image} />
          </View>
          <View style={[styles.movieInfo]}>
            <Text style={[styles.title]} numberOfLines={3}>
              {show.title}
            </Text>

            <Text style={styles.genre}>{show.genre}</Text>
            <Text style={styles.showTime}>{getShowTime()}</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Reminders</Text>
        <RadioGroup
          initial={selectedReminder}
          style={{ paddingVertical: 10 }}
          data={[
            { label: "10 Mins Before" },
            { label: "1 Day Before" },
            { label: "Mondays at 8pm" },
          ]}
          onChange={(_: Radio, index: number) => setSelectedReminder(index)}
        />
      </View>
      <View style={styles.footer}>
        <TouchableHighlight
          underlayColor="#9575CD"
          style={styles.buttonContainer}
          onPress={onReminder}
        >
          <Text style={styles.button}>Set Reminder</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  movieContainer: {
    flexDirection: "column",
    marginBottom: 20,
    alignContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: (screenHeight - 40) / 2.5 - 50,
    width: (screenWidth - 20) / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    borderRadius: 10, // rounded corners
    ...StyleSheet.absoluteFillObject, // fill up all space in a container
  },
  movieInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 20,
    flexWrap: "wrap",
    textAlign: "center",
  },
  genre: {
    color: "#777",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  showTime: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  sectionHeader: {
    color: "#999",
    fontWeight: "500",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  footer: {
    padding: 20,
    flexDirection: "row",
  },
  buttonContainer: {
    backgroundColor: "#673AB7",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    width: "100%",
  },
  button: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
