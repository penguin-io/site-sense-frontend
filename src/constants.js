const BASE_URL = import.meta.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL
const createURL = (path) => `${BASE_URL}/${path}`


export const CREATE_ZONE = createURL("/zones/")
export const CREATE_PROJECT = createURL("/project/")
export const GET_ALL_PROJECTS = createURL("/projects/all")
export const GET_ALL_WORKSITES_BY_USER = createURL("/users/me")

