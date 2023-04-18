import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Tabs, Chip, Tab,Box,Typography,Toolbar,Tooltip,TextField} from '@mui/material/';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import SwipeableViews from 'react-swipeable-views-react-18-fix/lib/SwipeableViews';
import Autocomplete from '@mui/material/Autocomplete';
import {GoogleMap,Marker,useLoadScript} from '@react-google-maps/api';
import{useMemo} from 'react';
import GoogleMapReact from 'google-map-react'
import {debounce} from '@mui/material/utils'
import LocationOnIcon  from '@mui/icons-material/LocationOn';
import { styled, lighten, darken } from '@mui/system';

const GOOGLE_MAPS_API_KEY = "AIzaSyBtMLLWnI3cvK-C2cX3e-6c795KhO__MjE"

function loadScript(src,position,id)
{
  if(!position)
  {
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('async','');
  script.setAttribute('id',id);
  script.src = src;
  position.appendChild(script)
}


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

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

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
      paper: '#FFFFFF',
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
  const [siteNames, setSiteNames] = React.useState([])
  const [zoom,setZoom] = React.useState(10);
  const isLoaded = ({
    key:""
  })
  const [elements,setElements] = React.useState([
    {title:"Location 1",state:"New York",icon:<LocationOnIcon/>,lat: 40.71, lng: -74},
    {title:"Location 2",state: "Connecticut",icon:<LocationOnIcon/>,lat: 41.71, lng: -73},
    {title:"Location 3",state:"Massachusetts",icon:<LocationOnIcon/>,lat: 42.71, lng: -72},
    {title:"Location 4",state:"Virginia",icon:<LocationOnIcon/>,lat: 37.23,lng:-77.41},
    {title:"Virginia State University",state:"Virginia",icon:<LocationOnIcon/>,lat:37.23,lng:-77.41},
  ])
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredElements, setFilteredElements] = React.useState([]);

  const groupElements = (elements) => {
    const groupedElements = [];
    elements.forEach((element) => {
      const { state } = element;
      if (!groupedElements[state]) {
        groupedElements[state] = [];
      }
      groupedElements.push({state:element});
    });
    return groupedElements;
  };

  React.useEffect(() => {
    const filtered = elements.filter((element) => {
      const { title, state } = element;
      const searchLower = searchTerm.toLowerCase();
      return title.toLowerCase().includes(searchLower) || state.toLowerCase().includes(searchLower);
    });
    const grouped = groupElements(filtered);
    setFilteredElements(grouped);
  }, [searchTerm]);
  React.useEffect(()=>
  {
    fetch('./sites_by_state',{headers:{"Content-Type":"text/plain"}})
    .then(res=>res.json())
    .then(data=>setSiteNames(data["message"]))
    console.log(siteNames)
  },[])

  const center = useMemo(() => ({lat: 40.71, lng: 74}), [])
  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map){
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  },[])
  const handleApiLoaded = (map,maps) =>
  {
    const bounds = new maps.LatLngBounds();
    elements.forEach(element =>
      {
        bounds.extend(new maps.LatLng(element.lat,element.lng));
      });
      map.fitBounds(bounds);
      const newZoom = map.getZoom();
      setZoom(newZoom);
  }
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
    //37.238913059751326, -77.4198935057797
    const location = {
      lat: 37.238913059751326,
      lng: -77.4198935057797,
    }
    return(
      <div style={{height:'85vh',width:'100%'}}>
        <div p={5}>
          <Autocomplete
          multiple
          sx={{input:{color:'white'}}}
          id="grouped-demo"
          variant="contained"
          options={siteNames.sort((a,b)=>-b.State.localeCompare(a.State))}
          groupBy={(element)=>element.State}
          getOptionLabel={(option)=>option.SiteName}
          renderInput={(params)=><TextField sx={{input:{color:'white'},label:{color:'white'}}} {...params} label="With categories"/>}
          renderTags={(value,getTagProps)=>
            {
              return(
                value.map((option,index)=>
                {
                  return(
                    <Chip variant="outlined" style={{color:'white'}} label={option.SiteName} {...getTagProps({index})}/>
                  )
                })
              )
            }}
          />
        </div>
        <br></br>
          <GoogleMapReact bootstrapURLKeys={isLoaded} defaultCenter={location} defaultZoom={15} yesIWantToUseGoogleMapApiInternals onGoogleApiLoaded={({map,maps})=>handleApiLoaded(map,maps)} >
            {elements.map((element,index)=>
            {
              return(
                <Tooltip lat={element.lat} lng={element.lng} title = {element.title} placement="top">
                  <LocationOnIcon key={index}/>
                </Tooltip>
              )
            })}
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
