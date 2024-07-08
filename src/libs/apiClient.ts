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
    });

    if (!response.ok) {
      // Handle HTTP error
      const errorData = await response.json();
      throw new Error(errorData.message || "API Error");
    }

    // Successful response
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    // Network error or other exceptions
    console.error("API Error:", error.message);
    throw error;
  }
};
