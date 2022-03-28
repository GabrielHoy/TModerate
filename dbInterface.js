const http = require("http");

/**
 * 
 * @param {string} key 
 * @returns Promise resolving to parsed JSON object in database under (key) or null if there is no data currently stored under (key)
 */
 exports.GetKey = (key) => {
    return new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:9090/db/TModerate/${key}`, (res) => {
            try {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    if (res.statusCode == 404 || res.statusCode == 204) {
                        resolve(null); //no data
                        return;
                    }
                    resolve(JSON.parse(data)); //return json data
                });
            } catch (e)
            {
                console.warn("ERROR: ");
                console.warn(e);
                reject(e);
            }
        }).on("error", (err) => {
            reject(err);
        });
    });
}

/**
 * 
 * @param {string} key 
 * @returns Nothing, deletes (key) if it exists from the database.
 */
 exports.DeleteKey = (key) => {
    return new Promise((resolve, reject) => {
        let x = http.request({hostname: "127.0.0.1", port: 9090, path: `/db/TModerate/${key}`, method: "DELETE"}, (res) => {
            res.on("end", () => resolve);

        }).on("error", (err) => {
            warn("ERROR IN DELETEKEY INTERNAL");
            console.log(err);
            reject(err);
        });
        x.on("finish", () => {
            resolve();
        });
        x.on("error", (err) => {
            warn("ERROR IN DELETEKEY REQUEST");
            console.log(err);
            reject(err);
        });
        x.end();
       // resolve();
    });
}

/**
 * 
 * @param {string} key 
 * @param {any} value
 * @returns Nothing, inserts (value) into the database under (key)
 */
 exports.SetKey = (key, value) => {
    return new Promise((resolve, reject) => {
        let valueJSONified = JSON.stringify(value);
        let x = http.request({hostname: "127.0.0.1", port: 9090, path: `/db/TModerate/${key}`, method: "PUT", headers: {"Content-Type": "application/json", "Content-Length": valueJSONified.length}}, (res) => {
            res.on("data", (d) => { process.stdout.write(d); });

        }).on("error", (err) => {
            warn("ERROR IN SETKEY INTERNAL");
            console.log(err);
            reject(err);
        });
        x.on("finish", () => {
            resolve();
        });
        x.on("error", (err) => {
            warn("ERROR IN SETKEY REQUEST");
            console.log(err);
            reject(err);
        });
        x.write(valueJSONified);
        x.end();
       // resolve();
    });
}