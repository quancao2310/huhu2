import React, { useEffect, useState, Suspense } from 'react';
import { Box } from '@mui/material';
import { LandingHeader } from 'src/sections/landing/LandingHeader';
import { LandingFAQs } from 'src/sections/landing/LandingFAQs';
import {
  LandingFooter,
  LandingAboutUs,
  LandingContact,
  LandingFeatures,
  LandingFlow,
  LandingIntroduction
} from '@sections';

const LandingPage = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      const sections = document.querySelectorAll('.section');
      const currentSectionIndex = Array.from(sections).findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
      });

      if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', `/#${sections[currentSectionIndex + 1].id}`);
      } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', `/#${sections[currentSectionIndex - 1].id}`);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <Box className='landing'>
      <LandingHeader />
      <Box id='introduction' className='section' sx={{ height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {visibleSections.includes('introduction') && <LandingIntroduction />}
        </Suspense>
      </Box>
      <Box id='about-us' className='section' sx={{ height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {visibleSections.includes('about-us') && <LandingAboutUs />}
        </Suspense>
      </Box>
      <Box id='flow' className='section' sx={{ height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {visibleSections.includes('flow') && <LandingFlow />}
        </Suspense>
      </Box>
      <Box id='features' className='section' sx={{ height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {visibleSections.includes('features') && <LandingFeatures />}
        </Suspense>
      </Box>
      <Box id='faqs' className='section' sx={{ height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {visibleSections.includes('faqs') && <LandingFAQs />}
        </Suspense>
      </Box>
      <Box id='contact' className='section' sx={{ height: '100vh' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {visibleSections.includes('contact') && <LandingContact />}
        </Suspense>
        <LandingFooter />
      </Box>
    </Box>
  );
};

export default LandingPage;