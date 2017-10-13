import * as React from 'react';

const RatingResultsStyles = {
  width: '29.3%',
  height: '44.9%',
  padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};

/*declare var google: any;
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawRatingChart);

function drawRatingChart() {
    var data = google.visualization.arrayToDataTable([
            ['Star', 'Count'],
            ['One', 15],           
            ['Two', 30],           
            ['Three', 23],
            ['Four', 38], 
            ['Five', 60]
        ]);

    var options = {
        chart: { 
            title: 'Rating Results',
            subtitle: 'Average: 3.5',
        },
        colors: ['#8E8DF3'],
        titleTextStyle: {fontSize: 30},
        legend: {position: 'none'}
    }

    var chart = new google.visualization.ColumnChart(
        document.getElementById('rating'));

    chart.draw(data, options);
} */

class RatingResults extends React.Component<{}, {}> {
  componentWillMount() {
    this.setState({
    });
  }

  render() {
    return (
    <div style={RatingResultsStyles}>
        <p style = {{width: "3.8%", height: "41.2%"}}> Lecture Rating </p>        
    </div>
      
    );
  }
}

export default RatingResults;