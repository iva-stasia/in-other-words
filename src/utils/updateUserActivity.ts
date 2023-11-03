import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";
import { UserData } from "../types";

const updateUserActivity = async (uid: string) => {
  try {
    const data = (await getDoc(doc(db, "users", uid))).data() as UserData;

    if (!data.lastLoginDate || !data.activityLog) return;

    const lastLoginDate = dayjs(data.lastLoginDate.toDate());

    const isLoggedInToday =
      lastLoginDate.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY");

    if (isLoggedInToday) return;

    const newActivityLog = [...data.activityLog, Timestamp.now()];

    await updateDoc(doc(db, "users", uid), {
      activityLog: newActivityLog,
      lastLoginDate: Timestamp.now(),
    });
  } catch (e) {
    console.error("Something went wrong.", e);
  }
};

export default updateUserActivity;
