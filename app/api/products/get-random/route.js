import prisma from "@/app/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productCount = await prisma.products.count();
    const random = Math.floor(Math.random() * productCount);

    const products = await prisma.products.findMany({
      take: 6,
      orderBy: { id: "asc" },
      skip: random,
    });

    await prisma.$disconnect();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
