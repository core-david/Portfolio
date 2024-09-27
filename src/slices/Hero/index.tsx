"use client";

import { useEffect, useRef } from "react";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from '@/components/Bounded';
import Shapes from './Shapes';
import Button from "@/components/Button";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {

      const tl = gsap.timeline()

      tl.fromTo(".name-animation", 
                {x: -100, opacity: 0, rotate: -10
                },
                {
                  x:10, 
                  opacity:1,
                  rotate: 0,
                  ease: "elastic.out(1,0.3)",
                  duration: 1,
                  transformOrigin: "left top",
                  delay: 0.5,
                });
      
      tl.fromTo(".job-title", {
        y: 20,
        opacity: 0,
        scale: 1.2
      }, {
        opacity:1,
        y: 0,
        duration: 1,
        scale: 1,
        ease: "elastic.out(1,0.3)",
      });
      

    }, component)
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
        >
          {letter}
        </span>
    ))
  }


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref = {component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-2 text-[clamp(3rem,18vmin,15rem)] font-extrabold
                         leading-none tracking-tighter text-center">
            <span className="block text-white">
              {renderLetters(slice.primary.firstname, "first")}
            </span>
          </h1> 
          <h1 className="mb-6 text-[clamp(3rem,15vmin,8rem)] font-extrabold
                         leading-none tracking-tighter text-center">
            <span className="-mt-[.1em] text-slate-200 block ">
            {renderLetters(slice.primary.lastname, "first")}
            </span>
          </h1>

          <div className="flex items-center justify-center">
            <span className="job-title inline-block bg-gradient-to-tr from-[#FEC524] via-yellow-200
                            to-[#FEC524] bg-clip-text text-2xl font-bold uppercase
                            tracking-[.1em] text-transparent opacity-0 md:text-4xl md:opacity-100">
              {slice.primary.tagline}
            </span>
          <span className="ml-4"> {/* Add margin-left to create space between the elements */}
              <Button className="job-title" linkField={slice.primary.button_link} label={slice.primary.button_text} />
            </span>
          </div>

          
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;


// text-slate-500