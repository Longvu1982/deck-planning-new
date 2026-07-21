"use client";

import { ESelectionStatus, EState } from "@/liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { FullPageLoading } from "./session/[roomId]/_components/full-page-loading";

export function Room({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const initialUsername = searchParams.get("username");
  const initialRoomname = searchParams.get("roomname");

  if (!params.roomId) router.push("");

  return (
    <LiveblocksProvider
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
    >
      <RoomProvider
        initialPresence={{
          typing: {
            isTyping: false,
            name: global?.window
              ? localStorage?.getItem("currentUserName") ?? ""
              : "",
          },
        }}
        id={params.roomId as string}
        initialStorage={{
          selections: new LiveList([
            new LiveObject({
              name: initialUsername ?? "",
              host: true,
              value: null,
              status: ESelectionStatus.IDLE,
            }),
          ]),
          roomInfo: new LiveObject({
            id: "",
            name: initialRoomname ?? "",
            value: [],
          }),
          gameState: new LiveObject({
            allowEmpty: true,
            state: EState.PENDING,
            isResultRounded: true,
            showChat: true,
          }),
          messages: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={<FullPageLoading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
