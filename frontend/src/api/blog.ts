import axios from "axios";
import { API_HOST } from "./resources";

export type BlogPost = {
  title: string;
  id: number;
  category: string;
  description: string;
  thumbnail_url: string;
  body: string;
  date: string;
};

export const getBlogPostsByPage = async (page: number): Promise<BlogPost[]> => {
    try {
        const request = await axios({
            url: `${API_HOST}/blog/page/${page}`,
            method: "GET"
        });

        return request.data;
    } catch {
        return [];
    }
}

export const getBlogPostByID = async (blog_id: number): Promise<BlogPost | null> => {
    try {
        const request = await axios({
            url: `${API_HOST}/blog/${blog_id}`,
            method: "GET"
        });

        return request.data
    } catch {
        return null;
    }
}

export const getBlogPostsThatAreProjects = async (): Promise<BlogPost[]> => {
    try {
        const request = await axios({
            url: `${API_HOST}/blog/projects`,
            method: "GET"
        });

        return request.data;
    } catch {
        return [];
    }
}
