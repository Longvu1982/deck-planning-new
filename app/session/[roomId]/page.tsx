"use client";
import { useStorage } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import GameRoom from "./_components/game-room";
import JoinRoomForm from "./_components/join-form";

const RoomPage = () => {
  const [isOpenJoinDialog, setOpenJoinDialog] = useState(false);
  const selections = useStorage((state) => state.selections);

  const [currentUserName, setCurrentUserName] = useLocalStorage(
    "currentUserName",
    ""
  );

  useEffect(() => {
    if (
      !currentUserName ||
      selections.every((item) => item.name !== currentUserName)
    )
      setOpenJoinDialog(true);
    else {
      setOpenJoinDialog(false);
    }
  }, [currentUserName]);

  return (
    <>
      {isOpenJoinDialog ? (
        <JoinRoomForm
          setOpenDialog={setOpenJoinDialog}
          currentUserName={currentUserName}
          setCurrentUserName={setCurrentUserName}
        />
      ) : (
        <GameRoom />
      )}
    </>
  );
};

export default RoomPage;
