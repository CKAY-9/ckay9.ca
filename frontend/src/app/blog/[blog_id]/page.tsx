import { getBlogPostByID } from "@/api/blog";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import BlogPostClient from "./client";
import Image from "next/image";
import style from "./blog.module.scss";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: {
    params: Promise<{
        blog_id: string
    }>;
}): Promise<Metadata> => {
    const { blog_id } = await params;
    const blog = await getBlogPostByID(Number.parseInt(blog_id || "-1"));
    if (!blog) {
        return {
            title: "Invalid Blog Post - CKAY9 Dev",
            description: "Failed to get blog with that ID."
        }
    }

    return {
        title: `${blog.title} - CKAY9 Dev`,
        description: `${blog.description}`
    }
}

const BlogPostPage = async ({ params }: {
    params: Promise<{
        blog_id: string
    }>;
}) => {
    const { blog_id } = await params;
    const blog = await getBlogPostByID(Number.parseInt(blog_id || "-1"));

    return (
        <>
            <Header />
            <main className="container">
                {blog ? (
                    <>
                        <Image
                            src={blog.thumbnail_url}
                            alt="Thumbnail"
                            sizes="100%"
                            width={0}
                            height={0}
                            className={style.thumbnail}
                        />
                        <h1>{blog.title}</h1>
                        <span>{blog.description}</span>
                        <span style={{ "opacity": "0.5" }}>{(new Date()).toLocaleDateString()}</span>
                        <BlogPostClient post={blog} />
                    </>
                ) : (
                    <>
                        <h1>Failed to get blog post</h1>
                        <span>Unable to find the blog post with the specified ID.</span>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}

export default BlogPostPage;
