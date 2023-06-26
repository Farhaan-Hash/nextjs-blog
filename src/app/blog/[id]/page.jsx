import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import {notFound} from "next/navigation";
import connect from "@/utils/db";
import Post from "@/models/Post";
import {NextResponse} from "next/server";

async function getData(id) {
  try {
    await connect();
    const post = await Post.findById(id);

    if (!post) {
      return notFound();
    }

    return post;
  } catch (error) {
    return new NextResponse("Database Error", {status: 500});
  }
}
// META DATA
export async function generateMetadata({params}) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}
export default async function BlogPost({params}) {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.desc}</p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={data.img} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  );
}
