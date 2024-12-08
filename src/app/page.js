import Link from "next/link";

export default async function Home() {
  const posts = await fetch("http://localhost:3000/api/posts")
  const data = await posts.json()

  return data.map(post =>

    <Link href={`/post/${post.id}`}
      key={post.id}
    >
      <div style={{ padding: "30px 0", width: "80%", margin: "auto" }}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>Author: {post.author}</p>
        <p>Date: {post.date}</p>
      </div>
      <hr />
    </Link >
  );
}
