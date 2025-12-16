import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Metadata } from "next";
import BlogClient from "./client";

export const generateMetadata = (): Metadata => {
    return {
        title: "Blog - CKAY9 DEV",
        description: "Catch up with whatever CKAY9 has been doing or thinking about."
    }
}

const BlogPage = () => {
    return (
        <>
            <Header />
            <main className="container">
                <h1>CKAY9 DEV BLOG</h1>
                <span>Catch up with whatever I've been doing or thinking about.</span>
                <BlogClient />
            </main>
            <Footer />
        </>
    );
}

export default BlogPage;
