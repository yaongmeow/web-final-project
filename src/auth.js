import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                },
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const user = await db.user.findUnique({
                    where: {username: credentials.username},
                });

                if (!user) {
                    throw new Error("No user found with the given username");
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {id: user.id, username: user.username};
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, token}) {
            session.user = token.user;
            return session;
        },
        async jwt({token, user}) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
};

export const {auth, handlers, signIn, signOut} = NextAuth(authOptions);
