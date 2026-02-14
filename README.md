# 🔖 Pinpoint – Bookmark Manager

Pinpoint is a full-stack bookmark management app built with Next.js 16 (App Router) and Supabase.

Users authenticate using Google OAuth and securely manage their own bookmarks.

Each bookmark contains title, URL, description, visibility, and timestamps.

Authentication is handled using Supabase Auth with HTTP-only cookies.

Route protection is implemented using `proxy.ts` to check user session.

Issue Faced: Proxy initially blocked dashboard after login because session was not correctly checked using `getUser()` instead of `getSession()`.
Resolution: Used `supabase.auth.getUser()` inside proxy to validate authenticated users properly before redirecting.

Issue Faced: "Row-level security policy violation" while inserting bookmarks.
Cause: RLS was enabled but no insert policy existed for authenticated users.
Resolution: Created RLS policy allowing inserts where `auth.uid() = user_id`.

Issue Faced: "Table not found in schema cache".
Cause: Table was not created in Supabase SQL editor.
Resolution: Created `bookmarkList` table manually with proper columns.

Row Level Security ensures users cannot access other users' bookmarks.

Tech Stack: Next.js 16, Supabase, PostgreSQL, TypeScript, Tailwind CSS.
