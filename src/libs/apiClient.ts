const BASE_URL = "http://localhost:3000";

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
    });

    if (!response.ok) {
      // Handle HTTP error
      const errorData = await response.json();
      throw new Error(errorData.message || "API Error");
    }

    // Successful response
    let data = null;
    try {
      data = await response.json();
    } catch (error) {}
    return data;
  } catch (error: any) {
    // Network error or other exceptions
    console.error("API Error:", error.message);
    throw error;
  }
};
