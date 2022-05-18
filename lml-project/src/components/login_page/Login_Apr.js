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
import Login_UnApr from './Login_UnApr';
import { useEffect } from 'react';

const nodes = [];

function Login_Apr({ userID }) {
  let profileuserID;
  const [profileName, setProfileName] = React.useState("");
  const [profileSuper, setProfileSuper] = React.useState("");
  useEffect(() => {
    // Only set local storage value if undefined
    // Modify local storage if state variable userID is different than the one in local storage 
    if ((userID != null) && (userID !== localStorage.getItem('newuserID'))) {
      localStorage.setItem('newuserID', userID);
    }
    // Get userID value from local storage
    profileuserID = localStorage.getItem('newuserID');
    getAdminInfo(profileuserID);
  }, []);

  // Retrieve logged-in user info 
  function getAdminInfo(profileuserID) {
    fetch(`http://localhost:3001/lml_admins/getAdminInfo/${profileuserID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setProfileName(data.name);
        setProfileSuper(data.issuper);
      });
  }

  const [data, setData] = React.useState({ nodes });
  const [filteredData, setFilteredData] = React.useState({ nodes });

  const getAdminData = () => {
    fetch(`http://localhost:3001/lml_admins/getAdmins/${profileuserID}`)
      .then(response => response.json())
      .then(json => {
        if (json) {
          let i = 0;
          while (json[i] != undefined) {
            // if i dont use this const, i++ will update all node's i's 
            const m = i;

            // Change the nodes of data by adding a new element to its nodes
            setData((state) => ({
              ...state,
              nodes: state.nodes.concat({
                id: m,
                name: json[m].name,
                issuper: json[m].issuper,
                userID: json[m].userid,
              }),
            }));
            // Change the nodes of filteredData by adding a new element to its nodes
            setFilteredData((state) => ({
              ...state,
              nodes: state.nodes.concat({
                id: m,
                name: json[m].name,
                issuper: json[m].issuper,
                userID: json[m].userid,
              }),
            }));
            i++;
          }
        }
      })
  }

  useEffect(() => {
    getAdminData();
  }, [])
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

  // Add row to table when submitting a name and userID
  // calls postAdmin to post to admin DB
  const handleSubmit = (event) => {
    //Use the length of array as new id
    const id = data.nodes.length;
    let person = prompt("Please enter name of user:")
    let newUserid = prompt("Please enter user's user-ID (can be any username):")
    let pword = prompt("Please enter the password to be associated with: " + newUserid)

    if ((person !== null && person !== "") && (newUserid !== null && newUserid !== "") && (pword !== null && pword !== "")) {
      // add to data table
      postAdmin(person, newUserid, pword);

      // Change the nodes of data by adding a new element to its nodes
      setData((state) => ({
        ...state,
        nodes: state.nodes.concat({
          id,
          name: person,
          userID: newUserid,
        }),
      }));
      // Change the nodes of filteredData by adding a new element to its nodes
      setFilteredData((state) => ({
        ...state,
        nodes: state.nodes.concat({
          id,
          name: person,
          userID: newUserid,
        }),
      }));
    }
  }

  // calls removeAdmin to remove admin from DB
  const handleRemove = (id) => {
    // Deletes the user by their id
    // Will also delete the user from the database
    // Changes the nodes of data by removing element from its nodes

    // Find the userid from the row chosen
    removeAdmin(data.nodes[id].userID)

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

  const handleStar = (id) => {
    // toggles the user's super privledges by their id
    // Will also change user's super status on the databae
    // Changes the nodes of data by changing row's issuper to !issuper

    let updateNodes = data.nodes
    updateNodes[id].issuper = !updateNodes[id].issuper

    // Call function to set the selected superstatus to selected userid
    toggleAdminSuperStatus(updateNodes[id].userID, updateNodes[id].issuper)

    // Change the nodes of data by adding a new element to its nodes
    setData((state) => ({
      ...state,
      nodes: updateNodes
    }));

    // Changes the nodes of filteredData by removing element from its nodes
    setFilteredData((state) => ({
      ...state,
      nodes: updateNodes
    }),
    );

    console.log("finish super toggle", data.nodes)
  };

  // posts a new admin to DB
  async function postAdmin(name, userid, pword) {
    await fetch('http://localhost:3001/lml_admins/newAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        userid,
        pword
      }),
    })
      .then(response => {
        if (!response.ok) {
          response.text().then(function (text) {
            console.log(text);
            alert("Failed to add admin");
          });
        }
      })
    //getAdminData()
  }

  async function removeAdmin(userID) {
    alert("delete " + userID);

    await fetch(`http://localhost:3001/lml_admins/${userID}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      }).then(response => {
        console.log(response)
      })

    //getAdminData()
  }

  async function toggleAdminSuperStatus(userid, superStatus) {
    // Set usserid's super status to true
    if (superStatus == true) {
      await fetch(`http://localhost:3001/lml_admins/giveSuper/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            response.text().then(function (text) {
              console.log(text);
              alert("Failed to toggle admin");
            });
          }
        })
    }
    // Set usserid's super status to true
    else {
      await fetch(`http://localhost:3001/lml_admins/loseSuper/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            response.text().then(function (text) {
              console.log(text);
              alert("Failed to toggle admin");
            });
          }
        })
    }
  }

  const tableTheme = useTheme({
    Table: `
        height: 150%;
    `,
    BaseCell: `
    &:nth-child(1), &:nth-child(2) {
      min-width: 29%;
      width: 33%;
    }
    &:nth-child(3), &:nth-child(4) {
      min-width: 15%;
      width: 15%;
    }
  `,
  });

  const getTable = () => {
    return (
      <div>
        <h3>Members</h3>
        <label htmlFor="search">
          <input id="search" type="text" onChange={handleSearch} placeholder='Search for Names'></input>
        </label>

        <Table data={filteredData} theme={tableTheme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>

              <Header>
                <HeaderRow>
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>User-ID</HeaderCell>
                  <HeaderCell>Super?</HeaderCell>
                  <HeaderCell>Delete</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {/* Display row values by iterating through tableList */}
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell >{item.name}</Cell>
                    <Cell >{item.userID}</Cell>
                    {/* Button to display Superadmin status */}
                    {/* Make an if statement for filled star vs empty star and add color to star when full*/}
                    {/* Hopefully make an onhover for star too */}
                    <Cell>
                      {item.issuper ?
                        <button type="button" className="btn" onClick={() => handleStar(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </button>
                        :
                        <button type="button" className="btn" onClick={() => handleStar(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </button>
                      }

                    </Cell>
                    {/* Button to Delete users from Table */}
                    {/* Make an onhover for tras can */}
                    <Cell>
                      <button type="button" className="btn" onClick={() => handleRemove(item.id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
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

        <button type="button" className="btn btn-blue" onClick={handleSubmit}>Add User</button>
      </div>
    )
  }

  const getManageUsers = () => {
    return (
      <li className="nav-item active">
        <a href="#" className="nav-link" aria-current="page" onClick={onTableClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
          </svg>
          Manage Users
        </a>
      </li>
    )
  }

  // Toggle to display member table or upload csv
  const [showUploadCSV, setShowUploadCSV] = React.useState(true)
  const [showMemberTable, setShowMemberTable] = React.useState(false)
  const onUploadClick = () => {
    //Show Upload CSV Data
    setShowMemberTable(false)
    setShowUploadCSV(true)
  }

  const onTableClick = () => {
    //Show Member table
    setShowMemberTable(true)
    setShowUploadCSV(false)
  }


  return (
    <div className='Login_Apr row'>
      {/* Create a sidebar to display user profile and settings */}
      <div className="col-md-3 bg-gray">
        <br></br>
        {/* Card displaying user picture and name */}
        <div className="card card-image bg-gray border-0">
          <div className='pb-2'>
            <img className="class-img-top rounded-circle border border-dark"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkGq1f7x3EPaXHdH75vQXY-Co3z-hyD5F3XeZQaELfc6HzB5rRBrs5IkIUk0zSFcFgfI&usqp=CAU"
              alt="" width="100" height="100"></img>
          </div>
          <h3>{profileName}</h3>
        </div>
        <div className='pt-3'>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item active" >
              <a href="#" className="nav-link" aria-current="page" onClick={onUploadClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                </svg>
                Upload CSV File
              </a>
            </li>
            {/* Check if superadmin */}
            {profileSuper ? getManageUsers() : null}
            <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
                Manage Account
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Change Password</a>
                <a className="dropdown-item" href="#">Logout</a>
              </div>
            </li>

          </ul>

        </div>
        <hr></hr>
        {/* <div className="dropdown">
          <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkGq1f7x3EPaXHdH75vQXY-Co3z-hyD5F3XeZQaELfc6HzB5rRBrs5IkIUk0zSFcFgfI&usqp=CAU"
              alt="" width="32" height="32" className="rounded-circle me-2"></img>
            <strong>Account</strong>
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div> */}
      </div>
      {/* <div className='b-example-divider'></div> */}
      <div className='col login-content'>
        <div className='custom-table '>
          {profileSuper && showMemberTable ? getTable() : null}
          {showUploadCSV ? <UploadCSV /> : null}
          {/* <UploadCSV /> */}
        </div>

      </div>
    </div>
  );
}

export default Login_Apr