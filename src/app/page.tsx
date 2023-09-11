
import { Post, UserProfile } from "@/interfaces/types"
import PostsCard from "@/components/cards/PostsCard"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import axios from "axios";
import {BASE_URL, HOME_URL} from "@/constants";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

async function getPosts(token : string) {
  const res = await axios(`${BASE_URL}/Post`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  })
  if (res.status !== 200) {
    throw new Error(res.statusText)
  }
  return await res.data
}

async function getUserInfo(id: number, token : string) {
  const res = await axios(`${BASE_URL}/User/${id}`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  })
  if (res.status !== 200) {
    throw new Error(res.statusText)
  }
  return await res.data
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${HOME_URL}`)
  }
  const token = session?.user.accessToken as string;
  const data = await getPosts(token);

  const authors = await Promise.all(data.map((post: Post) => getUserInfo(post.authorId, token)));
  const postsWithAuthors = data.map((post: Post) => {
    const author = authors.find((author: UserProfile) => author.id === post.authorId);
    return { post, author };
  });
  if(session && session.user) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
          <div className="w-full rounded-md overflow-hidden">
            {postsWithAuthors.map(({post, author}: { post: Post, author: UserProfile }, index: number) => (
                <div key={post.id}
                     className={`border-b ${index === postsWithAuthors.length - 1 ? '' : 'border-gray-300'} ${index === 0 ? '' : 'border-t'} ${index === 0 ? 'rounded-t-md' : ''} ${index === postsWithAuthors.length - 1 ? 'rounded-b-md' : ''}`}>
                  <PostsCard post={post} author={author}/>
                </div>
            ))}
          </div>
        </main>
    )
  }else {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
          <div className="w-full rounded-md overflow-hidden">
            <p className="flex-1 text-green-900 text-center"> SignIn to see the contents.</p>
          </div>
        </main>
    )
  }
}
