import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { Tabs,TabsContent,TabsTrigger, TabsList } from "@/components/ui/tabs";
import { redirect } from "next/navigation"
import { profileTabs } from "@/constants";
import Image from "next/image";
export default async function Page({params}:{params:{id:string}}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo =  await fetchUser(params.id)
    if(!userInfo?.onboarded) return redirect('/onboarding')
      return (
        <section>
            <ProfileHeader
            accountId={userInfo.id}
            authUserId={user.id}
            name={userInfo.name}
            username={userInfo.username}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
            />
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map(tab=>(
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">

                                <Image
                                src={tab.icon}
                                alt={tab.label}
                                width={24}
                                height={24}
                                className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </section>
    )
}