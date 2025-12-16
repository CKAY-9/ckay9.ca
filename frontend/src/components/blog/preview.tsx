import { BlogPost } from "@/api/blog";
import style from "./blog.module.scss";

export type BlogPostPreviewProps = {
  post: BlogPost;
};

const BlogPostPreview = (props: BlogPostPreviewProps) => {
  return (
    <>
      <div className={style.previewContainer} style={{"background": `url(${props.post.thumbnail_url})`}}>
        <div className={style.details}>
          <h3>{props.post.title}</h3>
          <span>{props.post.description}</span>
          <span style={{"opacity": "0.5"}}>{(new Date()).toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );
}

export default BlogPostPreview;
