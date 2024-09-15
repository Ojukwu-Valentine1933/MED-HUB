import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the patient
const initialState = {
  patient: null,
};
export const patientSlice = createSlice({
  initialState,
  name: "patientState",
  reducers: {
    // Define the action to set the patient
    setCurrentPatient:(state,action) =>{
        state.patient = action.payload;
    },
    clearCurrentpatient: (state, action) => {
      state.patient = null;
    }

  },
});

// Export the action	
export default patientSlice.reducer;

// Export the action creator
export const { setCurrentPatient, clearCurrentpatient } = patientSlice.actions;
