import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';




const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setloading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      } finally {
        setloading(false);
      }
    }else{
      alert('Please enter the Prompt to Generate Image');
    }

  }

  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  const handelSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setform({ ...form, prompt: randomPrompt })
  }
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setgeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dallc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })
        const data = await response.json();
        setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error);
      } finally {
        setgeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }

  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-32px'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[17px] max-w[500px]'>Create imaginative and visually stunning images through DALL-C AI and share them with Community</p>
      </div>
      <form className='mt-16 max-w-3x1' onSubmit={handelSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="eg. Jatin"
            value={form.name}
            handelChange={handelChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a pencil and watercolor drawing of a bright city in the future with flying cars"
            value={form.prompt}
            handelChange={handelChange}
            isSurpriseMe
            handelSurpriseMe={handelSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={generateImage} className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>You can share your Generated image with the Community</p>
          <button type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
