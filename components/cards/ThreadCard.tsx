import Image from "next/image";
import Link from "next/link";

interface Props {
    id:string;
    currentUserId:string;
    parentId:string|null;
    content:string;
    author:{
        name:string;
        image:string;
        id:string;
    };
    community:{
        name:string;
        image:string;
        id:string;
    } | null;
    createdAt:string;
    comments:{
        author:{
            image:string;
        }
    }[];
    isComment?: boolean;
}

export default function ThreadCard({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
}:Props) {
    return (
        <article className={`flex w-full flex-col rounded-xl 
        ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7' }`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link className="relative h-11 w-11" 
                        href={`/profile/${author.id}`}>
                            <Image
                            src={author.image}
                            alt="Profile image"
                            fill
                            className="cursor-pointer rounded-full"
                            />
                        </Link>
                            <div className="thread-card_bar"/>
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semibold text-light-1">
                            {author.name}
                        </h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2">
                            {content}
                        </p>
                        <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                            <div className="flex gap-3 5">
                                <Image 
                                src="/heart-gray.svg" 
                                alt="heart" 
                                width={24} 
                                height={24}
                                className="cursor-pointer object-contain"/>
                            <Link href={`/thread/${id}`}>
                                <Image 
                                src="/reply.svg" 
                                alt="heart" 
                                width={24} 
                                height={24}
                                className="cursor-pointer object-contain"/>
                            </Link>
                                <Image 
                                src="/repost.svg" 
                                alt="heart" 
                                width={24} 
                                height={24}
                                className="cursor-pointer object-contain"/>
                                <Image 
                                src="/share.svg" 
                                alt="heart" 
                                width={24} 
                                height={24}
                                className="cursor-pointer object-contain"/>
                            </div>
                            {isComment && comments.length>0 && (
                                <div className="flex items-center gap-2">
                                    <Link href={`/thread/${id}`}>
                                        <p className="mt-1 text-subtle-medium text-gray-1">
                                            {comments.length} replies
                                        </p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
           
        </article>
    )
}