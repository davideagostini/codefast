// an API endpoint to create a new Post document in the database. The route is not protected by the auth middleware, so anyone can create a new Post. The route expects a POST request with title, description in the request body. The boardId is in the query parameters. The userId is populated with the user's ID if they are logged in.
//

import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import { Filter } from "bad-words";
import Post from "@/models/Post";
import User from "@/models/User";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const { title, description } = await req.json();

    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    const filter = new Filter();
    const saniteziedTitle = filter.clean(title);
    const saniteziedDescription = filter.clean(description);

    if (!saniteziedTitle) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const session = await auth();

    await connectMongo();

    const post = await Post.create({
      title: saniteziedTitle,
      description: saniteziedDescription,
      boardId: boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    await connectMongo();

    const user = await User.findById(session.user.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "You need to subscribe to delete a post" },
        { status: 403 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!user.boards.includes(post.boardId.toString())) {
      return NextResponse.json(
        { error: "You don't have access to delete this post" },
        { status: 401 }
      );
    }

    await Post.deleteOne({ _id: postId });

    return NextResponse.json({ message: "Post deleted" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
