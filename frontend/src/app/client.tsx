"use client";

import Image from "next/image"
import { BaseSyntheticEvent } from "react";

export const CopyDiscordButton = () => {
    const copyDiscord = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText("ckay9.cameron");
        alert("Copied ckay9.cameron to clipboard.");
    }
    
    return (
        <button onClick={copyDiscord}>
            <Image
                src="/discord.svg"
                alt="Copy Discord username"
                sizes="100%"
                width={36}
                height={36}
            />
        </button>
    )
}