import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { Tabs,TabsContent,TabsTrigger, TabsList } from "@/components/ui/tabs";
import { redirect } from "next/navigation"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
const Page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo =  await fetchUser(user.id)
    if(!userInfo?.onboarded) return redirect('/onboarding')    return (
        <section>
            <h1 className="head-text mb-10">
                Communities
            </h1>
        </section>
    )
}

export default Page