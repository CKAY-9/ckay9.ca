import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Metadata } from "next";
import NewBlogPostForm from "./client";

export const generateMetadata = (): Metadata => {
    return {
        title: "New Blog Post - CKAY9 DEV"
    };
}

const NewBlogPostPage = () => {
    return (
        <>
            <Header />
            <main className="container">
                <h1>New Blog Post</h1>
                <NewBlogPostForm />
            </main>
            <Footer />
        </>
    );
}

export default NewBlogPostPage;