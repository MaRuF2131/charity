import { lazy, Suspense, useEffect } from "react";

const Hero = lazy(() => import("../components/herosection/Herosection"));
const Dataview=lazy(() => import("../components/dataview/dataview"));
const Testimonials=lazy(() => import("../components/testimonial/Testimonial"));
const UpcomingVolunteerNeeds=lazy(()=>import("../components/upcoming volunteer post/Upcomingvolunteer"))
import { Preloader } from "../mytools/loader/loader";

export const Home = () => {
      useEffect(() => {
        document.title ="Home - Charity"; // your dynamic title
      }, []);
  return (
    <>
      <Suspense fallback={<Preloader></Preloader>}>
        <Hero />
        <Dataview></Dataview>
        <UpcomingVolunteerNeeds></UpcomingVolunteerNeeds>
        <Testimonials></Testimonials>
      </Suspense>
    </>
  );
};
