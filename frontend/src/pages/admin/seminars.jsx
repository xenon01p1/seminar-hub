import { useState, useMemo, useCallback } from "react";
import Search from "../../components/search.jsx";
import TidyTable from "../../components/table.jsx";
import ConTitle from "../../components/conTitle.jsx";
import FormModal from "../../components/formModal.jsx";
import RangedPagination from "../../components/rangedPagination.jsx";
import { useGetSeminars, useAddSeminar, useEditSeminar, useDeleteSeminar } from "../../hooks/useSeminars.js";
import FormInput from "../../components/formInput.jsx";
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

const MySwal = withReactContent(Swal);

export default function Seminars () {
  // Sorting & Filtering state
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { isLoading, error, data } = useGetSeminars();
  const [editingSeminar, setEditingSeminar] = useState(null); 
  
  // 💡 PAGINATION STATE (Set pageSize to 2 for easy testing)
  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: 2, 
  });
  
  const SeminarDatas = useMemo(
    () => data || [],
    [data]
  );

  // --- MODAL HANDLERS ---
  const { 
    mutate: addSeminarMutate, 
    isLoading: addSeminarLoading,
    isError: isAddSeminarError,  
    isSuccess: addSeminarSuccess,
    error: addSeminarErrorObject 
  } = useAddSeminar();
  
  const {
    mutate: editSeminarMutate,
    isLoading: editSeminarLoading,
    isError: isEditSeminarError,
    isSuccess: editSeminarSuccess,
    error: editSeminarErrorObject
  } = useEditSeminar();

  const {
    mutate: deleteSeminarMutate,
    isLoading: deleteSeminarLoading,
    isError: isDeleteSeminarError,
    isSuccess: deleteSeminarSuccess,
    error: deleteSeminarErrorObject
  } = useDeleteSeminar();
  
  // Handler to close the modal and reset the editing state
  const handleCloseModal = useCallback(() => {
    setModalShow(false);
    setEditingSeminar(null);
  }, []);
  
  // Handler for the 'Edit' button in the table
  const handleEditClick = (SeminarData) => {
    setEditingSeminar(SeminarData);
    setModalShow(true);
  };
    
  // Handler for the 'Add Seminar' button
  const handleAddClick = () => {
    setEditingSeminar(null); 
    setModalShow(true);
  };

  const handleDeleteClick = (userData) => {
    setEditingSeminar(userData);

      MySwal.fire({
          title: "Are you sure?",
          text: `You are about to delete this Seminar. This action cannot be undone.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33", // Red button
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {
              
              deleteSeminarMutate({ id: userData.id }, {
                  onSuccess: () => {
                      MySwal.fire({
                          title: "Deleted!",
                          text: "Successfully deleted seminar.",
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
    const formData = new FormData(e.target); 
      
    if (editingSeminar) {
      // edit form logic
      console.log(formData)
      editSeminarMutate({ id: editingSeminar.id, data: formData }, {
        onSuccess:() => {
          MySwal.fire({
            title: "Success!",
            text: "Successfully edited new Seminar.",
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
      addSeminarMutate(formData, {
        onSuccess:() => {
          MySwal.fire({
            title: "Success!",
            text: "Successfully added new Seminar.",
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

  // --- TABLE SET UP ---
  const columns = useMemo(
    () => [
      { header: "Title", accessorKey: "title" },
      { header: "Category", accessorKey: "category" },
      { header: "Link", accessorKey: "link" },
      { header: "Pass Code", accessorKey: "pass_code" },
      { header: "Start Date", accessorKey: "start_at" },
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
    data: SeminarDatas,
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

  // ---- VALIDATION ----
  if (isLoading) {
    return <div className="p-8 text-center text-xl">Loading seminar data...</div>;
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
        title={editingSeminar ? "Edit Item" : "Add New Item"}
      >
        <FormInput
          title="Title"
          name="title"
          type="text"
          placeholder="Enter the item title"
          defaultValue={editingSeminar?.title || ""}
        />

        <FormInput
          title="Description"
          name="description"
          type="textarea" 
          placeholder="Enter the detailed description"
          defaultValue={editingSeminar?.description || ""}
        />

        <FormInput
          title="Category"
          name="category"
          type="text"
          placeholder="Enter the item category"
          defaultValue={editingSeminar?.category || ""}
        />

        {editingSeminar?.img ? (
            <>
                <input 
                    type="hidden" 
                    name="existing_img"
                    // This is safe because we checked editingSeminar?.img is truthy above
                    defaultValue={editingSeminar.img} 
                />
                
                <p className="text-sm text-gray-500 mb-2">
                    Current Image: 
                    <span className="font-semibold">
                        {/* Safely display the file name */}
                        .../{editingSeminar.img.split('/').pop()}
                    </span>
                </p>
            </>
        ) : null}

        <FormInput
          title="Image (Upload .jpg, .png)"
          name="img"
          type="file" 
          accept=".jpg, .jpeg, .png"
        />

        <FormInput
          title="Link"
          name="link"
          type="url"
          placeholder="Enter a related link (e.g., website)"
          defaultValue={editingSeminar?.link || ""}
        />

        <FormInput
          title="Pass Code"
          name="pass_code"
          type="text" 
          placeholder="Enter a required pass code"
          defaultValue={editingSeminar?.pass_code || ""}
        />

        <FormInput
          title="Start Date/Time"
          name="start_at"
          type="datetime-local" 
          placeholder="Set the start date and time"
          defaultValue={editingSeminar?.start_at ? new Date(editingSeminar.start_at).toISOString().slice(0, 16) : ""}
        />
      </FormModal>

      <div className="flex justify-between items-center mb-4">
        <ConTitle title="Seminars 💻" />
        <button
          onClick={ handleAddClick }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          + Add Seminar
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