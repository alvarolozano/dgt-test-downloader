/**
 * author: Álvaro Lozano
 * website: https://alvarolozano.dev
 * 
 * DISCLAIMER;
 * - The scraped data bellow, comes from a public source.
 * - Data downloaded with this script must ALWAYS be for personal use
 */

import axios from 'axios';

// We want our client to keep session between requests
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded';

(
    // Main method
    async () => {

        try {

            // Start a new session
            await axios.get('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/service/TiposExamenesServlet');
            // await axios.get('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/examen/loginExamen.jsp?tipoCuest=B', {withCredentials: true});
        
            await Promise.all([new Promise((r, rej) => setTimeout(() => r(), 10000))]);

            // Set Test parameters
            const {status} = await axios.post('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/service/VerificarExamenServlet?tipoCuest=B&idioma=1', 'tipoCuest=B&idioma=1', {withCredentials: true});

            await Promise.all([new Promise((r, rej) => setTimeout(() => r(), 10000))]);

            // await axios.get('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/examen/img/pixeltrans.gif', {withCredentials: true});


            // Request exam data
            const res = await axios.get('https://sedeapl.dgt.gob.es/WEB_EXAM_AUTO/service/RecuperarAspiranteServlet', {withCredentials: true});
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    }
)()