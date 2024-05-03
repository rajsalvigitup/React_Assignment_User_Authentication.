import React, { useState ,useEffect} from 'react';
import Spinner from './Spinner';

const ItemList = ({ users, onUpdateUser, onDeleteUser }) => {
  const [editData, setEditData] = useState({});


  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    // Simulate data fetching delay with setTimeout
    const fetchData = setTimeout(() => {
      setIsLoading(false); 
    }, 2300); // Simulated delay of 2.3 seconds

    // Clean up function to clear timeout when component unmounts or rerenders
    return () => clearTimeout(fetchData);
  }, []); // Run effect only once when component mounts

  const handleToggleEditMode = (userId) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [userId]: users.find((user) => user.id === userId),
    }));
  };

  const handleUpdateUserData = (userId) => {
    onUpdateUser(userId, editData[userId]);
    setEditData((prevEditData) => ({
      ...prevEditData,
      [userId]: undefined,
    }));
  };

  
  return (
    <>
     {isLoading ? (
        <Spinner /> // Render the Spinner component while data is being fetched
      )  : (
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Birth Date</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <React.Fragment key={user.id}>
            <tr>
              <td>{user.id}</td>
              <td>
                {editData[user.id] ? (
                  <input
                    type="text"
                    value={`${editData[user.id].firstname} ${editData[user.id].lastname}`}
                    onChange={(e) => {
                      const [firstname, lastname] = e.target.value.split(' ');
                      setEditData(prevEditData => ({
                        ...prevEditData,
                        [user.id]: {
                          ...prevEditData[user.id],
                          firstname,
                          lastname
                        }
                      }));
                    }}
                  />
                ) : (
                  `${user.firstname} ${user.lastname}`
                )}
              </td>
              <td>
                {editData[user.id] ? (
                  <input
                    type="text"
                    value={editData[user.id].email}
                    onChange={(e) => setEditData(prevEditData => ({
                      ...prevEditData,
                      [user.id]: {
                        ...prevEditData[user.id],
                        email: e.target.value
                      }
                    }))}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editData[user.id] ? (
                  <input
                    type="text"
                    value={editData[user.id].birthDate}
                    onChange={(e) => setEditData(prevEditData => ({
                      ...prevEditData,
                      [user.id]: {
                        ...prevEditData[user.id],
                        birthDate: e.target.value
                      }
                    }))}
                  />
                ) : (
                  user.birthDate
                )}
              </td>
              
            </tr>
            <tr>
              <td colSpan="6" className="text-center">
                {editData[user.id] ? (
                  <>
                    <button
                      className="btn btn-primary mx-1 my-1"
                      onClick={() => handleUpdateUserData(user.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary mx-1 my-1"
                      onClick={() => setEditData(prevEditData => ({
                        ...prevEditData,
                        [user.id]: undefined
                      }))}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary mx-1 my-1"
                    onClick={() => handleToggleEditMode(user.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger mx-1 my-1"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
      )}
    </>
  );
};

export default ItemList;



