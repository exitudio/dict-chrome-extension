var popupWidth = 400 + 5 + 5; //include border
$(document).ready(function () {
    function get_selection() {
        var txt = '';
        if (window.getSelection) {
            txt = window.getSelection();
            var oRange = txt.getRangeAt(0); //get the text range
            var oRect = oRange.getBoundingClientRect();
            $('#')
            console.log('oRect:', oRect);
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }
        return txt;
    }

    $('body').dblclick(function (e) {
        console.log('db click');

        var selectTextElement;
        var selectText = '';
        if (window.getSelection) {
            selectTextElement = window.getSelection();
            selectText = selectTextElement.toString();
        }else{
            console.error('Browser is not support getSelection()');
            $("#exit-dick").remove();
            return;
        }

        
        $('html').append('<div id="exit-dick" class="exit-card" >' +
            '<div id="longdo-head">' +
            '  <img src="https://dict.longdo.com/download/search_box/images/longdo-dict-small.png" />' +
            '</div>' +
            '<iframe src="https://dict.longdo.com/mobile.php?search='+selectText+'" width="400" height="200" frameBorder="0"/>' +
            '</div>');
        $('body').click(function (e) {
            console.log('click outside!!')
            $('#exit-dick').remove();
        });



        var oRange = selectTextElement.getRangeAt(0); //get the text range
        var oRect = oRange.getBoundingClientRect();
        var x = oRect.x + window.scrollX + (oRect.width - popupWidth)/2;
        var y = oRect.y + window.scrollY + oRect.height;
        console.log('x',x,'window.scrollX:',window.scrollX);
        if(x<window.scrollX) x=window.scrollX;
        else if(x+popupWidth > window.scrollX + $(window).width() ) x= window.scrollX + $(window).width()-popupWidth;
        $('#exit-dick').css({left: x+'px', top: y+'px'})
        console.log('oRect:', oRect);

        
    });

    console.log('w:',$(document).height());
});