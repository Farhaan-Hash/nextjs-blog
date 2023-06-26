"use client";
import React, {useState} from "react";
import useSWR from "swr";
import {useSession, signIn, signOut} from "next-auth/react";
import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loading/Loader";

// export const metadata = {
//   title: "Dashboard Page",
//   description: "",
// };
const Dashboard = () => {
  // Protecting the routes
  const session = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  // Fetch Data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const {data, mutate, error, isLoading} = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();

      // Clear form values after successful submission
      setTitle("");
      setDesc("");
      setImg("");
      setContent("");
    } catch (err) {
      console.log(err);
    }
    alert("Posts have  been Successfully added in BLOG SECTION");
  };

  // DELETE POST
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {method: "DELETE"});
      mutate((data) => data.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? isLoading
            : data?.map((post) => (
                <div className={styles.post} key={post.id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Image"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <textarea
            name=""
            placeholder="Content"
            cols="30"
            rows="10"
            className={styles.textArea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button className={styles.button}>Add Post</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
