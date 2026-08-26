import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Zeee CMS",
    description: "Content Management System by Zeee",
};

export default function Home() {
    redirect("/login");
}
