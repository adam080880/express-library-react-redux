require("dotenv").config();

console.log(process.env);

export default (uri) => process.env.REACT_APP_API_URL.concat(uri);
