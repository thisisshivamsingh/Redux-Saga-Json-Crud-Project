import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserStart,
  filterUserStart,
  loadUsersStart,
} from "../redux/actions";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Deleted Successfully");
    }
  };

  const onFilterChange = (value) => {
    dispatch(filterUserStart(value));
  };
  return (
    <MDBContainer>
      <div className="container" style={{ marginTop: "150px" }}>
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>
          {users &&
            users.map((item, index) => (
              <MDBTableBody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>
                  <td>
                    <MDBBtn
                      className="m-1"
                      tag="a"
                      color="none"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MDBTooltip title="Delete" tag="a">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </MDBBtn>{" "}
                    <Link to={`/editUser/${item.id}`}>
                      <MDBTooltip title="Edit" tag="a">
                        <MDBIcon
                          fas
                          icon="pen"
                          style={{ color: "#55acee", marginBottom: "10px" }}
                        />
                      </MDBTooltip>
                    </Link>{" "}
                    <Link to={`/userInfo/${item.id}`}>
                      <MDBTooltip title="View" tag="a">
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#3b5998", marginBottom: "10px" }}
                        />
                      </MDBTooltip>
                    </Link>
                  </td>
                </tr>
              </MDBTableBody>
            ))}
        </MDBTable>
      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort By:</h5>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter By Status:</h5>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() => onFilterChange("Active")}>
              Active
            </MDBBtn>
            <MDBBtn
              color="danger"
              onClick={() => onFilterChange("Inactive")}
              style={{ marginLeft: "2px" }}
            >
              Inactive
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
