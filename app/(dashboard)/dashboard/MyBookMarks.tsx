"use client";

import PageNotFound from "../../not-found";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineBookmark, HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import { BookmarkCard } from "@/components/bookmarks/bookmark-card";
import { BookmarkModal } from "@/components/bookmarks/bookmark-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast, Toaster } from "sonner";
import swal from "sweetalert";

export const bookmarkSchema = z.object({
  title: z.string().min(3, "Minimum 3 characters are required in title").max(50, "Title is too long. Restrict to 50"),
  url: z.url("Please enter a valid URL").min(1, "URL is required"),
  description: z.string().max(500, "Description is too long").optional(),
})

export type BookmarkFormDataType = z.infer<typeof bookmarkSchema>;

export interface Bookmark extends BookmarkFormDataType {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  user_id?: string
}



export default function BookmarksPage() {
  const supabase = createClient();
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const getData = async () => {
    const { data } = await supabase.from("bookmarkList").select("*").eq("user_id", user?.id);
    setBookmarks(data ?? []);
    setIsLoading(false)
  }

useEffect(() => {
  if (!user) return;

  const handleVisibility = () => {
    if (!document.hidden) {
      getData();
    }
  };

  window.addEventListener("focus", getData); 
  document.addEventListener("visibilitychange", handleVisibility);

  getData(); 

  return () => {
    window.removeEventListener("focus", getData);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, [user?.id]);



  // Search functionality
  useEffect(() => {
    const filtered = bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBookmarks(filtered);
  }, [searchQuery, bookmarks]);


  const handleAddBookmark = async (data: BookmarkFormDataType) => {


    const { error } = await supabase.from("bookmarkList")
      .insert([
        {
          title: data.title,
          url: data.url,
          description: data.description
        }
      ]);

    if (error) {
      toast.error(error.message, { position: "bottom-right" });
    } else {
      toast.success("Added Successfully", { position: "bottom-right" });
      getData();
    }

  };

  const handleEditBookmark = async (data: BookmarkFormDataType) => {
    if (!selectedBookmark) return;

    const { error } = await supabase
      .from("bookmarkList")
      .update({
        title: data.title,
        url: data.url,
        description: data.description,
        updatedAt:new Date()
      })
      .eq("id", selectedBookmark.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    getData()
  };

  const handleDeleteBookmark = (id: string) => {
    swal({ title: "Are you sure to delete ?", dangerMode: true, buttons: ["Cancel", "Delete"] }).then(async (willDelete) => {
      if (willDelete) {
        const { error } = await supabase.from('bookmarkList').delete().eq("id", id);
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Deleted successfully", { position: "bottom-right" });
        getData()
      }
    })
  };

  const openAddModal = () => {
    setModalMode("add");
    setSelectedBookmark(null);
    setIsModalOpen(true);
  };

  const openEditModal = (bookmark: Bookmark) => {
    setModalMode("edit");
    setSelectedBookmark(bookmark);
    setIsModalOpen(true);
  };

  const Close = () => {
    setIsModalOpen(false);
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Toaster />
      {/* Main Content */}
      <main className="container mx-auto px-6 pt-28 pb-16">
        {/* Header with Title and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl font-bold"
          >
            My Bookmarks
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredBookmarks.length + ` item${filteredBookmarks.length > 1 ? "s" : ""}`})
            </span>
          </motion.h1>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 w-full sm:w-auto"
          >
            {/* Search Bar */}
            <div className="relative flex-1 sm:flex-initial">
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[250px]"
              />
            </div>

            <Button
              onClick={openAddModal}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <HiOutlinePlus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </motion.div>
        </div>

        {/* Bookmarks Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredBookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchQuery ? "Try a different search term" : "Start adding your first bookmark"}
            </p>
            {!searchQuery && (
              <Button
                onClick={openAddModal}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer text-white"
              >
                <HiOutlinePlus className="mr-2 h-4 w-4" />
                Add Your First Bookmark
              </Button>
            )}
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onEdit={openEditModal}
                  onDelete={handleDeleteBookmark}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <BookmarkModal
        isOpen={isModalOpen}
        onClose={Close}
        onSubmit={modalMode == "add" ? handleAddBookmark : handleEditBookmark}
        bookmark={selectedBookmark}
        mode={modalMode}
      />
    </div>
  );


}