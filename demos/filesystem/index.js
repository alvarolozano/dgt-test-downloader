import fs from 'fs';
import getRandomExam from '../../download.js';


// [DEMO] save to filesystem
(async () => {
    const { cuestionario } = await getRandomExam();

    // Save exam if it doesn't exist
    const examPath = `demos/filesystem/exams/${cuestionario.id}.json`;

    console.log(`Recibido cuestionario ${cuestionario.id}`)
            
    if(!fs.existsSync(`exams/${cuestionario.id}.json`)) {
        fs.writeFileSync(examPath, JSON.stringify(cuestionario.preguntas, null, 2), {encoding: 'utf-8'});
    }

})();