"use client";

import { BaseSyntheticEvent, useState } from "react";
import style from "./new.module.scss";
import axios from "axios";
import { API_HOST } from "@/api/resources";
import { getCookie } from "@/utils/cookies";

const NewBlogPostForm = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [weirdAuth, setWeirdAuth] = useState<boolean>(false);

    const createNewPost = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        const request = await axios({
            url: `${API_HOST}/blog`,
            method: "POST",
            headers: {
                "Authorization": getCookie("secret") || ""
            },
            data: {
                title: title,
                category: category,
                description: description,
                thumbnail_url: thumbnail,
                body: body,
                date: "",
            }
        });

        if (request.status == 401) {
            setWeirdAuth(true);
        } else if (request.status == 200) {
            window.location.href = "/blog/" + request.data.id;
        }
    }

    if (weirdAuth) {
        return (
            <>
                <span>Weird auth man.</span>
            </>
        );
    }

    return (
        <>
            <form className={style.form} onSubmit={createNewPost}>
                <section>
                    <label>Title</label>
                    <input type="text" name="title" id="title" onChange={(e: BaseSyntheticEvent) => setTitle(e.target.value)} />
                </section>
                <section>
                    <label>Description</label>
                    <input type="text" name="description" id="description" onChange={(e: BaseSyntheticEvent) => setDescription(e.target.value)} />
                </section>
                <section>
                    <label>Thumbnail URL</label>
                    <input type="text" name="thumbnailURL" id="thumbnailURL" onChange={(e: BaseSyntheticEvent) => setThumbnail(e.target.value)} />
                </section>
                <section>
                    <label>Category</label>
                    <input type="text" name="category" id="category" onChange={(e: BaseSyntheticEvent) => setCategory(e.target.value)} />
                </section>
                <section>
                    <label>Body</label>
                    <textarea name="body" id="body" cols={100} rows={10} onChange={(e: BaseSyntheticEvent) => setBody(e.target.value)}></textarea>
                </section>

                <input type="submit" value="Post" />
            </form>
        </>
    )
}

export default NewBlogPostForm;