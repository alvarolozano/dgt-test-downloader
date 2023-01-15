import axios from 'axios';
import qs from 'qs';

/**
 * author: Álvaro Lozano
 * website: https://alvarolozano.dev
 * 
 * check README.md first
 */


// TODO: Dynamic params
const params = qs.stringify({
    tipoCuest:"B", 
    idioma:"1"
});

export default async function getRandomExam() {
        let Cookie;
        
        try {

            // This request throws a 302 which we don't want to follow
            await axios.post('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/service/VerificarExamenServlet?tipoCuest=B&idioma=1', params, {
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                }, 
                maxRedirects: 0
            }).catch((e) => {
                // We read the cookie manually from the 302 response
                if(e.response)
                    Cookie = e.response.headers['set-cookie'][0].split(';')[0];
            });
            
            // Request exam data
            const { data } = await axios.get('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/service/RecuperarAspiranteServlet', {headers: {cookie: Cookie}});

            for(const pregunta of data.cuestionario.preguntas) {
                if(pregunta.urlImagen) pregunta.imagen = `https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/ServletImagen?nameImagen=${pregunta.urlImagen}`
                delete pregunta.urlImagen;
            }

            return data;
        } catch (e) {
            throw e;
        }
}
