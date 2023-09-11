import ProfileCard from "@/components/cards/profileCard";
import {BASE_URL, HOME_URL} from "@/constants";
import axios from "axios";
import { redirect } from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


async function getUserPosts(id: number, token : string) {
  const res = await axios(`${BASE_URL}/User/${id}/posts`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  })
  console.log(res);
  if (res.status !== 200) {
    throw new Error(res.statusText)
  }
  return await res.data
}

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id as number;
  const token = session?.user.accessToken as string;
  if(!id) redirect(`/api/auth/signin?callbackUrl=${HOME_URL}`);
  console.log(id);

  const { data } = await axios.get(`${BASE_URL}/User/${id}`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  })
  const userPosts = await getUserPosts(id,token);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 p-4">
        <div className="w-full">
          <ProfileCard user={data} posts={userPosts} />
        </div>
      </main>
    </>
  )
}

export default Profile;