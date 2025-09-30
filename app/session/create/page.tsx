"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import { v4 } from "uuid";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  roomname: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
});

export type CreateRoomFormValues = z.infer<typeof formSchema>;

export default function CreateSessionPage() {
  const router = useRouter();

  const [currentUserName, setCurrentUserName] = useLocalStorage(
    "currentUserName",
    ""
  );

  const form = useForm<CreateRoomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUserName ?? "",
      roomname: "",
    },
  });

  const onSubmit = (values: CreateRoomFormValues) => {
    setCurrentUserName(values.username);
    router.push(
      `/session/${v4()}?username=${values.username}&roomname=${values.roomname}`
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
                  Create Planning Session
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Set up a new planning poker session for your team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="roomname"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <Label
                          htmlFor="session-name"
                          className="text-slate-700"
                        >
                          Session Name
                        </Label>
                        <FormControl>
                          <Input
                            id="session-name"
                            placeholder="Sprint Planning"
                            className="bg-white/50 border-white/50 backdrop-blur-sm focus:bg-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="pt-1 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-slate-700">
                          Your name
                        </Label>
                        <FormControl>
                          <Input
                            id="username"
                            placeholder="Sprint Planning"
                            className="bg-white/50 border-white/50 backdrop-blur-sm focus:bg-white/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="pt-1 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90">
                  Create Session
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
