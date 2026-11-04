import texture from "../assets/images/texture.avif";
import blockchain from "../assets/images/blockchain-shipment-genz.svg";


export default function Project4(){


const styles = `

@keyframes float {

0%,100%{
transform:translateY(0px);
}

50%{
transform:translateY(-20px);
}

}


@keyframes spinSlow {

from{
transform:rotate(0deg);
}

to{
transform:rotate(360deg);
}

}


@keyframes pulseGlow {

0%,100%{
opacity:.3;
transform:scale(1);
}

50%{
opacity:.8;
transform:scale(1.2);
}

}


@keyframes moveLine {

0%{
transform:translateX(-30px) rotate(-20deg);
}

50%{
transform:translateX(30px) rotate(-20deg);
}

100%{
transform:translateX(-30px) rotate(-20deg);
}

}

`;





const project={


category:"Blockchain Research Project",


description:
"Membangun sistem validasi integritas data pengiriman barang menggunakan metode Proof of Reserve dengan kombinasi hashing SHA-256, Merkle Tree, dan database terdistribusi untuk memastikan keaslian data.",


tags:[
"Blockchain",
"SHA-256",
"Merkle Tree",
"CouchDB",
"Python"
],


role:"Blockchain Developer",
platform:"Research Prototype",
database:"CouchDB",
language:"Python",


};







return(


<section

className="
relative
min-h-screen
bg-[#1E3A8A]
py-28
overflow-hidden
"

>


<style>

{styles}

</style>





{/* TEXTURE */}


<div

className="
absolute
inset-0
opacity-[0.18]
"

style={{

backgroundImage:`url(${texture})`,
backgroundSize:"280px",
backgroundRepeat:"repeat"

}}

></div>








{/* BACKGROUND GLOW */}



<div

className="
absolute
-top-40
-right-40
w-[650px]
h-[650px]
rounded-full
bg-[#F7F4ED]/10
blur-3xl
"

></div>






<div

className="
absolute
left-20
bottom-20
w-56
h-56
opacity-30
"

style={{

backgroundImage:
"radial-gradient(#F7F4ED 2px,transparent 2px)",

backgroundSize:"18px 18px"

}}

></div>









{/* NUMBER */}



<div

className="
absolute
right-10
top-0
text-[260px]
font-black
text-[#F7F4ED]/10
"

>

04

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










{/* LEFT */}



<div>




<div

className="
inline-flex
bg-[#F97316]
text-white
px-6
py-3
rounded-full
font-bold
shadow-xl
rotate-[-4deg]
"

>

✦ Research Project

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

Blockchain

<br/>

Shipment

<br/>

Security

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








{/* INFO */}



<div

className="
mt-10
grid
grid-cols-2
gap-6
"

>


{


[

["Role",project.role],

["Database",project.database],

["Language",project.language],


].map(item=>(


<div

key={item[0]}

className="
bg-white/90
backdrop-blur-xl
rounded-[30px]
p-6
shadow-[0_30px_70px_rgba(0,0,0,.35)]
hover:-translate-y-3
transition
"

>


<p

className="
text-gray-500
text-sm
"

>

{item[0]}

</p>



<h3

className="
mt-2
font-black
text-[#1E3A8A]
"

>

{item[1]}

</h3>



</div>


))


}



</div>







<a

href="https://github.com/ardsyputra/Blockchain"

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
font-black
shadow-xl
hover:scale-105
transition
"

>

View Repository →

</a>





</div>









{/* RIGHT */}



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







<div

className="
absolute
pointer-events-none
w-[650px]
h-[650px]
rounded-full
border-[3px]
border-[#F7F4ED]/20
animate-[spinSlow_25s_linear_infinite]
"

></div>







<div

className="
absolute
pointer-events-none
w-[300px]
h-[300px]
rounded-full
bg-[#F97316]/30
blur-3xl
animate-[pulseGlow_4s_ease-in-out_infinite]
"

></div>







<div

className="
absolute
pointer-events-none
w-[500px]
h-[2px]
bg-[#F7F4ED]/20
animate-[moveLine_6s_ease-in-out_infinite]
"

></div>








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
animate-[float_3s_ease-in-out_infinite]
hidden
sm:block
z-30
"

>

⛓ Blockchain System

</div>








<img

src={blockchain}

alt="Blockchain"

className="
relative
z-20
w-[calc(100vw-1rem)]
max-w-none
lg:w-full
lg:max-w-[1200px]
object-contain
drop-shadow-[0_50px_100px_rgba(0,0,0,.55)]
animate-[float_5s_ease-in-out_infinite]
hover:scale-110
transition
duration-700
"

/>









<div

className="
absolute
bottom-20
left-[-40px]
bg-white/90
backdrop-blur-xl
rounded-[35px]
px-8
py-6
shadow-[0_30px_80px_rgba(0,0,0,.35)]
rotate-[-8deg]
animate-[float_4s_ease-in-out_infinite]
hidden
sm:block
z-30
"

>


<p className="text-gray-500">

Security

</p>


<h3 className="
text-xl
font-black
text-[#1E3A8A]
">

SHA-256 Hash

</h3>


</div>








<div

className="
absolute
top-40
right-[-30px]
bg-[#F97316]
text-white
rounded-[35px]
px-7
py-5
shadow-2xl
rotate-6
animate-[float_6s_ease-in-out_infinite]
hidden
sm:block
z-30
"

>


<h3 className="
text-3xl
font-black
">

PoR

</h3>


<p>

Proof of Reserve

</p>


</div>







</div>






</div>









{/* FEATURE */}














</div>



</section>


);


}