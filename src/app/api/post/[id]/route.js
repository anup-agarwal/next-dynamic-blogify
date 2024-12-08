import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(req, { params }) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "public", "data", "posts.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(jsonData);

  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
