const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : "https://";

export default url;