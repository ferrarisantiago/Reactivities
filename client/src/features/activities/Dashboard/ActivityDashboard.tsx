import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

// The component receives an array of activities from App.
// El componente recibe el array de actividades desde App.
type Props = {
    activities: Activity[]
    selectActivity: (id:string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean
    submitForm: (activity: Activity) => void
    deleteActivity: (id:string) => void
}

export default function ActivityDashboard({activities, 
  cancelSelectActivity, openForm,closeForm,editMode,
  selectActivity,selectedActivity,submitForm,deleteActivity}: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList 
          activities={activities}
          selectActivity ={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && !editMode && 
          <ActivityDetail 
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm ={openForm}
          />
        }
        {editMode &&
        <ActivityForm closeForm={closeForm} activity= {selectedActivity} submitForm={submitForm}/>}
      </Grid2>
    </Grid2>
  );
}
