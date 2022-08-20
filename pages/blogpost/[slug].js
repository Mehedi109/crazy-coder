import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/BlogPost.module.css";
import * as fs from "fs";
// Step 1: find the file corresponding to the slug
// Step 2: populate them inside the page
const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog);
  const router = useRouter();
  const { slug } = router.query;
  console.log(props.myBlog);
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  //     .then((res) => res.json())
  //     .then((data) => setBlog(data));
  // }, [router.isReady]);
  // console.log(blog);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />
        <div>{blog && blog.content}</div>
      </main>
    </div>
  );
};

export default Slug;

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   const myBlog = await res.json();

//   // Pass data to the page via props
//   return { props: { myBlog } };
// }

export async function getStaticProps(context) {
  const { slug } = context.params;

  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");

  // Pass data to the page via props
  return { props: { myBlog: JSON.parse(myBlog) } };
}

export async function getStaticPaths() {
  // const { slug } = context.params;
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/blogs`);
  const myBlog = await res.json();

  const paths = myBlog.map((post) => ({
    params: { slug: `${post.slug}` },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };

  // Pass data to the page via props
  // return { props: { myBlog } };
}
