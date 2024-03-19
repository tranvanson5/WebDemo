import React from 'react'
import './homePage.css'
import ImageSlide from '../../../component/image/imageslide/imageSlide';

function HomePage() {
    return (
        <div className='home-body-container'>
            <div className='imageslide-container'>
                <ImageSlide images={images} size={5}></ImageSlide>
            </div>
        </div>
    )
}

export default HomePage;
const images = [
    "https://media.istockphoto.com/id/588223710/vi/anh/%C4%91%C3%A8n-d%E1%BA%A7u-diwali.jpg?s=1024x1024&w=is&k=20&c=8a89O9V4ltsBshRSwOsbUvpZADH-Kdqtwy3HZqsy4rY=",
    "https://media.istockphoto.com/id/1773614135/vi/anh/%C4%91%C3%A8n-%C4%91%E1%BA%A5t-s%C3%A9t-diya-%C4%91%C6%B0%E1%BB%A3c-th%E1%BA%AFp-s%C3%A1ng-trong-l%E1%BB%85-k%E1%BB%B7-ni%E1%BB%87m-diwali-diwali-hay-deepavali-l%C3%A0-ng%C3%A0y-l%E1%BB%85-l%E1%BB%9Bn.jpg?s=1024x1024&w=is&k=20&c=MU92mh5exvXWL8iLxhpigACrIkAgtYa7-im7HPdnIrc=",
    "https://media.istockphoto.com/id/524263451/vi/anh/n%E1%BA%BFn-%C4%91%E1%BB%8F-m%C3%B9a-v%E1%BB%8Dng.jpg?s=1024x1024&w=is&k=20&c=wt74RYAGgAQsJhlHGzGtUVtbkPOKZ4gt404cDcM5on8=",
    "https://media.istockphoto.com/id/588223710/vi/anh/%C4%91%C3%A8n-d%E1%BA%A7u-diwali.jpg?s=1024x1024&w=is&k=20&c=8a89O9V4ltsBshRSwOsbUvpZADH-Kdqtwy3HZqsy4rY=",
    "https://media.istockphoto.com/id/1773614135/vi/anh/%C4%91%C3%A8n-%C4%91%E1%BA%A5t-s%C3%A9t-diya-%C4%91%C6%B0%E1%BB%A3c-th%E1%BA%AFp-s%C3%A1ng-trong-l%E1%BB%85-k%E1%BB%B7-ni%E1%BB%87m-diwali-diwali-hay-deepavali-l%C3%A0-ng%C3%A0y-l%E1%BB%85-l%E1%BB%9Bn.jpg?s=1024x1024&w=is&k=20&c=MU92mh5exvXWL8iLxhpigACrIkAgtYa7-im7HPdnIrc=",
    "https://media.istockphoto.com/id/524263451/vi/anh/n%E1%BA%BFn-%C4%91%E1%BB%8F-m%C3%B9a-v%E1%BB%8Dng.jpg?s=1024x1024&w=is&k=20&c=wt74RYAGgAQsJhlHGzGtUVtbkPOKZ4gt404cDcM5on8=",
    "https://media.istockphoto.com/id/588223710/vi/anh/%C4%91%C3%A8n-d%E1%BA%A7u-diwali.jpg?s=1024x1024&w=is&k=20&c=8a89O9V4ltsBshRSwOsbUvpZADH-Kdqtwy3HZqsy4rY=",
    "https://media.istockphoto.com/id/1773614135/vi/anh/%C4%91%C3%A8n-%C4%91%E1%BA%A5t-s%C3%A9t-diya-%C4%91%C6%B0%E1%BB%A3c-th%E1%BA%AFp-s%C3%A1ng-trong-l%E1%BB%85-k%E1%BB%B7-ni%E1%BB%87m-diwali-diwali-hay-deepavali-l%C3%A0-ng%C3%A0y-l%E1%BB%85-l%E1%BB%9Bn.jpg?s=1024x1024&w=is&k=20&c=MU92mh5exvXWL8iLxhpigACrIkAgtYa7-im7HPdnIrc=",
    "https://media.istockphoto.com/id/524263451/vi/anh/n%E1%BA%BFn-%C4%91%E1%BB%8F-m%C3%B9a-v%E1%BB%8Dng.jpg?s=1024x1024&w=is&k=20&c=wt74RYAGgAQsJhlHGzGtUVtbkPOKZ4gt404cDcM5on8="
];
