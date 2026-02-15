// components/bookmarks/bookmark-modal.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookmarkSchema, BookmarkFormDataType, Bookmark } from "@/app/(dashboard)/dashboard/MyBookMarks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookmarkFormDataType) => Promise<void>;
  bookmark?: Bookmark | null;
  mode: "add" | "edit";
}

export function BookmarkModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  bookmark, 
  mode 
}: BookmarkModalProps) {
  const form = useForm<BookmarkFormDataType>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
    },
  });

  useEffect(() => {
    if (bookmark && mode === "edit") {
      form.reset({
        title: bookmark.title,
        url: bookmark.url,
        description: bookmark.description || "",
      });
    } else {
      form.reset({
        title: "",
        url: "",
        description: "",
      });
    }
  }, [bookmark, mode, form]);

  const handleSubmit = async (data: BookmarkFormDataType) => {
    await onSubmit(data);
    onClose();
    form.reset({
      title: "",
      url: "",
      description: "",
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {mode === "add" ? "Add New Bookmark" : "Edit Bookmark"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" 
              ? "Save a new webpage to your collection." 
              : "Update your bookmark details below."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input autoFocus={false}
                     placeholder="Enter bookmark title" 
                      {...field} 
                      className="focus:border-purple-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
                      {...field}  autoFocus={false}
                      className="focus:border-purple-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea autoFocus={false}
                      placeholder="Add a description..." 
                      {...field} 
                      className="focus:border-purple-500 resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div
                  >
                    Saving...
                  </div>
                ) : (
                  mode === "add" ? "Add Bookmark" : "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}