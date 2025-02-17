import fetchAuth from "@/services/fetchAuth";

type UserResponse = {
  id: string;
  email: string;
  username: string;
  role: string;
  project_ids: string[];
  worksite_ids: string[];
  organization: string;
};

const roleCheck = async (
  mode: "admin" | "project" | "worksite",
  id?: string
): Promise<boolean> => {
  try {
    const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/users/me`);
    if (!res.ok) {
      console.error("Failed to fetch user data");
      return false;
    }

    const user: UserResponse = await res.json();

    switch (mode) {
      case "admin":
        return user.username === "admin";

      case "project":
        return id ? user.project_ids.includes(id) : false;

      case "worksite":
        return id ? user.worksite_ids.includes(id) : false;

      default:
        return false;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
};

export default roleCheck;
