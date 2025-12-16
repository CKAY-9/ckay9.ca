import { CopyDiscordButton } from "@/app/client";
import style from "./footer.module.scss";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <h2>CKAY9 DEV</h2>
            <section className={style.links}>
                <Link href="https://github.com/CKAY-9">
                    <Image
                        src="/github.svg"
                        alt="GitHub Profile"
                        sizes="100%"
                        width={36}
                        height={36}
                    />
                </Link>
                <CopyDiscordButton />
            </section>
            <section className={style.links}>
                <Link href="/">Home</Link>
                <Link href="/#about">About</Link>
                <Link href="/blog">Blog</Link>
                <Link href="https://github.com/CKAY-9/ckay9.ca">Source</Link>
            </section>
        </footer>
    );
}

export default Footer;