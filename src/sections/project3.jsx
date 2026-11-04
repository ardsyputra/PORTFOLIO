import texture from "../assets/images/texture.avif";
import overtime from "../assets/images/website.png";


export default function Project3(){


const project = {


category:"Full Stack Development",


description:
"Membangun sistem pengajuan lembur karyawan berbasis web untuk membantu proses pengajuan, monitoring, dan pengelolaan data lembur secara lebih efektif dan terstruktur.",



tags:[
"Laravel",
"PHP",
"MySQL",
"Bootstrap",
"GitHub"
],



role:"Full Stack Developer",
framework:"Laravel",
database:"MySQL",
platform:"Web Application",



};





return(


<section

className="
relative
min-h-screen
bg-[#F7F4ED]
py-28
overflow-hidden
"

>







{/* ================= TEXTURE ================= */}



<div

className="
absolute
inset-0
opacity-[0.18]
pointer-events-none
"

style={{

backgroundImage:`url(${texture})`,
backgroundSize:"280px",
backgroundRepeat:"repeat"

}}

>

</div>









{/* ================= BACKGROUND ELEMENT ================= */}



<div

className="
absolute
-top-40
-right-40
w-[650px]
h-[650px]
rounded-full
bg-[#1E3A8A]/10
blur-3xl
"

>

</div>







{/* DOT PATTERN */}



<div

className="
absolute
left-20
bottom-20
w-60
h-60
opacity-20
"

style={{

backgroundImage:
"radial-gradient(#1E3A8A 2px,transparent 2px)",

backgroundSize:"18px 18px"

}}

>

</div>









{/* BIG NUMBER */}



<div

className="
absolute
right-10
top-0
text-[260px]
font-black
text-[#1E3A8A]/5
select-none
"

>

03

</div>









{/* ORANGE SHAPE */}



<div

className="
absolute
left-10
top-40
w-24
h-24
rounded-full
bg-[#F97316]
opacity-80
animate-pulse
"

>

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









{/* ================= LEFT CONTENT ================= */}



<div>









{/* BADGE */}



<div

className="
inline-flex
bg-[#1E3A8A]
text-[#F7F4ED]
px-6
py-3
rounded-full
shadow-xl
rotate-[-4deg]
font-bold
"

>

✦ Case Study

</div>









<p

className="
mt-10
uppercase
tracking-[0.4em]
text-sm
font-semibold
text-[#1E3A8A]/60
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
text-[#1E3A8A]
drop-shadow-xl
"

>

Employee

<br/>

Overtime

<br/>

System

</h1>









{/* TAG */}



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
bg-[#1E3A8A]
text-[#F7F4ED]
px-5
py-2
rounded-full
font-bold
shadow-lg
hover:-translate-y-1
transition
"

>

{tag}

</span>


))


}



</div>









{/* DESCRIPTION */}



<p

className="
mt-10
text-lg
leading-8
text-gray-700
max-w-xl
"

>

{project.description}

</p>















{/* INFO GRID */}



<div

className="
mt-10
grid
grid-cols-1
sm:grid-cols-2
gap-6
"

>








<div

className="
bg-[#1E3A8A]
text-[#F7F4ED]
rounded-[30px]
p-6
shadow-xl
hover:-translate-y-2
transition
"

>


<p

className="
text-white/60
text-sm
"

>

Role

</p>


<h3

className="
mt-2
font-bold
"

>

{project.role}

</h3>


</div>









<div

className="
bg-[#1E3A8A]
text-[#F7F4ED]
rounded-[30px]
p-6
shadow-xl
hover:-translate-y-2
transition
"

>


<p

className="
text-white/60
text-sm
"

>

Framework

</p>


<h3

className="
mt-2
font-bold
"

>

{project.framework}

</h3>


</div>









<div

className="
bg-[#1E3A8A]
text-[#F7F4ED]
rounded-[30px]
p-6
shadow-xl
hover:-translate-y-2
transition
"

>


<p

className="
text-white/60
text-sm
"

>

Database

</p>


<h3

className="
mt-2
font-bold
"

>

{project.database}

</h3>

</div>

</div>


















{/* BUTTON */}



<a

href="https://github.com/dachi01-afk/Overtime-Request-System"

className="
inline-flex
relative
z-10
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

View Repository →

</a>




</div>









{/* ================= RIGHT SHOWCASE ================= */}



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









{/* BIG GLOW */}



<div

className="
absolute
pointer-events-none
w-[750px]
h-[750px]
rounded-full
bg-[#1E3A8A]/10
blur-3xl
"

>

</div>









{/* CIRCLE DECORATION */}



<div

className="
absolute
pointer-events-none
w-[620px]
h-[620px]
rounded-full
border-[3px]
border-[#1E3A8A]/10
"

>

</div>









{/* GRID PATTERN */}



<div

className="
absolute
pointer-events-none
right-[-40px]
top-20
w-72
h-72
opacity-20
"

style={{


backgroundImage:
"linear-gradient(#1E3A8A 1px,transparent 1px),linear-gradient(90deg,#1E3A8A 1px,transparent 1px)",


backgroundSize:"25px 25px"


}}

>

</div>









{/* ORANGE CIRCLE */}



<div

className="
absolute
pointer-events-none
left-20
bottom-10
w-28
h-28
rounded-full
bg-[#F97316]
opacity-90
animate-pulse
"

>

</div>









{/* WEBSITE IMAGE */}



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

src={overtime}

alt="Employee Overtime System"

className="
w-[calc(100vw-1rem)]
max-w-none
lg:w-full
lg:max-w-[1400px]
rounded-[30px]
object-contain
drop-shadow-[0_40px_80px_rgba(30,58,138,.35)]
"

/>

</div>









{/* LARAVEL BADGE */}



<div

className="
absolute
top-14
left-[-40px]
bg-[#F97316]
text-white
px-8
py-4
rounded-full
shadow-2xl
rotate-[-12deg]
font-black
hidden
sm:block
z-30
animate-[float_4s_ease-in-out_infinite]
"

>

Laravel ⚡

</div>









{/* DATABASE CARD */}



<div

className="
absolute
top-48
right-[-50px]
bg-[#1E3A8A]
text-white
rounded-[35px]
px-8
py-6
shadow-2xl
rotate-6
hidden
sm:block
z-30
"

>


<p

className="
text-xs
text-white/60
uppercase
tracking-widest
"

>

Database

</p>


<h3

className="
text-3xl
font-black
mt-2
"

>

MySQL

</h3>


</div>









{/* TECHNOLOGY CARD */}



<div

className="
absolute
bottom-28
left-[-50px]
bg-white
rounded-[35px]
p-7
shadow-2xl
rotate-[-8deg]
hidden
sm:block
z-30
"

>


<p

className="
text-xs
text-gray-400
uppercase
tracking-widest
"

>

Technology

</p>



<h3

className="
text-xl
font-black
text-[#1E3A8A]
mt-2
"

>

PHP + Laravel

</h3>



</div>









{/* GITHUB CARD */}



<div

className="
absolute
bottom-10
right-[-30px]
bg-[#F7F4ED]
rounded-[30px]
px-8
py-5
shadow-2xl
rotate-6
hidden
sm:block
z-30
"

>


<p

className="
text-sm
text-gray-500
"

>

Repository

</p>



<h3

className="
text-2xl
font-black
text-[#1E3A8A]
"

>

GitHub

</h3>


</div>









{/* CODE DECOR */}



<div

className="
absolute
top-[-40px]
right-20
bg-white
rounded-full
w-20
h-20
shadow-xl
flex
items-center
justify-center
text-3xl
hidden
sm:block
z-30
"

>

{"</>"}

</div>









{/* LINE DECOR */}



<div

className="
absolute
left-[-120px]
top-36
w-44
h-[4px]
bg-[#F97316]
rotate-[-20deg]
"

>

</div>









{/* SMALL LABEL */}



<div

className="
absolute
top-72
left-[-80px]
bg-[#1E3A8A]
text-white
px-6
py-3
rounded-full
shadow-xl
rotate-[-6deg]
font-bold
hidden
sm:block
z-30
"

>

Web Application

</div>









</div>









</div>









</div>







</section>


);

}