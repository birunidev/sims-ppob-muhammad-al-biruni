const RouteName = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  TRANSACTION: '/dashboard/transaction',
  TOP_UP: '/dashboard/top-up',
  PAYMENT: (service_code: string) => `/dashboard/payment/${service_code}`,
  MY_ACCOUNT: '/dashboard/my-account',
}
export default RouteName
