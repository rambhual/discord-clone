import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

/**
 * Retrieves the userId from the auth object and checks if the user is authorized.
 * If the userId is not found, an error is thrown.
 * @returns The userId if it exists.
 * @throws Error if the user is unauthorized.
 */
const handleAuth = (): { userId: string } => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  return { userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
