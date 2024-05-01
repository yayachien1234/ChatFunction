
const chatbox = $(".chatbox")[0];
var ReplyIndex = 0;

/*$("#button1").click(function(){new_message("Hi", "user");});*/

$("#button2").click(function() { new_message("Hey", "pet"); });
$("#button3").click(function() { new_message("Umm", "user"); });

function new_message(content, className) {
  // Create a chat <li> element with passed message and className
  const message = document.createElement("li");
  message.classList.add("message", `${className}`);
  message.innerHTML = `<p class="content"></p>`;
  message.querySelector("p").textContent = content;
  chatbox.appendChild(message);
  console.log("new message");
  chatbox.scrollTo({ top: chatbox.scrollHeight, left: 0, behavior: "smooth", });

};

function result(res) {
  console.log("result: " + res);
  new_message(res, "pet");
}

$(document).ready(function() {
  $('#chat_input button[type="submit"]').click((event) => {
    event.preventDefault();
    var chat_textbox = $('#chat_input input[name="input"]');
    var mes = chat_textbox.val().trim();

    $.post('./search', {
      stId: $('#chat_input input[name=input]').val(),
    }, (data) => {

      data = data.replace(/["\[\]]/g, '');
      
      const dataArray = data.split(",");

      new_message(dataArray[ReplyIndex], "pet");
      ReplyIndex++ ;
      
    })

    chat_textbox[0].value = "";
    //chat_textbox[0].style.height = `${inputInitHeight}px`;
    new_message(mes, "user");
    console.log('chat input send');
    //to server
    $.get('/chat_input', {
      input: mes,
    }
      , (res) => {
        result(res);
      });
  });
});

// --------------------------------------------------------------------------------------------------------------

// $(document).ready(function() {
//   $('#search-student-id button[type="search"]').click((event) => {
//     event.preventDefault()
//     $.post('./search', {
//       stId: $('#search-student-id input[name=stId]').val(),
//     }, (data) => {

//       $('#search-student-id input[name=stId]').val('');
//       data = data.replace(/["\[\]]/g, '');
//       const dataArray = data.split(",");
//       $('#search-output').empty();
//       dataArray.forEach((item, index) => { $('#search-output').append(`<p>${index + 1}. ${item}</p>`); } )

//     })
//   })

// });