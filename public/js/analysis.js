window.onload = () => {
    setVisibleNav(document.getElementById('analysis'));
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

async function drawChart() {
    let res = await fetch('/survey/all', {method: 'GET', credentials: 'include'});
    let fetchedData = await res.json();

    if(res.status !== 200) {
        showModal(fetchedData.msg);
        return;
    }

    let sumTotal = fetchedData.answer1 + fetchedData.answer2 + fetchedData.answer3 + fetchedData.answer4 + fetchedData.answer5;

    if(sumTotal == 0) {
        showModal('Brak danych do narysowania wykresu.');
        return;
    }

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Listening time');
    data.addColumn('number', 'Number of people');
    data.addRows([
      ['codziennie', fetchedData.answer1],
      ['2-3 razy w tygodniu', fetchedData.answer2],
      ['parę razy w miesiącu', fetchedData.answer3],
      ['kilka razy w roku', fetchedData.answer4],
      ['nigdy', fetchedData.answer5]
    ]);

    var options = {'title':'Jak często czynnie i świadomie słuchasz muzyki?',
                   'width':600,
                   'height':400};

    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
 }