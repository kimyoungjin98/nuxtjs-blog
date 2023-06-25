import { IUserDTO } from 'blog-interface';
import { defineStore } from 'pinia';

interface IAuthStore {
	isAuth: boolean;
	user: IUserDTO | null;
}

export const useAuthStore = defineStore('auth', {
	state: (): IAuthStore => ({
		isAuth: false,
		user: null,
	}),
	getters: {

	},
	actions: {
		setAuth(user: IUserDTO | null) {
			if (user) {
				this.user = user;
				this.isAuth = true;
			} else {
				this.user = null;
				this.isAuth = false;
			}
		},
		async fetchUser() {
			const user = await useApi<IUserDTO>('auth');
			this.setAuth(user);
		},
		logout() {
			this.setAuth(null);
			const accessToken = useCookie('accessToken');
			const refreshToken = useCookie('refreshToken');

			if (accessToken) {
				accessToken.value = null;
			}

			if (refreshToken) {
				refreshToken.value = null;
			}
		}
	}
});

