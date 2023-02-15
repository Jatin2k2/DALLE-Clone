import React from 'react'

const FormField = ({ LabelName,
  type,
  name,
  placeholder,
  value,
  handelChange,
  isSurpriseMe,
  handelSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button type='button' onClick={handelSurpriseMe} className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
            Surprise Me
          </button>
        )}
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handelChange} required className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outlined-none block w-full p-3' />
    </div>
  )
}

export default FormField
