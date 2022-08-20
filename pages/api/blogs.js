// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs";
export default async function handler(req, res) {
  let data = await fs.promises.readdir("blogdata");
  data = data.slice(0, req.query.count);
  let myFile;
  let allBlogs = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    myFile = await fs.promises.readFile("blogdata/" + item, "utf-8");
    console.log(myFile);
    allBlogs.push(JSON.parse(myFile));
  }
  // await fs.promises.readdir("blogdata", (err, data) => {
  //   // console.log(data);
  //   let allBlogs = [];
  //   data.forEach((item) => {
  //     console.log(item);
  //     await fs.promises.readFile("blogdata/" + item, (d) => {
  //       allBlogs.push(d);
  //     });
  //   });
  //   console.log(allBlogs);
  res.status(200).json(allBlogs);
}
