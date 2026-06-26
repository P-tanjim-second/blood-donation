import { redirect } from "next/navigation";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path) => {
   const res = await fetch(`${baseURl}${path}`);
   const data = await res.json();

   return validateData(data)
}

export const serverUpdate = async (path, data, method='POST') => {
    const res = await fetch(`${baseURl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const result = await res.json();
    return validateData(result)
}

const validateData = (data) => {
    switch (data.status) {
    case 200:
    case 201:
      return data;

    case 401:
      redirect('/login')

    case 403:
      redirect('/forbidden')

    case 404:
      redirect('/not-found')

    case 500:
    return {message: "Internal Server Error!"}

    default:
      return {message: data.message || "Something went wrong!"}
  }
}