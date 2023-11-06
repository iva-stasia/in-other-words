import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface Notification {
  id: string;
  date: Timestamp;
  text: string;
  icon: string;
  read: boolean;
  path: string;
}

const useGetNotifications = () => {
  const { uid } = useSelector((state: RootState) => state.user);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(db, "userNotifications", uid), (doc) => {
        const data = doc.data();

        if (data) {
          const notifications = Object.values(data) as Notification[];
          const sortedByDate = notifications.sort(
            (a, b) => Number(b.date) - Number(a.date)
          );

          setNotifications(sortedByDate);
        }
      });

      return () => {
        unsub();
      };
    }
  }, [uid]);

  return notifications;
};

export default useGetNotifications;
