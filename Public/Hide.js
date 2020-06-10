function OpenSide() {
    if( document.getElementById("mySidebar").style.display == "block"  ) {
        document.getElementById("page-wrapper").style.marginLeft = "0%";
        document.getElementById("mySidebar").style.display = "none";
    }
    else{        
        document.getElementById("page-wrapper").style.marginLeft = "19%";
        document.getElementById("mySidebar").style.width = "19%";
        document.getElementById("mySidebar").style.display = "block";
    }
}