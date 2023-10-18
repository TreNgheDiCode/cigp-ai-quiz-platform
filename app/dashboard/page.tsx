import { getAuthSession } from "@/lib/next-auth";
import React from "react";
import { redirect } from "next/navigation";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicCard from "@/components/dashboard/HotTopicCard";
import RecentActivities from "@/components/dashboard/RecentActivities";

type Props = {};

export const metadata = {
  title: "Dashboard | Quiz Platform",
};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default Dashboard;
