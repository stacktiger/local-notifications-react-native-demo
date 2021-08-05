import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import type { Show } from "./utils/shows";

type ShowItemProps = {
  show: Show;
  onSelectShow: (show: Show) => void;
  bookmarked: boolean;
  toggleBookmark: (show: Show, bookmarked: boolean) => void;
};

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const cols = 2,
  rows = 2.5;

const activeBookmarkIcon =
  "https://image.flaticon.com/icons/png/512/535/535183.png";
const inactiveBookmarkIcon =
  "https://image.flaticon.com/icons/png/512/1000/1000621.png";

export const ShowItem = ({
  show,
  onSelectShow,
  bookmarked,
  toggleBookmark,
}: ShowItemProps) => {
  if (!show) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelectShow(show)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: show.poster }} style={styles.image} />
        <TouchableOpacity
          onPress={() => toggleBookmark(show, bookmarked)}
          activeOpacity={1}
          style={styles.bookmarkIconContainer}
        >
          <Image
            source={{
              uri: bookmarked ? activeBookmarkIcon : inactiveBookmarkIcon,
            }}
            style={styles.bookmarkIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {show.title}
      </Text>
      <Text style={styles.genre} numberOfLines={1}>
        {show.genre}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1, // take up all available space
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  genre: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
    fontWeight: "400",
  },
  bookmarkIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  bookmarkIconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
