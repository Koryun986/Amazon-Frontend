"use client"

import {ReactNode, useState, Suspense} from "react";
import {useUser} from "../../hooks/user-hook";
import AdminPageHeader from "./_components/AdminPageHeader";
import UsersList from "./_components/users-list/UsersList";
import ColorsList from "./_components/colors-list/ColorsList";
import SizesList from "./_components/sizes-list/SizesList";

export type AdminMenuPages = "users" | "colors" | "sizes" | "categories";
const adminMenuPages: Record<AdminMenuPages, ReactNode> = {
  users:  (<UsersList />),
  colors: (<ColorsList />),
  sizes: (<SizesList />),
  categories: null
}

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
      <Suspense>
        {adminMenuPages[currentPage]}
      </Suspense>
    </div>
  )
}