"use client";

import { BlogPost } from "@/api/blog";
import Markdown from "react-markdown";

export type BlogPostClientProps = {
    post: BlogPost;
};

const BlogPostClient = (props: BlogPostClientProps) => {
    return (
        <div style={{"marginTop": "5rem"}}>
            <Markdown>{props.post.body}</Markdown>
        </div>
    );
}

export default BlogPostClient;