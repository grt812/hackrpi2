// $(function(){
    
//     //Make globe work
//     const myGlobe = Globe();
//     let globeEl = $("#canvas")[0];
//     myGlobe(globeEl).globeImageUrl("images/earth-dark.jpg");
//     globeEl.controls().autoRotate = true;
//     globeEl.controls().autoRotateSpeed = 0.3;
//     // disable zoom
//     globeEl.controls().enableZoom = false;

//     globeEl.pointOfView({ altitude: 4 }, 5000);
// });
$(function(){
    $(".accordion").find(".item").each(function(){
        console.log()
        // let isExpanded = false;
        $(this).click(function(){
            // isExpanded = !isExpanded;
            // if(isExpanded){
            //     $(this).find(".text").addClass("max-height", "0");
            // } else {
            //     $(this).find(".text").css("max-height", "100vh");
            // }
            $(this).toggleClass("expanded");
        });
    });
});