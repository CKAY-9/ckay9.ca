"use client";

import { BlogPost } from "@/api/blog";
import style from "./posts.module.scss";
import Link from "next/link";
import BlogPostPreview from "@/components/blog/preview";

export type BlogClientProps = {
  posts: BlogPost[];
  page: number;
}

const BlogClient = (props: BlogClientProps) => {
  return (
    <>
      {props.posts.length <= 0 && <span style={{ "fontWeight": "900" }}>Unable to find any public posts.</span>}
      <div className={style.posts}>
        {props.posts.map((post, index) => {
          return (
            <Link href={`/blog/${post.id}`} key={index}>
              <BlogPostPreview post={post} />
            </Link>
          )
        })}
      </div>

      <div className={style.navigation}>
        {props.page != 1 && (
          <Link href={"/blog?page=" + (props.page - 1)}>Previous</Link>
        )}
        {props.posts.length >= 20 && (
          <Link href={"/blog?page=" + (props.page + 1)}>Next</Link>
        )}
      </div>
    </>
  );
}

export default BlogClient;
