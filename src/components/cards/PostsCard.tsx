import { Post, UserProfile } from "@/interfaces/types";
import PostInteractions from "./PostInteractions";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  author: UserProfile;
}

const PostCard = ({ post, author }: PostCardProps) => {
  return (
    <div className="shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center gap-4">
        <img
          src={author.profilePicture? author.profilePicture : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full border-2 border-gray-950"
        />
        <div className="flex flex-col">
          <p className="text-lg font-medium">{author.username}</p>
          <p className="text-sm text-gray-900">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        {post.imageUrl && (
          <img
            src={"https://zdbmpbaueouhgdamofct.supabase.co/storage/v1/object/public/images/" + post.imageUrl}
            alt="post-image"
            className="mt-4 rounded-xl w-full p-1 object-cover"
          />
        )}
        <p className="mt-4 text-lg text-gray-900">{post.content}</p>
      </div>
      <PostInteractions post={post} />
    </div>
  );
};

export default PostCard;