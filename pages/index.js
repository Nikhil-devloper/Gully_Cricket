
import Image from 'next/image';
import wrapper from '../hoc/Wrapper';
import SmallBox from '../Components/SmallBox.jsx';
import { StarIcon, ShareIcon, CollectionIcon } from '@heroicons/react/solid'
import Button from '../Components/Button.jsx';
import { useRouter } from 'next/router'


function Home() {

  const router = useRouter()

  const handleShare = () => {

    if (navigator.share) {
      navigator.share({
        title: 'Gully Cricket App',
        text: 'Check out gully-cricket-seven.vercel.app',
        url: 'https://gully-cricket-seven.vercel.app/',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  return (
    <div className="flex flex-col justify-evenly items-center bg-primary-myblack min-h-screen">
      <div className='text-white text-center uppercase font-bold text-4xl '>
        <div className="">
          Gully Cricket
        </div>
        <div>
          Sports
        </div>
      </div>

      <div className='flex justify-center items-center px-16'>
        <Image src={'/image/Frame.png'} height={300} width={200} className='bg-primary-myblack' />
      </div>

      <div className='text-white text-2xl mt-5'>
        Cricket Score Tracker
      </div>

      <div className='text-2xl' >
        <Button
          label={'Start'}
          type={'rounedStart'}
          onClick={() => { router.push("/match") }}
        />
      </div>

      <div className='flex flex-row w-full justify-evenly items-center '>
        {/* <SmallBox Icon={StarIcon} text={'Setting'} onClick={() => { router.push("/") }} /> */}
        <SmallBox Icon={ShareIcon} text={'Share'} onClick={() => { handleShare() }} />
        <SmallBox Icon={CollectionIcon} text={'About'} onClick={() => { router.push("/about") }} />
      </div>

     

    </div>
  );
}

//flex flex-col items-center justify-center h-full bg-primary-myblack

export default wrapper(Home, true);