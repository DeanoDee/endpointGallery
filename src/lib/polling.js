import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/repeatWhen';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/single';

const errorOn = (maxAttempts) => {
	return (accumulator, value) => {
		accumulator += 1;
		if (accumulator < maxAttempts) {
			return accumulator;
		}
		throw new Error(value);
	};
};

const retryStrategy = ({maxAttempts, delay}) => {
	return (errors) => {
		const errorOnMaxAttempts = errorOn(maxAttempts);
		return errors.scan(errorOnMaxAttempts, 0).delay(delay);
	};
};

const load = (url) => {
	return Observable.create(observer => {
		let xhr = new XMLHttpRequest();

		const onLoad = () => {
			if (xhr.status !== 200) {
				observer.error(xhr.status);
			}
			try {
				let data = JSON.parse(xhr.responseText);
				observer.next(data);
				observer.complete();
			} catch(error) {
				observer.error(error);
			}
		};

		xhr.addEventListener("load", onLoad);
		xhr.open('GET', url);
		xhr.onerror = (error) => observer.error(error);
		xhr.send();

		return () => {
			xhr.removeEventListener("load", onLoad);
			xhr.abort();
		};

	}).retryWhen(retryStrategy({maxAttempts: 3, delay: 1000})).single();
};

const poll = (url, pollingDelay = 10000) => {
	return load(url).repeatWhen(completed => completed.delay(pollingDelay));
};

export {poll};
