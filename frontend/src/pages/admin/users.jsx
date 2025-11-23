import { useState, useMemo, useCallback } from "react";
import Search from "../../components/search.jsx";
import TidyTable from "../../components/table.jsx";
import ConTitle from "../../components/conTitle.jsx";
import RangedPagination from "../../components/rangedPagination.jsx";
import FormModal from "../../components/formModal.jsx";
import FormInput from "../../components/formInput.jsx";
import { useGetUsers,useAddUser, useEditUser } from "../../hooks/useUsers.js";
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

const getFormData = (e) => {
    const formData = new FormData(e.target);
    return Object.fromEntries(formData.entries());
}
const MySwal = withReactContent(Swal);

export default function Users () {
  // Sorting & Filtering state
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const { isLoading, error, data } = useGetUsers();

  console.log(data);
  
  // 💡 PAGINATION STATE (Set pageSize to 2 for easy testing)
  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: 2, 
  });
  
  const userDatas = useMemo(
    () => data || [],
    [data]
  );

  // --- MODAL HANDLERS ---
  const { 
    mutate: addUserMutate, 
    isLoading: addUserLoading,
    isError: isAddUserError,  
    isSuccess: addUserSuccess,
    error: addUserErrorObject 
  } = useAddUser();

  const {
    mutate: editUserMutate,
    isLoading: editUserLoading,
    isError: isEditUserError,
    isSuccess: editUserSuccess,
    error: editUserErrorObject
  } = useEditUser();

  // Handler to close the modal and reset the editing state
  const handleCloseModal = useCallback(() => {
    setModalShow(false);
    setEditingUser(null);
  }, []);

  // Handler for the 'Edit' button in the table
  const handleEditClick = (userData) => {
    setEditingUser(userData);
    setModalShow(true);
  };

  // Handler for the 'Add User' button
  const handleAddClick = () => {
    setEditingUser(null); // Ensure we're in 'Add' mode
    setModalShow(true);
  };

  const handleDeleteClick = (userData) => {
      setEditingUser(userData);

      MySwal.fire({
          title: "Are you sure?",
          text: `You are about to delete the user: ${userData.name || userData.id}. This action cannot be undone.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33", // Red button
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {
              
              editUserMutate({ id: userData.id, userData: { is_deleted: 1 } }, {
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
                      console.log(error);
                  }
              });
          }
      });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    
    if (editingUser) {
      // Edit form logic
      console.log(formData);
      editUserMutate({ id: editingUser.id, data: formData }, {
        onSuccess: () => {
          MySwal.fire({
            title: "Success!",
            text: "Successfully edited new User.",
            icon: "success"
          });
        },
        onError: (error) => {
          MySwal.fire({
            title: "Oops!",
            text: error.message, 
            icon: "error"
          });
        }
      });

    } else {
      // Add form logic
      addUserMutate(formData, {
        onSuccess: () => {
          MySwal.fire({
            title: "Success!",
            text: "Successfully added new User.",
            icon: "success"
          });
        },
        onError: (error) => {
          MySwal.fire({
            title: "Oops!",
            // NOTE: If you fixed the API handler to throw a standard Error, 
            // use `error.message`. Otherwise, keep `error.response.data.message`.
            text: error.message,
            icon: "error"
          });
        }
      });
    }

    handleCloseModal();
  };

  // TABLE SET UP

  const columns = useMemo(
    () => [
      { header: "Username", accessorKey: "username" },
      { header: "Email", accessorKey: "email" },
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
    []
  );

  const table = useReactTable({
    data: userDatas,
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

  //  VALIDATION SET UP

  if (isLoading) {
    return <div className="p-8 text-center text-xl">Loading users data...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error.message}</div>; 
  }

  const currentPageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return(
    <div>
      <FormModal 
        isShow={modalShow}
        formHandler={handleForm}
        onClose={handleCloseModal} 
        title={editingUser ? "Edit User" : "Add User"}
      >
        {/* The hidden input for User ID (as discussed in the previous response) */}
        {editingUser && (
          <input 
            type="hidden" 
            name="id" 
            value={editingUser.id} 
            readOnly // Good practice for hidden inputs derived from state
          />
        )}
        
        <FormInput 
          title="Username"
          name="username"
          type="text"
          placeholder="Enter username"
          defaultValue={editingUser?.username || ""} 
        />

        <FormInput 
          title="Password"
          name="password"
          type="password"
          placeholder={editingUser ? "Ignore password if no change will apply" : "Enter password"}
          defaultValue="" 
          isRequired={false}
        />

        <FormInput 
          title="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          defaultValue={editingUser?.email || ""} 
        />

      </FormModal>
      <div className="flex justify-between items-center mb-4">
        <ConTitle title="Users 👥" />
        <button
          onClick={() => handleAddClick(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          + Add User
        </button>
      </div>
      <Search 
        onChangeHandler = {(e) => setGlobalFilter(e.target.value)} 
        filterValue = { globalFilter }
      />
      <TidyTable table ={ table } />

      {/* NEW PAGINATION CONTROLS */}
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