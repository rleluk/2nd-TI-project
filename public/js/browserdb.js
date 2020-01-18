saveData = (data, dbName, storeName) => {
    const dbRequest = indexedDB.open(dbName, 3);

    dbRequest.onerror = event => {
        console.error("Database error: " + event.target.errorCode);
    };

    dbRequest.onupgradeneeded = event => {
        const db = event.target.result;
        const store = db.createObjectStore(storeName, { autoIncrement: true });
    };

    dbRequest.onsuccess = event => {
        const database = event.target.result;
        const transaction = database.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        request.onerror = event => {
            console.error(event.target.errorCode);
        };

        request.onsuccess = event => {
            console.log('Dane zostały zapisane w lokalnej bazie danych.');
        };
    };
};

getData = (dbName, storeName) => {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open(dbName, 3);

        dbRequest.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
            reject(false);
        };

        dbRequest.onupgradeneeded = function (event) {
            event.target.transaction.abort();
            reject(false);
        };

        dbRequest.onsuccess = function (event) {
            const database = event.target.result;
            const transaction = database.transaction(storeName);
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onerror = function (event) {
                console.error(event.target.errorCode);
                reject(false);
            };

            request.onsuccess = function (event) {
                request.result ? resolve(request.result) : reject(false);
            };
        };
    });
};

clearStore = (dbName, storeName) => {
    const dbRequest = indexedDB.open(dbName, 3);

    dbRequest.onerror = function (event) {
        console.error("Database error: " + event.target.errorCode);
    };

    dbRequest.onsuccess = function (event) {
        const database = event.target.result;
        const transaction = database.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
    };
};

