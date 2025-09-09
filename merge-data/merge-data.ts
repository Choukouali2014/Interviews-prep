type Session = { user: number; duration: number; equipment: Array<string> };

export default function mergeData(sessions: Array<Session>): Array<Session> {
  const mergedData: Record<number, Session> = {};
  const userOrders: number[] = [];
// keep the of sessions for each user
  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];
    if (mergedData[session.user]) {
      mergedData[session.user].duration += session.duration;
      mergedData[session.user].equipment = Array.from(
        new Set([...mergedData[session.user].equipment, ...session.equipment])
      ).sort();
    } else {
      mergedData[session.user] = { ...session };
      userOrders.push(session.user);
    }
  }

    console.log(Object.values(mergedData));
  return userOrders.map(   (user) => mergedData[user] );
}