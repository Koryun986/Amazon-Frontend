"use client"

import {useUser} from "../../hooks/user-hook";
import AdminPageHeader from "./_components/AdminPageHeader";
import {useState} from "react";

export type AdminMenuPages = "users" | "colors" | "sizes" | "categories";

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<AdminMenuPages>("users");
  const user = useUser();

  if (!user?.isAdmin) {
    return (
      <div>You are not Admin</div>
    )
  }
  return (
    <div className="container mx-auto">
      <AdminPageHeader currentItem={currentPage} setCurrentItem={setCurrentPage} />
    </div>
  )
}