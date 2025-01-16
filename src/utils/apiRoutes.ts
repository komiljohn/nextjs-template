export const authApiRoutes = {
  login: "auth/customer-login",
  loginConfirm: "auth/customer-login-confirm",
};

export const apiRoutes = {
  customerById: (customer_id: string) => `auth/customer/${customer_id}`,
};
