'use client'
import { BASE_URL } from "@/constants";
import { Post } from "@/interfaces/types";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {useRef, useState} from "react";

interface PostInteractionProps {
    post: Post;
}

const PostInteraction = ({ post }: PostInteractionProps) => {
    const { data: session } = useSession();
    const token = session?.user.accessToken as string;

    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const commentInputRef = useRef<HTMLInputElement>(null);

    const handleCommentClick = () => {
        setShowComments(!showComments);
    };

    const handleLikeClick = () => {
        const like = {
            authorId: session?.user?.id,
            postId: post.id,
        }

        const response = axios.post(`${BASE_URL}/like`, like,{
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        console.log(response);
    }

    const handleCommentSubmit = async () => {
        if (commentText.trim() === '') {
            // Handle empty comment input
            return;
        }

        const comment = {
            content: commentText,
            authorId: session?.user?.id as number,
            userName: session?.user?.name as string,
            authorPic: session?.user?.avatar as string,
            postId: post.id as number,
        };

        try {
            const response = await axios.post(`${BASE_URL}/comment`, comment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);

            // Clear the comment input and hide comments if it was previously hidden
            setCommentText('');
            setShowComments(true); // Show comments after adding a new one
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="m-5 flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/assets/heart-filled.svg"
                        alt="heart"
                        width={24}
                        height={24}
                        className="cursor-pointer object-contain"
                        onClick={handleLikeClick}
                    />
                    <p>{post.likes.length}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Image
                        src="/assets/comment.svg"
                        alt="comment"
                        width={24}
                        height={24}
                        className="cursor-pointer object-contain"
                        onClick={handleCommentClick}
                    />
                    <p>{post.comments.length}</p>
                </div>
                <Image
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
            </div>
            {showComments && (
                <div className="mt-4">
                    {/* Add input field and comment button */}
                    <div className="flex items-center gap-4 mt-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            ref={commentInputRef}
                            className="rounded-xl"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer"
                        >
                            Comment
                        </button>
                    </div>
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-center gap-4 mt-4">
                            <div className="flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                    alt={comment.userName}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between">
                                    <p className="font-medium">{comment.userName}</p>
                                    <p className="text-gray-400">
                                        {formatDistanceToNow(new Date(comment.createdAt), {
                                            addSuffix: true,
                                        })}
                                    </p>
                                </div>
                                <p className="text-lg text-gray-900">{comment.content}</p>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
};

export default PostInteraction;
