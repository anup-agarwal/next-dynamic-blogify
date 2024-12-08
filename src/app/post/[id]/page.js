
const Page = async ({ params }) => {
  const parameters = await params
  const res = await fetch(`http://localhost:3000/api/post/${parameters.id}`)
  const post = await res.json()
  return (
    <div
      style={{ padding: "30px 0", width: "80%", margin: "auto" }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Author: {post.author}</p>
      <p>Date: {post.date}</p>
    </div>
  )
}

export default Page