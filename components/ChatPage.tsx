import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { firestore, serverTimestamp } from '../firebase';

interface ChatMessage {
  id: string; // Firestore doc ID
  uid: string;
  name: string;
  picture: string;
  text: string;
  timestamp: any; // Firestore Timestamp
}

interface ChatPageProps {
  user: User;
  t: any;
}

const ChatPage: React.FC<ChatPageProps> = ({ user, t }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const q = firestore.collection('chats').orderBy('timestamp', 'asc').limitToLast(50);

    const unsubscribe = q.onSnapshot(querySnapshot => {
      const msgs: ChatMessage[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        msgs.push({
          id: doc.id,
          uid: data.uid,
          name: data.name,
          picture: data.picture,
          text: data.text,
          timestamp: data.timestamp,
        });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;

    await firestore.collection('chats').add({
      text: newMessage,
      uid: user.uid,
      name: user.name,
      picture: user.picture,
      timestamp: serverTimestamp(),
    });

    setNewMessage('');
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!user?.isAdmin) return;
    
    if (window.confirm(t.chatDeleteMessagePrompt)) {
      try {
        await firestore.collection('chats').doc(messageId).delete();
      } catch (error) {
        console.error("Error deleting message: ", error);
        alert('Failed to delete message.');
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-144px)] sm:h-[calc(100vh-112px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isCurrentUser = msg.uid === user?.uid;
          const date = msg.timestamp?.toDate();
          const timeString = date 
            ? date.toLocaleTimeString(t.language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }) 
            : '...';
            
          const DeleteButton = () => (
            <button 
              onClick={() => handleDeleteMessage(msg.id)}
              className="text-gray-400 hover:text-red-500 self-center opacity-0 group-hover:opacity-100 transition-opacity"
              title={t.chatDeleteMessageTitle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
              </svg>
            </button>
          );

          return (
            <div key={msg.id} className={`group flex items-end gap-3 ${isCurrentUser ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                <img src={isCurrentUser ? (user?.picture || '') : msg.picture} alt={isCurrentUser ? (user?.name || 'You') : msg.name} className="w-8 h-8 rounded-full" />
                
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isCurrentUser ? 'bg-purple-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                    {!isCurrentUser && <p className="text-xs font-bold text-purple-500 dark:text-purple-400 mb-1">{msg.name}</p>}
                    <p className="text-sm break-words">{msg.text}</p>
                    <p className={`text-xs mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'} ${isCurrentUser ? 'text-left' : 'text-right'}`}>{timeString}</p>
                </div>
                
                {user?.isAdmin && <DeleteButton />}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {!user ? (
            <div className="text-center text-gray-500 dark:text-gray-400">{t.chatSignInPrompt}</div>
        ) : (
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t.chatPlaceholder}
                  className="flex-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-purple-500 focus:border-purple-500 bg-gray-50 dark:bg-gray-700"
              />
              <button type="submit" className="bg-purple-500 text-white rounded-full p-3 flex items-center justify-center hover:bg-purple-600 transition-colors disabled:opacity-50" disabled={!newMessage.trim()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
              </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default ChatPage;