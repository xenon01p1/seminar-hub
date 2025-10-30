import { User, Mail, LockKeyhole } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useState, useEffect, useContext } from 'react';
import { useEditUser } from '../../hooks/useUsers.js';
import { AuthContext } from '../../context/authContext.jsx';

const MySwal = withReactContent(Swal);

const InputProfileForm = ({ name, value, onChangeHandler, placeholder, type = 'text', isRequired = false }) => {
  return (
    <div>
      <label
        htmlFor={ name }
        className="block text-sm font-medium text-gray-700 mb-2"
      >
      { name }
      { isRequired && <span className="text-red-500 ml-1">*</span> } 
      </label>
      <input
            name={ name }
            id={ name }
            type={ type }
            value={ value }
            onChange={ onChangeHandler }
            placeholder={ placeholder }
            className='
            appearance-none block w-full px-4 py-2 
                  border-none 
                  ring-1 ring-gray-200 
                  rounded-lg 
                  placeholder-gray-400 focus:outline-none 
                  focus:ring-2 focus:ring-blue-600 focus:border-blue-600 
                  sm:text-sm'
            required={ isRequired }
          />
    </div>
  )
}

export default function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      setForm(prev => ({
        ...prev,
        username: prev.username || currentUser.username,
        email: prev.email || currentUser.email,
      }));
    }
  }, [currentUser]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const { mutate: editUserMutate } = useEditUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    editUserMutate(
      { id: currentUser.id, data: form },
      {
        onSuccess: async () => {
          console.log('data :', form);
          await MySwal.fire({
            title: "Success!",
            text: "Successfully edited profile.",
            icon: "success",
          });

          // Update global context directly
          await setCurrentUser(prev => ({
            ...prev,
            username: form.username,
            email: form.email,
          }));

          setForm(prev => ({ ...prev, password: "" }));
        },
        onError: (error) => {
          MySwal.fire({
            title: "Oops!",
            text: error.response?.data?.message || "Something went wrong.",
            icon: "error",
          });

          console.log(error);
        },
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl">
      <h3 className="text-xl font-bold mb-6 text-sky-700 border-b pb-2 border-sky-100 flex items-center">
        Update Credentials
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputProfileForm
          name="username"
          value={form.username}
          onChangeHandler={handleChange}
          placeholder="Username"
          isRequired={ true }
        />
        <InputProfileForm
          name="email"
          type="email"
          value={form.email}
          onChangeHandler={handleChange}
          placeholder="Email"
          isRequired={ true }
        />
        <InputProfileForm
          name="password"
          type="password"
          value={form.password}
          onChangeHandler={handleChange}
          placeholder="Leave blank to keep current password"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}