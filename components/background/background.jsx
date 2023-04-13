import style from "./background.module.scss";
import Image from "next/image";
const  Background = () => {




    return(
        <div className={style.page}>
            <div class="relative h-screen">
                <div className="flex h-screen items-center justify-center">
                    <div className="bg-white rounded-[70px] p-8 w-2/3 h-2/3">
                    
                    </div>
                </div>

                <Image class="absolute bottom-0 left-0" src="/images/left_bird.png" alt="" width={409} height={550}/>
                <Image class="absolute bottom-0 right-0" src="/images/right_bird.png" alt="" width={422} height={500}/>
            </div>
        </div>

    );
}
export default Background;

