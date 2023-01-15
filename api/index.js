import getRandomExam from '../download.js';



export default async function handler(request, response) {
        try {
            if(process.env.NODE_ENV = 'development'|| !process.env.RAPIDAPI_KEY || (process.env.RAPIDAPI_KEY && process.env.RAPIDAPI_KEY == request.headers['x-rapidapi-proxy-secret'])) {
                response.status(200).json((await getRandomExam()).cuestionario);
            } else {
                response.status(403).send("No dispones de permiso para ver esta página");
            }
        } catch (e) {
            response.status(500).json("Se ha producido un error");
        }
}