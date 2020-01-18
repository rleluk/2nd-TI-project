var status;

window.onload = () => {
    setVisibleNav(document.getElementById('survey'));

    if (!window.indexedDB) {
        alert('IndexedDB nie jest wspierany przez twoją przeglądarkę.');
    }

    status = 'online';

    window.addEventListener('offline', onOffline);
    window.addEventListener('online', onOnline);
}

onOnline = async () => {
    status = 'online';

    showModal('Jesteś online. Synchronizuję dane.');

    const data = await getData('surveys', 'musicSurvey');

    for (let record of data) {
        let res = await fetch('/survey', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });

        let msg = await res.json();
        console.log(msg);
    }

    await clearStore('surveys', 'musicSurvey');
}

onOffline = () => {
    status = 'offline';
    showModal('Jesteś offline. Dane ankietowe będą zapisywane w lokalnej bazie danych.');
}

document.getElementById('surveyForm').addEventListener('submit', async event => {
    event.preventDefault();

    const formData = {
        sex: document.getElementById('sex').value,
        genre: document.surveyForm.genre.value,
        artist: document.surveyForm.artist.value,
        piece: document.surveyForm.piece.value,
        listeningTime: document.getElementById('listeningTime').value,
        date: new Date()
    }
    console.log(formData)
    if(status == 'online') {
        let res = await fetch('/survey', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let data = await res.json();
        showModal(data.msg);    
    } else {
        await saveData(formData, 'surveys', 'musicSurvey');
    }
});
