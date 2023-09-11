'use client';
import { ChangeEvent, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {BASE_URL} from "@/constants";

const CreatePost = () => {
  const {data : session} = useSession({
    required : true,
  });
  const token = session?.user.accessToken;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }
    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + file?.name, file as File);

    if (data) {
      console.log(data);
      setImageUrl(data.path);
    } else if (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/post`,{
        authorId : session?.user?.id,
        title: title,
        content: content,
        imageUrl: imageUrl
      },{
        headers:{
          Authorization : `Bearer ${token}`
        }
      }) ;

      console.log(response.data);
      setTitle("");
      setContent("");
      setImageUrl("");
      router.push("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col pt-10 p-2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 font-bold mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              className="block w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              onChange={(e) => {
                handleUpload(e);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;