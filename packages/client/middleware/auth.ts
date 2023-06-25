import { useAuthStore } from "~/store/auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();

	const refreshToken = useCookie<string>('refreshToken');


})