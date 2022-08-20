import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";

// Step 1: Collect all the files from blogdata directory
// Step 2: Iterate through them and display them

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);

  const fetchData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let d = await fetch(`http://localhost:3000/api/blogs?count=${count + 2}`);
    setCount(count + 2);
    let data = await d.json();
    setBlogs(data);
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 })),
    //   });
    // }, 1500);
  };
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((res) => res.json())
  //     .then((data) => setBlogs(data));
  //   // .then((a) => {
  //   //   return a.json();
  //   // })
  //   // .then((parsed) => {
  //   //   setBlogs(parsed);
  //   // });
  // }, []);
  // console.log(blogs);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((blog) => (
            <div key={blog.title}>
              <Link href={`/blogpost/${blog.slug}`}>
                <h3 className={styles.blogItemh3}>{blog.title}</h3>
              </Link>

              <p className={styles.blogItemp}>
                {blog.content.substr(0, 140)}.....
              </p>
              <button className={styles.btn}>Read More</button>
            </div>
          ))}
        </InfiniteScroll>

        {/* <h2>Popular Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.title}>
            <Link href={`/blogpost/${blog.slug}`}>
              <h3 className={styles.blogItemh3}>{blog.title}</h3>
            </Link>

            <p className={styles.blogItemp}>
              {blog.content.substr(0, 140)}.....
            </p>
            <button className={styles.btn}>Read More</button>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Blog;

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/blogs`);
//   const allBlogs = await res.json();

//   // Pass data to the page via props
//   return { props: { allBlogs } };
// }

export async function getStaticProps() {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myFile;
  let allBlogs = [];

  for (let i = 0; i < 2; i++) {
    const item = data[i];
    myFile = await fs.promises.readFile("blogdata/" + item, "utf-8");
    console.log(myFile);
    allBlogs.push(JSON.parse(myFile));
  }
  return { props: { allBlogs, allCount } };
}
