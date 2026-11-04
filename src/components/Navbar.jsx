import "../assets/fonts/fonts.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const menus = [
    {
      name: "Home",
      link: "#home"
    },
    {
      name: "About",
      link: "#about"
    },
    {
      name: "Skill",
      link: "#skill"
    },
    {
      name: "Project",
      link: "#project"
    },
    {
      name: "Contact",
      link: "#contact"
    }
  ];
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "skill", "project", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (

    <nav
      className="
      fixed
      top-3
      sm:top-6
      left-1/2
      -translate-x-1/2
      max-w-[calc(100vw-24px)]

      z-50

      bg-white/20
      backdrop-blur-xl

      border
      border-white/30

      rounded-full

      px-4
      py-3
      sm:px-6
      sm:py-4
      flex
      items-center
      gap-2

      shadow-[0_15px_40px_rgba(0,0,0,.15)]
      "
    >


      <ul
        className="
        flex
        items-center
        gap-3
        sm:gap-6
        md:gap-10
        "
      >


        {
          menus.map((item)=>(

            <li
              key={item.name}
            >

              <a
                href={item.link}

                onClick={(e)=>{

                    e.preventDefault();

                    const target = document.querySelector(item.link);

                    if (item.name === "Contact") {
                      target?.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                      });
                    } else {
                      target?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }

                }}

                className={`
                relative
                text-[#1E3A8A]
                font-satoshi
                font-bold
                text-xs
                sm:text-sm
                md:text-base
                tracking-wide

                transition
                duration-300

                ${activeSection === item.link.slice(1) ? "text-[#F97316]" : "text-[#1E3A8A]"}

                after:absolute
                after:left-0
                after:-bottom-2
                after:h-[3px]
                after:w-full
                after:bg-[#F97316]
                after:origin-center
                after:transition-transform
                after:duration-300
                ${activeSection === item.link.slice(1) ? "after:scale-x-100" : "after:scale-x-0"}

                hover:text-[#F97316]
                `}
                >
                {item.name}
                </a>

            </li>

          ))
        }


      </ul>

    </nav>

  );
}