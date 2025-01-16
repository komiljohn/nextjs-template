import { apiRoutes } from "@/utils/apiRoutes";

export const getCustomerById = async (id: string) => {
  const res = await fetch(apiRoutes.customerById(id));

  if (!res.ok) {
    const response = await res.json();
    throw new Error(response.error_message || "Failed to fetch customer");
  }

  return res.json();
};
