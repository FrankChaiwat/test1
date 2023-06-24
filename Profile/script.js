// สร้างฟังก์ชันสำหรับการแสดงข้อความ
function showMessage() {
    alert('สวัสดี! ยินดีที่ได้รู้จักคุณ');
  }
  
  // เลือกปุ่มที่มีคลาส "showMessageButton"
  const buttons = document.getElementsByClassName("showMessageButton");
  
  // เพิ่มการฟังเหตุการณ์เมื่อปุ่มถูกคลิก
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", showMessage);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.getElementsByClassName("showMessageButton");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", showMessage);
    }
  });
  
  function showMessage() {
    const message = document.createElement('div');
    message.textContent = 'สวัสดี! ยินดีที่ได้รู้จักคุณ';
    message.classList.add('message');
    document.body.appendChild(message);
  
    setTimeout(function () {
      message.remove();
    }, 1000);
  }
  