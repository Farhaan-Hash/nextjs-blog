import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import connect from "@/utils/db";
import Post from "@/models/Post";
import {NextResponse} from "next/server";

export const metadata = {
  title: "Blog Page",
  description: "",
};

async function getData() {
  try {
    await connect();
    const posts = await Post.find({});

    return posts;
  } catch (error) {
    return new NextResponse("Database Error", {status: 500});
  }
}
const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data?.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item.id}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
