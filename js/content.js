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
            return;
        }

        var oRange;
        try{
            oRange = selectTextElement.getRangeAt(0); //get the text range
        }catch(e){
            return;
        }
        var oRect = oRange.getBoundingClientRect();
        var x = oRect.x + window.scrollX + (oRect.width - popupWidth)/2;
        var y = oRect.y + window.scrollY + oRect.height;
        console.log('x',x,'window.scrollX:',window.scrollX);
        if(x<window.scrollX) x=window.scrollX;
        else if(x+popupWidth > window.scrollX + $(window).width() ) x= window.scrollX + $(window).width()-popupWidth;

        
        $('html').append('<div id="exit-dick" class="exit-card" >' +
            '<div id="longdo-head">' +
            '  <img src="https://dict.longdo.com/download/search_box/images/longdo-dict-small.png" />' +
            '</div>' +
            '<iframe src="https://dict.longdo.com/mobile.php?search='+selectText+'" width="400" height="200" frameBorder="0"/>' +
            '<div id="longdo-head">' +
            '  <img src="https://dict.longdo.com/download/search_box/images/longdo-dict-small.png" />' +
            '</div>' +
            '</div>');
        $('body').click(function (e) {
            $('#exit-dick').remove();
        });
        $(window).resize(function(){
            $('#exit-dick').remove();
        })
        $('#exit-dick').css({left: x+'px', top: y+'px'})
        console.log('oRect:', oRect);

        
    });

    console.log('w:',$(document).height());
});