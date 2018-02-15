export default {
	install(Vue) {
		if (Storage._isSupported()) {
			Vue.prototype.$storage = Storage
			Vue.Storage = Storage
		}
	}
}

Storage = (function () {
	let supported = "UNKNOW";
	const storage = window.localStorage;
	class Storage {
		static _isSupported() {
			if (supported === "UNKNOW") {
				supported = false;
				if (storage && storage.setItem) {
					supported = true;
					var key = '__' + Math.round(Math.random() * 1e7);
					try {
						storage.setItem(key, key);
						storage.removeItem(key);
					} catch (err) {
						supported = false;
					}
				}
				return supported;
			} else {
				return supported
			}
		}
		static getValue(key) {
			return storage.getItem(key);
		}
		static setValue(key, value) {
			return storage.setItem(key, value);
		}
	}
	return Storage
})()
