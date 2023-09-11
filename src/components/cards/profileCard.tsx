import { Post, Posts, UserProfile } from "@/interfaces/types";
import PostsCard from "./PostsCard";

const ProfileCard = ({ user, posts }: { user: UserProfile, posts:Posts }) => {
    return (
        <div className="flex flex-col items-center rounded pt-6 pb-8 mb-4">
            <div className="flex items-center justify-start mb-4">
                <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Profile picture"
                    className="rounded-full h-32 w-32 mr-4"
                />
                <div className="flex flex-col">
                    <h1 className="text-right text-3xl font-bold mb-4">{user.username}</h1>
                    <h3 className="text-right text-xl font-bold mb-4">{user.email} </h3>
                </div>
            </div>
            <div className="flex flex-col text-xl justify-evenly">
                {posts.map((post: Post) => (
                    <PostsCard key={post.id} post={post} author={user} />
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;