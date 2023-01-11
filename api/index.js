import getRandomExam from '../download.js';



export default async function handler(request, response) {
        try {
            response.status(200).json((await getRandomExam()).cuestionario);
        } catch {
            response.status(500);
        }
}

