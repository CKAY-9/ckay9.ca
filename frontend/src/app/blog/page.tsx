import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Metadata } from "next";
import BlogClient from "./client";
import { getBlogPostsByPage } from "@/api/blog";

export const generateMetadata = (): Metadata => {
    return {
        title: "Blog - CKAY9 DEV",
        description: "Catch up with whatever CKAY9 has been doing or thinking about."
    }
}

const BlogPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>; 
}) => {
    const params = await searchParams;
    const page = Number.parseInt(params.page ?? "1", 10);
    const posts = await getBlogPostsByPage(page);


    return (
        <>
            <Header />
            <main className="container">
                <h1>CKAY9 DEV BLOG</h1>
                <span>Catch up with whatever I&apos;ve been doing or thinking about.</span>
                <BlogClient posts={posts} page={page} />
            </main>
            <Footer />
        </>
    );
}

export default BlogPage;
