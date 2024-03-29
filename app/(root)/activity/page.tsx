import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { Tabs,TabsContent,TabsTrigger, TabsList } from "@/components/ui/tabs";
import { redirect } from "next/navigation"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";
const Page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo =  await fetchUser(user.id)
    if(!userInfo?.onboarded) return redirect('/onboarding')    
    const activity = await getActivity(userInfo._id)
    return (
        <section>
            <h1 className="head-text mb-10">
                Activity
            </h1>
            <section className="mt-10 flex flex-col gap-5">
                {activity && activity.length > 0 ? (

                <>
                {activity.map((activity)=>(
                    <Link
                    key={activity._id}
                    href={`/thread/${activity.parentId}`}
                    >
                        <article className="activity-card">
                            <Image
                            src={activity.author.image}
                            alt="Profile Picture"
                            height={20}
                            width={20}
                            className="rounded-full object-cover"
                            />
                            <p className="!text-small-regular text-light-1">
                                <span className="mr-1 text-primary-500">
                                    {activity.author.name}
                                </span>
                                replied to your thread
                            </p>
                        </article>
                    </Link>
                ))}
                </>
                ):
                (
                    <p className="no-result">
                        No activity Yet
                    </p>
                )}
            </section>
        </section>
    )
}

export default Page