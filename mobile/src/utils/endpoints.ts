const baseUrl = process.env.EXPO_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("EXPO_PUBLIC_API_URL was not found!");
}

export const endpoints = {
  brew: `${baseUrl}/brew`,
  coffee: `${baseUrl}/coffee`,
  coffeeMaker: `${baseUrl}/coffee-maker`,
  grinder: `${baseUrl}/grinder`,
};
