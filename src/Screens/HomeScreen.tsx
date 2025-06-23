import React, { useEffect , useState} from "react";
import { ViewStyle, SafeAreaView} from 'react-native'
import {
  CometChatUIKit,
  UIKitSettings,
  CometChatConversations,
  CometChatUiKitConstants,
  CometChatThemeProvider,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import Messages from "../Components/Messages";

const HomeScreen=()=> {
const APP_ID = "277817e40e7ef699";
const AUTH_KEY = "a15d3b65df67a13e94d70950bc3475a02fa7b531";
const REGION = "in";
const DEMO_UID = "cometchat-uid-1";
const [loggedIn, setLoggedIn] = useState(false);
  const [messageUser, setMessageUser] = useState<CometChat.User>();
  const [messageGroup, setMessageGroup] = useState<CometChat.Group>();
 useEffect(() => {
    const init = async () => {
      const uiKitSettings: UIKitSettings = {
        appId: APP_ID,
        authKey: AUTH_KEY,
        region: REGION,
        subscriptionType: CometChat.AppSettings
          .SUBSCRIPTION_TYPE_ALL_USERS as UIKitSettings["subscriptionType"],
      };

      try {
        await CometChatUIKit.init(uiKitSettings);
        console.log("[CometChatUIKit] initialized");

        await CometChatUIKit.login({ uid: DEMO_UID });
        setLoggedIn(true);
      } catch (err) {
        console.error("[CometChatUIKit] init/login error", err);
      }
    };

    init();
  }, []);
    const uid = "cometchat-uid-1";
    CometChatUIKit.login({ uid })
  .then((user) => {
    console.log(`User logged in successfully: ${user.getName()}`);
  })
  .catch((error) => {
    console.log("Login failed with error:______", error);
  });
  return (
   <SafeAreaView style={styles.fullScreen}>
      <CometChatThemeProvider>
        {/* Show conversations only after the user is logged in */}
        {loggedIn && (
          <>
            {/* Conversation list (hidden when a chat is open) */}
            <CometChatConversations
              style={{
                containerStyle: {
                  display: messageUser || messageGroup ? "none" : "flex",
                },
              }}
              onItemPress={(conversation: CometChat.Conversation) => {
                if (
                  conversation.getConversationType() ===
                  CometChatUiKitConstants.ConversationTypeConstants.user
                ) {
                  setMessageUser(
                    conversation.getConversationWith() as CometChat.User
                  );
                  return;
                }
                setMessageGroup(
                  conversation.getConversationWith() as CometChat.Group
                );
              }}
            />

            {/* Active chat screen */}
            {(messageUser || messageGroup) && (
              <Messages
                user={messageUser}
                group={messageGroup}
                onBack={() => {
                  setMessageUser(undefined);
                  setMessageGroup(undefined);
                }}
              />
            )}
          </>
        )}
      </CometChatThemeProvider>
    </SafeAreaView>
  )
}
const styles: { fullScreen: ViewStyle } = {
  fullScreen: { flex: 1 },
};
export default HomeScreen