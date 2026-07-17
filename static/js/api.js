// give status if username exist or not
export async function userNameStatus(username) {
  const response = await fetch(
    `/check-username?username=${encodeURIComponent(username)}`,
  );
  return await response.json();
}
