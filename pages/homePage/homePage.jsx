import style from "./homePage.module.scss";
import { useState } from 'react';
import NextImage from "next/image";
import { useRouter } from "next/router";
import axios from 'axios';

const  HomePage = () => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFile,setImageFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadedAreaStyle = loading ? { display: 'none' } : { 
        width: '2/3',
        height: '2/3',
    };
    const uploadAreaStyle = loading ? { 
        border: 'none',
        padding: 0,
        borderRadius: 0,
        width: 0,
        height: 0,
        overflow: 'hidden',
    } : {
        border: 'dashed 2px #CBD5E0',
        padding: '2rem 15rem',
        borderRadius: '60px',
        width: '2/3',
        height: '2/3',
    };

    const handleFileInput = (e) => {
        setSelectedFile(URL.createObjectURL(e.target.files[0]));  
        setImageFile(e.target.files[0])
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            setImageDimensions({ width: naturalWidth, height: naturalHeight });
          };
        }; 
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',imageFile);
        
        //API to send image to Image classification Model 
        let url = process.env.NEXT_PUBLIC_BIRD_MODEL+`/predict`;
        const config = {
            headers: {
              'content-type': `multipart/form-data; boundary=${imageFile._boundary}`,
            },
          };
          setLoading(true);
          axios.post(url, formData, config).then((response) => {
            let bird_name = response.data
            let path = "/bird/"+bird_name
            router.push({
                pathname: path,
            });

          }).catch((error) => {
            alert("Error",error.message);
            setLoading(false);

          });
      };


    const handleRemoveImage = () => {
        setSelectedFile(null);
    }
    

    return(
            <div className={style.page}>
            <div className={`${style.container} relative h-screen`}>
                <div className={`${style.white_box} bg-white rounded-[70px] p-8 w-2/3 h-2/3`}>
                    { !loading && <h1 className={`${style.header} text-5xl font-bold mb-4 text-center text-white`}>
                        Upload your photo
                    </h1>}
                    {selectedFile && imageDimensions && (
                        <div className={`${style.uploaded_area} w-2/3 h-2/3`} style={uploadedAreaStyle}>
                            <NextImage className={style.top_right} src="/images/delete.png" alt="" width={37} height={37} onClick={handleRemoveImage}/>
                            <NextImage className={style.img} src={selectedFile} alt=""  width={imageDimensions.width} height={imageDimensions.height} />
                        </div>
                    )}
                    {!selectedFile && (
                        <div className={`${style.upload_area} border-dashed border-2 border-gray-300 p-4 rounded-[60px]`} style={uploadAreaStyle} onClick={() => { document.getElementById("fileInput").click();}}>
                            <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileInput} />
                            <NextImage src="/images/upload.png" alt="" width={235} height={235} />
                            <p className={`${style.describe_text} text-s font-bold mb-4 text-center text-slate-200 cursor-pointer`}>
                                Click here to upload photo
                            </p>
                        </div>
                    )}
            
                    {!loading && <div className={`${style.submit_button} rounded-[70px] text-center text-white`} onClick={handleFormSubmit}>
                        Submit
                    </div>}

                    {loading && <div className={style.center}>
                        <div className={`${style.loading} text-5xl font-bold mb-4 text-center text-white`}>Loading. . .</div>
                        <div className={style.circle}></div>
                    </div>}
                </div>
                
            </div>
            <NextImage className={style.left_bottom} src="/images/left_bird.png" alt="" width={409} height={550}/>
            <NextImage className={style.right_bottom} src="/images/right_bird.png" alt="" width={422} height={500}/>
        </div>
    );
}
export default HomePage;


                        