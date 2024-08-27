export const config = {
  API_URL: import.meta.env.VITE_API_URL,
  DEV_MODE: import.meta.env.VITE_DEV_MODE === "true"
}

console.log(config);
