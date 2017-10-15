var contentWidth = 640;
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function(){
    var result = document.getElementById('longdo-result');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://dict.longdo.com/mobile.php?search=exit');
    iframe.setAttribute('width', contentWidth);
    result.appendChild(iframe);
  },1);
  setTimeout(function(){
    var result = document.getElementById('google-dict-result');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'http://googledictionary.freecollocation.com/meaning?word=exit#forEmbed');
    iframe.setAttribute('width', contentWidth);
    iframe.setAttribute('sandbox', true);
    result.appendChild(iframe);
    iframe.onload = function(){
      iframe.contentWindow.scrollTo(400,500);
    }
  },1);
  /* setTimeout(function(){
    var result = document.getElementById('aonaware-dict-result');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'http://services.aonaware.com/DictService/Default.aspx?action=define&dict=*&query=exit');
    iframe.setAttribute('width', contentWidth);
    result.appendChild(iframe);
  },1); */
  setTimeout(function(){
    var result = document.getElementById('dictionary-dict-result');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'http://www.dictionary.com/browse/exit#source-luna');
    iframe.setAttribute('width', contentWidth);
    iframe.setAttribute('sandbox', true);
    result.appendChild(iframe);
  },1);
});

