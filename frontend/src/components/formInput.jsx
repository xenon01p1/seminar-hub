export default function FormInput({ title, name, type, placeholder, defaultValue = null, isRequired = true, onChangeHandler = () => {} }) {
    return (
        <div>
          <label
            htmlFor={ name }
            className="block text-sm font-medium text-gray-700"
          >
            { title }
            { isRequired && <span className="text-red-500 ml-1">*</span> } 
          </label>
          <div className="mt-1">
            <input
              id={ name }
              name={ name }
              type={ type }
              autoComplete="off"
              required={ isRequired } 
              defaultValue={ defaultValue }
              onChange={ onChangeHandler }
              className="
                appearance-none block w-full px-4 py-2 
                border-none 
                ring-1 ring-gray-200 
                rounded-lg 
                placeholder-gray-400 focus:outline-none 
                focus:ring-2 focus:ring-blue-600 focus:border-blue-600 
                sm:text-sm
              "
              placeholder={ placeholder }
            />
          </div>
        </div>
    );
}