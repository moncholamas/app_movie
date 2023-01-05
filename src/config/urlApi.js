const url = process.env.NODE_ENV === 'developm' ? 'http://localhost:8000/api' : "https://apimovie-production.up.railway.app/api";

export default url;