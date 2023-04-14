import style from "./resultPage.module.scss";
import { useState,useEffect } from 'react';
import NextImage from "next/image";
import axios from 'axios';
import { useRouter } from "next/router";


const  ResultPage = (  ) =>  {

    const [imageData, setImageData] = useState('');
    const [birdName, setBirdName] = useState('');
    const [birdDescription, setBirdDescription] = useState('');
    const router = useRouter();

    

    async function getImageData() {
        let image_url = process.env.NEXT_PUBLIC_BIRD_BACKEND+`/download/baltic.png`;

        const response = await axios.get(image_url, { responseType: 'arraybuffer' });
        const imageData = Buffer.from(response.data, 'binary').toString('base64');
        return imageData;
    }
    async function getBirdDetail() {
        let url = process.env.NEXT_PUBLIC_BIRD_BACKEND+`/get-bird-data?key=Baltic`;
        axios.get((url))
        .then(function (response) {
            setBirdName(response.data.bird.name);
            setBirdDescription(response.data.bird.description)

        })
        .catch(function (error) {
            alert("Error",error.message)
        }
        );
        return;
    }


    useEffect(() => {
        async function fetchData() {
          const imageData = await getImageData();
          setImageData(imageData);
            await getBirdDetail();
        }
        fetchData();
      }, []);

    const handleBack = () => {
        router.push({
            pathname: "/homePage"
        });
    }

    return(
        <div className={style.page}>
            <div className={`${style.container} relative h-screen`}>
                <div className={`${style.white_box} bg-white rounded-[70px] p-8 w-2/3 h-2/3`}>
                    <NextImage className={style.top_left} src="/images/back.png" alt="" width={81} height={81} onClick={handleBack} />
                    <NextImage  src={`data:image/png;base64,${imageData}`} alt="" width={250} height={250}/>
                    <h1 className={`${style.header} text-5xl font-bold mb-4 text-center`}>
                        {birdName}
                    </h1>
                    <p className={`${style.txt} text-xl text-center mb-4 text-black`}>{birdDescription}</p>
                    
                </div>
                <NextImage className={style.left_bottom} src="/images/left_bird.png" alt="" width={409} height={550}/>
                <NextImage className={style.right_bottom} src="/images/right_bird.png" alt="" width={422} height={500}/>
            </div>
        </div>
    );
}


  
export default ResultPage;


                        