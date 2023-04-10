import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Tabs, Tab,Box,Typography,Toolbar,TextField} from '@mui/material/';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import SwipeableViews from 'react-swipeable-views-react-18-fix/lib/SwipeableViews';
import {GoogleMap,Marker,useLoadScript} from '@react-google-maps/api';
import{useMemo} from 'react';
import GoogleMapReact from 'google-map-react'



const Map = ({location,zoomLevel}) => {
  return(
    <div className="map">
      <div className="google-map">
        <h2>Location</h2>
        
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function tabProps(index)
{
  const tabArray=["About","Search","Profile"];
  return {
  label: tabArray[index],
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
  };
}

const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#00695c',
      contrastText: '#fffffe',
    },
    secondary: {
      main: '#f5c400',
    },
    background: {
      default: '#303031',
      paper: '#424241',
    },
  },
  typography: {
    h1: {
      fontWeight: 300,
      fontFamily: 'Roboto',
    },
    h2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  shape: {
    borderRadius: 4,
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
  },
};


const App = () =>
{
  const isLoaded = ({
    key:""
  })
  const center = useMemo(() => ({lat: 40.71, lng: 74}), [])
  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map){
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  },[])
  const onUnmount = React.useCallback(function callback(map){
    setMap(null)
    },[])
  const handleChange = (event,newValue) =>{
    setTabValue(newValue);
  }
  const handleChangeIndex = (index) => {
    setTabValue(index);
  }
  const theme = createTheme(themeOptions);
  const AboutPage = () =>
  {
    return(
      <div>
        <Typography variant="h3">EmissiOwl</Typography>
        <br></br>
        <Typography variant="h4">About</Typography>
        <Typography variant="body1">EmissiOwl is a web application that allows users to search for and compare the carbon emissions of various products. The application is designed to be used by anyone who is interested in reducing their carbon footprint. The application is currently in development and is not yet available for use.</Typography>
      </div>
    );
  }
  const SearchPage = () =>
  {
    const location = {
      lat: 40.7128,//74.0060
      lng: -74.0060,////40.7128
    }
    return(
      <div style={{height:'100vh',width:'100%'}}>
        <div p={5}>
          <TextField fullwidth sx={{width:"100%",input:{backgroundColor:'white'},borderRadius:"12px"}}/>
        </div>
        <br></br>
        <GoogleMapReact bootstrapURLKeys={isLoaded} defaultCenter={center} defaultZoom={1} >
          <Typography lat={location.lat} lng={location.lng} text={location.address}>New York City</Typography>
        </GoogleMapReact>
      </div>
    )
  }
  const ProfilePage = () =>{
    return(
      <div>
        <Typography variant="h2">EmissiOwl</Typography>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="body1">EmissiOwl is a web application that allows users to search for and compare the carbon emissions of various products. The application is designed to be used by anyone who is interested in reducing their carbon footprint. The application is currently in development and is not yet available for use.</Typography>
      </div>
    );
  }
  const tabContent = [AboutPage,SearchPage,ProfilePage];
  const [tabValue, setTabValue] = React.useState(1);

   return(
      <ThemeProvider theme={theme}>
      <div className="App-header">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App logo would go here
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar elevation={0} position="static">
          <Tabs
            value={tabValue}
            onChange = {handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            centered
          >
            <Tab sx={{color:'white'}} {...tabProps(0)} />
            <Tab sx={{color:'white'}} {...tabProps(1)} />
            <Tab sx={{color:'white'}} {...tabProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction==='rtl'?'x-reverse':'x'}
          index={tabValue}
          onChangeIndex={handleChangeIndex}
          >

          <TabPanel value={tabValue} index={0}>
            {tabContent[tabValue]()}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {tabContent[tabValue]()}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {tabContent[tabValue]()}
          </TabPanel>
        </SwipeableViews>
      </div>
      </ThemeProvider>
    );
}



export default App;
