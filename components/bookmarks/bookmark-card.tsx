"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlinePencil, HiOutlineExternalLink } from "react-icons/hi";
import { format, formatDistanceToNow } from "date-fns";
import { Bookmark } from "@/app/(dashboard)/dashboard/MyBookMarks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useIsMobile} from "@/hooks/use-mobile";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
}

export function BookmarkCard({ bookmark, onEdit, onDelete }: BookmarkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMobileView = useIsMobile();

  
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(bookmark.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(bookmark.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <Card className="h-full border-2 bg-white dark:bg-gray-900 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 text-gray-900 dark:text-gray-100">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {faviconUrl ? (
                <img 
                  src={faviconUrl} 
                  alt="" 
                  className="w-6 h-6 rounded"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-600 to-indigo-600" />
              )}
              <CardTitle className="text-lg line-clamp-1 text-gray-900 dark:text-white">
                {bookmark.title}
              </CardTitle>
            </div>
            
            {/* Action Buttons - Visible on hover */}
            <AnimatePresence>
              {(isHovered || isMobileView) && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex space-x-1 absolute top-4 right-4"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white cursor-pointer dark:bg-gray-800 shadow-md hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => onEdit(bookmark)}
                  >
                    <HiOutlinePencil className="h-4 w-4 text-purple-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white  cursor-pointer dark:bg-gray-800 shadow-md hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <HiOutlineTrash className="h-4 w-4 text-red-600" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <CardDescription className="line-clamp-2 text-sm text-gray-600 text-muted-foreground dark:text-gray-300">
            {bookmark.description || "No description provided"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="">
          <a 
            href={bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center group/link"
          >
            <span className="truncate max-w-[200px] text-purple-600 dark:text-purple-400">
              {bookmark.url}
            </span>
            <HiOutlineExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity text-purple-600 dark:text-purple-400" />
          </a>
        </CardContent>
        
        <CardFooter className=" text-xs text-gray-500 dark:text-gray-400">
            <div className="flex lg:items-center justify-between w-full flex-col lg:flex-row">
                <span>
          Added {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
                </span>
            {bookmark?.updatedAt == null ? null :
             <span className="text-emerald-500">
                    Last updated : {format(new Date(bookmark?.updatedAt),"dd MMM,yyyy hh:mm a")}
                </span>
                }
            </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}