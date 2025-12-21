import React from 'react';
import { Banner } from '../../../components/Banner/Banner';
import LatestBooks from '../../../components/LatestBooks/LatestBooks';
import CoverageSection from '../../../components/CoverageSection/CoverageSection';
import Coverage from '../../../components/Coverage/Coverage';
import WhyChoose from '../../../components/WhyChoose/WhyChoose';
import HowItWorks from '../../../components/HowItWorks/HowItWorks';
import Testimonials from '../../../components/Testimonial/Testimonials';
import Newsletter from '../../../components/Newsletter/Newsletter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <Coverage></Coverage>
            <WhyChoose></WhyChoose>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;