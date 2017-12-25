function flattenConcat(arr) {
	return [].concat.apply([], arr);
}

function flattenReduceConcat(arr) {
	return arr.reduce((newArr, currentValue) => accumulator.concat(currentValue), []);
}

function flatMap(arr, lookup) {
	return arr.map((item, index, arr) => item[lookup]);
}

function filterDuplicates(arr) {
	return arr.filter((item, index, arr) => arr.indexOf(item) === index);
}

function handleArrFlattening(arr, prop) {
	let mergedArr = flattenConcat(arr);
	let flattenArrByPropName = flatMap(mergedArr, prop);
	return flattenArrByPropName;
}

function getCarsByUserId(id) {
	const uid = 123;
	const CustomError = 'No user id arguments provided...';

	return new Promise((resolve, reject) => {
		if (!id) {
			reject(CustomError);
		} else if (id === uid) {
			setTimeout(() => {
				resolve([
					{id: 1, name: 'McLaren'},
					{id: 2, name: 'Bugatti Veyron'},
					{id: 3, name: 'Lamborghini'}
				]);
			}, 250);
		} else {
			setTimeout(() => {
				resolve([
					{id: 4, name: 'Ferrari'},
					{id: 7, name: 'BMW'},
					{id: 8, name: 'Aston Martin'}
				]);
			}, 250);
		}
	});
}

function getCarsByGender(gender) {
	const CustomError = 'No gender arguments provided...';

	return new Promise((resolve, reject) => {
		if (!gender) {
			reject(CustomError);
		} else if (gender === 'male') {
			setTimeout(() => {
				resolve([
					{id: 1, name: 'McLaren'},
					{id: 2, name: 'Bugatti Veyron'},
					{id: 3, name: 'Lamborghini'},
					{id: 4, name: 'Ferrari'},
					{id: 5, name: 'Koenigsegg'}
				]);
			}, 550);
		} else {
			setTimeout(() => {
				resolve([
					{id: 1, name: 'McLaren'},
					{id: 2, name: 'Bugatti Veyron'},
					{id: 6, name: 'Porsche'},
					{id: 7, name: 'BMW'},
					{id: 8, name: 'Aston Martin'}
				]);
			}, 1250);
		}
	});
}

function getAllCarsForUser(user) {
	const promises = [
		getCarsByUserId(user.id),
		getCarsByGender(user.gender)
	];

	return Promise.all(promises);
}

function handleUserCars(user, count) {
	const CustomError = 'Couldn\'t process request, so here\'s custom error';

	return new Promise((resolve, reject) => {
		if (count === undefined || count === null || count === 0) {
			return reject(CustomError);
		}
		return getAllCarsForUser(user)
			.then((result) => {
				if (result[0].length >= count) {
					let flattenArrByUser = flatMap(result[0], 'name');
					resolve(flattenArrByUser);

				} else if (result[0].length < count) {
					let filteredArr = filterDuplicates(handleArrFlattening(result, 'name'));
					if (filteredArr.length < count) {
						reject(CustomError);
					} else {
						let arrToResolve = filteredArr.slice(0, count);
						resolve(arrToResolve);
					}

				}  else if (result[0].length === 0) {
					let flattenArrByGender = flatMap(result[1], 'name');
					resolve(flattenArrByGender);
				}
			})
			.catch((error) => reject(CustomError));
	});
}
