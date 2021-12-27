import React from "react";
import { Box, TextField, Button } from "@mui/material";

import { createGroup } from '../../apis/group'

const CreateGroup = (props) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const onCreateGroup = async () => {
    try {
      const res = await createGroup({ name, description })
      if (res.status === 200) {
        const newGroup = res.data.data
        props.addGroup(newGroup)
      } else {
        
      }
    } catch (error) {
      
    } 
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        style={{ width: "60%", marginBottom: 20, backgroundColor: "white" }}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(t) => setName(t.target.value)}
      />
      <TextField
        style={{ width: "60%", marginBottom: 20, backgroundColor: "white" }}
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={description}
        onChange={(t) => setDescription(t.target.value)}
      />
      <Button
        onClick={onCreateGroup}
        style={{ width: "60%" }}
        svariant="contained"
      >
        Create
      </Button>
    </Box>
  );
};

export default CreateGroup;
