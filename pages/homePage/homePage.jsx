import style from "./homePage.module.scss";
import { useState } from 'react';
import NextImage from "next/image";
import { useRouter } from "next/router";


const  HomePage = () => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(URL.createObjectURL(e.target.files[0]));  

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            console.log(naturalWidth, naturalHeight);
            setImageDimensions({ width: naturalWidth, height: naturalHeight });
          };
        };    
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("file", selectedFile);


        //API to send image to Image classification Model 

        router.push({
            pathname: "/resultPage"
            // send name retrive from Model to next page for querying data
            // query: {
            //    BirdName: birdName
            // }
        });


      };
    const handleRemoveImage = () => {
        setSelectedFile(null);
    }
    

    return(
        <div className={style.page}>
            <div className={`${style.container} relative h-screen`}>
                <div className={`${style.white_box} bg-white rounded-[70px] p-8 w-2/3 h-2/3`}>
                    <h1 className={`${style.header} text-5xl font-bold mb-4 text-center text-white`}>
                        Upload your photo
                    </h1>
                    {selectedFile && imageDimensions ? 
                    (
                        <div className={`${style.uploaded_area}  w-2/3 h-2/3`}>
                            <NextImage className={style.top_right} src="/images/delete.png" alt="" width={37} height={37} onClick={handleRemoveImage}/>
                            <NextImage className={style.img} src={selectedFile} alt=""  width={imageDimensions.width} height={imageDimensions.height} />
                        </div>
                    )
                    : 
                    ( 
                    <div className={`${style.upload_area} border-dashed border-2 border-gray-300 p-4 rounded-[60px] w-2/3 h-2/3`}           
                        onClick={() => { document.getElementById("fileInput").click();}}>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileInput} />
                        <NextImage src="/images/upload.png" alt="" width={235} height={235} />
                        <p className={`${style.describe_text} text-s font-bold mb-4 text-center text-slate-200 cursor-pointer`}>
                            Click here to upload photo
                        </p>

                    </div>)}


                    <div className={`${style.submit_button} rounded-[70px] text-center text-white`} onClick={handleFormSubmit}>
                        Submit
                    </div>
                </div>
            <NextImage className={style.left_bottom} src="/images/left_bird.png" alt="" width={409} height={550}/>
            <NextImage className={style.right_bottom} src="/images/right_bird.png" alt="" width={422} height={500}/>
            </div>
        </div>
    );
}
export default HomePage;


                        