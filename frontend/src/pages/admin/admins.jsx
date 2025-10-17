import { useState, useMemo, useCallback } from "react";
import Search from "../../components/search.jsx";
import TidyTable from "../../components/table.jsx";
import ConTitle from "../../components/conTitle.jsx";
import FormModal from "../../components/formModal.jsx";
import RangedPagination from "../../components/rangedPagination.jsx";
import FormInput from "../../components/formInput.jsx";
import { useGetAdmins, useAddAdmin, useEditAdmin, useDeleteAdmin } from "../../hooks/useAdmins.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// A simple utility to get form data for submission
const getFormData = (e) => {
    const formData = new FormData(e.target);
    return Object.fromEntries(formData.entries());
}

const MySwal = withReactContent(Swal);

export default function Admins () {
  // Sorting & Filtering state
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { 
    isLoading: getAdminsLoading, 
    error: getAdminsError,       
    data 
  } = useGetAdmins();
  
  // 💡 NEW STATE: Holds the admin object being edited (null for 'Add')
  const [editingAdmin, setEditingAdmin] = useState(null); 

  // 💡 PAGINATION STATE
  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: 2, 
  });
  
  const adminDatas = useMemo(
    () => data || [],
    [data]
  );

  // --- MODAL HANDLERS ---
  const { 
    mutate: addAdminMutate, 
    isLoading: addAdminLoading,
    isError: isAddAdminError,  
    isSuccess: addAdminSuccess,
    error: addAdminErrorObject 
  } = useAddAdmin();

  const {
    mutate: editAdminMutate,
    isLoading: editAdminLoading,
    isError: isEditAdminError,
    isSuccess: editAdminSuccess,
    error: editAdminErrorObject
  } = useEditAdmin();

  const {
    mutate: deleteAdminMutate,
    isLoading: deleteAdminLoading,
    isError: isDeleteAdminError,
    isSuccess: deleteAdminSuccess,
    error: deleteAdminErrorObject
  } = useDeleteAdmin();

  // Handler to close the modal and reset the editing state
  const handleCloseModal = useCallback(() => {
    setModalShow(false);
    setEditingAdmin(null);
  }, []);

  // Handler for the 'Edit' button in the table
  const handleEditClick = (adminData) => {
    setEditingAdmin(adminData);
    setModalShow(true);
  };
  
  // Handler for the 'Add Admin' button
  const handleAddClick = () => {
    setEditingAdmin(null); // Ensure we're in 'Add' mode
    setModalShow(true);
  };

  const handleDeleteClick = (userData) => {
    setEditingAdmin(userData);

      MySwal.fire({
          title: "Are you sure?",
          text: `You are about to delete the Admin: ${userData.name || userData.id}. This action cannot be undone.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33", // Red button
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {
              
              deleteAdminMutate({ id: userData.id }, {
                  onSuccess: () => {
                      MySwal.fire({
                          title: "Deleted!",
                          text: "Successfully deleted User.",
                          icon: "success"
                      });
                  },
                  onError: (error) => {
                      MySwal.fire({
                          title: "Oops!",
                          text: error.response?.data?.message || error.message || "An unknown error occurred.", 
                          icon: "error"
                      });
                  }
              });
          }
      });
  }

  const handleForm = (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    
    if (editingAdmin) {
      // edit form logic
      console.log(formData)
      editAdminMutate({ id: editingAdmin.id, data: formData }, {
        onSuccess:() => {
          MySwal.fire({
            title: "Success!",
            text: "Successfully edited new admin.",
            icon: "success"
          });
        },
        onError: (error) => {
          MySwal.fire({
            title: "Opps!",
            text: error.response.data.message,
            icon: "error"
          });
        }
      })

    } else {
      // add form logic
      addAdminMutate(formData, {
        onSuccess:() => {
          MySwal.fire({
            title: "Success!",
            text: "Successfully added new admin.",
            icon: "success"
          });
        },
        onError: (error) => {
          MySwal.fire({
            title: "Opps!",
            text: error.response.data.message,
            icon: "error"
          });
        }
      })
    }

    handleCloseModal();
  }

  // --- TABLE COLUMNS ---
  
  const columns = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone Number", accessorKey: "phone_number" },
      { header: "Created At", accessorKey: "created_at" },
      { 
        header: "Actions", 
        id: "actions",
        cell: ({ row }) => (
          <>
            <button
              onClick={() => handleEditClick(row.original)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(row.original)}
              className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
            >
              Delete
            </button>
          </>
        ),
      },
    ],
    [] // handleEditClick is stable, so we don't strictly need it in deps, but include if it were to change
  );

  // --- TANSTACK TABLE SETUP ---

  const table = useReactTable({
    data: adminDatas,
    columns,
    
    state: {
      sorting,
      globalFilter,
      pagination
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination, 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  // --- LOADING/ERROR STATES ---

  if (getAdminsLoading) {
    return <div className="p-8 text-center text-xl">Loading admin data...</div>;
  }
  
  if (getAdminsError) {
    return <div className="p-8 text-center text-red-500">Error: {error.message}</div>; 
  }

  const currentPageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // --- RENDER ---

  return(
    <div> 	
      <FormModal 
        isShow={ modalShow }
        formHandler={ handleForm }
        onClose={ handleCloseModal } 
        title={ editingAdmin ? "Edit Admin" : "Add Admin" }
      >
        <FormInput 
          title="Username"
          name="username"
          type="text"
          placeholder="Enter username"
          defaultValue={editingAdmin?.username || ""} />

        <FormInput 
          title="Password"
          name="password"
          type="password"
          placeholder={ editingAdmin? "Ignore password if no change will apply" : "Enter password"}
          defaultValue="" 
          isRequired={ false }
          />

        <FormInput 
          title="Name"
          name="name"
          type="text"
          placeholder="Enter name"
          defaultValue={editingAdmin?.name || ""} />

        <FormInput 
          title="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          defaultValue={editingAdmin?.email || ""} />

        <FormInput 
          title="Phone"
          name="phone_number"
          type="number"
          placeholder="Enter international phone number"
          defaultValue={editingAdmin?.phone_number || ""} />

      </FormModal>

      <div className="flex justify-between items-center mb-2">
        <ConTitle title="Admins 👥" />
        <button
          onClick={handleAddClick} // 💡 Use the new handler
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          + Add Admin
        </button>
      </div>
      <Search 
        onChangeHandler = {(e) => setGlobalFilter(e.target.value)} 
        filterValue = { globalFilter }
      />
      <TidyTable table ={ table } />

      {/* PAGINATION CONTROLS */}
      <div className="flex items-center justify-between mt-4">
        {/* Page Information */}
        <span className="flex items-center gap-1">
          Page{' '}
          <strong>
            { currentPageIndex + 1 } of{' '}
            { pageCount }
          </strong>
        </span>

        {/* Buttons */}
        <div className="space-x-2">
          <RangedPagination 
            table={ table }
          />
        </div>
      </div>
      {/* END PAGINATION CONTROLS */}
    </div>
  );
}