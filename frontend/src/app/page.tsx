import Link from "next/link";
import style from "./index.module.scss";
import Image from "next/image";
import { CopyDiscordButton } from "./client";
import Footer from "@/components/footer/footer";
import { getBlogPostsThatAreProjects } from "@/api/blog";
import BlogPostPreview from "@/components/blog/preview";

const IndexPage = async () => {
  const projects = await getBlogPostsThatAreProjects();

  return (
    <>
      <div className={style.splash}>
        <section className={style.splashContent}>
          <h1>CKAY9 DEV</h1>
          <span>Vancouver, B.C.</span>
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
        </section>

        <Link href="#about" className={style.scrollDown}>
          <Image
            src="/scrollDown.svg"
            alt="Scroll down for more"
            sizes="100%"
            width={72}
            height={72}
          />
        </Link>
      </div>

      <main className="container" id="about">
        <section className={style.textSection}>
          <h2>👋</h2>
          <p>
            Hi, I&apos;m Cameron Armstrong (CKAY9, CKAY-9, whatever), a developer from Vancouver, BC. I&apos;ve been programming for multiple years now, and have experience
            in multiple services and tools like Vercel, AWS, Git, Cloudflare, etc. I&apos;m also comfortable in many different programming languages
            and their framework and libraries (e.g. Python and Flask/FastAPI/DJango).
          </p>
        </section>
        <section className={`${style.textSection} ${style.alignRight}`}>
          <h2>🌟</h2>
          <p>
            I have always been interesting in technology and programming, and began to work on my own personal projects in 2022. I quickly fell in love with web developement,
            but also enjoy working on any mods for games (e.g. Minecraft plugins, Garry&apos;s Mod addons, etc.), simple systems for small things, or whatever else.
          </p>
        </section>
        <section className={style.textSection}>
          <h2>☄️</h2>
          <p>
            Lately, I have been getting back into programming consistently and have been working on multiple projects.
            I recommend checking out one of my latest projects, <Link href={"https://github.com/CKAY-9/village"}>Village</Link>; Otherwise,
            you can keep scrolling to see all my highlighted projects.
          </p>
        </section>
        <section className={style.dev}>
          <h2>Projects</h2>
          <span>Explore some of my projects that I&apos;ve written about.</span>
          {projects.length <= 0 ? (
            <span>No projects available.</span>
          ) : (
            <div className={style.projects}>
              {projects.map((post, index) => {
                return (
                  <Link key={index} href={`/blog/${post.id}`}>
                    <BlogPostPreview post={post} />
                  </Link>
                )
              })}
            </div>
          )}

          <span style={{"opacity": "0.5"}}>More can always be found on <Link href="https://github.com/CKAY-9">my GitHub.</Link></span>
        </section>
        <section className={style.dev}>
          <Link href="/blog"><h2>Blog</h2></Link>
          <span>Keep track of what I&apos;ve been doing or thinking of or whatever.</span>
          <Link href="/blog">Click here to see.</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;