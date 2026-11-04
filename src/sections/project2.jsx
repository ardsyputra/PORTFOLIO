import texture from "../assets/images/texture.avif";
import kuliner from "../assets/images/kuliner.png";


export default function Project2() {


  const project = {

    category: "UI/UX Personal Project",

    description:
      "Merancang aplikasi kuliner digital yang membantu pengguna menemukan rekomendasi makanan dengan pengalaman yang lebih mudah, menarik, dan modern.",


    tags:[
      "UI/UX",
      "Mobile Design",
      "Figma",
      "Prototype"
    ],


    role:"UI/UX Designer",
    tools:"Figma",
    platform:"Mobile Application",
    duration:"1 Weeks"

  };





return (

<section

className="
relative
min-h-screen
bg-[#1E3A8A]
py-28
overflow-hidden
"


>


{/* ================= TEXTURE ================= */}


<div

className="
absolute
inset-0
opacity-[0.22]
pointer-events-none
"

style={{

backgroundImage:`url(${texture})`,
backgroundSize:"280px",
backgroundRepeat:"repeat"

}}

 />






{/* ================= DECORATION ================= */}



<div

className="
absolute
-top-40
-right-40
w-[600px]
h-[600px]
rounded-full
bg-[#F7F4ED]/10
blur-3xl
"

/>





<div

className="
absolute
bottom-20
left-20
w-52
h-52
opacity-30
"

style={{

backgroundImage:
"radial-gradient(#F7F4ED 2px, transparent 2px)",

backgroundSize:"18px 18px"

}}

/>







{/* BIG NUMBER */}



<div

className="
absolute
right-10
top-0
text-[260px]
font-black
text-[#F7F4ED]/10
select-none
"

>

02

</div>







<div

className="
relative
z-10
max-w-7xl
mx-auto
px-6
"

>



<div

className="
grid
grid-cols-1
lg:grid-cols-[0.85fr_1.15fr]
gap-10
lg:gap-12
items-center
"

>







{/* ================= LEFT ================= */}



<div>




<div

className="
inline-flex
items-center
gap-2
bg-[#F97316]
text-white
px-6
py-3
rounded-full
shadow-xl
rotate-[-4deg]
"

>

✦ Personal Project

</div>







<p

className="
mt-10
uppercase
tracking-[0.4em]
text-sm
font-semibold
text-[#F7F4ED]/60
"

>

{project.category}

</p>







<h1

className="
mt-5
text-6xl
md:text-7xl
font-black
leading-none
text-[#F7F4ED]
drop-shadow-xl
"

>

Food

<br/>

Discovery

<br/>

App


</h1>







<div

className="
flex
flex-wrap
gap-3
mt-10
"

>


{

project.tags.map(tag=>(

<span

key={tag}

className="
bg-[#F7F4ED]
text-[#1E3A8A]
px-5
py-2
rounded-full
font-bold
shadow-xl
"

>

{tag}

</span>


))

}


</div>







<p

className="
mt-10
text-lg
leading-8
text-[#F7F4ED]/80
max-w-xl
"

>

{project.description}

</p>







{/* INFO CARD */}


<div

className="
mt-10
bg-[#F7F4ED]
rounded-[40px]
p-8
shadow-2xl
"

>


<div

className="
grid
grid-cols-1
sm:grid-cols-2
gap-8
"

>


<div>

<p className="
text-[#1E3A8A]/50
text-sm
">

Role

</p>


<h4 className="
mt-2
font-bold
text-[#1E3A8A]
">

{project.role}

</h4>


</div>





<div>

<p className="
text-[#1E3A8A]/50
text-sm
">

Tools

</p>


<h4 className="
mt-2
font-bold
text-[#1E3A8A]
">

{project.tools}

</h4>


</div>





<div>

<p className="
text-[#1E3A8A]/50
text-sm
">

Platform

</p>


<h4 className="
mt-2
font-bold
text-[#1E3A8A]
">

{project.platform}

</h4>


</div>





<div>

<p className="
text-[#1E3A8A]/50
text-sm
">

Duration

</p>


<h4 className="
mt-2
font-bold
text-[#1E3A8A]
">

{project.duration}

</h4>


</div>



</div>


</div>







<a

href="https://www.figma.com/proto/0YpUAkCsi3ZUM98AEo8EyE/Ardiansyah-Putra--223303030227-?node-id=903-217&p=f&viewport=-561%2C423%2C0.46&t=RCE15uJxA3hXxwhx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=903%3A217&page-id=314%3A107"

target="_blank"

rel="noopener noreferrer"

className="
inline-flex
mt-10
bg-[#F97316]
text-white
px-10
py-4
rounded-full
font-bold
shadow-xl
hover:scale-105
transition
"

>

View Case Study →

</a>






</div>









{/* ================= RIGHT IMAGE ================= */}



<div

className="
relative
 w-[calc(100%+3rem)]
 -mx-6
 lg:mx-0
 lg:w-auto
flex
justify-center
items-center
"

>







{/* Glow */}


<div

className="
absolute
w-[750px]
h-[750px]
rounded-full
bg-[#F7F4ED]/10
blur-3xl
"

>

</div>







{/* Circle */}


<div

className="
absolute
w-[650px]
h-[650px]
rounded-full
border-[3px]
border-[#F7F4ED]/20
"

>

</div>







{/* Dot Pattern */}


<div

className="
absolute
right-0
top-20
w-44
h-44
opacity-30
"

style={{

backgroundImage:
"radial-gradient(#F7F4ED 2px, transparent 2px)",

backgroundSize:"18px 18px"

}}

>

</div>







{/* Sticker */}



<div

className="
absolute
top-10
left-0
bg-[#F97316]
text-white
px-7
py-3
rounded-full
shadow-2xl
rotate-[-12deg]
font-bold
hidden
sm:block
z-30
animate-bounce
"

>

🍜 Food App ✦

</div>







{/* MAIN IMAGE */}


<div

className="
relative
z-20
animate-[float_5s_ease-in-out_infinite]
hover:scale-105
transition
duration-500
"

>


<img

src={kuliner}

alt="Food App UI"

className="
w-[calc(100vw-1rem)]
max-w-none
lg:w-full
lg:max-w-[1100px]
rounded-[35px]
object-contain
drop-shadow-[0_40px_80px_rgba(0,0,0,.45)]
"

/>


</div>







{/* CARD LEFT */}



<div

className="
absolute
bottom-20
left-[-50px]
bg-[#F7F4ED]
rounded-[30px]
px-7
py-5
shadow-2xl
rotate-[-8deg]
hidden
sm:block
z-30
animate-[float_4s_ease-in-out_infinite]
"

>


<p className="
text-xs
text-gray-500
">

Design

</p>


<h3 className="
font-black
text-[#1E3A8A]
text-xl
">

Food Experience

</h3>


</div>








{/* CARD RIGHT */}



<div

className="
absolute
top-40
right-[-30px]
bg-[#F97316]
text-white
rounded-[30px]
px-6
py-5
shadow-2xl
rotate-6
hidden
sm:block
z-30
animate-[float_6s_ease-in-out_infinite]
"

>


<h3 className="
font-black
text-3xl
">

UI

</h3>


<p>

Mobile App

</p>


</div>







</div>






</div>






</div>



</section>


);


}