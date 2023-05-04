import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Tabs, Chip, Alert, LinearProgress, Snackbar, Tab,Box,Typography,Toolbar,Tooltip,TextField} from '@mui/material/';
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
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom'

caches.keys().then(function(names) {
  for (let name of names)
      caches.delete(name);
});

function emissionTypeDictionary(name)
{
  var emissionTypeDictionary = 
  {
    "GHG":{description:"Greenhouse gasses trap heat and make the planet warmer. Human activities are responsible for almost all of the increase in greenhouse gases in the atmosphere over the last 150 years. The largest source of greenhouse gas emissions from human activities in the United States is from burning fossil fuels for electrcity, heat, and transportation.",source:"https://climatechange.chicago.gov/ghgemissions/sources-greenhouse-gas-emissions",name:"Environmental Protection Agency"},
    "CAP":{description:"Common air pollutants (CAP) are six common pollutants defined by the EPA's National Ambient Air Quality Standards (NAAQS): \n- Ground-level Ozone\n- Particulate Matter\n- Carbon Monoxide\n- Lead\n- Sulfur Dioxide\n- Nitrogen Dioxide\nThese pollutants are found all over the U.S> They can harm your health and the environment, and cause property damage.",source:"https://www.epa.gov/criteria-air-pollutants",name:"Environmental Protection Agency"},
    "HAP":{description:"Hazardous air pollutants are those known to cause cance and other serious health impacts. While not specifically marked as detrimental to the environment, these chemicals are still known to cause cancer as well as other serious health impacts.",source:"https://www.epa.gov/haps",name:"Environmental Protection Agency"}
  }
  emissionTypeDictionary["CAP/H"] = {description: `This site has multiple primary pollutant sources. ${emissionTypeDictionary['CAP'].description}\n\n${emissionTypeDictionary['HAP'].description}`,source:"https:/epa.gov",name:"Environmental Protection Agency"};
  emissionTypeDictionary["CAP/HAP"] = {description: `This site has multiple primary pollutant sources. ${emissionTypeDictionary['CAP'].description}\n\n${emissionTypeDictionary['HAP'].description}`,source:"https:/epa.gov",name:"Environmental Protection Agency"};
  return emissionTypeDictionary[name] || {description:"It looks like there are no details regarding this pollutant type.",source:"https://emissiowl.netlify.app",name:"None"}
}

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


function StyledTypography(props)
{
  return (
    <Typography {...props} sx={{color:'white'}}/>
  )
}

function App() 
{
  return(
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  )
}

function Landing()
{
  const theme = createTheme(themeOptions);
  const navigate = useNavigate();
  //Create a simple landing page below
  return(
    <ThemeProvider theme={theme}>
    <div className = "emissiowlLanding">
      <Typography variant="h1">EmissiOwl</Typography>
      <Typography variant="h2" sx={{color:themeOptions.palette.secondary.main}}>Transparency, Efficiency</Typography>
      <Typography variant="h5">EmissiOwl is an open-source web application for presenting data on tracked factories, mills, and other facilities' waste collected by the Environmental Protection Agency in the United States.</Typography>
      <br></br>
      <Typography variant="h5">Open our application and learn more about the runoff waste in your area!</Typography>
      <div style={{justContent:'center',alignItems:'center'}}>
        <Button onClick={()=>{navigate('/dashboard')}} variant="contained" color="primary" sx={{width:"30%",height:"50px",marginTop:"20px"}}>Get Started</Button>
      </div>
    </div>
    </ThemeProvider>
  )
}


