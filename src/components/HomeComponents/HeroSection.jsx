import heroBg from '../../asset/Hero.jpg';
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Typewriter } from 'react-simple-typewriter';



const HeroSection = () => {
    return(
        <div
            style={
                {
                    backgroundImage: `linear-gradient(rgba(100,0,0,0.5), rgba(50,100,120,0.3)),url(${heroBg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    
                }
                
            }
              className="relative h-[450px] w-full flex  text-white"
        >

        <div className=' absolute flex w-[40%] flex-col ml-35 mt-20'>
       
            <h1 className="text-4xl md:text-5xl font-bold text-white">
                Build Your Dream PC with 
            </h1>
            <h1 className="text-4xl font-bold text-green-700">
                <Typewriter
                words={['Confidence', 'Power', 'Innovation', 'Precision']}
                loop={0}             // 0 or false = infinite loop
                cursor
                cursorStyle="|"
                typeSpeed={75}
                deleteSpeed={50}
                delaySpeed={1500}
                />
            </h1>
            <p className="text-lg md:text-xl max-w-xl mt-4">
                Customize your computer with the best components and expert recommendations. Get the perfect setup for gaming, work, or creativity.
            </p>
            <div className='mt-4 flex flex-row gap-4'>
                <Link to="#">
                    <Button
                        label="Start Building"
                        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    />
                </Link>
                <Link to="#" >
                    <Button
                        label="Shop Pre-Build PCs"
                        className=" text-white border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
                        />
                </Link>
            </div>

         </div>  
       
        </div>
    )
}
export default HeroSection;