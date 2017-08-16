const node_env = process.env.NODE_ENV;
let google_auth;
console.log(node_env, process.env.NVM_DIR);

if (node_env === 'development') {
  google_auth = 'http://localhost:8080/auth/google'; 
} else {
  google_auth = 'auth/google';
}

export default {
  google_auth
}