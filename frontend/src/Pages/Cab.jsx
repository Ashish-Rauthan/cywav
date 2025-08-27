import React from 'react'
import CabSearchBar from '../Components/Cab/CabSearchBar'
import PromoBanner from '../Components/Cab/PromoBannerr'
import PopularProperties from '../Components/Hotels/IndianProperties'
import WorldPopularProperties from '../Components/Hotels/WorldProperties'
import CabFaq from '../Components/Cab/Faq'
import CabServiceDetail from '../Components/Cab/RideKinetic'




export default function Cab() {
  return (
    <div>
      <CabSearchBar/>
      <PromoBanner/>
      <CabServiceDetail/>
      <PopularProperties/>
      <WorldPopularProperties/>
      <CabFaq/>
    </div>
  )
}
