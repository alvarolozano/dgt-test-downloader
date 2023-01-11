import axios from 'axios';
import qs from 'qs';
import fs from 'fs';

/**
 * author: Álvaro Lozano
 * website: https://alvarolozano.dev
 * 
 * check README.md first
 */

let Cookie;

// TODO: Dynamic params
const params = qs.stringify({
    tipoCuest:"B", 
    idioma:"1"
});

(
    async () => {
        
        try {

            // This request throws a 302 which we don't want to follow
            await axios.post('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/service/VerificarExamenServlet?tipoCuest=B&idioma=1', params, {
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                }, 
                maxRedirects: 0
            }).catch((e) => {
                // We read the cookie manually from the 302 response
                Cookie = e.response.headers['set-cookie'][0].split(';')[0];
            });
            
            // Request exam data
            const { data: { cuestionario } } = await axios.get('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/service/RecuperarAspiranteServlet', {headers: {cookie: Cookie}});

            // Save exam if it doesn't exist
            const examPath = `exams/${cuestionario.id}.json`;
            
            if(!fs.existsSync(`exams/${cuestionario.id}.json`)) {
                fs.writeFileSync(examPath, JSON.stringify(cuestionario.preguntas, null, 2), {encoding: 'utf-8'});
            }

        } catch (e) {
            console.error(e);
        }
    }
)()