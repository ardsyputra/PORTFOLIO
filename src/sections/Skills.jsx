import texture from "../assets/images/texture.avif";

import figma from "../assets/tools/figma.png";
import vscode from "../assets/tools/vscode.png";
import github from "../assets/tools/github.png";
import react from "../assets/tools/react.png";
import laravel from "../assets/tools/laravel.png";
import jupyter from "../assets/tools/jupyter.png";
import laragon from "../assets/tools/laragon.png";
import { Code2, Palette, Headphones, Boxes } from "lucide-react";


export default function Skills() {


  const skills = [

    {
      number: "01",
      title: "Design",
      description: "Creative Interface",
      icon: Palette,
      items: [
        "UI/UX Design",
        "User Research",
        "Wireframe",
        "Prototype",
        "Design System",
        "User Flow",
        "Responsive Design",
      ],
    },


    {
      number: "02",
      title: "Full Stack Development",
      description: "Building Digital Product",
      icon: Code2,
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Laravel",
        "Gin",
        "PostgreSQL",
        "MySQL",
        "PHP",
        "Python",
        "REST API",
        "Bootstrap",
        "Git",
      ],
    },


    {
      number: "03",
      title: "IT Support",
      description: "Technical Support & Troubleshooting",
      icon: Headphones,
      items: [
        "Hardware & Software",
        "Operating System",
        "Network Troubleshooting",
        "Technical Documentation",
        "User Assistance",
        "System Maintenance",
      ],
    },

  ];




  const tools = [

    {
      name:"Figma",
      image:figma,
    },

    {
      name:"VS Code",
      image:vscode,
    },

    {
      name:"GitHub",
      image:github,
    },

    {
      name:"React",
      image:react,
    },

    {
      name:"Laravel",
      image:laravel,
    },

    {
      name:"Jupyter",
      image:jupyter,
    },

    {
      name:"Laragon",
      image:laragon,
    },

  ];





  return (

    <section
      id="skill"
      className="
      relative
      min-h-screen
      bg-[#1E3A8A]
      py-28
      overflow-hidden
      scroll-mt-24
      "
    >


      {/* Texture */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.15]
        "
        style={{
          backgroundImage:`url(${texture})`,
          backgroundSize:"300px",
          backgroundRepeat:"repeat",
        }}
      />





      {/* Decoration */}

      <div
        className="
        absolute
        -top-20
        -right-20
        w-72
        h-72
        rounded-full
        bg-[#F7F4ED]/10
        "
      />



      <div
        className="
        absolute
        bottom-20
        left-20
        w-20
        h-20
        border-4
        border-[#F7F4ED]/20
        rounded-full
        "
      />







      <div
        className="
        relative
        z-10
        max-w-6xl
        mx-auto
        px-6
        "
      >





        {/* HEADER */}


        <div
          className="
          text-center
          mb-20
          "
        >


          <span
            className="
            inline-block
            bg-[#F7F4ED]
            text-[#1E3A8A]
            px-6
            py-2
            rounded-full
            font-soulrise
            text-sm
            shadow-lg
            "
          >
            MY STACK
          </span>



          <h2
          style={{
              fontFamily: "soulrise"
            }}
            className="
            text-5xl
            md:text-6xl
            font-bold
            text-[#F7F4ED]
            mt-6
            "
          >
            Skills & Tools
          </h2>



          <p
            style={{
              fontFamily: "soulrise"
            }}
            className="
            text-[#F7F4ED]/70
            mt-5
            text-lg
            "
          >
            Full Stack Development, IT Support, and UI/UX Design
          </p>


        </div>









        {/* SKILL CARD */}


        <div
          className="
          grid
          md:grid-cols-3
          gap-10
          "
        >



        {
          skills.map((skill)=>(


            <div
              key={skill.title}
              className="
              relative
              bg-[#F7F4ED]
              group
              rounded-[45px]
              p-8
              shadow-2xl
              overflow-hidden
              hover:-translate-y-4
              transition
              duration-500
              "
            >



              {/* BIG NUMBER */}

              <h1
                className="
                absolute
                -top-8
                -right-5
                text-[130px]
                font-black
                text-[#1E3A8A]/10
                "
              >
                {skill.number}
              </h1>





              <div
                className="
                relative
                z-10
                "
              >
                <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20 transition duration-500 group-hover:rotate-6">
                  {(() => {
                    const Icon = skill.icon || Boxes;
                    return <Icon size={26} strokeWidth={2.5} />;
                  })()}
                </div>

                <h3
                  className="
                  text-4xl
                  font-bold
                  text-[#1E3A8A]
                  "
                >
                  {skill.title}
                </h3>




                <p
                  className="
                  text-[#1E3A8A]/60
                  mt-2
                  mb-8
                  "
                >
                  {skill.description}
                </p>





                <div
                  className="
                  space-y-3
                  "
                >


                {
                  skill.items.map(item=>(

                    <div
                      key={item}
                      className="
                      bg-[#1E3A8A]
                      text-[#F7F4ED]
                      px-5
                      py-3
                      rounded-full
                      shadow-md
                      font-semibold
                      "
                    >

                      {item}

                    </div>


                  ))
                }


                </div>



              </div>



            </div>


          ))
        }


        </div>









        {/* TOOLS */}



        <div
          className="
          mt-20
          bg-[#F7F4ED]
          rounded-[50px]
          p-10
          shadow-2xl
          "
        >



          <h3
            className="
            text-4xl
            font-soulrise
            text-[#1E3A8A]
            text-center
            mb-12
            "
          >
            Tools 
          </h3>





          <div
            className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-10
            "
          >



          {
            tools.map(tool=>(


              <div
                key={tool.name}
                className="
                flex
                flex-col
                items-center
                group
                "
              >



                <div
                  className="
                  w-28
                  h-28
                  bg-white
                  rounded-[30px]
                  shadow-xl
                  flex
                  items-center
                  justify-center
                  p-6
                  group-hover:-translate-y-3
                  transition
                  duration-300
                  "
                >

                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="
                    w-full
                    h-full
                    object-contain
                    "
                  />

                </div>



                <p
                  className="
                  mt-4
                  text-[#1E3A8A]
                  font-bold
                  "
                >
                  {tool.name}
                </p>



              </div>


            ))
          }



          </div>




        </div>






      </div>


    </section>

  );
}