import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, Card, TableBody, Box, TextField, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, 
  CardContent
} from '@mui/material';


import { Add, List, AccountTree  } from '@mui/icons-material';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get('http://localhost:5252/users');
         setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleActionClick = (userId) => {
    console.log(`Action clicked for user ${userId}`);
  };

  const toggleUserActiveState = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === userId ? { ...user, active: !user.active } : user
      )
    );
    
  };

  return (
    <Container style={{backgroundColor:"whitesmoke", padding:"20px"}}>
      <Box sx={{ marginTop: 3, display:"flex" }}> 
        <Card sx={{ width: '100%', margin: '0 auto', backgroundColor: 'white' }}> 
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <b>All Organisation</b>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                style={{ marginLeft: 'auto' }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      <Box display="flex" padding="20px" justifyContent="space-between">
        <Button
          variant="contained"
          color="error"
          sx={{ padding: '10px 20px', fontSize: '11px',display:'flex'}}
          startIcon={<Add />}
        >
          Add Organisation
        </Button>
        <span alignItems='end' >
        <Button variant="contained"style={{ backgroundColor: "black", color: "white", }}>
          <List /> 
        </Button>
        <Button color='inherit'>
          <AccountTree />
        </Button>
        </span>
      </Box>

      <TableContainer  display="flex">
        <Table >
          <TableHead>
            <TableRow >
              <TableCell><h4>Org ID</h4></TableCell>
              <TableCell><h4>Org Name</h4></TableCell>
              <TableCell><h4>Org Location</h4></TableCell>
              <TableCell><h4>State/Region</h4></TableCell>
              <TableCell><h4>Status</h4></TableCell>
              <TableCell><h4>Actions</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper} >
          <TableRow padding>
              <TableCell>AC2676</TableCell>
              <TableCell>Anarghya-HYD</TableCell>
              <TableCell>Hyderbad</TableCell>
              <TableCell>Telangana</TableCell>
              <TableCell style={{color:"orange"}}>ACTIVE</TableCell>
              <TableCell style={{color:"green"}}>Edit</TableCell>
            </TableRow>
          </TableBody>
          <TableBody component={Paper}>
          <TableRow>
              <TableCell>AC2677</TableCell>
              <TableCell>Anarghya-HYD</TableCell>
              <TableCell>Hyderbad</TableCell>
              <TableCell>Telangana</TableCell>
              <TableCell style={{color:"orange"}}>ACTIVE</TableCell>
              <TableCell style={{color:"green"}}>Edit</TableCell>
            </TableRow>
          </TableBody>
          
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color={user.active ? "secondary" : "default"}
                    onClick={() => toggleUserActiveState(user.userId)}
                  >
                    {user.active ? "Inactive" : "Active"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleActionClick(user.userId)}
                  >
                    Action
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default App;