const Dashboard = () =>
{
  
  const [snackbarMessage,setSnackbarMessage] = React.useState('')
  const [snackbarVariant, setSnackbarVariant] = React.useState('success')
  const [snackbarOpen,setSnackbarOpen] = React.useState(false)
  const showSnackbar = (message,variant) =>
  {
      setSnackbarMessage(message)
      setSnackbarVariant(variant)
      setSnackbarOpen(true)
  }
  
  const handleSnackbarClose = (event,reason) =>
  {
      if(reason==='clickaway')
      {
          return;
      }
      setSnackbarOpen(false)
  }
  const [siteName,setSiteName] = React.useState('');
  const [city, setCity ] = React.useState('');
  const [state,setState] = React.useState('');
  const[totalEmissions, setTotalEmissions] = React.useState('');
  const [commonPollutantType,setCommonPollutantType] = React.useState('');
  const[commonPollutant,setCommonPollutant] = React.useState('');
  const [detailDrawer, setDetailDrawer] = React.useState(false)
  const openDrawerAndDisplay = (element) =>
  {
    setSiteName(element.SiteName)
    setCity(element.City)
    setState(element.State)
    setTotalEmissions(element.TotalEmissions);
    setCommonPollutant(element.PollutantDescription)
    setCommonPollutantType(element.PollutantType)
    setDetailDrawer(true)
  }
  const [loadingDisplay, setLoadingDisplay] = React.useState(false)
  const [map, setMap] = React.useState(null);
  const [maps, setMaps] = React.useState(null);
  const [defaultCenter,setDefaultCenter] = React.useState({
    lat: 47.0902,
    lng: -115.7129,
  })
  const [searchFocused,setSearchFocused] = React.useState(false)
  const [siteNames, setSiteNames] = React.useState([])
  const [searchChoices, setSearchChoices] = React.useState([]);
  const [zoom,setZoom] = React.useState(10);
  const isLoaded = ({
    key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  const [elements,setElements] = React.useState([
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
      const { SiteName, State } = element;
      const searchLower = searchTerm.toLowerCase();
      return SiteName.toLowerCase().includes(searchLower) || State.toLowerCase().includes(searchLower);
    });
    const grouped = groupElements(filtered);
    setFilteredElements(grouped);
  }, [searchTerm]);
  React.useEffect(()=>
  {
    fetch('https://emissiowl-rest.netlify.app/.netlify/functions/sites_by_state',{
      })
    .then(res=>res.json())
    .then(data=>setSiteNames(data))
  },[siteNames])

  const center = useMemo(() => ({lat: 40.71, lng: 74}), [])
  const handleChange = (event,newValue) =>{
    setTabValue(newValue);
  }
  const handleChangeIndex = (index) => {
    setTabValue(index);
  }
  const handleKeyPress = (event) =>
  {
    showSnackbar("Loading...","warning")
    setLoadingDisplay(true)
    if(event.key==='Enter')
    {
      var searchChoices = JSON.parse(localStorage.getItem("searchChoices"))
      fetch('https://emissiowl-rest.netlify.app/.netlify/functions/specific_sites',{method:"POST",body:JSON.stringify({sites:searchChoices}),headers:{"Content-Type":"text/plain"}}).then(res=>res.json()).then(data=>setElements(data))
      //maps.setCenter(new window.google.maps.LatLng(defaultCenter.lat,defaultCenter.lng))
    }
    setLoadingDisplay(false)
    showSnackbar("Search Complete!","success")
  }
  const handleSearch = () =>
  {
    showSnackbar("Loading...","warning")
    setLoadingDisplay(true)
    var searchChoices = JSON.parse(localStorage.getItem("searchChoices"))
    fetch('https://emissiowl-rest.netlify.app/.netlify/functions/specific_sites',{method:"POST",body:JSON.stringify({sites:searchChoices}),headers:{"Content-Type":"text/plain"}}).then(res=>res.json()).then(data=>setElements(data))
    setLoadingDisplay(false)
    showSnackbar("Search Complete!","success")
  }
  const handleApiLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps);
  };
  const theme = createTheme(themeOptions);
  const AboutPage = () =>
  {
    return(
      <div>
        <Typography variant="h3">EmissiOwl</Typography>
        <br></br>
        <Typography variant="body2">Developers: Isaiah Freeman, Christopher Parham, LaQuawne DePriest,Christian Mills</Typography>
        <br></br>
        <Typography variant = "h4">Our Data</Typography>
        <Typography>Data is gathered from the Environmental Protection Agency's dataset, on nonpoint source pollution. In order to lower the scale of the data, only the top 20% of pollution is concluded in this site. In the future, we will extend to the rest of the dataset.</Typography>
        <Typography>How we gathered this data can be seen in our <a target="_blank" href="https://github.com/kingtechnician/emissiowl">repository</a></Typography>
      </div>
    );
  }
  const SearchPage = () =>
  {
    
    //37.238913059751326, -77.4198935057797
    return(
      <div style={{height:'85vh',width:'100%'}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        {loadingDisplay && 
            <CircularProgress/>}
        </div>
        <SwipeableDrawer
        anchor="bottom"
        open={detailDrawer}
        onClose={()=>{setDetailDrawer(false)}}>
          <Paper sx={{padding:"20px",backgroundColor:themeOptions.palette.primary.main}}>
            <KeyboardArrowDownIcon onClick={()=>setDetailDrawer(false)} sx={{color:'white'}} fontSize="large"/>
            <StyledTypography variant = "h2">{siteName}</StyledTypography>
            <StyledTypography variant = "h4">{`${city}, ${state}`}</StyledTypography>
            <br></br>
            <Grid container spacing={0.3} p={1.5} m={1}>
              <Grid xs={6}>
                <StyledTypography variant="body1"><b>Total Emissions(TON):</b></StyledTypography>
              </Grid>
              <Grid xs={6}>
                <StyledTypography variant = "body1">{`${parseFloat(totalEmissions).toFixed(2)} pounds (${(parseFloat(totalEmissions).toFixed(2)/2000).toFixed(2)} tons)`}</StyledTypography>
              </Grid>
              <Grid xs={6}>
                <StyledTypography variant="body1"><b>Most Populous Pollutant Type:</b></StyledTypography>
              </Grid>
              <Grid xs={6}>
                <StyledTypography variant = "body1">{commonPollutantType}</StyledTypography>
              </Grid>
              <Grid xs={6}>
                <StyledTypography variant = "body1"><b>Most Common Pollutant</b>:</StyledTypography>
              </Grid>
              <Grid xs={6}>
                <StyledTypography variant = "body1">{commonPollutant}</StyledTypography>
              </Grid>
              <Grid xs={12}>
                <br></br>
                <StyledTypography variant="body1">{emissionTypeDictionary(commonPollutantType)["description"]}</StyledTypography>
              </Grid>
              <Grid xs={12}>
                <StyledTypography variant="body1">Source: <a target="_blank" href={emissionTypeDictionary(commonPollutantType)["source"]}>Environmental Protection Agency</a></StyledTypography>
              </Grid>
            </Grid>
          </Paper>
        </SwipeableDrawer>
        <div p={5}>
          <br></br>
          <div>
                <Autocomplete
            multiple
            disableCloseOnSelect
            sx={{input:{color:'white'}}}
            onChange={(event,newValue)=>
              {
                var searchChoices= localStorage.setItem("searchChoices",JSON.stringify(newValue))
              }}
            onKeyDown={handleKeyPress}
            id="grouped-demo"
            variant="contained"
            options={siteNames.sort((a,b)=>-b.State.localeCompare(a.State))}
            groupBy={(element)=>element.State}
            getOptionLabel={(option)=>option.SiteName}
            renderInput={(params)=>{return(<TextField sx={{input:{color:'white'},label:{color:'white'}}} {...params} label="Type the desired locations here..."/>)}}
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
            <Button onClick={()=>{setLoadingDisplay(true);handleSearch();}} fullwidth sx={{width:"100%"}} variant="contained" color="secondary">Search Locations</Button>
            
          </div>
        </div>
        <br></br>
          <GoogleMapReact bootstrapURLKeys={isLoaded} defaultCenter={defaultCenter} defaultZoom={2} center={defaultCenter} yesIWantToUseGoogleMapApiInternalsonGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} >
            {elements.map((element,index)=>
            {
              return(
                <Tooltip lat={element.Latitude} lng={element.Longitude} title = {element.SiteName} placement="top">
                  <LocationOnIcon fontSize="large" key={index} onClick={()=>{openDrawerAndDisplay(element)}}/>
                </Tooltip>
              )
            })}
          </GoogleMapReact>
          <br></br>
          <br></br>
      </div>
    )
  }
  const ProfilePage = () =>{
    return(
      <div>
        <Typography variant="h2">{"<Not yet implemented>"}</Typography>
      </div>
    );
  }
  const tabContent = [AboutPage,SearchPage,ProfilePage];
  const [tabValue, setTabValue] = React.useState(1);

   return(
      <ThemeProvider theme={theme}>
      <div className="App-header">
        
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarVariant} sx={{width:'100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Emissiowl
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
