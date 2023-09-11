'use client'

import { useEffect, useRef, useState } from "react";
import Talk from "talkjs";
import {useSession} from "next-auth/react";


function RightSidebar() {
  const chatboxEl = useRef(null);
  const { data: loginSession } = useSession();

  //wait for talkjs to load
  const [talkLoaded, markTalkLoaded] = useState(false);
  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '1',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser = new Talk.User({
        id: '2',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tsKF4S29',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
        chatbox.mount(chatboxEl.current);
      return () => session.destroy();
    }
  }, [talkLoaded]);

  return (
    <div className="rightsidebar" ref={chatboxEl} />
  )
}

export default RightSidebar;
