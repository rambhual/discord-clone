/**
 * Retrieves the current user's profile from the database.
 * @returns {Promise<IProfile | null>} A promise that resolves to an IProfile object representing the current user's profile. If the profile is not found or an error occurs, it returns null.
 */
import { auth } from "@clerk/nextjs";
import db from "@/lib/db";
import { IProfile } from "@/models/profile";

export const currentProfile = async (): Promise<IProfile | null> => {
  try {
    const { userId } = auth();
    if (!userId) return null;
    return await db.profile.findFirst({ where: { userId } });
  } catch (error) {
    console.error("Error retrieving current profile:", error);
    return null;
  }
};
