// Login_Apr.js renders the Admin Login Page for the site
// This comp will display forms to allow an approved user to add new
// user credentials, to upload a new data set in the form of a .csv file, 
// or to log out

// Login_Apr.js is rendered by Login.js, and renders no children.

import React from 'react';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import '../../css/LoginStyle.css'
import UploadCSV from '../UploadCSV';

const nodes = [
  {
    id: '1',
    name: 'Bob',
    email: 'bob@gmail.com',
  },
  {
    id: '2',
    name: 'Jane',
    email: 'jane@email.com',
  },
  {
    id: '3',
    name: 'Jacob',
    email: 'jacob@email.com',
  }
];

function Login_Apr() {
  const [data, setData] = React.useState({ nodes });
  const [filteredData, setFilteredData] = React.useState({ nodes });

  const [adminData, setAdminData] = React.useState(false);
  React.useEffect(() => { getAdminData(); }, []);
  const [adArray, setAdArray] = React.useState(false);

  // Change state of the table when the there is input in the search bar
  // Filters filteredData based on the searchValue
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    // Sets filteredData to contents of non-filtered list when search bar is empty
    if (searchValue === "") {
      setFilteredData(data)
    } else {
      setFilteredData((state) => ({
        // Filter the nodes of data, and set it as the nodes of filteredData
        ...state,
        nodes: data.nodes.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()))
      }))

    }
  }

  console.log("Data", data, typeof data);
  console.log("Filtered Data", filteredData);
  console.log("Nodes", nodes, typeof nodes)

  // Add row to table when submitting a name and email
  // calls postAdmin to post to admin DB
  const handleSubmit = (event) => {
    const id = nodes.length + 1;
    let person = prompt("Please enter name of user:")
    let newEmail = prompt("Please enter user's email:")
    let pword = prompt("Please enter the password to be associated with: " + newEmail)
    // Check if person and email are non-empty strings and that the prompt was not cancelled
    if ((person !== null && person !== "") && (newEmail !== null && newEmail !== "")) {

      // add to data table
      postAdmin(person, newEmail, pword);

      // Change the nodes of data by adding a new element to its nodes
      setData((state) => ({
        ...state,
        nodes: state.nodes.concat({
          id,
          name: person,
          email: newEmail,
        }),
      }));
      // Change the nodes of filteredData by adding a new element to its nodes
      setFilteredData((state) => ({
        ...state,
        nodes: state.nodes.concat({
          id,
          name: person,
          email: newEmail,
        }),
      }));
    }
  }

  // calls removeAdmin to remove admin from DB
  const handleRemove = (id) => {
    // Deletes the user by their id
    // Will also delete the user from the database (NOT IMPLEMENTED)
    // Changes the nodes of data by removing element from its nodes

    // TODO
    removeAdmin("email", "pword");

    setData((state) => ({
      ...state,
      nodes: state.nodes.filter((node) => node.id !== id),
    }));
    // Changes the nodes of filteredData by removing element from its nodes
    setFilteredData((state) => ({
      ...state,
      nodes: state.nodes.filter((node) => node.id !== id)
    }));
  };

  // grabs all admins from DB
  function getAdminData() {
    fetch(`http://localhost:3001/lml_admins/getAdmins`)
      .then(response => response.json())
      .then(data => { setAdminData(data);});
  }

  // posts a new admin to DB
  async function postAdmin(name, email, pword){
    await fetch('http://localhost:3001/lml_admins/newAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, 
        email,
        pword
      }),
    })
    .then(response => {
      if(!response.ok){
        response.text().then(function (text) {
          console.log(text);
          alert("Failed to add admin");
        });
      }
    })
  }

  async function removeAdmin(email, pword){
    alert("delete " + email + " " + pword);

    await fetch(`http://localhost:3001/lml_admins/${email}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(response => {
        if(!response.ok){
          response.text().then(function (text) {
            console.log(text);
            alert("Failed to remove admin");
          });
        }
        else {
          alert("Deleted!");
        }
      })
  }

  function dataToArray(){
    console.log(adminData)
    let adminArray = []
    if(adminData){
      for(var i=0; i < adminData.length; i++){
        adminArray[i] = [
          adminData[i].admin_id, 
          adminData[i].name, 
          adminData[i].email, 
          adminData[i].password,
          adminData[i].issuper,
          adminData[i].created_on
        ]
        adminArray[i] = adminArray[i].map((row) => 
          row = row + " "
        );
      }
      adminArray = adminArray.map((row) => 
        <li>{row}</li>
      );
      // setAdArray(adminArray)
      return adminArray;
    }
  }

  // Table style
  const tableTheme = useTheme({
    Table: `
        height: 100%;
    `,
    BaseCell: `
    &:nth-child(1) {
      min-width: 15%;
      width: 35%;
    }
    &:nth-child(2), &:nth-child(3), &:nth-child(4) {
      min-width: 35%;
      width: 15%;
    }
    &:nth-child(5) {
      min-width: 20%;
      width: 20%;
    }
  `,
  });

  return (
    <div className='main'>
      {/* Create a sidebar to display user profile and settings */}
      <div className="nav-bar d-flex flex-column flex-shrink-0 p-3 bg-gray">
        <br></br>
        {/* Card displaying user picture and name */}
        <div className="card card-image bg-gray border-0">
          <div>
            <img class="class-img-top rounded-circle border border-dark"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkGq1f7x3EPaXHdH75vQXY-Co3z-hyD5F3XeZQaELfc6HzB5rRBrs5IkIUk0zSFcFgfI&usqp=CAU"
              alt="" width="80" height="80"></img>
          </div>
          <h3>Bridget Chew</h3>
        </div>
        <br></br>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              <svg class="bi" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
              Manage Account
            </a>
          </li>
          <li><a href="#">Menu 1</a></li>
          <li><a href="#">Menu 2</a></li>
          <li><a href="#">Menu 3</a></li>
        </ul>
        <hr></hr>
        <div class="dropdown">
          <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkGq1f7x3EPaXHdH75vQXY-Co3z-hyD5F3XeZQaELfc6HzB5rRBrs5IkIUk0zSFcFgfI&usqp=CAU"
              alt="" width="32" height="32" class="rounded-circle me-2"></img>
            <strong>Account</strong>
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></hr></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
      <div className='b-example-divider'></div>
      <div className='custom-table '>
        {/* Create a search bar for Table component */}
        <h3>Members</h3>
        <label htmlFor="search">
          <input id="search" type="text" onChange={handleSearch} placeholder='Search for Names'></input>
        </label>
        {/* Create a table that displays all user accounts */}
        <Table data={filteredData} theme={tableTheme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              {/* Create header with table attributes */}
              <Header resize={{ minWidth: 100 }}>
                <HeaderRow>
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Email</HeaderCell>
                  <HeaderCell></HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {/* Display row values by iterating through tableList */}
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>{item.name}</Cell>
                    <Cell>{item.email}</Cell>
                    {/* Button to Delete users from Table */}
                    <Cell>
                      <button type="button" className="btn" onClick={() => handleRemove(item.id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                      </button>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        {/* Button  to add a new user */}
        <button type="button" className="btn btn-blue" onClick={handleSubmit}>Add User</button>
        <button type="button" className="btn btn-danger" onClick={handleRemove}>Kill User</button>

        <br></br>
        {adminData === [] ? 'There is no adminData available' : <ol> {dataToArray()} </ol>}
        <br></br>
        <UploadCSV/>
      </div>
    </div>
  );
}

export default Login_Apr