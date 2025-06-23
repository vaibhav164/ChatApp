import React from "react";
import { View, StyleSheet } from "react-native";
import {
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";


const Messages = ({
  user,
  group,
  onBack,
}: {
  user?: CometChat.User;
  group?: CometChat.Group;
  onBack: () => void;
}) => {
  return (
    <View  style={styles.root}>
      <CometChatMessageHeader
        user={user}
        group={group}
        onBack={onBack}
        showBackButton
      />

      <CometChatMessageList user={user} group={group} />

      <CometChatMessageComposer user={user} group={group} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Messages;