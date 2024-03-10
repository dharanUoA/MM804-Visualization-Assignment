"use server";

export async function getData() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_DATA_URL);
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.log(e);
  }
}
