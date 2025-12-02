import {
  Box,
  Container,
  CssBaseline,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";

function App() {

  //React state to store the list of activities coming from the API.
  //Estado de React para guardar la lista de actividades que vienen de la API.
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false)

  //Runs once when the component mounts: fetch activities from the API.
  //Se ejecuta una vez cuando el componente se monta: trae actividades de la API.
  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, [])
  
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if(id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormclose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id){
      setActivities(activities.map(x => x.id ===activity.id ?activity : x))
    }else{
      const newActivity = {...activity, id:activities.length.toString()}
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity])
    }
    setEditMode(false);
  }

  const handleDelete = (id: string) =>{
    setActivities(activities.filter(x => x.id !== id))
  }

  // <CssBaseline /> Material UI global reset
  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline /> 
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{mt:3}}>
        <ActivityDashboard 
          activities={activities}
          selectActivity ={handleSelectActivity}
          cancelSelectActivity ={handleCancelSelectActivity}
          selectedActivity = {selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormclose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </Box>
  );
}

export default App;
