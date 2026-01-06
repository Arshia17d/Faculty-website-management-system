import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import Notification from "../components/Notification.jsx";

const NotificationContext = createContext({
  notify: () => {},
});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const timeoutRef = useRef(null);

  const notify = useCallback((message, type = "success") => {
    setNotification({ message, type });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Notification notification={notification} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
