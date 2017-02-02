window.onload=function () {
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    var scene=document.querySelector(".scene");
    var room=document.querySelector(".room");
    var floor=document.querySelector(".panel:last-child");
    var ceil=document.querySelector(".panel:first-child");
    var wind=document.querySelector(".panel:nth-child(5)");
    var po=document.querySelector(".panel:nth-child(4)");


    room.style.transformOrigin="center center "+(cw/2)+"px";
    room.style.transform="translateZ(-100px)";
    wind.style.transform="translate3d(0,0,"+cw+"px)";
    floor.style.top=-(cw-ch)+"px";
    floor.style.width=ceil.style.width=cw+"px";
    floor.style.height=ceil.style.height=cw+"px";
    po.onclick=function () {
        room.style.transition="transform 4s ease";
        room.style.transform="translateZ(-300px) rotate3d(0,1,0,"+180+"deg)"

    };
    var angle1=180,angle=0;
    var flag1=true;
    document.onmousedown=function (e) {
       flag1=false;
        var startX=e.clientX;
        var startY=e.clientY;
        document.onmousemove=function (e) {
            flag1=true;
            room.style.transition="none";
            var moveX=e.clientX;
            var moveY=e.clientY;
            angle=Math.abs((moveX-startX))>Math.abs((moveY-startY))?-(moveX-startX):-(moveY-startY);
            room.style.transform="translateZ(-300px) rotate3d(0,1,0,"+(angle1+angle)+"deg)";
            e.preventDefault();
        };


        document.onmouseup=function () {

            document.onmousemove=null;
            document.onmouseup=null;
            if (!flag1){
                return
            }
            if (flag1){
                angle1+=angle;
                flag1=false;
            }
        };
        e.preventDefault();
    };
    var flag=true;
    var panels=document.querySelectorAll(".panel");
    for (var i=0;i<panels.length;i++){
        if (i!=3){
            panels[i].onclick=function () {
                room.style.transition="transform 4s ease";
                if (flag){
                    room.style.transform="translateZ(0) rotate3d(0,1,0,"+(angle1)+"deg)";
                    flag=false;
                }else {
                    room.style.transform="translateZ(-300px) rotate3d(0,1,0,"+(angle1)+"deg)";
                    flag=true;

                }
            }
        }
    }
};