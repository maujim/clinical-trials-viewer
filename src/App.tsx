import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Card from 'react-bootstrap/Card';

function StudyCard({ study }) {
  const briefTitle = study.protocolSection.identificationModule.briefTitle;
  const officialTitle = study.protocolSection.identificationModule.briefTitle;

  const eligibilityModule = study.protocolSection.eligibilityModule;

  const age_details = ['from ', eligibilityModule.minimumAge];
  if (eligibilityModule.maximumAge) {
    age_details.push(' to ', eligibilityModule.maximumAge);
  }

  const statusModule = study.protocolSection.statusModule;

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <strong> {briefTitle} </strong>
          <br /> {statusModule.startDateStruct.type === 'ESTIMATED' ? 'Estimated start date: ' : 'Start date: '}{' '}
          {statusModule.startDateStruct.date}
          <br />{' '}
          {statusModule.completionDateStruct.type === 'ESTIMATED'
            ? 'Estimated completion date: '
            : 'Completion date: '}{' '}
          {statusModule.completionDateStruct.date}{' '}
        </Card.Title>{' '}
        <Card.Text>
          {' '}
          <b> Eligibility criteria </b>
          <br /> Age: {age_details}
          <br /> Eligible sexes: {eligibilityModule.sex}
          <br /> Accepts healthy volunteers: {eligibilityModule.healthyVolunteers ? 'yes' : 'no'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [studies, setStudies] = useState([]);
  const [pageToken, setPageToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://clinicaltrials.gov/api/v2/studies?format=json&query.cond=thalassemia+OR+%28sickle+cell%29+OR+Aplastic+Anemia+OR+Diamond-Blackfan+Anemia+OR+Hemophilia+OR+Hematologic+Diseases+OR+Myeloid+Chimerism&filter.overallStatus=RECRUITING%7CENROLLING_BY_INVITATION%7CACTIVE_NOT_RECRUITING&pageSize=10',
      );
      const { studies, nextPageToken } = await response.json();
      setStudies(studies); // Store the data
    };

    fetchData();
  }, []); // Runs once on component load

  console.log(studies);

  return (
    <>
      {studies.map(study => (
        <StudyCard study={study} />
      ))}
    </>
  );
}

export default App;
