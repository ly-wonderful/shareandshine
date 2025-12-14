const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	
	try {
		const storageKey = `app_${toSnakeCase(paramName)}`;
		const urlParams = new URLSearchParams(window.location.search);
		const searchParam = urlParams.get(paramName);
		
		if (removeFromUrl && searchParam) {
			urlParams.delete(paramName);
			const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
				}${window.location.hash}`;
			window.history.replaceState({}, document.title, newUrl);
		}
		
		if (searchParam) {
			storage.setItem(storageKey, searchParam);
			return searchParam;
		}
		
		const storedValue = storage.getItem(storageKey);
		if (storedValue) {
			return storedValue;
		}
		
		if (defaultValue) {
			storage.setItem(storageKey, defaultValue);
		}
		
		return defaultValue || null;
	} catch (error) {
		console.warn('Error accessing storage:', error);
		return defaultValue || null;
	}
}

const getAppParams = () => {
	return {
		appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_APP_ID }),
		serverUrl: getAppParamValue("server_url", { defaultValue: import.meta.env.VITE_API_URL }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
	}
}


export const appParams = {
	...getAppParams()
}
