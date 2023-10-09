import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "~lib/prismadb";

export const authOptions = {
  adapter: PrismaAdapter(prismadb)
}