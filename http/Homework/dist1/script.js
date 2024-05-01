$(document).ready(function() {
    console.log("ready");
    $(".pb_home").click(function() { console.log("home"); $(".page_home")[0].scrollIntoView({ behavior: "smooth" }); });
    $(".pb_chat").click(function() { $(".page_chat")[0].scrollIntoView({ behavior: "smooth" }); });
    $(".pb_diary").click(function() { $(".page_diary")[0].scrollIntoView({ behavior: "smooth" }); });
  });
  
  