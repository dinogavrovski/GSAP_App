import { useGSAP } from "@gsap/react";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"), []);

    gsap.from(heroSplit.chars, {
      yPercent: 75,
      opacity: 0,
      duration: 1.8,
      stagger: 0.05,
      ease: "expo.out",
    });

    gsap.from(paragraphSplit.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1.8,
      stagger: 0.06,
      ease: "expo.out",
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: "+=300%",
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      timeline.to(videoRef.current, {
        currentTime: videoRef.current.duration,
        ease: "none",
      });
    };
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">WINE</h1>
        <img
          src="/images/cork-left-scaled.png"
          alt="left-leaf"
          className="left-leaf w-[500px] h-[500px]"
        />
        <img
          src="/images/cork-right-scaled.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every wine on our menu is a blend of premium ingredients,
                creative flair and timeless recipes
              </p>
              <a href="#cocktails">View Wines</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video
          src="/videos/output.mp4"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
