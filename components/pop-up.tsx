"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user } = useUser();

  if (!user) return null;
  const avatarSrc="/profile.webp"

  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-3xl overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/3 bg-muted p-6 border-r">
            <div className="text-lg font-semibold mb-4">Account</div>
            <div className="space-y-2">
              <button className="flex items-center space-x-2 text-left text-white font-medium">
                <span className="inline-block w-4 h-4 rounded-full bg-white" />
                <span>Profile</span>
              </button>
            </div>
            <div className="mt-auto text-xs text-muted-foreground absolute bottom-4">
              Secured by <strong>Clerk</strong>
            </div>
          </div>

          {/* Content */}
          <div className="w-2/3 p-6">
            <div className="text-lg font-semibold mb-4">Profile details</div>

            {/* Profile */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={avatarSrc} alt={user.fullName || "User"} />
                  <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.fullName}</div>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:underline">Update profile</button>
            </div>

            {/* Email */}
            <div className="mb-6">
              <div className="text-sm font-medium mb-1">Email addresses</div>
              <div className="text-sm">
                {user.primaryEmailAddress?.emailAddress}{" "}
                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full text-muted-foreground">
                  Primary
                </span>
              </div>
              <button className="mt-2 text-sm text-blue-600 hover:underline">
                + Add email address
              </button>
            </div>

            {/* Connected accounts */}
            <div>
              <div className="text-sm font-medium mb-1">Connected accounts</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                 
                </svg>
               
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
