import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTrainding = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/bestseller");
            const resData = res.data.data;
            setData(resData.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecord = async (_id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/bestseller/` + _id);
            if (res.status === 200) {
                getApiData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const handleClick = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    // Logic for displaying items based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Trainding List </h4>
                </div>
                <div className="links">
                    <Link to="/add-trainding" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           currentItems.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{indexOfFirstItem + index + 1}</th>
                                    <td>{item.traindingName}</td>
                                    <td><img src={item.image} /></td>
                                    <td><Link className="bt edit" to={`/edit-trainding/${item._id}`}>Edit <i class="fa-solid fa-pen-to-square"></i></Link></td>
                                    <td><Link className="bt delete" onClick={()=>{deleteRecord(item._id)}}>Delete <i class="fa-solid fa-trash"></i></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </section>
        </>
    )
}

export default AllTrainding