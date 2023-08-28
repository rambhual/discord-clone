import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import db from "./db";
import { IProfile } from "@/models/profile";

/**
 * Retrieves the user's profile information from the database.
 * If the user is not authenticated, it redirects them to the sign-in page.
 * If the user has a profile in the database, it returns the existing profile.
 * Otherwise, it creates a new profile for the user using their information from the authentication provider.
 * @returns {Promise<object>} The user's profile information.
 */
export const initialProfile = async (): Promise<IProfile> => {
  try {
    // Check if the user is authenticated
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }

    // Try to find the user's profile in the database
    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      // Return the existing profile
      return profile;
    } else {
      // Create a new profile for the user
      const newProfile = await db.profile.create({
        data: {
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
        },
      });

      // Return the newly created profile
      return newProfile;
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error retrieving user profile:", error);
    throw error;
  }
};
