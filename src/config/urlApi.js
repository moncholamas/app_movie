const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : "https://apimovie-production.up.railway.app/api";

export default url;