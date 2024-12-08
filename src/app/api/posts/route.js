import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(process.cwd(), "public", "data", "posts.json");

export async function GET() {
  const jsonData = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(jsonData);

  return NextResponse.json(posts);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const jsonData = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(jsonData);

    // Generate a new unique ID for the post
    const newPost = {
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
      ...body,
      date: new Date().toISOString(), // Automatically add a timestamp
    };

    // Append the new post
    posts.push(newPost);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");

    return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
