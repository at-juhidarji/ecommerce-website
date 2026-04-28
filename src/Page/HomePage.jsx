import { ProductCollection } from '@/components/HomePage/Collection'
import HeroSection from '@/components/HomePage/HeroSection'
import PremiumReviewSlider from '@/components/HomePage/Review'
import { WhyChooseUs } from '@/components/HomePage/WhyToChoose'
import React from 'react'

export const HomePage = () => {
  return (
    <>
    <HeroSection />
    <WhyChooseUs />
    <PremiumReviewSlider />
    </>
  )
}
