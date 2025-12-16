import Link from "next/link";
import style from "./header.module.scss";

const Header = () => {
    return (
        <header className={style.header}>
            <Link href="/">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/blog">Blog</Link>
        </header>
    );
}

export default Header;