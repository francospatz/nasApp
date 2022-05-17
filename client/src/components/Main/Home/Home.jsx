import React from 'react';
import useFetch from '../../../hooks/useFetch';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const apiKey = process.env.REACT_APP_NASA_API_KEY;

const Home = () => {
  const { loading, result } = useFetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)

  if (loading) {
    return <p>Loading...</p>
  } else {
    return <div className='home-container'>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="auto"
          image={result.hdurl}
          alt="Nasa image"
        />
      </Card>
      <div className='home__text'>
        <Typography variant="h3" sx={{ mb: 4, mt: 4, fontWeight: 400, fontStyle: 'italic', color: "white" }}>
          Picture of the day
        </Typography>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {result.explanation}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {result.date}
            </Typography>
          </CardContent>
        </Card>
      </div>

    </div>
  }
};

export default Home;

// details: "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."

// 99429063134-r86lq40pvtkifn3is3ce8dqhvh1bb8mb.apps.googleusercontent.com

// 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