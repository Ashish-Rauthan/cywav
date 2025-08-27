import React from 'react'
import HotelSearchBar from '../Components/Hotels/HotelSearchBar'
import PromoBanner from '../Components/Hotels/PromoBanner'
import PopularProperties from '../Components/Hotels/IndianProperties'
import WorldPopularProperties from '../Components/Hotels/WorldProperties'
import CitySlider from '../Components/Hotels/CitySlider'
import FAQ from '../Components/Hotels/Faq'
import ChronoScrollHotelShowcase from '../Components/Hotels/HotelShowcase'


export default function Hotels() {
  return (
    <div>
      <HotelSearchBar/>
      <PromoBanner/>
     <ChronoScrollHotelShowcase/>
      <PopularProperties/>
      <WorldPopularProperties/>
      <CitySlider/>
      <FAQ/>
    </div>
  )
}
