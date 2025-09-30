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
import { LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
});

export type JoinRoomFormValues = z.infer<typeof formSchema>;

interface JoinRoomFormProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserName: string | undefined;
  setCurrentUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function JoinRoomForm({
  setOpenDialog,
  currentUserName,
  setCurrentUserName,
}: JoinRoomFormProps) {
  const form = useForm<JoinRoomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUserName ?? "",
    },
  });

  const onSave = useMutation(
    ({ storage }, formValues: JoinRoomFormValues) => {
      const { username } = formValues;
      const selections = storage.get("selections");
      if (
        selections.some((item) => item.get("name")?.trim() === username?.trim())
      ) {
        toast("There is already an user with that name", {
          position: "top-center",
        });
        return;
      }

      setCurrentUserName(username);
      const newSelectUser = new LiveObject({
        name: username,
        host: false,
        value: null,
      });

      selections.push(newSelectUser);
      setOpenDialog(false);
    },
    [setCurrentUserName, setOpenDialog]
  );

  const onSubmit = (values: JoinRoomFormValues) => {
    console.log(values);
    onSave(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
                  Join A Session
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Join an exsiting session and start planning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  Join Session
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
