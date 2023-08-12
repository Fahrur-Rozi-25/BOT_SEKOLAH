import axios from "axios";

const url = "https://reqres.in/api/users"

const data = await axios.get(url)
console.log(data.data);


