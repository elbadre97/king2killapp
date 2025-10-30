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
  const [banConfirmation, setBanConfirmation] = useState<{ uid: string; name: string } | null>(null);
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

  const handleConfirmBan = async () => {
    if (banConfirmation && user?.isAdmin) {
      try {
        await firestore.collection('bannedUsers').doc(banConfirmation.uid).set({
          bannedBy: user.uid,
          bannedAt: serverTimestamp(),
          bannedUserName: banConfirmation.name,
        });
        alert(`${banConfirmation.name} has been banned.`);
      } catch (error) {
        console.error("Error banning user:", error);
        alert("Failed to ban user.");
      } finally {
        setBanConfirmation(null);
      }
    }
  };


  return (
    <>
      {banConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" dir={t.dir}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">{t.chatBanUserTitle}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.chatBanUserPrompt(banConfirmation.name)}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setBanConfirmation(null)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-bold transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmBan}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-bold transition-colors"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[calc(100vh-144px)] sm:h-[calc(100vh-112px)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isCurrentUser = msg.uid === user?.uid;
            const date = msg.timestamp?.toDate();
            const timeString = date 
              ? date.toLocaleTimeString(t.language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }) 
              : '...';
              
            return (
              <div key={msg.id} className={`group flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`${isCurrentUser ? 'order-3' : 'order-1'}`}>
                  <img src={isCurrentUser ? (user?.picture || '') : msg.picture} alt={isCurrentUser ? (user?.name || 'You') : msg.name} className="w-8 h-8 rounded-full" />
                </div>
                  
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl order-2 ${isCurrentUser ? 'bg-purple-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                    {!isCurrentUser && <p className="text-xs font-bold text-purple-500 dark:text-purple-400 mb-1">{msg.name}</p>}
                    <p className="text-sm break-words">{msg.text}</p>
                    <p className={`text-xs mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'} ${isCurrentUser ? 'text-left' : 'text-right'}`}>{timeString}</p>
                </div>
                  
                {user?.isAdmin && (
                  <div className={`flex items-center self-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentUser ? 'order-1 mr-1' : 'order-3 ml-1'}`}>
                    {!isCurrentUser && (
                      <button 
                        onClick={() => setBanConfirmation({ uid: msg.uid, name: msg.name })}
                        className="text-gray-400 hover:text-red-500"
                        title={t.chatBanUserTitle}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-gray-400 hover:text-red-500"
                      title={t.chatDeleteMessageTitle}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {!user ? (
              <div className="text-center text-gray-500 dark:text-gray-400">{t.chatSignInPrompt}</div>
          ) : user.isBanned ? (
              <div className="text-center text-red-500 font-bold p-3 bg-red-50 dark:bg-red-900/50 rounded-full">{t.chatBannedMessage}</div>
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
    </>
  );
};

export default ChatPage;