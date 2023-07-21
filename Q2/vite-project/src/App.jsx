import React, { useEffect, useState } from 'react';

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const registrationBody = {
      companyName: 'Train Central',
      ownerName: 'Ram',
      rollNo: '1',
      ownerEmail: 'ram@abc.edu',
      accessCode: 'oJnNPG' 
    };

    fetch('http://20.244.56.144/train/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationBody),
    })
      .then(response => response.json())
      .then(registrationData => {
        const authBody = {
          companyName: registrationData.companyName, 
          clientID: registrationData.clientID, 
          ownerName: registrationData.ownerName,
          ownerEmail: registrationData.ownerEmail, 
          rollNo: registrationData.rollNo, 
          clientSecret: registrationData.clientSecret 
        };

        fetch('http://20.244.56.144/train/auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authBody),
        })
          .then(response => response.json())
          .then(data => {
            const token = data.token;
            fetch('http://20.244.56.144/train/trains', {
              headers: {
                'Authorization': `Bearer ${token}`, 
              },
            })
              .then(response => response.json())
              .then(data => setTrains(data.trains)) 
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {trains.map((train, index) => (
        <p key={index}>{train.name}</p> 
      ))}
    </div>
  );
}

export default App;
