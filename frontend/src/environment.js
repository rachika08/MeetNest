// let IS_PROD=false;
// const server = IS_PROD ? "https://meetnestbackend-cwws.onrender.com": "http://localhost:8000";

// export default server;

const server = import.meta.env.VITE_SERVER_URL;

export default server;