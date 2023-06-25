import { UseFetchOptions } from 'nuxt/dist/app/composables';
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData';
import {
	FetchContext,
	FetchError,
	FetchOptions,
	FetchResponse,
} from 'ohmyfetch';

async function onRequest({ options }: FetchContext<any>) {
	const config = useRuntimeConfig();
	options.baseURL = config.public.server;
	const accessToken = useCookie('accessToken');

	if (accessToken) {
		options.headers = {
			Authorization: `Bearer ${accessToken.value}`,
		};
	}
}

async function onResponseError({
	response,
	options,
	error,
}: FetchContext<any> & { response: FetchResponse<ResponseType> }) {
	if (response.status === 498) {
		const config = useRuntimeConfig();
		const refreshToken = useCookie('refreshToken');

		try {
			const response = await $fetch<{ accessToken: string }>(
				`${config.public.server}/auth/refresh`,
				{ method: 'POST', body: { refreshToken: refreshToken.value } },
			);
			options.retry = 1;
			const accessToken = useCookie('accessToken');
			accessToken.value = response.accessToken;
		} catch (error: any) {

		}
	} else if (response.status === 401) {

	} else {
		if (process.client) {
			//   useToast(response._data.message, 'danger');
		}
		throw new Error(response._data.message);
	}
}

async function onRequestError({
	response,
	options,
	error,
}: FetchContext<any> & { error: FetchError<ResponseType> }) {
	if (error.message === 'Failed to fetch') {
		throw {
			code: 500,
			message: '서버가 응답하지 않습니다. 잠시 후 다시 시도해 주세요.',
		};
	}
}

const commonOptions = {
	lazy: true,
	server: true,
};

export const useApiFetch = {
	get<T>(url: string, options?: UseFetchOptions<T extends void ? unknown : T, (res: T extends void ? unknown : T) => T extends void ? unknown : T, KeyOfRes<(res: T extends void ? unknown : T) => T extends void ? unknown : T>>) {
		const { server } = useRuntimeConfig();

		return useFetch<T>(`${server}/api/v1/${url}`, {
			method: 'GET',
			server: false,
			...options,
			onRequest,
			onResponseError,
		});
	},
	post<T>(url: string, options?: UseFetchOptions<T extends void ? unknown : T, (res: T extends void ? unknown : T) => T extends void ? unknown : T, KeyOfRes<(res: T extends void ? unknown : T) => T extends void ? unknown : T>>) {
		const { server } = useRuntimeConfig();
		return useFetch<T>(`${server}/api/v1/${url}`, {
			method: 'POST',
			server: false,
			...options,
			onRequest,
			onResponseError,
		});
	},
	patch<T>(url: string, options?: UseFetchOptions<T extends void ? unknown : T, (res: T extends void ? unknown : T) => T extends void ? unknown : T, KeyOfRes<(res: T extends void ? unknown : T) => T extends void ? unknown : T>>) {
		const { server } = useRuntimeConfig();
		return useFetch<T>(`${server}/api/v1/${url}`, {
			method: 'PATCH',
			server: false,
			...options,
			onRequest,
			onResponseError,
		});
	},
	put<T>(url: string, options?: UseFetchOptions<T extends void ? unknown : T, (res: T extends void ? unknown : T) => T extends void ? unknown : T, KeyOfRes<(res: T extends void ? unknown : T) => T extends void ? unknown : T>>) {
		const { server } = useRuntimeConfig();
		return useFetch<T>(`${server}/api/v1/${url}`, {
			method: 'PUT',
			server: false,
			...options,
			onRequest,
			onResponseError,
		});
	},
	delete<T>(url: string, options?: UseFetchOptions<T extends void ? unknown : T, (res: T extends void ? unknown : T) => T extends void ? unknown : T, KeyOfRes<(res: T extends void ? unknown : T) => T extends void ? unknown : T>>) {
		const { server } = useRuntimeConfig();
		return useFetch<T>(`${server}/api/v1/${url}`, {
			method: 'DELETE',
			server: false,
			...options,
			onRequest,
			onResponseError,
		});
	},
};


export const useApi = <T>(url: string, options?: FetchOptions) => {
	return $fetch<T>(url, {
		...options,
		onRequest,
		onResponseError,
		onRequestError,
	});
};
