"use client";

import { BlogPost, getBlogPostsByPage } from "@/api/blog";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./posts.module.scss";
import Link from "next/link";
import BlogPostPreview from "@/components/blog/preview";

const BlogClient = () => {
  const searchParams = useSearchParams();
  const page = Number.parseInt(searchParams.get("page") || "1");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      // get blog posts
      const response = await getBlogPostsByPage(page);
      setPosts(response);
      setLoading(false);
    })();
  }, [page]);

  if (loading) {
    return (
      <>
        <span>Loading posts...</span>
      </>
    )
  }

  return (
    <>
      {posts.length <= 0 && <span style={{ "fontWeight": "900" }}>Unable to find any public posts.</span>}
      <div className={style.posts}>
        {posts.map((post, index) => {
          return (
            <Link href={`/blog/${post.id}`} key={index}>
              <BlogPostPreview post={post} />
            </Link>
          )
        })}
      </div>

      <div className={style.navigation}>
        {page != 1 && (
          <Link href={"/blog?page=" + (page - 1)}>Previous</Link>
        )}
        {posts.length >= 20 && (
          <Link href={"/blog?page=" + (page + 1)}>Next</Link>
        )}
      </div>
    </>
  );
}

export default BlogClient;
